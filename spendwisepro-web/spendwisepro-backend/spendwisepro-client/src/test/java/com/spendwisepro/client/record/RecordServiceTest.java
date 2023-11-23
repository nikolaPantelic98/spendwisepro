package com.spendwisepro.client.record;

import com.spendwisepro.client.creditcard.CreditCardRepository;
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
import org.springframework.data.domain.PageRequest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RecordServiceTest {

    @Mock
    private RecordRepository recordRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CreditCardRepository creditCardRepository;
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


    // getAllRecords
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

    // getAllRecords
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

    // getAllRecords
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

    // getLastFourRecords
    @Test
    public void testReturnsListOfLastFourRecordsForValidUser() {
        // Arrange
        for (int i = 0; i < 5; i++) {
            Record record = new Record();
            record.setId((long) (i + 1));
            expectedRecords.add(record);
        }
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findLastRecords(user.getId(), PageRequest.of(0, 4))).thenReturn(expectedRecords.subList(0, 4));

        // Act
        List<Record> result = recordService.getLastFourRecords(token);

        // Assert
        assertEquals(4, result.size());
        assertEquals(1L, result.get(0).getId().longValue());
        assertEquals(2L, result.get(1).getId().longValue());
        assertEquals(3L, result.get(2).getId().longValue());
        assertEquals(4L, result.get(3).getId().longValue());
    }

    // getLastFourRecords
    @Test
    public void testReturnsEmptyListForValidUserWithNoRecords() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findLastRecords(user.getId(), PageRequest.of(0, 4))).thenReturn(expectedRecords);

        // Act
        List<Record> result = recordService.getLastFourRecords(token);

        // Assert
        assertTrue(result.isEmpty());
    }

    // getRecordsLast30Days
    @Test
    public void testReturnsListOfRecordsWithinLast30Days() {
        // Arrange
        expectedRecords.add(new Record());
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findAllRecordsAfterDate(any(Long.class), any(Date.class))).thenReturn(expectedRecords);

        // Act
        List<Record> actualRecords = recordService.getRecordsLast30Days(token);

        // Assert
        assertEquals(expectedRecords, actualRecords);
    }

    // getRecordsLast30Days
    @Test
    public void testReturnsEmptyListIfNoRecordsWithinLast30Days() {
        // Arrange
        List<Record> expectedRecords = new ArrayList<>();
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findAllRecordsAfterDate(any(Long.class), any(Date.class))).thenReturn(expectedRecords);

        // Act
        List<Record> actualRecords = recordService.getRecordsLast30Days(token);

        // Assert
        assertTrue(actualRecords.isEmpty());
    }

    // getExpenseRecordsThisMonth
    @Test
    public void testReturnsExpenseRecordsForValidUserWithExpenseTransactionType() {
        // Arrange
        List<Record> expenseRecords = Arrays.asList(
                Record.builder().id(1L).transactionType(TransactionType.EXPENSE).build(),
                Record.builder().id(2L).transactionType(TransactionType.EXPENSE).build()
        );
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.findExpenseRecordsBetweenDates(eq(user.getId()), any(Date.class), any(Date.class))).thenReturn(expenseRecords);

        // Act
        List<Record> result = recordService.getExpenseRecordsThisMonth(token);

        // Assert
        assertNotNull(result);
        assertEquals(expenseRecords.size(), result.size());
        assertEquals(expenseRecords, result);
        verify(recordRepository, times(1)).findExpenseRecordsBetweenDates(eq(user.getId()), any(Date.class), any(Date.class));
    }

    // saveIncomeRecord
    @Test
    public void testSaveIncomeRecordWithValidInputs() {
        // Arrange
        Record record = new Record();
        record.setAmount(100.0f);
        record.setPaymentType(PaymentType.CASH);
        record.setCreditCard(null);
        record.setDateAndTime(null);


        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(record)).thenReturn(record);

        // Act
        Record savedRecord = recordService.saveIncomeRecord(record, token);

        // Assert
        assertEquals(record, savedRecord);
        assertEquals(TransactionType.INCOME, savedRecord.getTransactionType());
        assertFalse(savedRecord.getIsHidden());
        assertNotNull(savedRecord.getDateAndTime());
        verify(creditCardRepository, never()).increaseAmountOfCreditCard(anyFloat(), anyLong(), anyLong());
    }

    // saveIncomeRecord
    @Test
    public void testSaveIncomeRecordSetsTransactionTypeAndIsHidden() {
        // Arrange
        Record record = new Record();
        record.setAmount(100.0f);
        record.setPaymentType(PaymentType.CASH);
        record.setCreditCard(null);
        record.setDateAndTime(null);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(record)).thenReturn(record);

        // Act
        Record savedRecord = recordService.saveIncomeRecord(record, token);

        // Assert
        assertEquals(TransactionType.INCOME, savedRecord.getTransactionType());
        assertFalse(savedRecord.getIsHidden());
    }

    // saveIncomeRecord
    @Test
    public void testSaveIncomeRecordSetsCurrentTimeIfTimeIsNull() {
        // Arrange
        Record record = new Record();
        record.setAmount(100.0f);
        record.setPaymentType(PaymentType.CASH);
        record.setCreditCard(null);
        record.setDateAndTime(null);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(record)).thenReturn(record);

        // Act
        Record savedRecord = recordService.saveIncomeRecord(record, token);

        // Assert
        assertNotNull(savedRecord.getDateAndTime());
    }

    // saveIncomeRecord
    @Test
    public void testIncreaseAmountOfCreditCardWhenPaymentTypeIsCreditCard() {
        // Arrange
        CreditCard creditCard = new CreditCard();
        creditCard.setId(1L);

        Record record = new Record();
        record.setPaymentType(PaymentType.CREDIT_CARD);
        record.setCreditCard(creditCard);
        record.setAmount(100.0f);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(any(Record.class))).thenReturn(record);
        doNothing().when(creditCardRepository).increaseAmountOfCreditCard(anyFloat(), anyLong(), anyLong());

        // Act
        Record savedRecord = recordService.saveIncomeRecord(record, token);

        // Assert
        verify(creditCardRepository).increaseAmountOfCreditCard(record.getAmount(), creditCard.getId(), user.getId());
        assertNotNull(savedRecord);
    }

    @Test
    public void testSaveExpenseRecordWithValidInputs() {
        // Arrange
        Record record = new Record();
        record.setAmount(100.0f);
        record.setPaymentType(PaymentType.CASH);
        record.setCreditCard(null);
        record.setDateAndTime(null);


        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(record)).thenReturn(record);

        // Act
        Record savedRecord = recordService.saveExpenseRecord(record, token);

        // Assert
        assertEquals(record, savedRecord);
        assertEquals(TransactionType.EXPENSE, savedRecord.getTransactionType());
        assertFalse(savedRecord.getIsHidden());
        assertNotNull(savedRecord.getDateAndTime());
        verify(creditCardRepository, never()).increaseAmountOfCreditCard(anyFloat(), anyLong(), anyLong());
    }

    @Test
    public void testDecreaseAmountOfCreditCardWhenPaymentTypeIsCreditCard() {
        // Arrange
        CreditCard creditCard = new CreditCard();
        creditCard.setId(1L);

        Record record = new Record();
        record.setPaymentType(PaymentType.CREDIT_CARD);
        record.setCreditCard(creditCard);
        record.setAmount(100.0f);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(recordRepository.save(any(Record.class))).thenReturn(record);
        doNothing().when(creditCardRepository).decreaseAmountOfCreditCard(anyFloat(), anyLong(), anyLong());

        // Act
        Record savedRecord = recordService.saveExpenseRecord(record, token);

        // Assert
        verify(creditCardRepository).decreaseAmountOfCreditCard(record.getAmount(), creditCard.getId(), user.getId());
        assertNotNull(savedRecord);
    }
}
