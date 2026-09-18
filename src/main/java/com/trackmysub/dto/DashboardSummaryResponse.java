package com.trackmysub.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for dashboard summary response.
 */
public record DashboardSummaryResponse(
    BigDecimal totalMonthlySpend,
    BigDecimal totalYearlySpend,
    long activeSubscriptionCount,
    List<SubscriptionResponse> upcomingRenewals
) {}
