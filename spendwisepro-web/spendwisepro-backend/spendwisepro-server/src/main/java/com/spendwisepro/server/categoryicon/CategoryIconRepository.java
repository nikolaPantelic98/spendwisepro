package com.spendwisepro.server.categoryicon;

import com.spendwisepro.common.entity.CategoryIcon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryIconRepository extends JpaRepository<CategoryIcon, Long> {

    Long countById(Long id);
}
