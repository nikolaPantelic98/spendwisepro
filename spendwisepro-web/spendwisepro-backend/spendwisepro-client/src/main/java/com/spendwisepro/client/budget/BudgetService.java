package com.spendwisepro.client.budget;

import com.spendwisepro.common.entity.Budget;
import com.spendwisepro.common.exception.BudgetNotFoundException;

import java.util.List;

public interface BudgetService {
    List<Budget> getWeeklyBudgets(String token);
    List<Budget> getMonthlyBudgets(String token);
    Budget saveBudget(Budget budget, String token);
    Budget getBudgetById(Long budgetId, String token);
    void updateBudget(Long budgetId, Budget budget, String token);
    void deleteBudget(Long budgetId, String token) throws BudgetNotFoundException;
}
