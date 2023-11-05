package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import com.spendwisepro.common.exception.CreditCardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/save")
    public ResponseEntity<String> saveCreditCard(@RequestBody CreditCard creditCard, @RequestHeader("Authorization") String token) {
        creditCardService.saveCreditCard(creditCard, token);
        return ResponseEntity.ok("Credit card saved successfully.");
    }

    @PutMapping("/edit/{creditCardId}")
    public ResponseEntity<String> updateCreditCard(@PathVariable Long creditCardId, @RequestBody CreditCard creditCard, @RequestHeader("Authorization") String token) {
        creditCardService.updateCreditCard(creditCardId, creditCard, token);
        return ResponseEntity.ok("Credit card updated successfully.");
    }

    @GetMapping("/{creditCardId}")
    public CreditCard getCreditCardById(@PathVariable Long creditCardId, @RequestHeader("Authorization") String token) {
        return creditCardService.getCreditCardById(creditCardId, token);
    }

    @DeleteMapping("/delete/{creditCardId}")
    public ResponseEntity<String> deleteCreditCard(@PathVariable Long creditCardId, @RequestHeader("Authorization") String token) {
        try {
            creditCardService.deleteCreditCard(creditCardId, token);
        } catch (CreditCardNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Credit card deleted successfully.");
    }
}
