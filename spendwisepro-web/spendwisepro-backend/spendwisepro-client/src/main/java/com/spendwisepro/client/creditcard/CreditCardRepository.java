package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    Long countById(Long id);
}
