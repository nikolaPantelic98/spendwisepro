package com.spendwisepro.client.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/credit_card_icons")
public class CreditCardIconRestController {

    private final CreditCardIconServiceImpl creditCardIconService;


    @GetMapping("/all")
    public List<CreditCardIcon> getAllCreditCardIcons() {
        return creditCardIconService.getAllCreditCardIcons();
    }
}
