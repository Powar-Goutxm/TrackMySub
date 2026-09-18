package com.trackmysub.controller;

import com.trackmysub.dto.SubscriptionRequest;
import com.trackmysub.dto.SubscriptionResponse;
import com.trackmysub.service.AuthenticatedUserService;
import com.trackmysub.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/subscriptions")
@Tag(name = "Subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final AuthenticatedUserService authenticatedUserService;

    public SubscriptionController(SubscriptionService subscriptionService, AuthenticatedUserService authenticatedUserService) {
        this.subscriptionService = subscriptionService;
        this.authenticatedUserService = authenticatedUserService;
    }

    @GetMapping
    @Operation(summary = "List user's subscriptions")
    public ResponseEntity<List<SubscriptionResponse>> getSubscriptions() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(subscriptionService.getUserSubscriptions(userId));
    }

    @PostMapping
    @Operation(summary = "Create a new subscription")
    public ResponseEntity<SubscriptionResponse> createSubscription(@Valid @RequestBody SubscriptionRequest request) {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subscriptionService.createSubscription(userId, request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single subscription")
    public ResponseEntity<SubscriptionResponse> getSubscription(@PathVariable UUID id) {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(subscriptionService.getSubscription(userId, id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing subscription")
    public ResponseEntity<SubscriptionResponse> updateSubscription(@PathVariable UUID id, @Valid @RequestBody SubscriptionRequest request) {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(subscriptionService.updateSubscription(userId, id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a subscription")
    public ResponseEntity<Void> deleteSubscription(@PathVariable UUID id) {
        UUID userId = authenticatedUserService.getCurrentUserId();
        subscriptionService.deleteSubscription(userId, id);
        return ResponseEntity.noContent().build();
    }
}
