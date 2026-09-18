package com.trackmysub.service;

import com.trackmysub.dto.NotificationResponse;
import com.trackmysub.dto.UnreadCountResponse;
import com.trackmysub.entity.Notification;
import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.User;
import com.trackmysub.entity.enums.NotificationChannel;
import com.trackmysub.entity.enums.NotificationType;
import com.trackmysub.exception.ResourceNotFoundException;
import com.trackmysub.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationResponse> getUserNotifications(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UnreadCountResponse getUnreadCount(UUID userId) {
        long count = notificationRepository.countByUserIdAndIsReadFalse(userId);
        return new UnreadCountResponse(count);
    }

    @Transactional
    public NotificationResponse markAsRead(UUID userId, UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .filter(n -> n.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));
        
        notification.setRead(true);
        Notification saved = notificationRepository.save(notification);
        return mapToResponse(saved);
    }

    @Transactional
    public void createNotification(User user, Subscription subscription, NotificationType type, NotificationChannel channel, String title, String message) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setSubscription(subscription);
        notification.setType(type);
        notification.setChannel(channel);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setSentAt(LocalDateTime.now());
        
        notificationRepository.save(notification);
    }

    public boolean wasAlertAlreadySent(UUID subscriptionId, NotificationType type, LocalDateTime since) {
        return notificationRepository.existsBySubscriptionIdAndTypeAndSentAtAfter(subscriptionId, type, since);
    }

    private NotificationResponse mapToResponse(Notification n) {
        UUID subId = null;
        String serviceName = null;
        if (n.getSubscription() != null) {
            subId = n.getSubscription().getId();
            serviceName = n.getSubscription().getServiceName();
        }
        
        return new NotificationResponse(
                n.getId(),
                subId,
                serviceName,
                n.getType(),
                n.getChannel(),
                n.getTitle(),
                n.getMessage(),
                n.isRead(),
                n.getSentAt(),
                n.getCreatedAt()
        );
    }
}
