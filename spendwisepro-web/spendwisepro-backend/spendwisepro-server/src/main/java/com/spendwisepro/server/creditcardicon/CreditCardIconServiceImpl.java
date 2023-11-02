package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditCardIconServiceImpl implements CreditCardIconService{

    private final CreditCardIconRepository creditCardIconRepository;


    @Override
    public List<CreditCardIcon> getAllCreditCardIcons() {
        return creditCardIconRepository.findAll();
    }

    @Override
    public CreditCardIcon saveCreditCardIcon(CreditCardIcon creditCardIcon) {
        return creditCardIconRepository.save(creditCardIcon);
    }
}
