package com.trackmysub.dto;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for user profile response.
 */
public record UserProfileResponse(
    UUID id, 
    String email, 
    String name, 
    LocalDateTime createdAt
) {}
