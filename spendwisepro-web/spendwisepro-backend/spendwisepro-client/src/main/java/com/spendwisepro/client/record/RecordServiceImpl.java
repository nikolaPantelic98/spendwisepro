package com.spendwisepro.client.record;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Record;
import com.spendwisepro.common.entity.TransactionType;
import com.spendwisepro.common.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    @Override
    public List<Record> getLastFourRecords(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        User authenticatedUser = user.get();

        Pageable pageable = PageRequest.of(0, 4);

        return recordRepository.findLastRecords(authenticatedUser.getId(), pageable);
    }

    @Override
    public List<Record> getRecordsLast30Days(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        User authenticatedUser = user.get();

        Date thirtyDaysAgo = new Date(System.currentTimeMillis() - 30L * 24 * 60 * 60 * 1000);

        return recordRepository.findAllRecordsAfterDate(authenticatedUser.getId(), thirtyDaysAgo);
    }

    @Override
    public List<Record> getRecordsLast365Days(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        User authenticatedUser = user.get();

        Date yearAgo = new Date(System.currentTimeMillis() - 365L * 24 * 60 * 60 * 1000);

        return recordRepository.findAllRecordsAfterDate(authenticatedUser.getId(), yearAgo);
    }

    @Override
    public Record saveIncomeRecord(Record record, String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User userToSave = user.get();

        record.setUser(userToSave);
        record.setTransactionType(TransactionType.INCOME);
        if (record.getDateAndTime() == null) {
            record.setDateAndTime(new Date());
        }

        return recordRepository.save(record);
    }
}
