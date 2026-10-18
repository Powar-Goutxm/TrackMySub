package com.trackmysub.dto;

/**
 * DTO for unread notification count response.
 */
public record UnreadCountResponse(long count, long unreadCount) {
    public UnreadCountResponse(long count) {
        this(count, count);
    }
}
