package com.spendwisepro.client.category;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.entity.User;
import com.spendwisepro.common.exception.CategoryNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private User user;
    private Category category;
    private String token;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("validUsername");

        category = new Category();
        category.setId(1L);
        category.setName("validCategory");
        category.setUser(user);

        token = "validToken";
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenValidCategoryAndTokenThenCategorySaved() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        // Act
        categoryService.saveCategory(category, token);

        // Assert
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenUserNotFoundThenThrowException() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        // Act and assert
        assertThrows(UsernameNotFoundException.class, () -> categoryService.saveCategory(category, token));
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenParentCategoryNotFoundThenThrowException() {
        // Arrange
        Category parentCategory = new Category();
        parentCategory.setId(1L);
        category.setParent(parentCategory);

        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act and assert
        assertThrows(IllegalArgumentException.class, () -> categoryService.saveCategory(category, token));
    }

    // getAllRootCategories
    @Test
    public void testReturnsListOfRootCategoriesForValidUser() {
        // Arrange
        Category category1 = new Category("Category 1", "color1", user, null);
        Category category2 = new Category("Category 2", "color2", user, null);
        List<Category> expectedCategories = Arrays.asList(category1, category2);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findRootCategories(user.getId(), Sort.by("name"))).thenReturn(expectedCategories);

        // Act
        List<Category> actualCategories = categoryService.getAllRootCategories(token);

        // Assert
        assertEquals(expectedCategories, actualCategories);
        verify(jwtService).extractUsernameForAuthentication(token);
        verify(userRepository).findByUsername(user.getUsername());
        verify(categoryRepository).findRootCategories(user.getId(), Sort.by("name"));
    }

    // getAllSubCategoriesOfRootCategory
    @Test
    public void testReturnListOfSubcategoriesForValidCategoryIdAndToken() {
        // Arrange
        List<Category> subCategories = Arrays.asList(
                Category.builder().id(2L).name("Subcategory 1").build(),
                Category.builder().id(3L).name("Subcategory 2").build()
        );

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findSubCategoriesOfRootCategory(category.getId(), user.getId(), Sort.by("name"))).thenReturn(subCategories);

        // Act
        List<Category> result = categoryService.getAllSubCategoriesOfRootCategory(category.getId(), token);

        // Assert
        assertEquals(subCategories, result);
        verify(jwtService).extractUsernameForAuthentication(token);
        verify(userRepository).findByUsername(user.getUsername());
        verify(categoryRepository).findSubCategoriesOfRootCategory(category.getId(), user.getId(), Sort.by("name"));
    }

    // getAllSubCategoriesOfRootCategory
    @Test
    public void testReturnEmptyListForNoSubcategories() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findSubCategoriesOfRootCategory(category.getId(), user.getId(), Sort.by("name"))).thenReturn(Collections.emptyList());

        // Act
        List<Category> result = categoryService.getAllSubCategoriesOfRootCategory(category.getId(), token);

        // Assert
        assertTrue(result.isEmpty());
        verify(jwtService).extractUsernameForAuthentication(token);
        verify(userRepository).findByUsername(user.getUsername());
        verify(categoryRepository).findSubCategoriesOfRootCategory(category.getId(), user.getId(), Sort.by("name"));
    }

    // getAllCategories
    @Test
    public void testReturnsListOfAllCategoriesForValidUserWithAtLeastOneCategory() {
        // Arrange
        List<Category> categories = new ArrayList<>();
        categories.add(new Category("Category 1", "Color 1", user, null));
        categories.add(new Category("Category 2", "Color 2", user, null));

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findAllCategories(user.getId(), Sort.by("name"))).thenReturn(categories);

        // Act
        List<Category> result = categoryService.getAllCategories(token);

        // Assert
        assertEquals(categories, result);
    }

    // getAllCategories
    @Test
    public void testReturnsEmptyListForValidUserWithNoCategories() {
        // Arrange
        List<Category> categories = new ArrayList<>();

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findAllCategories(user.getId(), Sort.by("name"))).thenReturn(categories);

        // Act
        List<Category> result = categoryService.getAllCategories(token);

        // Assert
        assertTrue(result.isEmpty());
    }

    // getAllCategories
    @Test
    public void testThrowsUsernameNotFoundExceptionIfUserNotFound() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        // Act and assert
        assertThrows(UsernameNotFoundException.class, () -> categoryService.getAllCategories(token));
    }

    // getCategoryById
    @Test
    public void testReturnsCategoryWhenGivenValidCategoryIdAndToken() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(category.getId(), user.getId())).thenReturn(category);

        // Act
        Category result = categoryService.getCategoryById(category.getId(), token);

        // Assert
        assertNotNull(result);
        assertEquals(category.getId(), result.getId());
    }

    // updateCategory
    @Test
    public void testUpdatesExistingCategoryWithValidInput() {
        // Arrange
        Long categoryId = 1L;
        Category category = new Category("New Name", "New Color", null, null);

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Old Name");
        existingCategory.setColor("Old Color");

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(categoryId, user.getId())).thenReturn(existingCategory);

        // Act
        categoryService.updateCategory(categoryId, category, token);

        // Assert
        assertEquals("New Name", existingCategory.getName());
        assertEquals("New Color", existingCategory.getColor());
    }

    // updateCategory
    @Test
    public void testUpdatesExistingCategoryWithValidParentCategory() {
        // Arrange
        category.setParent(new Category());
        category.getParent().setId(2L);

        Category existingCategory = new Category();
        existingCategory.setId(category.getId());
        existingCategory.setName("Old Name");
        existingCategory.setColor("Old Color");

        Category parentCategory = new Category();
        parentCategory.setId(2L);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(category.getId(), user.getId())).thenReturn(existingCategory);
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(parentCategory));

        // Act
        categoryService.updateCategory(category.getId(), category, token);

        // Assert
        assertEquals(parentCategory, existingCategory.getParent());
    }

    // updateCategory
    @Test
    public void testUpdatesExistingCategoryWithValidIcon() {
        // Arrange
        Long categoryId = 1L;
        Category category = new Category();
        category.setName("Updated Category");
        category.setColor("Blue");
        CategoryIcon icon = new CategoryIcon();
        icon.setId(1L);
        category.setIcon(icon);

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Existing Category");
        existingCategory.setColor("Red");

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(categoryId, user.getId())).thenReturn(existingCategory);

        // Act
        categoryService.updateCategory(categoryId, category, token);

        // Assert
        assertEquals(category.getName(), existingCategory.getName());
        assertEquals(category.getColor(), existingCategory.getColor());
        assertEquals(category.getIcon(), existingCategory.getIcon());
    }

    // updateCategory
    @Test
    public void testThrowsExceptionWhenCategoryToUpdateNotFound() {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(2L, user.getId())).thenReturn(null);

        // Act and assert
        assertThrows(Exception.class, () -> categoryService.updateCategory(category.getId(), category, token));
    }

    // deleteCategory
    @Test
    public void testDeletesCategorySuccessfully() throws CategoryNotFoundException {
        // Arrange
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(user.getUsername());
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(categoryRepository.countById(category.getId())).thenReturn(1L);

        // Act
        categoryService.deleteCategory(category.getId(), token);

        // Assert
        verify(jwtService, times(1)).extractUsernameForAuthentication(token);
        verify(userRepository, times(1)).findByUsername(user.getUsername());
        verify(categoryRepository, times(1)).countById(category.getId());
        verify(categoryRepository, times(1)).deleteCategoryById(category.getId(), user.getId());
    }

    // deleteCategory
    @Test
    public void testThrowsCategoryNotFoundException() {
        // Arrange
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.countById(anyLong())).thenReturn(0L);

        // Act and Assert
        assertThrows(Exception.class, () -> categoryService.deleteCategory(category.getId(), token));
    }
}