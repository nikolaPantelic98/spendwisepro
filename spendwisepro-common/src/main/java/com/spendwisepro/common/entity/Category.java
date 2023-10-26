package com.spendwisepro.common.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(
            name = "parent_id"
    )
    private Category parent;

    @OneToMany(mappedBy = "parent")
    @ToString.Exclude
    @OrderBy("name asc")
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
