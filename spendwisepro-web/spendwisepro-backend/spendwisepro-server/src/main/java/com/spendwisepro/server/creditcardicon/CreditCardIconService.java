package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import com.spendwisepro.common.exception.CreditCardIconNotFoundException;

import java.util.List;

public interface CreditCardIconService {

    List<CreditCardIcon> getAllCreditCardIcons();
    CreditCardIcon saveCreditCardIcon(CreditCardIcon creditCardIcon);
    void deleteCreditCardIcon(Long id) throws CreditCardIconNotFoundException;
}
