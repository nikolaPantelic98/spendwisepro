package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.parent.id is NULL AND c.user.id = ?1")
    List<Category> findRootCategories(Long userId, Sort sort);

    @Query("SELECT c FROM Category c WHERE c.parent.id = ?1 AND c.user.id = ?2")
    List<Category> findSubCategoriesOfRootCategory(Long categoryId, Long userId, Sort sort);
}
