package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    Long countById(Long id);

    @Query("SELECT c FROM CreditCard c WHERE c.user.id = ?1")
    List<CreditCard> findAllCreditCards(Long userId, Sort sort);

    @Query("SELECT c FROM CreditCard c WHERE c.id = ?1 AND c.user.id = ?2")
    CreditCard findCreditCardById(Long creditCardId, Long userId);
}
