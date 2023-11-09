package com.spendwisepro.common.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        name = "records"
)
public class Record {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            nullable = false
    )
    private Float amount;

    @Enumerated(
            EnumType.STRING
    )
    private PaymentType paymentType;

    @Enumerated(
            EnumType.STRING
    )
    private TransactionType transactionType;

    @Column(
            name = "date_and_time"
    )
    private Date dateAndTime;

    @Column(
            nullable = false
    )
    private String note;

    @ManyToOne
    @JoinColumn(
            name = "category_id"
    )
    private Category category;

    @ManyToOne
    @JoinColumn(
            name = "credit_card_id"
    )
    private CreditCard creditCard;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;


    @PrePersist
    @PreUpdate
    public void checkCreditCardNotNullIfPaymentTypeIsCreditCard() {
        if (PaymentType.CREDIT_CARD.equals(paymentType) && creditCard == null) {
            throw new IllegalStateException("CreditCard cannot be null when PaymentType is CREDIT_CARD");
        }
    }
}
