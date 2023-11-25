package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.CreditCard;
import com.spendwisepro.common.entity.Record;

import java.util.List;

public interface RecordService {

    List<Record> getLastFourRecords(String token);
    List<Record> getRecordsLast30Days(String token);
    List<Record> getRecordsLast365Days(String token);
    List<Record> getAllRecords(String token);
    List<Record> getExpenseRecordsThisMonth(String token);
    List<Record> getExpenseRecordsThisWeek(String token);
    Record getRecordById(Long recordId, String token);
    Record saveIncomeRecord(Record record, String token);
    Record saveExpenseRecord(Record record, String token);
    void updateExpenseRecord(Long recordId, Record record, String token);
}
