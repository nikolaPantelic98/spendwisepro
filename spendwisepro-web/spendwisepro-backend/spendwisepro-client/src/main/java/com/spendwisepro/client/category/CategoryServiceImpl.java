package com.spendwisepro.client.category;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.User;
import com.spendwisepro.common.exception.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    private User getAuthenticatedUser(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        return user.get();
    }

    @Override
    public Category saveCategory(Category category, String token) {
        User userToSave = getAuthenticatedUser(token);

        category.setUser(userToSave);

        if (category.getParent() != null) {
            Optional<Category> parent = categoryRepository.findById(category.getParent().getId());
            if (parent.isPresent()) {
                category.setParent(parent.get());
            } else {
                throw new IllegalArgumentException("Parent category with id " + category.getParent().getId() + " not found");
            }
        }

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllRootCategories(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return categoryRepository.findRootCategories(authenticatedUser.getId(), Sort.by("name"));
    }

    @Override
    public List<Category> getAllSubCategoriesOfRootCategory(Long categoryId, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return categoryRepository
                .findSubCategoriesOfRootCategory(categoryId, authenticatedUser.getId(), Sort.by("name"));
    }

    @Override
    public List<Category> getAllCategories(String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return categoryRepository.findAllCategories(authenticatedUser.getId(), Sort.by("name"));
    }

    @Override
    public Category getCategoryById(Long categoryId, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        return categoryRepository.findCategoryById(categoryId, authenticatedUser.getId());
    }

    @Override
    public void updateCategory(Long categoryId, Category category, String token) {
        User authenticatedUser = getAuthenticatedUser(token);

        Category existingCategory = categoryRepository.findCategoryById(categoryId, authenticatedUser.getId());

        if (category.getName() != null) {
            existingCategory.setName(category.getName());
        }
        if (category.getColor() != null) {
            existingCategory.setColor(category.getColor());
        }
        if (category.getIcon() != null) {
            existingCategory.setIcon(category.getIcon());
        }
        if (category.getParent() != null) {
            Optional<Category> parent = categoryRepository.findById(category.getParent().getId());
            if (parent.isPresent()) {
                existingCategory.setParent(parent.get());
            } else {
                throw new IllegalArgumentException("Parent category with id " + category.getParent().getId() + " not found");
            }
        }

        categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long categoryId, String token) throws CategoryNotFoundException {
        User authenticatedUser = getAuthenticatedUser(token);

        Long countById = categoryRepository.countById(categoryId);

        if (countById == null || countById == 0) {
            throw new CategoryNotFoundException("Could not find any category with id " + categoryId);
        }

        categoryRepository.deleteCategoryById(categoryId, authenticatedUser.getId());
    }
}
