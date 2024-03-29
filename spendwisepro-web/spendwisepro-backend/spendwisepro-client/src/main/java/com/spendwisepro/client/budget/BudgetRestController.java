package com.spendwisepro.client.budget;

import com.spendwisepro.common.entity.Budget;
import com.spendwisepro.common.exception.BudgetNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/budgets")
public class BudgetRestController {

    private final BudgetServiceImpl budgetService;


    @GetMapping("/weekly")
    public List<Budget> getWeeklyBudgets(@RequestHeader("Authorization") String token) {
        return budgetService.getWeeklyBudgets(token);
    }

    @GetMapping("/monthly")
    public List<Budget> getMonthlyBudgets(@RequestHeader("Authorization") String token) {
        return budgetService.getMonthlyBudgets(token);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveBudget(@RequestBody Budget budget, @RequestHeader("Authorization") String token) {
        budgetService.saveBudget(budget, token);
        return ResponseEntity.ok("Budget saved successfully.");
    }

    @GetMapping("/{budgetId}")
    public Budget getBudgetById(@PathVariable Long budgetId, @RequestHeader("Authorization") String token) {
        return budgetService.getBudgetById(budgetId, token);
    }

    @PutMapping("/edit/{budgetId}")
    public ResponseEntity<String> updateBudget(@PathVariable Long budgetId, @RequestBody Budget budget, @RequestHeader("Authorization") String token) {
        budgetService.updateBudget(budgetId, budget, token);
        return ResponseEntity.ok("Budget updated successfully.");
    }

    @DeleteMapping("/delete/{budgetId}")
    public ResponseEntity<String> deleteBudget(@PathVariable Long budgetId, @RequestHeader("Authorization") String token) {
        try {
            budgetService.deleteBudget(budgetId, token);
        } catch (BudgetNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Budget deleted successfully.");
    }
}
