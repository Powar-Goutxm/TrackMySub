package com.trackmysub.service;

import com.trackmysub.dto.CouponResponse;
import com.trackmysub.entity.Coupon;
import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.enums.SubscriptionStatus;
import com.trackmysub.repository.CouponRepository;
import com.trackmysub.repository.SubscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CouponService {

    private final CouponRepository couponRepository;
    private final SubscriptionRepository subscriptionRepository;

    public CouponService(CouponRepository couponRepository, SubscriptionRepository subscriptionRepository) {
        this.couponRepository = couponRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<CouponResponse> getAllActiveCoupons() {
        return couponRepository.findByIsActiveTrue().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<CouponResponse> getCouponsForUserSubscriptions(UUID userId) {
        List<Subscription> activeSubscriptions = subscriptionRepository.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);
        Set<String> serviceNames = activeSubscriptions.stream()
                .map(Subscription::getServiceName)
                .collect(Collectors.toSet());

        Set<Coupon> relevantCoupons = new HashSet<>();
        LocalDate today = LocalDate.now();
        
        for (String serviceName : serviceNames) {
            relevantCoupons.addAll(couponRepository.findByServiceNameIgnoreCaseAndIsActiveTrueAndValidUntilAfter(serviceName, today));
        }
        
        return relevantCoupons.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private CouponResponse mapToResponse(Coupon c) {
        return new CouponResponse(
                c.getId(),
                c.getServiceName(),
                c.getCode(),
                c.getDescription(),
                c.getDiscountPercentage(),
                c.getValidFrom(),
                c.getValidUntil(),
                c.getSourceUrl()
        );
    }
}
