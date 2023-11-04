package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.CreditCardIcon;
import com.spendwisepro.common.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class CreditCardIconServiceTest {

    @Mock
    private CreditCardIconRepository creditCardIconRepository;

    @InjectMocks
    private CreditCardIconServiceImpl creditCardIconService;

    private CreditCardIcon icon;

    @BeforeEach
    public void setUp() {
        icon = new CreditCardIcon();
        icon.setId(1L);
        icon.setImage("validIcon");
    }


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

    @Test
    public void testSavingNewCreditCardIconReturnsSavedObject() {
        // Arrange
        when(creditCardIconRepository.save(any(CreditCardIcon.class))).thenReturn(icon);

        // Act
        creditCardIconService.saveCreditCardIcon(icon);

        // Assert
        verify(creditCardIconRepository, times(1)).save(any(CreditCardIcon.class));
    }
}
