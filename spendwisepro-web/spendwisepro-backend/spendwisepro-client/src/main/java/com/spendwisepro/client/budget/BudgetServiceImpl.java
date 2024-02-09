package com.spendwisepro.client.budget;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Budget;
import com.spendwisepro.common.entity.BudgetPeriod;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    private User getAuthenticatedUser(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        return user.get();
    }

    @Override
    public List<Budget> getWeeklyBudgets(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return budgetRepository.findBudgetsByPeriod(authenticatedUser.getId(), BudgetPeriod.WEEKLY);
    }

    @Override
    public List<Budget> getMonthlyBudgets(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return budgetRepository.findBudgetsByPeriod(authenticatedUser.getId(), BudgetPeriod.MONTHLY);
    }

    @Override
    public Budget saveBudget(Budget budget, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        budget.setUser(authenticatedUser);

        return budgetRepository.save(budget);
    }

    @Override
    public Budget getBudgetById(Long budgetId, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return budgetRepository.findBudgetById(budgetId, authenticatedUser.getId());
    }

    @Override
    public void updateBudget(Long budgetId, Budget budget, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Budget existingBudget = budgetRepository.findBudgetById(budgetId, authenticatedUser.getId());

        if (budget.getAmount() != null) {
            existingBudget.setAmount(budget.getAmount());
        }
        if (budget.getName() != null) {
            existingBudget.setName(budget.getName());
        }
        if (budget.getPeriod() != null) {
            existingBudget.setPeriod(budget.getPeriod());
        }
        if (budget.getCategories() != null) {
            Set<Category> categories = new HashSet<>(budget.getCategories());
            existingBudget.setCategories(categories);
        }

        budgetRepository.save(existingBudget);
    }
}
