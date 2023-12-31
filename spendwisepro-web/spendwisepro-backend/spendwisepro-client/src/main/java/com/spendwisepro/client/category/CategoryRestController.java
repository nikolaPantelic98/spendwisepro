package com.spendwisepro.client.category;

import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.exception.CategoryNotFoundException;
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

    @GetMapping("/all")
    public List<Category> getAllCategories(@RequestHeader("Authorization") String token) {
        return categoryService.getAllCategories(token);
    }

    @GetMapping("/all_root")
    public List<Category> getAllRootCategories(@RequestHeader("Authorization") String token) {
        return categoryService.getAllRootCategories(token);
    }
    
    @GetMapping("/{categoryId}/all_subcategories")
    public List<Category> getAllSubCategoriesOfRootCategory(@PathVariable Long categoryId, @RequestHeader("Authorization") String token) {
        return categoryService.getAllSubCategoriesOfRootCategory(categoryId, token);
    }

    @GetMapping("/{categoryId}")
    public Category getCategoryById(@PathVariable Long categoryId, @RequestHeader("Authorization") String token) {
        return categoryService.getCategoryById(categoryId, token);
    }

    @PutMapping("/edit/{categoryId}")
    public ResponseEntity<String> updateCategory(@PathVariable Long categoryId, @RequestBody Category category, @RequestHeader("Authorization") String token) {
        categoryService.updateCategory(categoryId, category, token);
        return ResponseEntity.ok("Category updated successfully.");
    }

    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId, @RequestHeader("Authorization") String token) {
        try {
            categoryService.deleteCategory(categoryId, token);
        } catch (CategoryNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Category deleted successfully.");
    }
}
