package com.trackmysub.dto;

import com.trackmysub.entity.enums.SubscriptionCategory;
import java.math.BigDecimal;

/**
 * DTO for subscription category breakdown response.
 */
public record CategoryBreakdownResponse(
    SubscriptionCategory category,
    BigDecimal totalSpend,
    long subscriptionCount
) {}
