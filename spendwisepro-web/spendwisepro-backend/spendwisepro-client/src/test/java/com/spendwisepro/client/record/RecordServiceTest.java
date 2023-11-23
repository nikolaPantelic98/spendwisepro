package com.spendwisepro.client.record;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import com.spendwisepro.common.entity.Record;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RecordServiceTest {

    @Mock
    private RecordRepository recordRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private JwtService jwtService;

    @InjectMocks
    private RecordServiceImpl recordService;

    private User user;
    private List<Record> expectedRecords = new ArrayList<>();
    private String token;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("validUsername");

        token = "validToken";
    }


    @Test
    public void testReturnsAllRecordsForValidUser() {
        // Arrange
        expectedRecords.add(new Record());
        expectedRecords.add(new Record());

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findAllRecords(user.getId())).thenReturn(expectedRecords);

        // Act
        List<Record> actualRecords = recordService.getAllRecords(token);

        // Assert
        assertEquals(expectedRecords, actualRecords);
    }

    @Test
    public void testReturnsEmptyListWhenUserHasNoRecords() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findAllRecords(user.getId())).thenReturn(expectedRecords);

        // Act
        List<Record> actualRecords = recordService.getAllRecords(token);

        // Assert
        assertTrue(actualRecords.isEmpty());
    }

    @Test
    public void testReturnsRecordsInDescendingOrderOfDateAndTime() {
        // Arrange
        expectedRecords.add(new Record(1L, 100.0f, PaymentType.CASH, TransactionType.EXPENSE, new Date(2023, Calendar.FEBRUARY, 1), "Test record 1", false, null, null, user));
        expectedRecords.add(new Record(2L, 200.0f, PaymentType.CREDIT_CARD, TransactionType.INCOME, new Date(2023, Calendar.AUGUST, 1), "Test record 2", false, null, null, user));
        expectedRecords.add(new Record(3L, 300.0f, PaymentType.CASH, TransactionType.EXPENSE, new Date(2023, Calendar.OCTOBER, 1), "Test record 3", false, null, null, user));
        expectedRecords.add(new Record(4L, 400.0f, PaymentType.CREDIT_CARD, TransactionType.INCOME, new Date(2022, Calendar.MARCH, 2), "Test record 4", false, null, null, user));

        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findAllRecords(user.getId())).thenReturn(expectedRecords);
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());

        // Act
        List<Record> actualRecords = recordService.getAllRecords(token);

        // Assert
        assertEquals(expectedRecords, actualRecords);
    }
}
