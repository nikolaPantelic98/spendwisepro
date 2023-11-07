package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;

import java.util.List;

public interface RecordService {

    List<Record> getLastFourRecords(String token);
}
