package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
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
}
