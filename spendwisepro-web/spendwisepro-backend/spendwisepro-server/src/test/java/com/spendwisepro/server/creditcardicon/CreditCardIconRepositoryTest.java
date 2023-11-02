package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
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
public class CreditCardIconRepositoryTest {

    @Autowired
    private CreditCardIconRepository creditCardIconRepository;


    @Test
    public void testCreateCreditCardIcon() {
        CreditCardIcon icon = new CreditCardIcon("american-express.png");

        CreditCardIcon savedIcon = creditCardIconRepository.save(icon);

        assertThat(savedIcon).isNotNull();
        assertThat(savedIcon.getId()).isGreaterThan(0);
    }

    @Test
    public void testFindAllCreditCardIcons() {
        Iterable<CreditCardIcon> icons = creditCardIconRepository.findAll();
        icons.forEach(System.out::println);

        assertThat(icons).isNotEmpty();
    }

    @Test
    public void testUpdateCreditCardIcon() {
        String newIcon = "mastercard.png";
        CreditCardIcon visaIcon = creditCardIconRepository.findById(1L).get();
        visaIcon.setImage(newIcon);

        CreditCardIcon savedIcon = creditCardIconRepository.save(visaIcon);

        assertThat(savedIcon.getImage()).isEqualTo(newIcon);
    }

    @Test
    public void testDeleteCategoryIcon() {
        Long iconId = 2L;
        creditCardIconRepository.deleteById(iconId);

        Optional<CreditCardIcon> result = creditCardIconRepository.findById(iconId);

        assertThat(result).isEmpty();
    }
}
