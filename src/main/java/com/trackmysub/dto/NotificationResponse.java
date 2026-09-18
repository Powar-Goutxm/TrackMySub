package com.trackmysub.dto;

import com.trackmysub.entity.enums.NotificationChannel;
import com.trackmysub.entity.enums.NotificationType;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for notification response.
 */
public record NotificationResponse(
    UUID id, 
    UUID subscriptionId, 
    String serviceName,
    NotificationType type, 
    NotificationChannel channel,
    String title, 
    String message, 
    boolean isRead,
    LocalDateTime sentAt, 
    LocalDateTime createdAt
) {}
