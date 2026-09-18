package com.trackmysub.repository;

import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Repository interface for Subscription entity.
 */
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    List<Subscription> findByUserId(UUID userId);
    List<Subscription> findByUserIdAndStatus(UUID userId, SubscriptionStatus status);
    List<Subscription> findByStatusAndNextRenewalDateBetween(SubscriptionStatus status, LocalDate from, LocalDate to);
    List<Subscription> findByStatusAndTrialEndDateBetween(SubscriptionStatus status, LocalDate from, LocalDate to);
    List<Subscription> findByUserIdOrderByNextRenewalDateAsc(UUID userId);
}
