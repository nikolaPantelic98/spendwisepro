package com.spendwisepro.common.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        name = "budgets"
)
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false
    )
    private Float amount;

    @Column(
            length = 128,
            nullable = false
    )
    private String name;

    @Enumerated(
            EnumType.STRING
    )
    private BudgetPeriod period;

    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "budgets_categories",
            joinColumns = @JoinColumn(
                    name = "budget_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "category_id"
            )
    )
    private Set<Category> categories = new LinkedHashSet<>();

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;
}
