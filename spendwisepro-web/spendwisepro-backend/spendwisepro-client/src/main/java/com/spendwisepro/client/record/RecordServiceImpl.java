package com.spendwisepro.client.record;

import com.spendwisepro.client.creditcard.CreditCardRepository;
import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import com.spendwisepro.common.entity.Record;
import com.spendwisepro.common.exception.RecordNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CreditCardRepository creditCardRepository;


    private User getAuthenticatedUser(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        return user.get();
    }

    @Override
    public List<Record> getLastFourRecords(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Pageable pageable = PageRequest.of(0, 4);

        return recordRepository.findLastRecords(authenticatedUser.getId(), pageable);
    }

    @Override
    public List<Record> getRecordsLast30Days(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Date thirtyDaysAgo = new Date(System.currentTimeMillis() - 30L * 24 * 60 * 60 * 1000);

        return recordRepository.findAllRecordsAfterDate(authenticatedUser.getId(), thirtyDaysAgo);
    }

    @Override
    public List<Record> getRecordsLast365Days(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Date yearAgo = new Date(System.currentTimeMillis() - 365L * 24 * 60 * 60 * 1000);

        return recordRepository.findAllRecordsAfterDate(authenticatedUser.getId(), yearAgo);
    }

    @Override
    public List<Record> getAllRecords(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return recordRepository.findAllRecords(authenticatedUser.getId());
    }

    @Override
    public List<Record> getExpenseRecordsThisMonth(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        Date startOfMonth = calendar.getTime();

        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        Date endOfMonth = calendar.getTime();

        return recordRepository.findExpenseRecordsBetweenDates(authenticatedUser.getId(), startOfMonth, endOfMonth);
    }

    @Override
    public List<Record> getExpenseRecordsThisWeek(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        Date startOfWeek = calendar.getTime();

        calendar.add(Calendar.WEEK_OF_YEAR, 1);
        calendar.add(Calendar.MILLISECOND, -1);

        Date endOfWeek = calendar.getTime();

        return recordRepository.findExpenseRecordsBetweenDates(authenticatedUser.getId(), startOfWeek, endOfWeek);
    }

    @Override
    public Record getRecordById(Long recordId, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return recordRepository.findRecordById(recordId, authenticatedUser.getId());
    }

    @Override
    public Record saveIncomeRecord(Record record, String token) {
        User userToSave = getAuthenticatedUser(token);

        // set user
        record.setUser(userToSave);
        // set transaction type
        record.setTransactionType(TransactionType.INCOME);
        // set current time if time is null
        if (record.getDateAndTime() == null) {
            record.setDateAndTime(new Date());
        }
        // record is not hidden
        record.setIsHidden(false);

        Record savedRecord = recordRepository.save(record);

        // Increase amount of credit card when payment type of income record is credit card
        if (savedRecord.getPaymentType().equals(PaymentType.CREDIT_CARD)) {
            Long creditCardId = savedRecord.getCreditCard().getId();
            creditCardRepository.increaseAmountOfCreditCard(savedRecord.getAmount(), creditCardId, userToSave.getId());
        }

        // todo: increase amount of cash balance when we create cash entity

        return savedRecord;
    }

    @Override
    public Record saveExpenseRecord(Record record, String token) {
        User userToSave = getAuthenticatedUser(token);

        // set user
        record.setUser(userToSave);
        // set transaction type
        record.setTransactionType(TransactionType.EXPENSE);
        // set current time if time is null
        if (record.getDateAndTime() == null) {
            record.setDateAndTime(new Date());
        }
        // record is not hidden
        record.setIsHidden(false);

        Record savedRecord = recordRepository.save(record);

        // Decrease amount of credit card when payment type of expense record is credit card
        if (savedRecord.getPaymentType().equals(PaymentType.CREDIT_CARD)) {
            Long creditCardId = savedRecord.getCreditCard().getId();
            creditCardRepository.decreaseAmountOfCreditCard(savedRecord.getAmount(), creditCardId, userToSave.getId());
        }

        // todo: decrease amount of cash balance when we create cash entity

        return savedRecord;
    }

    @Override
    public void updateExpenseRecord(Long recordId, Record record, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Record existingRecord = recordRepository.findRecordById(recordId, authenticatedUser.getId());

        float amountDifference = existingRecord.getAmount() - record.getAmount();
        boolean isPaymentTypeChanged = existingRecord.getTransactionType().equals(record.getTransactionType());

        // because it's difference between positive and negative number (income - expense)
        float amountDifferenceIfPaymentTypeChanged = existingRecord.getAmount() + record.getAmount();

        updateRecordFields(existingRecord, record);
        existingRecord.setTransactionType(TransactionType.EXPENSE);

        // Increase or decrease amount of credit card when payment type of expense record is credit card
        if (existingRecord.getPaymentType().equals(PaymentType.CREDIT_CARD)) {
            Long creditCardId = existingRecord.getCreditCard().getId();

            if (isPaymentTypeChanged) {
                amountDifference = -amountDifferenceIfPaymentTypeChanged;
            }

            if (amountDifference >= 0) {
                creditCardRepository.increaseAmountOfCreditCard(Math.abs(amountDifference), creditCardId, authenticatedUser.getId());
            } else {
                creditCardRepository.decreaseAmountOfCreditCard(Math.abs(amountDifference), creditCardId, authenticatedUser.getId());
            }
        }

        recordRepository.save(existingRecord);
    }

    @Override
    public void updateIncomeRecord(Long recordId, Record record, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Record existingRecord = recordRepository.findRecordById(recordId, authenticatedUser.getId());

        float amountDifference = existingRecord.getAmount() - record.getAmount();
        boolean isPaymentTypeChanged = existingRecord.getTransactionType().equals(record.getTransactionType());

        // because it's difference between positive and negative number (income - expense)
        float amountToChangeIfPaymentTypeChanged = existingRecord.getAmount() + record.getAmount();

        updateRecordFields(existingRecord, record);
        existingRecord.setTransactionType(TransactionType.INCOME);

        // Decrease or increase amount of credit card when payment type of expense record is credit card
        if (existingRecord.getPaymentType().equals(PaymentType.CREDIT_CARD)) {
            Long creditCardId = existingRecord.getCreditCard().getId();

            if (isPaymentTypeChanged) {
                amountDifference = -amountToChangeIfPaymentTypeChanged;
            }

            if (amountDifference >= 0) {
                creditCardRepository.decreaseAmountOfCreditCard(Math.abs(amountDifference), creditCardId, authenticatedUser.getId());
            } else {
                creditCardRepository.increaseAmountOfCreditCard(Math.abs(amountDifference), creditCardId, authenticatedUser.getId());
            }
        }

        recordRepository.save(existingRecord);
    }

    private void updateRecordFields(Record existingRecord, Record record) {
        existingRecord.setAmount(record.getAmount());

        if (record.getPaymentType() != null) {
            existingRecord.setPaymentType(record.getPaymentType());
        }
        if (record.getDateAndTime() != null) {
            existingRecord.setDateAndTime(record.getDateAndTime());
        }
        if (record.getNote() != null) {
            existingRecord.setNote(record.getNote());
        }
        if (record.getCategory() != null) {
            existingRecord.setCategory(record.getCategory());
        }
        if (record.getCreditCard() != null) {
            existingRecord.setCreditCard(record.getCreditCard());
        }

        existingRecord.setIsHidden(false);
    }

    @Override
    public void deleteRecord(Long recordId, String token) throws RecordNotFoundException {
        User authenticatedUser = getAuthenticatedUser(token);

        Long countById = recordRepository.countById(recordId);

        if (countById == null || countById == 0) {
            throw new RecordNotFoundException("Could not find any record with id " + recordId);
        }

        Record existingRecord = recordRepository.findRecordById(recordId, authenticatedUser.getId());
        Long creditCardId = existingRecord.getCreditCard().getId();

        if (existingRecord.getTransactionType().equals(TransactionType.INCOME)) {
            creditCardRepository.decreaseAmountOfCreditCard(existingRecord.getAmount(), creditCardId, authenticatedUser.getId());
        } else {
            creditCardRepository.increaseAmountOfCreditCard(existingRecord.getAmount(), creditCardId, authenticatedUser.getId());
        }

        recordRepository.deleteRecordById(recordId, authenticatedUser.getId());
    }
}
