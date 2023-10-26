package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.exception.CategoryIconNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryIconServiceImpl implements CategoryIconService{

    private final CategoryIconRepository categoryIconRepository;

    @Override
    public List<CategoryIcon> getAllCategoryIcons() {
        return categoryIconRepository.findAll();
    }

    @Override
    public CategoryIcon saveCategoryIcon(CategoryIcon categoryIcon) {
        return categoryIconRepository.save(categoryIcon);
    }

    @Override
    public void deleteCategoryIcon(Long id) throws CategoryIconNotFoundException {
        Long countById = categoryIconRepository.countById(id);

        if (countById == null || countById == 0) {
            throw new CategoryIconNotFoundException("Could not find any icon with id " + id);
        }

        categoryIconRepository.deleteById(id);
    }
}
