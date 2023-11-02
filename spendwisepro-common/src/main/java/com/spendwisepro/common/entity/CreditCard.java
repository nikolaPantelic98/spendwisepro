package com.spendwisepro.common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        name = "credit_cards"
)
public class CreditCard {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            nullable = false
    )
    private float amount;

    @Column(
            length = 128,
            nullable = false
    )
    private String type;

    @Column(
            nullable = false
    )
    private String bank;

    @Column(
            length = 256
    )
    private String note;

    @ManyToOne
    @JoinColumn(
            name = "icon_id"
    )
    private CreditCardIcon icon;
}