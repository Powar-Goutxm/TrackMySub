package com.trackmysub.service;

import com.trackmysub.dto.CategoryBreakdownResponse;
import com.trackmysub.dto.DashboardSummaryResponse;
import com.trackmysub.dto.SubscriptionResponse;
import com.trackmysub.entity.Subscription;
import com.trackmysub.entity.enums.BillingCycle;
import com.trackmysub.entity.enums.SubscriptionCategory;
import com.trackmysub.entity.enums.SubscriptionStatus;
import com.trackmysub.repository.SubscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DashboardService {

    private final SubscriptionRepository subscriptionRepository;

    public DashboardService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public DashboardSummaryResponse getSummary(UUID userId) {
        List<Subscription> activeSubs = subscriptionRepository.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);

        BigDecimal totalMonthlySpend = BigDecimal.ZERO;
        BigDecimal totalYearlySpend = BigDecimal.ZERO;
        
        for (Subscription sub : activeSubs) {
            if (sub.getBillingCycle() == BillingCycle.MONTHLY) {
                totalMonthlySpend = totalMonthlySpend.add(sub.getCost());
                totalYearlySpend = totalYearlySpend.add(sub.getCost().multiply(BigDecimal.valueOf(12)));
            } else if (sub.getBillingCycle() == BillingCycle.YEARLY) {
                totalMonthlySpend = totalMonthlySpend.add(sub.getCost().divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP));
                totalYearlySpend = totalYearlySpend.add(sub.getCost());
            }
        }

        LocalDate today = LocalDate.now();
        LocalDate nextWeek = today.plusDays(7);
        
        List<SubscriptionResponse> upcomingRenewals = activeSubs.stream()
                .filter(s -> s.getNextRenewalDate() != null && !s.getNextRenewalDate().isBefore(today) && !s.getNextRenewalDate().isAfter(nextWeek))
                .map(s -> new SubscriptionResponse(
                        s.getId(), s.getServiceName(), s.getCategory(), s.getCost(), s.getBillingCycle(),
                        s.getStatus(), s.getNextRenewalDate(), s.getTrialEndDate(), s.getCreatedAt(), s.getUpdatedAt()
                ))
                .collect(Collectors.toList());

        return new DashboardSummaryResponse(totalMonthlySpend, totalYearlySpend, activeSubs.size(), upcomingRenewals);
    }

    public List<CategoryBreakdownResponse> getCategoryBreakdown(UUID userId) {
        List<Subscription> activeSubs = subscriptionRepository.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);
        
        Map<SubscriptionCategory, List<Subscription>> grouped = activeSubs.stream()
                .collect(Collectors.groupingBy(Subscription::getCategory));
                
        return grouped.entrySet().stream().map(entry -> {
            SubscriptionCategory category = entry.getKey();
            List<Subscription> subs = entry.getValue();
            
            BigDecimal totalMonthly = BigDecimal.ZERO;
            for (Subscription sub : subs) {
                if (sub.getBillingCycle() == BillingCycle.MONTHLY) {
                    totalMonthly = totalMonthly.add(sub.getCost());
                } else if (sub.getBillingCycle() == BillingCycle.YEARLY) {
                    totalMonthly = totalMonthly.add(sub.getCost().divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP));
                }
            }
            
            return new CategoryBreakdownResponse(category, totalMonthly, subs.size());
        }).sorted((a, b) -> b.totalSpend().compareTo(a.totalSpend())).collect(Collectors.toList());
    }
}
