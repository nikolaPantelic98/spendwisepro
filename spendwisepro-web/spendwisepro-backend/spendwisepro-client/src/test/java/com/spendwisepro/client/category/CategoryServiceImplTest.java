package com.spendwisepro.client.category;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Test
    public void testSaveCategoryWhenValidCategoryAndTokenThenCategorySaved() {
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        categoryService.saveCategory(category, "token");

        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    public void testSaveCategoryWhenUserNotFoundThenThrowException() {
        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> categoryService.saveCategory(category, "token"));
    }

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


}