package com.spendwisepro.common.entity;

import com.spendwisepro.common.Constants;
import jakarta.persistence.*;
import lombok.*;

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


    public CategoryIcon(String image) {
        this.image = image;
    }

    @Transient
    public String getIconPath() {
        return Constants.S3_BASE_URI + "/category-icons/" + this.id + "/" + this.image;
    }
}
