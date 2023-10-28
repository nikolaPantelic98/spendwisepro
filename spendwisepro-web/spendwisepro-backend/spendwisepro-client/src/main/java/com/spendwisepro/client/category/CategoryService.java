package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;

import java.util.List;

public interface CategoryService {

    Category saveCategory(Category category, String token);
    List<Category> getAllRootCategories(String token);
}
