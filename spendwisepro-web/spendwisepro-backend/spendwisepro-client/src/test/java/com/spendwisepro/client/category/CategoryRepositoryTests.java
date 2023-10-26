package com.spendwisepro.client.category;

import com.spendwisepro.client.categoryicon.CategoryIconRepository;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.Category;
import com.spendwisepro.common.entity.CategoryIcon;
import com.spendwisepro.common.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class CategoryRepositoryTests {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryIconRepository categoryIconRepository;


    @Test
    public void testCreateRootCategory() {
        User user = userRepository.findById(2L).get();
        CategoryIcon icon = categoryIconRepository.findById(21L).get();

        Category category = new Category("Computer", "blue", user, icon);
        Category savedCategory = categoryRepository.save(category);

        assertThat(savedCategory.getId()).isGreaterThan(0);
    }

    @Test
    public void testListAllCategories() {
        Iterable<Category> listAdmins = categoryRepository.findAll();
        listAdmins.forEach(System.out::println);
    }
}
