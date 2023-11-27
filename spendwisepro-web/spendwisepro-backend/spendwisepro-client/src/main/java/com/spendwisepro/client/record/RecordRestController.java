package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;
import com.spendwisepro.common.exception.RecordNotFoundException;
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

    @GetMapping("/all")
    public List<Record> getAllRecords(@RequestHeader("Authorization") String token) {
        return recordService.getAllRecords(token);
    }

    @GetMapping("/expense_records_this_month")
    public List<Record> getExpenseRecordsThisMonth(@RequestHeader("Authorization") String token) {
        return recordService.getExpenseRecordsThisMonth(token);
    }

    @GetMapping("/expense_records_this_week")
    public List<Record> getExpenseRecordsThisWeek(@RequestHeader("Authorization") String token) {
        return recordService.getExpenseRecordsThisWeek(token);
    }

    @GetMapping("/{recordId}")
    public Record getRecordById(@PathVariable Long recordId, @RequestHeader("Authorization") String token) {
        return recordService.getRecordById(recordId, token);
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

    @PutMapping("/edit_expense/{recordId}")
    public ResponseEntity<String> updateExpenseRecord(@PathVariable Long recordId, @RequestBody Record record, @RequestHeader("Authorization") String token) {
        recordService.updateExpenseRecord(recordId, record, token);
        return ResponseEntity.ok("Expense record updated successfully.");
    }

    @PutMapping("/edit_income/{recordId}")
    public ResponseEntity<String> updateIncomeRecord(@PathVariable Long recordId, @RequestBody Record record, @RequestHeader("Authorization") String token) {
        recordService.updateIncomeRecord(recordId, record, token);
        return ResponseEntity.ok("Income record updated successfully.");
    }

    @DeleteMapping("/delete/{recordId}")
    public ResponseEntity<String> deleteRecord(@PathVariable Long recordId, @RequestHeader("Authorization") String token) {
        try {
            recordService.deleteRecord(recordId, token);
        } catch (RecordNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Record deleted successfully.");
    }
}