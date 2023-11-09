package com.spendwisepro.client.creditcard;

import com.spendwisepro.common.entity.CreditCard;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    Long countById(Long id);

    @Query("SELECT c FROM CreditCard c WHERE c.user.id = ?1")
    List<CreditCard> findAllCreditCards(Long userId, Sort sort);

    @Query("SELECT c FROM CreditCard c WHERE c.id = ?1 AND c.user.id = ?2")
    CreditCard findCreditCardById(Long creditCardId, Long userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CreditCard c WHERE c.id = ?1 AND c.user.id = ?2")
    void deleteCreditCardById(Long creditCardId, Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE CreditCard c SET c.amount = c.amount + ?1 WHERE c.id = ?2 AND c.user.id = ?3")
    void increaseAmountOfCreditCard(Float decreaseAmount, Long creditCardId, Long userId);
}
