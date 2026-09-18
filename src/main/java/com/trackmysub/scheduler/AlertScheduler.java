package com.trackmysub.scheduler;

import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.enums.NotificationChannel;
import com.trackmysub.entity.enums.NotificationType;
import com.trackmysub.entity.enums.SubscriptionStatus;
import com.trackmysub.repository.SubscriptionRepository;
import com.trackmysub.repository.UserRepository;
import com.trackmysub.service.EmailService;
import com.trackmysub.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@Slf4j
@EnableScheduling
public class AlertScheduler {

    private final SubscriptionRepository subscriptionRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final Optional<EmailService> emailService;

    public AlertScheduler(SubscriptionRepository subscriptionRepository, NotificationService notificationService,
                          UserRepository userRepository, Optional<EmailService> emailService) {
        this.subscriptionRepository = subscriptionRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "${app.alert.cron}")
    public void checkAndSendAlerts() {
        log.info("Starting scheduled alert check");
        LocalDate today = LocalDate.now();
        LocalDate inThreeDays = today.plusDays(3);

        int renewalCount = 0;
        int trialCount = 0;

        List<Subscription> renewals = subscriptionRepository.findByStatusAndNextRenewalDateBetween(SubscriptionStatus.ACTIVE, today, inThreeDays);
        for (Subscription sub : renewals) {
            if (!notificationService.wasAlertAlreadySent(sub.getId(), NotificationType.RENEWAL_REMINDER, today.atStartOfDay())) {
                String message = String.format("Your %s subscription of %s is renewing on %s.", 
                    sub.getServiceName(), sub.getCost(), sub.getNextRenewalDate());
                
                notificationService.createNotification(sub.getUser(), sub, NotificationType.RENEWAL_REMINDER, 
                    NotificationChannel.IN_APP, "Renewal Reminder", message);
                
                emailService.ifPresent(service -> 
                    service.sendAlert(sub.getUser().getEmail(), "Renewal Reminder: " + sub.getServiceName(), message)
                );
                
                log.info("Sent renewal alert for subscription: {}", sub.getId());
                renewalCount++;
            }
        }

        List<Subscription> trials = subscriptionRepository.findByStatusAndTrialEndDateBetween(SubscriptionStatus.TRIAL, today, inThreeDays);
        for (Subscription sub : trials) {
            if (!notificationService.wasAlertAlreadySent(sub.getId(), NotificationType.TRIAL_EXPIRY, today.atStartOfDay())) {
                String message = String.format("Your %s trial is expiring on %s.", 
                    sub.getServiceName(), sub.getTrialEndDate());
                
                notificationService.createNotification(sub.getUser(), sub, NotificationType.TRIAL_EXPIRY, 
                    NotificationChannel.IN_APP, "Trial Expiry", message);
                
                emailService.ifPresent(service -> 
                    service.sendAlert(sub.getUser().getEmail(), "Trial Expiry: " + sub.getServiceName(), message)
                );
                
                log.info("Sent trial expiry alert for subscription: {}", sub.getId());
                trialCount++;
            }
        }

        log.info("Completed scheduled alert check. Renewals sent: {}, Trial expiries sent: {}", renewalCount, trialCount);
    }
}
