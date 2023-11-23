package com.spendwisepro.client.record;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.Record;
import com.spendwisepro.common.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
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
    private Record record;
    private String token;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("validUsername");

        record = new Record();
        record.setId(1L);
        record.setAmount(100F);
        record.setUser(user);

        token = "validToken";
    }


    @Test
    public void testGetAllRecordsReturnsAllRecordsOfAuthenticatedUser() {
        // Arrange
        List<Record> expectedRecords = new ArrayList<>();
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

}
