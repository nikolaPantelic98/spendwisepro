package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;

public interface CategoryService {

    Category saveCategory(Category category, String token);
}
