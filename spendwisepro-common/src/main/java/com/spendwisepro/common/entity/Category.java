package com.spendwisepro.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * The Category class represents a category in the application.
 * It is used to categorize records and organize them hierarchically.
 * Each category has a {@code name}, {@code color}, {@code parent category},
 * {@code set of child categories}, {@code icon}, and {@code user}.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        name = "categories"
)
public class Category {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            length = 128,
            nullable = false
    )
    private String name;

    @Column(
            length = 128,
            nullable = false
    )
    private String color;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(
            name = "parent_id"
    )
    private Category parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    @ToString.Exclude
    @OrderBy("name asc")
    @JsonIgnore
    private Set<Category> children = new HashSet<>();

    @ManyToOne
    @JoinColumn(
            name = "icon_id"
    )
    private CategoryIcon icon;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;


    public Category(String name, String color, User user, CategoryIcon icon) {
        this.name = name;
        this.color = color;
        this.user = user;
        this.icon = icon;
    }

    public Category(String name, String color, User user, CategoryIcon icon, Category parent) {
        this.name = name;
        this.color = color;
        this.user = user;
        this.icon = icon;
        this.parent = parent;
    }
}
