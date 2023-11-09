package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/records")
public class RecordRestController {

    private final RecordServiceImpl recordService;


    @GetMapping("/last_records")
    public List<Record> getLastFourRecords(@RequestHeader("Authorization") String token) {
        return recordService.getLastFourRecords(token);
    }

    @GetMapping("/last_30_days")
    public List<Record> getRecordsLast30Days(@RequestHeader("Authorization") String token) {
        return recordService.getRecordsLast30Days(token);
    }

    @GetMapping("/last_365_days")
    public List<Record> getRecordsLast365Days(@RequestHeader("Authorization") String token) {
        return recordService.getRecordsLast365Days(token);
    }

    @PostMapping("/save_income")
    public ResponseEntity<String> saveIncomeRecord(@RequestBody Record record, @RequestHeader("Authorization") String token) {
        recordService.saveIncomeRecord(record, token);
        return ResponseEntity.ok("Income record saved successfully.");
    }

    @PostMapping("/save_expense")
    public ResponseEntity<String> saveExpenseRecord(@RequestBody Record record, @RequestHeader("Authorization") String token) {
        recordService.saveExpenseRecord(record, token);
        return ResponseEntity.ok("Expense record saved successfully.");
    }
}