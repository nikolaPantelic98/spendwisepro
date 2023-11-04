package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;

import java.util.List;

public interface CreditCardService {

    List<CreditCard> getAllCreditCards(String token);
    CreditCard saveCreditCard(CreditCard creditCard, String token);
}
