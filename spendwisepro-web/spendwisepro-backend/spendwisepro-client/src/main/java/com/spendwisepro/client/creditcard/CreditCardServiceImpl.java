package com.spendwisepro.client.creditcard;

import com.spendwisepro.client.record.RecordRepository;
import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import com.spendwisepro.common.entity.Record;
import com.spendwisepro.common.exception.CreditCardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreditCardServiceImpl implements CreditCardService{

    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RecordRepository recordRepository;


    private User getAuthenticatedUser(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        return user.get();
    }

    @Override
    public List<CreditCard> getAllCreditCards(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return creditCardRepository.findAllCreditCards(authenticatedUser.getId(), Sort.by("type"));
    }

    @Override
    public CreditCard saveCreditCard(CreditCard creditCard, String token) {
        User userToSave = getAuthenticatedUser(token);

        creditCard.setUser(userToSave);
        creditCard.setAmount(0F);

        return creditCardRepository.save(creditCard);
    }

    @Override
    public void updateCreditCard(Long creditCardId, CreditCard creditCard, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        CreditCard existingCreditCard = creditCardRepository.findCreditCardById(creditCardId, authenticatedUser.getId());

        if (creditCard.getType() != null) {
            existingCreditCard.setType(creditCard.getType());
        }
        if (creditCard.getBank() != null) {
            existingCreditCard.setBank(creditCard.getBank());
        }
        if (creditCard.getNote() != null) {
            existingCreditCard.setNote(creditCard.getNote());
        }
        if (creditCard.getIcon() != null) {
            existingCreditCard.setIcon(creditCard.getIcon());
        }
        if (creditCard.getAmount() != null) {
            Record record = new Record();
            record.setAmount(Math.abs(creditCard.getAmount() - existingCreditCard.getAmount()));
            record.setPaymentType(PaymentType.CREDIT_CARD);
            record.setDateAndTime(new Date());
            record.setNote("Credit card update");
            record.setIsHidden(true);
            record.setCreditCard(existingCreditCard);
            record.setUser(authenticatedUser);

            if (creditCard.getAmount() > existingCreditCard.getAmount()) {
                record.setTransactionType(TransactionType.INCOME);
            } else {
                record.setTransactionType(TransactionType.EXPENSE);
            }

            existingCreditCard.setAmount(creditCard.getAmount());
            recordRepository.save(record);
        }

        creditCardRepository.save(existingCreditCard);
    }

    @Override
    public CreditCard getCreditCardById(Long creditCardId, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return creditCardRepository.findCreditCardById(creditCardId, authenticatedUser.getId());
    }

    @Override
    public void deleteCreditCard(Long creditCardId, String token) throws CreditCardNotFoundException {
        User authenticatedUser = getAuthenticatedUser(token);

        Long countById = creditCardRepository.countById(creditCardId);

        if (countById == null || countById == 0) {
            throw new CreditCardNotFoundException("Could not find any credit card with id " + creditCardId);
        }

        creditCardRepository.deleteCreditCardById(creditCardId, authenticatedUser.getId());
    }
}
