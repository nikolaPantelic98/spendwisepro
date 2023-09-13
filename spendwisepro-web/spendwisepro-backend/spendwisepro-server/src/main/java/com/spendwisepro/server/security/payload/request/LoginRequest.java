package com.spendwisepro.server.security.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

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
