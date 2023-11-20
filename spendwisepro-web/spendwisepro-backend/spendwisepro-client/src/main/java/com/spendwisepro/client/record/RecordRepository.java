package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    @Query("SELECT r FROM Record r WHERE r.user.id = ?1 AND r.isHidden = false ORDER BY r.dateAndTime DESC")
    List<Record> findLastRecords(Long userId, Pageable pageable);

    @Query("SELECT r FROM Record r WHERE r.user.id = ?1 AND r.dateAndTime >= ?2 AND r.isHidden = false ORDER BY r.dateAndTime DESC")
    List<Record> findAllRecordsAfterDate(Long userId, Date date);

    @Query("SELECT r FROM Record r WHERE r.user.id = ?1 ORDER BY r.dateAndTime DESC")
    List<Record> findAllRecords(Long userId);

    @Query("SELECT r FROM Record r WHERE r.user.id = ?1 AND r.dateAndTime >= ?2 AND " +
            "r.dateAndTime <= ?3 AND r.transactionType = 'EXPENSE' AND r.isHidden = false ORDER BY r.dateAndTime DESC")
    List<Record> findExpenseRecordsBetweenDates(Long userId, Date startOfMonth, Date endOfMonth);
}
