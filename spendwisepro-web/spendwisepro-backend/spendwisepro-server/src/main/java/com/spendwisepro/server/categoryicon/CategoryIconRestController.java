package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/icons")
public class CategoryIconRestController {

    private final CategoryIconServiceImpl categoryIconService;


    @GetMapping("/all")
    public List<CategoryIcon> getAllCategoryIcons() {
        return categoryIconService.getAllCategoryIcons();
    }
}
