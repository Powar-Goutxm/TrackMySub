package com.trackmysub.dto;

import com.trackmysub.entity.enums.BillingCycle;
import com.trackmysub.entity.enums.SubscriptionCategory;
import com.trackmysub.entity.enums.SubscriptionStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for creating or updating a subscription.
 */
public record SubscriptionRequest(
    @NotBlank @Size(max = 255) String serviceName,
    @NotNull SubscriptionCategory category,
    @NotNull @DecimalMin("0.0") BigDecimal cost,
    @NotNull BillingCycle billingCycle,
    SubscriptionStatus status,
    @NotNull LocalDate nextRenewalDate,
    LocalDate trialEndDate
) {}
