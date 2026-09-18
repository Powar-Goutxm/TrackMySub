package com.trackmysub.repository;

import com.trackmysub.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Repository interface for Coupon entity.
 */
public interface CouponRepository extends JpaRepository<Coupon, UUID> {
    List<Coupon> findByIsActiveTrue();
    List<Coupon> findByServiceNameIgnoreCaseAndIsActiveTrueAndValidUntilAfter(String serviceName, LocalDate date);
}
