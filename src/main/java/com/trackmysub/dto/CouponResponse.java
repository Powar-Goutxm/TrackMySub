package com.trackmysub.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for coupon response.
 */
public record CouponResponse(
    UUID id, 
    String serviceName, 
    String code, 
    String description,
    BigDecimal discountPercentage, 
    LocalDate validFrom,
    LocalDate validUntil, 
    String sourceUrl
) {}
