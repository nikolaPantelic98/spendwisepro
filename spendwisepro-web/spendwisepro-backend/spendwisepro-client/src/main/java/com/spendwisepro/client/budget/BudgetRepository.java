package com.spendwisepro.client.budget;

import com.spendwisepro.common.entity.Budget;
import com.spendwisepro.common.entity.BudgetPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    @Query("SELECT b FROM Budget b WHERE b.user.id = ?1 AND b.period = ?2")
    List<Budget> findBudgetsByPeriod(Long userId, BudgetPeriod period);

    @Query("SELECT b FROM Budget b WHERE b.id = ?1 AND b.user.id = ?2")
    Budget findBudgetById(Long budgetId, Long userId);

    Long countById(Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Budget b WHERE b.id = ?1 AND b.user.id = ?2")
    void deleteBudgetById(Long budgetId, Long userId);
}
