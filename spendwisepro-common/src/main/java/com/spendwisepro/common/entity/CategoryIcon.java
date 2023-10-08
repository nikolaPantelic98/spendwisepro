package com.spendwisepro.common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
        name = "category_icons",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "icon")
        }
)
public class CategoryIcon {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            name = "icon",
            nullable = false
    )
    private String icon;
}
