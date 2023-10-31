package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;

import java.util.List;

public interface CategoryService {

    Category saveCategory(Category category, String token);
    List<Category> getAllRootCategories(String token);
    List<Category> getAllSubCategoriesOfRootCategory(Long categoryId, String token);
    List<Category> getAllCategories(String token);
}
