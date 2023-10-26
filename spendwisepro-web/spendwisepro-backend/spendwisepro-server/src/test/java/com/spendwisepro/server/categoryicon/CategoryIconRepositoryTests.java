package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class CategoryIconRepositoryTests {

    @Autowired
    private CategoryIconRepository categoryIconRepository;


    @Test
    @Disabled
    public void testCreateCategoryIcon() {
        CategoryIcon icon = new CategoryIcon("house-icon.png");

        CategoryIcon savedIcon = categoryIconRepository.save(icon);

        assertThat(savedIcon).isNotNull();
        assertThat(savedIcon.getId()).isGreaterThan(0);
    }

    @Test
    @Disabled
    public void testFindAllCategoryIcons() {
        Iterable<CategoryIcon> icons = categoryIconRepository.findAll();
        icons.forEach(System.out::println);

        assertThat(icons).isNotEmpty();
    }

    @Test
    @Disabled
    public void testUpdateCategoryIcon() {
        String newIcon = "money-icon.png";
        CategoryIcon moneyIcon = categoryIconRepository.findById(2L).get();
        moneyIcon.setImage(newIcon);

        CategoryIcon savedIcon = categoryIconRepository.save(moneyIcon);

        assertThat(savedIcon.getImage()).isEqualTo(newIcon);
    }

    @Test
    @Disabled
    public void testDeleteCategoryIcon() {
        Long iconId = 2L;
        categoryIconRepository.deleteById(iconId);

        Optional<CategoryIcon> result = categoryIconRepository.findById(iconId);

        assertThat(result).isEmpty();
    }
}
