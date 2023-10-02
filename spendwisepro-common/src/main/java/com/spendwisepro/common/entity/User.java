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
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            length = 20,
            nullable = false
    )
    private String username;

    @Column(
            length = 128,
            nullable = false
    )
    private String email;

    @Column(
            length = 120,
            nullable = false
    )
    private String password;

    @Column(
            name = "date_created",
            nullable = false
    )
    private Date dateCreated;
}
