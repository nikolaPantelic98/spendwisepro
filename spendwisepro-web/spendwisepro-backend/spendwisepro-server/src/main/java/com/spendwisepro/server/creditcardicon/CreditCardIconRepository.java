package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardIconRepository extends JpaRepository<CreditCardIcon, Long> {

    Long countById(Long id);
}
