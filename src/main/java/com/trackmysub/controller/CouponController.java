package com.trackmysub.controller;

import com.trackmysub.dto.CouponResponse;
import com.trackmysub.service.AuthenticatedUserService;
import com.trackmysub.service.CouponService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/coupons")
@Tag(name = "Coupons")
public class CouponController {

    private final CouponService couponService;
    private final AuthenticatedUserService authenticatedUserService;

    public CouponController(CouponService couponService, AuthenticatedUserService authenticatedUserService) {
        this.couponService = couponService;
        this.authenticatedUserService = authenticatedUserService;
    }

    @GetMapping
    @Operation(summary = "List all active coupons")
    public ResponseEntity<List<CouponResponse>> getAllCoupons() {
        return ResponseEntity.ok(couponService.getAllActiveCoupons());
    }

    @GetMapping("/my-subscriptions")
    @Operation(summary = "Get coupons matching user's subscription services")
    public ResponseEntity<List<CouponResponse>> getCouponsForUserSubscriptions() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(couponService.getCouponsForUserSubscriptions(userId));
    }
}
