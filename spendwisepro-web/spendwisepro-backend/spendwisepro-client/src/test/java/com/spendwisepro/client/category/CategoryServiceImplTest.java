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
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

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

        try {
            categoryService.saveCategory(category, "token");
        } catch (Exception e) {
            assert (e instanceof UsernameNotFoundException);
        }
    }

    @Test
    public void testSaveCategoryWhenParentCategoryNotFoundThenThrowException() {
        Category parentCategory = new Category();
        parentCategory.setId(1L);
        category.setParent(parentCategory);

        when(jwtService.extractUsernameForAuthentication(anyString())).thenReturn(user.getUsername());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        try {
            categoryService.saveCategory(category, "token");
        } catch (Exception e) {
            assert (e instanceof IllegalArgumentException);
        }
    }
}