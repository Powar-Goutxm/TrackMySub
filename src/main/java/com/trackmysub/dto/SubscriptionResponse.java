package com.trackmysub.dto;

import com.trackmysub.entity.enums.BillingCycle;
import com.trackmysub.entity.enums.SubscriptionCategory;
import com.trackmysub.entity.enums.SubscriptionStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for subscription response.
 */
public record SubscriptionResponse(
    UUID id, 
    String serviceName, 
    SubscriptionCategory category,
    BigDecimal cost, 
    BillingCycle billingCycle, 
    SubscriptionStatus status,
    LocalDate nextRenewalDate, 
    LocalDate trialEndDate,
    LocalDateTime createdAt, 
    LocalDateTime updatedAt
) {}
