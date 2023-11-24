package com.spendwisepro.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * The CreditCard class represents a credit card entity in the application.
 * It contains information such as the amount, type, bank, and note associated with a credit card.
 * It also has relationships with other entities such as {@link CreditCardIcon}, {@link User}, and {@link Record}.
 */
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
    private Float amount;

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

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;

    @OneToMany(mappedBy = "creditCard", orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private Set<Record> records = new HashSet<>();


    public CreditCard(float amount, String type, String bank, String note) {
        this.amount = amount;
        this.type = type;
        this.bank = bank;
        this.note = note;
    }
}