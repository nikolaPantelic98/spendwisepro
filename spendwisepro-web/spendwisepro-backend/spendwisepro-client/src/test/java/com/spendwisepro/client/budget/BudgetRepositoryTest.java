package com.spendwisepro.client.budget;

import com.spendwisepro.client.category.CategoryRepository;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class BudgetRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BudgetRepository budgetRepository;


    @Test
    public void testCreateBudget() {

        Set<Category> categories = new LinkedHashSet<>();

        Category category1 = categoryRepository.findById(14L).get();
        Category category2 = categoryRepository.findById(15L).get();

        categories.add(category1);
        categories.add(category2);

        User user = userRepository.findById(19L).get();

        Budget budget = new Budget(1L, 20.00F, "Food", BudgetPeriod.WEEKLY, categories, user);

        Budget savedBudget = budgetRepository.save(budget);

        assertThat(savedBudget).isNotNull();
        assertThat(savedBudget.getId()).isGreaterThan(0);
    }

    @Test
    public void testFindAllBudgets() {
        Iterable<Budget> budgets = budgetRepository.findAll();
        budgets.forEach(System.out::println);

        assertThat(budgets).isNotEmpty();
    }

    @Test
    public void testUpdateBudget() {
        String newName = "Updated food";
        Budget budget = budgetRepository.findById(1L).get();
        budget.setName(newName);

        Budget savedBudget = budgetRepository.save(budget);

        assertThat(savedBudget.getName()).isEqualTo(newName);
    }

    @Test
    public void testDeleteBudget() {
        Long budgetId = 1L;
        budgetRepository.deleteById(budgetId);

        Optional<Budget> result = budgetRepository.findById(budgetId);

        assertThat(result).isEmpty();
    }
}
