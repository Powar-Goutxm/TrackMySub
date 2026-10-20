package com.trackmysub.controller;

import com.trackmysub.dto.NotificationResponse;
import com.trackmysub.dto.UnreadCountResponse;
import com.trackmysub.service.AuthenticatedUserService;
import com.trackmysub.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final AuthenticatedUserService authenticatedUserService;
    private final com.trackmysub.scheduler.AlertScheduler alertScheduler;

    public NotificationController(NotificationService notificationService,
                                  AuthenticatedUserService authenticatedUserService,
                                  com.trackmysub.scheduler.AlertScheduler alertScheduler) {
        this.notificationService = notificationService;
        this.authenticatedUserService = authenticatedUserService;
        this.alertScheduler = alertScheduler;
    }

    @GetMapping
    @Operation(summary = "List user's notifications")
    public ResponseEntity<List<NotificationResponse>> getNotifications() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @GetMapping({"/unread", "/unread-count"})
    @Operation(summary = "Get unread notification count")
    public ResponseEntity<UnreadCountResponse> getUnreadCount() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUnreadCount(userId));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark a notification as read")
    public ResponseEntity<NotificationResponse> markAsRead(@PathVariable UUID id) {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(notificationService.markAsRead(userId, id));
    }

    @PostMapping("/mark-all-read")
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<java.util.Map<String, Boolean>> markAllRead() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok(java.util.Map.of("success", true));
    }

    @PostMapping("/check-alerts")
    @Operation(summary = "Trigger alert sweep")
    public ResponseEntity<com.trackmysub.scheduler.AlertScheduler.AlertSweepResult> checkAlerts() {
        return ResponseEntity.ok(alertScheduler.checkAndSendAlerts());
    }
}
