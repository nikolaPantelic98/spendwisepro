package com.spendwisepro.client.record;

import com.spendwisepro.client.creditcard.CreditCardRepository;
import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import com.spendwisepro.common.entity.Record;
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
}
