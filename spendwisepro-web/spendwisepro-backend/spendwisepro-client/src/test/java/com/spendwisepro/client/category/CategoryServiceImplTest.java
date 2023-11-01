package com.spendwisepro.client.category;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.entity.User;
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

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setUsername("testUser");

        category = new Category();
        category.setName("testCategory");
        category.setUser(user);
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenValidCategoryAndTokenThenCategorySaved() {
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        categoryService.saveCategory(category, "token");

        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenUserNotFoundThenThrowException() {
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> categoryService.saveCategory(category, "token"));
    }

    // saveCategory
    @Test
    public void testSaveCategoryWhenParentCategoryNotFoundThenThrowException() {
        Category parentCategory = new Category();
        parentCategory.setId(1L);
        category.setParent(parentCategory);

        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> categoryService.saveCategory(category, "token"));
    }

    // getAllRootCategories
    @Test
    public void testReturnsListOfRootCategoriesForValidUser() {
        // Arrange
        String token = "valid_token";
        String username = "valid_username";
        Long userId = 1L;
        User user = new User(userId, username, "valid_email", "valid_password", new Date());
        Category category1 = new Category("Category 1", "color1", user, null);
        Category category2 = new Category("Category 2", "color2", user, null);
        List<Category> expectedCategories = Arrays.asList(category1, category2);

        JwtService jwtServiceMock = mock(JwtService.class);
        UserRepository userRepositoryMock = mock(UserRepository.class);
        CategoryRepository categoryRepositoryMock = mock(CategoryRepository.class);

        when(jwtServiceMock.extractUsernameForAuthentication(token)).thenReturn(username);
        when(userRepositoryMock.findByUsername(username)).thenReturn(Optional.of(user));
        when(categoryRepositoryMock.findRootCategories(userId, Sort.by("name"))).thenReturn(expectedCategories);

        CategoryServiceImpl categoryService = new CategoryServiceImpl(categoryRepositoryMock, userRepositoryMock, jwtServiceMock);

        // Act
        List<Category> actualCategories = categoryService.getAllRootCategories(token);

        // Assert
        assertEquals(expectedCategories, actualCategories);
        verify(jwtServiceMock).extractUsernameForAuthentication(token);
        verify(userRepositoryMock).findByUsername(username);
        verify(categoryRepositoryMock).findRootCategories(userId, Sort.by("name"));
    }

    // getAllSubCategoriesOfRootCategory
    @Test
    public void shouldReturnListOfSubcategoriesForValidCategoryIdAndToken() {
        // Arrange
        Long categoryId = 1L;
        String token = "valid_token";
        User user = User.builder().id(1L).build();
        Category.builder().id(categoryId).user(user).build();
        List<Category> subCategories = Arrays.asList(
                Category.builder().id(2L).name("Subcategory 1").build(),
                Category.builder().id(3L).name("Subcategory 2").build()
        );

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(categoryRepository.findSubCategoriesOfRootCategory(categoryId, user.getId(), Sort.by("name"))).thenReturn(subCategories);

        // Act
        List<Category> result = categoryService.getAllSubCategoriesOfRootCategory(categoryId, token);

        // Assert
        assertEquals(subCategories, result);
        verify(jwtService).extractUsernameForAuthentication(token);
        verify(userRepository).findByUsername("username");
        verify(categoryRepository).findSubCategoriesOfRootCategory(categoryId, user.getId(), Sort.by("name"));
    }

    // getAllSubCategoriesOfRootCategory
    @Test
    public void shouldReturnEmptyListForNoSubcategories() {
        // Arrange
        Long categoryId = 1L;
        String token = "valid_token";
        User user = User.builder().id(1L).build();
        Category.builder().id(categoryId).user(user).build();

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(categoryRepository.findSubCategoriesOfRootCategory(categoryId, user.getId(), Sort.by("name"))).thenReturn(Collections.emptyList());

        // Act
        List<Category> result = categoryService.getAllSubCategoriesOfRootCategory(categoryId, token);

        // Assert
        assertTrue(result.isEmpty());
        verify(jwtService).extractUsernameForAuthentication(token);
        verify(userRepository).findByUsername("username");
        verify(categoryRepository).findSubCategoriesOfRootCategory(categoryId, user.getId(), Sort.by("name"));
    }

    // getAllCategories
    @Test
    public void testReturnsListOfAllCategoriesForValidUserWithAtLeastOneCategory() {
        // Mock dependencies
        JwtService jwtService = mock(JwtService.class);
        UserRepository userRepository = mock(UserRepository.class);
        CategoryRepository categoryRepository = mock(CategoryRepository.class);

        // Create test data
        String token = "valid_token";
        String username = "valid_username";
        User user = new User();
        user.setId(1L);
        user.setUsername(username);
        List<Category> categories = new ArrayList<>();
        categories.add(new Category("Category 1", "Color 1", user, null));
        categories.add(new Category("Category 2", "Color 2", user, null));

        // Set up mock behavior
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(categoryRepository.findAllCategories(user.getId(), Sort.by("name"))).thenReturn(categories);

        // Create instance of CategoryServiceImpl
        CategoryServiceImpl categoryService = new CategoryServiceImpl(categoryRepository, userRepository, jwtService);

        // Call the method under test
        List<Category> result = categoryService.getAllCategories(token);

        // Assert the result
        assertEquals(categories, result);
    }

    // getAllCategories
    @Test
    public void testReturnsEmptyListForValidUserWithNoCategories() {
        // Mock dependencies
        JwtService jwtService = mock(JwtService.class);
        UserRepository userRepository = mock(UserRepository.class);
        CategoryRepository categoryRepository = mock(CategoryRepository.class);

        // Create test data
        String token = "valid_token";
        String username = "valid_username";
        User user = new User();
        user.setId(1L);
        user.setUsername(username);
        List<Category> categories = new ArrayList<>();

        // Set up mock behavior
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(categoryRepository.findAllCategories(user.getId(), Sort.by("name"))).thenReturn(categories);

        // Create instance of CategoryServiceImpl
        CategoryServiceImpl categoryService = new CategoryServiceImpl(categoryRepository, userRepository, jwtService);

        // Call the method under test
        List<Category> result = categoryService.getAllCategories(token);

        // Assert the result
        assertTrue(result.isEmpty());
    }

    // getAllCategories
    @Test
    public void testThrowsUsernameNotFoundExceptionIfUserNotFound() {
        // Mock dependencies
        JwtService jwtService = mock(JwtService.class);
        UserRepository userRepository = mock(UserRepository.class);
        CategoryRepository categoryRepository = mock(CategoryRepository.class);

        // Create test data
        String token = "valid_token";
        String username = "valid_username";

        // Set up mock behavior
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // Create instance of CategoryServiceImpl
        CategoryServiceImpl categoryService = new CategoryServiceImpl(categoryRepository, userRepository, jwtService);

        // Call the method under test and assert the exception
        assertThrows(UsernameNotFoundException.class, () -> categoryService.getAllCategories(token));
    }

    // getCategoryById
    @Test
    public void testReturnsCategoryWhenGivenValidCategoryIdAndToken() {
        // Arrange
        Long categoryId = 1L;
        String token = "validToken";
        User user = new User();
        user.setId(1L);
        Category category = new Category();
        category.setId(categoryId);
        category.setUser(user);
        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(categoryRepository.findCategoryById(categoryId, user.getId())).thenReturn(category);

        // Act
        Category result = categoryService.getCategoryById(categoryId, token);

        // Assert
        assertNotNull(result);
        assertEquals(categoryId, result.getId());
    }

    // updateCategory
    @Test
    public void testUpdatesExistingCategoryWithValidInput() {
        // Arrange
        Long categoryId = 1L;
        Category category = new Category("New Name", "New Color", null, null);
        String token = "valid_token";

        User authenticatedUser = new User();
        authenticatedUser.setId(1L);

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Old Name");
        existingCategory.setColor("Old Color");

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(authenticatedUser));
        when(categoryRepository.findCategoryById(categoryId, authenticatedUser.getId())).thenReturn(existingCategory);

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
        Long categoryId = 1L;
        Category category = new Category();
        category.setParent(new Category());
        category.getParent().setId(2L);
        String token = "valid_token";

        User authenticatedUser = new User();
        authenticatedUser.setId(1L);

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Old Name");
        existingCategory.setColor("Old Color");

        Category parentCategory = new Category();
        parentCategory.setId(2L);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(authenticatedUser));
        when(categoryRepository.findCategoryById(categoryId, authenticatedUser.getId())).thenReturn(existingCategory);
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(parentCategory));

        // Act
        categoryService.updateCategory(categoryId, category, token);

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
        String token = "valid_token";

        String username = "test_user";
        User user = new User();
        user.setUsername(username);
        Optional<User> userOptional = Optional.of(user);

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Existing Category");
        existingCategory.setColor("Red");

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(userOptional);
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
        Long categoryId = 1L;
        Category category = new Category();
        String token = "valid_token";

        User authenticatedUser = new User();
        authenticatedUser.setId(1L);

        when(jwtService.extractUsernameForAuthentication(token)).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(authenticatedUser));
        when(categoryRepository.findCategoryById(2L, authenticatedUser.getId())).thenReturn(null);

        // Act & Assert
        assertThrows(Exception.class, () -> {
            categoryService.updateCategory(categoryId, category, token);
        });
    }
}