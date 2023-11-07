package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
