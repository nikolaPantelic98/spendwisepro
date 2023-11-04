package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CreditCardIconServiceTest {

    @Mock
    private CreditCardIconRepository creditCardIconRepository;

    @InjectMocks
    private CreditCardIconServiceImpl creditCardIconService;


    @Test
    public void testShouldReturnListOfAllCreditCardIconsWhenRepositoryHasData() {
        // Arrange
        List<CreditCardIcon> expectedIcons = new ArrayList<>();
        expectedIcons.add(new CreditCardIcon("icon1.png"));
        expectedIcons.add(new CreditCardIcon("icon2.png"));
        when(creditCardIconRepository.findAll()).thenReturn(expectedIcons);

        // Act
        List<CreditCardIcon> actualIcons = creditCardIconService.getAllCreditCardIcons();

        // Assert
        assertEquals(expectedIcons, actualIcons);
    }

    @Test
    public void testShouldReturnEmptyListWhenRepositoryHasNoData() {
        // Arrange
        List<CreditCardIcon> expectedIcons = new ArrayList<>();
        when(creditCardIconRepository.findAll()).thenReturn(expectedIcons);

        // Act
        List<CreditCardIcon> actualIcons = creditCardIconService.getAllCreditCardIcons();

        // Assert
        assertTrue(actualIcons.isEmpty());
    }
}
