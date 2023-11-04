package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/credit_cards")
public class CreditCardRestController {

    private final CreditCardServiceImpl creditCardService;


    @GetMapping("/all")
    public List<CreditCard> getAllCreditCards(@RequestHeader("Authorization") String token) {
        return creditCardService.getAllCreditCards(token);
    }
}
