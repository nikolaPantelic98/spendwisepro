package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.exception.CategoryNotFoundException;

import java.util.List;

public interface CategoryService {

    Category saveCategory(Category category, String token);
    List<Category> getAllRootCategories(String token);
    List<Category> getAllSubCategoriesOfRootCategory(Long categoryId, String token);
    List<Category> getAllCategories(String token);
    Category getCategoryById(Long categoryId, String token);
    void updateCategory(Long categoryId, Category category, String token);
    void deleteCategory(Long categoryId, String token) throws CategoryNotFoundException;
}
