package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryRestController {

    private final CategoryServiceImpl categoryService;


    @PostMapping("/save")
    public ResponseEntity<String> saveCategory(@RequestBody Category category, @RequestHeader("Authorization") String token) {
        categoryService.saveCategory(category, token);
        return ResponseEntity.ok("Category saved successfully.");
    }

    @GetMapping("/all_root")
    public List<Category> getAllRootCategories(@RequestHeader("Authorization") String token) {
        return categoryService.getAllRootCategories(token);
    }
    
    @GetMapping("/{categoryId}/all_subcategories")
    public List<Category> getAllSubCategoriesOfRootCategory(@PathVariable Long categoryId, @RequestHeader("Authorization") String token) {
        return categoryService.getAllSubCategoriesOfRootCategory(categoryId, token);
    }
}
