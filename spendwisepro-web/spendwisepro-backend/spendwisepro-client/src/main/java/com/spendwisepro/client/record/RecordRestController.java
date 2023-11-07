package com.spendwisepro.client.record;

import com.spendwisepro.common.entity.Record;
import lombok.RequiredArgsConstructor;
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
}