package com.trackmysub.controller;

import com.trackmysub.dto.CategoryBreakdownResponse;
import com.trackmysub.dto.DashboardSummaryResponse;
import com.trackmysub.service.AuthenticatedUserService;
import com.trackmysub.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final AuthenticatedUserService authenticatedUserService;

    public DashboardController(DashboardService dashboardService, AuthenticatedUserService authenticatedUserService) {
        this.dashboardService = dashboardService;
        this.authenticatedUserService = authenticatedUserService;
    }

    @GetMapping("/summary")
    @Operation(summary = "Get dashboard summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(dashboardService.getSummary(userId));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get category-wise breakdown")
    public ResponseEntity<List<CategoryBreakdownResponse>> getCategoryBreakdown() {
        UUID userId = authenticatedUserService.getCurrentUserId();
        return ResponseEntity.ok(dashboardService.getCategoryBreakdown(userId));
    }
}
