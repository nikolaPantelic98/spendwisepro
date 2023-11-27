package com.spendwisepro.client.budget;

import com.spendwisepro.common.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

}
