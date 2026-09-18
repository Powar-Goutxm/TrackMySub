package com.trackmysub.dto;

/**
 * DTO for authentication response containing tokens.
 */
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType
) {
    public AuthResponse(String accessToken, String refreshToken) {
        this(accessToken, refreshToken, "Bearer");
    }
}
