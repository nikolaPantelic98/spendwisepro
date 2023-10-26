package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.exception.CategoryIconNotFoundException;
import com.spendwisepro.server.files.AmazonS3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/icons")
public class CategoryIconRestController {

    private final CategoryIconServiceImpl categoryIconService;


    @GetMapping("/all")
    public List<CategoryIcon> getAllCategoryIcons(  ) {
        return categoryIconService.getAllCategoryIcons();
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCategoryIcon(CategoryIcon categoryIcon, @RequestParam("fileImage") MultipartFile multipartFile) throws IOException {
        if (!multipartFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            categoryIcon.setImage(fileName);

            CategoryIcon savedCategoryIcon = categoryIconService.saveCategoryIcon(categoryIcon);
            String uploadDir = "category-icons/" + savedCategoryIcon.getId();

            AmazonS3Util.removeFolder(uploadDir);
            AmazonS3Util.uploadFile(uploadDir, fileName, multipartFile.getInputStream());
        } else {
            categoryIconService.saveCategoryIcon(categoryIcon);
        }

        return ResponseEntity.ok("Category icon saved.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategoryIcon(@PathVariable Long id) {
        try {
            categoryIconService.deleteCategoryIcon(id);
            String categoryIconDir = "category-icons/" + id;
            AmazonS3Util.removeFolder(categoryIconDir);
        } catch (CategoryIconNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Category icon deleted successfully");
    }
}
