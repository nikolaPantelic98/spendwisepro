package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class CreditCardRepositoryTest {

    @Autowired
    private CreditCardRepository creditCardRepository;


    @Test
    public void testCreateCreditCard() {
        CreditCard creditCard = new CreditCard(50, "Visa", "OTP Bank", "something");

        CreditCard savedCreditCard = creditCardRepository.save(creditCard);

        assertThat(savedCreditCard).isNotNull();
        assertThat(savedCreditCard.getId()).isGreaterThan(0);
    }

    @Test
    public void testFindAllCreditCards() {
        Iterable<CreditCard> creditCards = creditCardRepository.findAll();
        creditCards.forEach(System.out::println);

        assertThat(creditCards).isNotEmpty();
    }

    @Test
    public void testUpdateCreditCardIcon() {
        String newType = "MasterCard";
        CreditCard visa = creditCardRepository.findById(2L).get();
        visa.setType(newType);

        CreditCard savedCreditCard = creditCardRepository.save(visa);

        assertThat(savedCreditCard.getType()).isEqualTo(newType);
    }

    @Test
    public void testDeleteCategoryIcon() {
        Long creditCardId = 2L;
        creditCardRepository.deleteById(creditCardId);

        Optional<CreditCard> result = creditCardRepository.findById(creditCardId);

        assertThat(result).isEmpty();
    }
}
