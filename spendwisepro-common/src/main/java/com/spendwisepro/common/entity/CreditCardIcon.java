package com.spendwisepro.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spendwisepro.common.Constants;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * The CreditCardIcon class represents a credit card icon entity in the application.
 * It contains information about the icon image and its associated credit cards.
 * The class also provides a method to generate the icon's path.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(
        name = "credit_card_icons",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "image")
        }
)
public class CreditCardIcon {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            name = "image",
            nullable = false
    )
    private String image;

    @OneToMany(mappedBy = "icon", orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private Set<CreditCard> creditCards = new HashSet<>();


    public CreditCardIcon(String image) {
        this.image = image;
    }

    @Transient
    public String getIconPath() {
        return Constants.S3_BASE_URI + "/credit-card-icons/" + this.id + "/" + this.image;
    }
}
