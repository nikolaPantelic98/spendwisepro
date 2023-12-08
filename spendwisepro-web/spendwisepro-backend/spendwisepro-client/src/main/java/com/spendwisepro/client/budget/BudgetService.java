package com.spendwisepro.client.budget;

import com.spendwisepro.common.entity.Budget;

import java.util.List;

public interface BudgetService {
    List<Budget> getWeeklyBudgets(String token);
    List<Budget> getMonthlyBudgets(String token);
    Budget saveBudget(Budget budget, String token);
}
