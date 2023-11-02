package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import com.spendwisepro.common.exception.CreditCardIconNotFoundException;
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

    @Override
    public void deleteCreditCardIcon(Long id) throws CreditCardIconNotFoundException {
        Long countById = creditCardIconRepository.countById(id);

        if (countById == null || countById == 0) {
            throw new CreditCardIconNotFoundException("Could not find any icon with id " + id);
        }

        creditCardIconRepository.deleteById(id);
    }
}
