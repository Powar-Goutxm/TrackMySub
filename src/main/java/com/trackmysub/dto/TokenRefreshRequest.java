package com.trackmysub.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for token refresh requests.
 */
public record TokenRefreshRequest(
    @NotBlank String refreshToken
) {}
