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
        name = "admins"
)
public class Admin {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long adminId;
    @Column(
            name = "email_address",
            length = 128,
            nullable = false,
            unique = true
    )
    private String emailAddress;
    @Column(
            name = "password",
            length = 64,
            nullable = false
    )
    private String password;
    @Column(
            name = "username",
            length = 45,
            nullable = false,
            unique = true
    )
    private String username;
    @Column(
            name = "enabled"
    )
    private boolean enabled;
}
