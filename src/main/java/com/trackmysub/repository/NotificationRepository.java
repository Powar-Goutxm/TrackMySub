package com.trackmysub.repository;

import com.trackmysub.entity.Notification;
import com.trackmysub.entity.enums.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Repository interface for Notification entity.
 */
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(UUID userId);
    long countByUserIdAndIsReadFalse(UUID userId);
    boolean existsBySubscriptionIdAndTypeAndSentAtAfter(UUID subscriptionId, NotificationType type, LocalDateTime after);
}
