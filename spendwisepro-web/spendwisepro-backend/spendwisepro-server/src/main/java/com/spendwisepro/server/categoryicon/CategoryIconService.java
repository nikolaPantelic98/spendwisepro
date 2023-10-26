package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.exception.CategoryIconNotFoundException;

import java.util.List;

public interface CategoryIconService {

    List<CategoryIcon> getAllCategoryIcons();
    CategoryIcon saveCategoryIcon(CategoryIcon categoryIcon);
    void deleteCategoryIcon(Long id) throws CategoryIconNotFoundException;
}
