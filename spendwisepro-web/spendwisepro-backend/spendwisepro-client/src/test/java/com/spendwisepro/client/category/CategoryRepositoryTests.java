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
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Set;

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
        User user = userRepository.findById(19L).get();
        CategoryIcon icon = categoryIconRepository.findById(6L).get();

        Category category = new Category("Applications", "orange", user, icon);
        Category savedCategory = categoryRepository.save(category);

        assertThat(savedCategory.getId()).isGreaterThan(0);
    }

    @Test
    public void testListAllCategories() {
        Iterable<Category> listAdmins = categoryRepository.findAll();
        listAdmins.forEach(System.out::println);
    }

    @Test
    public void testCreateSubCategory() {
        User user = userRepository.findById(2L).get();
        Category parent = categoryRepository.findById(1L).get();
        CategoryIcon icon = categoryIconRepository.findById(22L).get();

        Category subCategory = new Category("CPU", "red", user, icon, parent);

        Category savedCategory = categoryRepository.save(subCategory);

        assertThat(savedCategory.getId()).isGreaterThan(0);
    }

    @Test
    public void testGetCategory() {
        Category category = categoryRepository.findById(1L).get();
        System.out.println("Root category: " + category.getName());

        Set<Category> children = category.getChildren();
        for (Category subCategory : children) {
            System.out.println("Subcategories: " + subCategory.getName());
        }

        assertThat(children.size()).isGreaterThan(0);
    }

    @Test
    public void testPrintHierarchicalCategories() {
        Iterable<Category> categories = categoryRepository.findAll();

        for (Category category : categories) {
            if (category.getParent() == null) {
                System.out.println(category.getName());

                Set<Category> children = category.getChildren();

                for (Category subCategory : children) {
                    System.out.println("--" + subCategory.getName());
                    printChildren(subCategory, 1);
                }
            }
        }
    }

    private void printChildren(Category parent, int subLevel) {
        int newSubLevel = subLevel + 1;
        Set<Category> children = parent.getChildren();

        for (Category subCategory : children) {
            for (int i = 0; i < newSubLevel; i++) {
                System.out.print("--");
            }

            System.out.println(subCategory.getName());

            printChildren(subCategory, newSubLevel);
        }
    }

    @Test
    public void testFindRootCategories() {
        User user = userRepository.findById(19L).get();

        List<Category> rootCategories = categoryRepository.findRootCategories(user.getId(), Sort.by("name"));
        rootCategories.forEach(System.out::println);

        assertThat(rootCategories).isNotNull();
    }

    @Test
    public void testFindSubCategoriesOfRootCategory() {
        User user = userRepository.findById(2L).get();
        Category category = categoryRepository.findById(1L).get();

        List<Category> rootCategories = categoryRepository.findSubCategoriesOfRootCategory(category.getId(), user.getId(), Sort.by("name"));
        rootCategories.forEach(System.out::println);

        assertThat(rootCategories).isNotNull();
    }
}
