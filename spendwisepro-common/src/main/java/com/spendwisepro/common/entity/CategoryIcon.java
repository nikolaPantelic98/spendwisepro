package com.spendwisepro.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spendwisepro.common.Constants;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * The CategoryIcon class represents an icon that can be associated with a category.
 * It contains information about the icon image and the categories that use it.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(
        name = "category_icons",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "image")
        }
)
public class CategoryIcon {

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
    private Set<Category> categories = new HashSet<>();


    public CategoryIcon(String image) {
        this.image = image;
    }

    @Transient
    public String getIconPath() {
        return Constants.S3_BASE_URI + "/category-icons/" + this.id + "/" + this.image;
    }
}
