---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# Coding Conventions

**Analysis Date:** 2026-10-09

## Spring Boot 4.x & Java 25 Invariants

This project adheres strictly to modern Java 25 and Spring Boot 4.x patterns:

1. **Spring Security 7 Lambda DSL:**
   - Always use modern Lambda DSL syntax:
     ```java
     http.authorizeHttpRequests(auth -> auth.requestMatchers("/api/v1/auth/**").permitAll().anyRequest().authenticated())
     ```
   - Deprecated `.and()` chaining is strictly prohibited.
2. **Stateless JWT Flow:**
   - No HTTP sessions (`SessionCreationPolicy.STATELESS`).
   - Principal extracted on each request via `JwtAuthenticationFilter` placed before `UsernamePasswordAuthenticationFilter`.
3. **DTOs via Native Java Records:**
   - All request/response contracts are modeled as immutable Java records:
     ```java
     public record SubscriptionRequest(
         @NotBlank String serviceName,
         @NotNull SubscriptionCategory category,
         @NotNull @DecimalMin("0.0") BigDecimal cost,
         @NotNull BillingCycle billingCycle,
         @NotNull LocalDate nextRenewalDate
     ) {}
     ```
4. **Testing Annotations:**
   - Use `@MockitoBean` and `@MockitoSpyBean` instead of deprecated/removed `@MockBean`.
5. **Constructor Injection:**
   - Field injection (`@Autowired`) is banned. Use constructor injection with `final` fields.

## Error Handling Standards

- Centralized handling in `GlobalExceptionHandler.java` using Spring's RFC 7807 `ProblemDetail` specification:
  - `400 Bad Request`: Validation failures (`MethodArgumentNotValidException`, `BadRequestException`).
  - `404 Not Found`: Entity lookup misses (`ResourceNotFoundException`).
  - `409 Conflict`: Unique constraint conflicts (`DuplicateResourceException`).
  - `500 Internal Server Error`: Unexpected runtime errors.

## Code Naming & Organization

- **Controllers:** Suffix with `Controller` (e.g. `SubscriptionController.java`).
- **Services:** Suffix with `Service` (e.g. `SubscriptionService.java`).
- **Repositories:** Suffix with `Repository` (e.g. `SubscriptionRepository.java`).
- **DTOs:** Suffix with `Request` or `Response` (e.g. `LoginRequest.java`, `AuthResponse.java`).
- **Entities:** Singular noun matching table name conceptually (e.g. `Subscription.java` $\rightarrow$ `subscriptions`).
- **Enums:** Placed in `com.trackmysub.entity.enums` using uppercase values (e.g. `ACTIVE`, `CANCELLED`).

<!-- refreshed: 2026-10-09 -->
