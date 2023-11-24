package com.spendwisepro.client.security.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The LoginRequest class is a Java class that represents a login request.
 * It is used to store the username and password entered by a user for authentication purposes.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
