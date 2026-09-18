package com.trackmysub.service;

import com.trackmysub.dto.SubscriptionRequest;
import com.trackmysub.dto.SubscriptionResponse;
import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.User;
import com.trackmysub.entity.enums.SubscriptionStatus;
import com.trackmysub.exception.ResourceNotFoundException;
import com.trackmysub.repository.SubscriptionRepository;
import com.trackmysub.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    public List<SubscriptionResponse> getUserSubscriptions(UUID userId) {
        log.debug("Fetching subscriptions for user: {}", userId);
        return subscriptionRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public SubscriptionResponse getSubscription(UUID userId, UUID subscriptionId) {
        log.debug("Fetching subscription {} for user {}", subscriptionId, userId);
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .filter(s -> s.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Subscription", "id", subscriptionId));
        return mapToResponse(subscription);
    }

    @Transactional
    public SubscriptionResponse createSubscription(UUID userId, SubscriptionRequest request) {
        log.debug("Creating new subscription for user {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setServiceName(request.serviceName());
        subscription.setCategory(request.category());
        subscription.setCost(request.cost());
        subscription.setBillingCycle(request.billingCycle());
        subscription.setStatus(request.status() != null ? request.status() : SubscriptionStatus.ACTIVE);
        subscription.setNextRenewalDate(request.nextRenewalDate());
        subscription.setTrialEndDate(request.trialEndDate());

        Subscription savedSubscription = subscriptionRepository.save(subscription);
        return mapToResponse(savedSubscription);
    }

    @Transactional
    public SubscriptionResponse updateSubscription(UUID userId, UUID subscriptionId, SubscriptionRequest request) {
        log.debug("Updating subscription {} for user {}", subscriptionId, userId);
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .filter(s -> s.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Subscription", "id", subscriptionId));

        subscription.setServiceName(request.serviceName());
        subscription.setCategory(request.category());
        subscription.setCost(request.cost());
        subscription.setBillingCycle(request.billingCycle());
        if (request.status() != null) {
            subscription.setStatus(request.status());
        }
        subscription.setNextRenewalDate(request.nextRenewalDate());
        subscription.setTrialEndDate(request.trialEndDate());

        Subscription updatedSubscription = subscriptionRepository.save(subscription);
        return mapToResponse(updatedSubscription);
    }

    @Transactional
    public void deleteSubscription(UUID userId, UUID subscriptionId) {
        log.debug("Deleting subscription {} for user {}", subscriptionId, userId);
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .filter(s -> s.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Subscription", "id", subscriptionId));
        subscriptionRepository.delete(subscription);
    }

    private SubscriptionResponse mapToResponse(Subscription s) {
        return new SubscriptionResponse(
                s.getId(),
                s.getServiceName(),
                s.getCategory(),
                s.getCost(),
                s.getBillingCycle(),
                s.getStatus(),
                s.getNextRenewalDate(),
                s.getTrialEndDate(),
                s.getCreatedAt(),
                s.getUpdatedAt()
        );
    }
}
