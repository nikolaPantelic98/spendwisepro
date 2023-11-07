package com.spendwisepro.client.record;

import com.spendwisepro.client.category.CategoryRepository;
import com.spendwisepro.client.creditcard.CreditCardRepository;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import com.spendwisepro.common.entity.Record;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class RecordRepositoryTest {

    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CreditCardRepository creditCardRepository;


    @Test
    public void testCreateRecord() {

        Category category = categoryRepository.findById(35L).get();
        User user = userRepository.findById(19L).get();
        CreditCard creditCard = creditCardRepository.findById(11L).get();

        Record record = new Record(1L, 15, PaymentType.CREDIT_CARD, TransactionType.EXPENSE, new Date(), "5th record",
                category, creditCard, user);

        Record savedRecord = recordRepository.save(record);

        assertThat(savedRecord).isNotNull();
        assertThat(savedRecord.getId()).isGreaterThan(0);
    }

    @Test
    public void testFindAllRecords() {
        Iterable<Record> records = recordRepository.findAll();
        records.forEach(System.out::println);

        assertThat(records).isNotEmpty();
    }

    @Test
    public void testUpdateRecord() {
        String newNote = "Updated record";
        Record record = recordRepository.findById(1L).get();
        record.setNote(newNote);

        Record savedRecord = recordRepository.save(record);

        assertThat(savedRecord.getNote()).isEqualTo(newNote);
    }

    @Test
    public void testDeleteRecord() {
        Long recordId = 1L;
        recordRepository.deleteById(recordId);

        Optional<Record> result = recordRepository.findById(recordId);

        assertThat(result).isEmpty();
    }
}
