package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import com.spendwisepro.common.exception.CreditCardNotFoundException;

import java.util.List;

public interface CreditCardService {

    List<CreditCard> getAllCreditCards(String token);
    CreditCard saveCreditCard(CreditCard creditCard, String token);
    void updateCreditCard(Long creditCardId, CreditCard creditCard, String token);
    CreditCard getCreditCardById(Long creditCardId, String token);
    void deleteCreditCard(Long creditCardId, String token) throws CreditCardNotFoundException;
}
