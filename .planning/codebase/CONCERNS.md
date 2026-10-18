---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# Codebase Concerns & Technical Debt

**Analysis Date:** 2026-10-09

## High Priority Concerns

### 1. Missing CORS Configuration for Frontend Client

- **Issue:** `src/main/java/com/trackmysub/config/SecurityConfig.java` currently disables CSRF, form login, and HTTP basic, but does **not** register a `CorsConfigurationSource` or `.cors()` filter.
- **Impact:** When the React/Vite frontend application makes requests from `http://localhost:5173` to `http://localhost:8080/api/v1`, modern browsers will block cross-origin requests unless CORS headers are returned or Vite dev proxy is configured.
- **Recommended Fix:** Add a `CorsConfigurationSource` bean allowing origin `http://localhost:5173` with credentials, or configure `vite.config.ts` server proxy `/api -> http://localhost:8080`.

### 2. Missing Automated Test Suite

- **Issue:** `src/test/java` is completely empty. No unit or slice tests are currently guarding critical business logic (e.g. renewal calculation logic, IDOR ownership verification, or JWT parsing).
- **Impact:** Regressions could easily slip through without detection during frontend integration.
- **Recommended Fix:** Add JUnit 5 + Mockito test suites covering `SubscriptionService`, `DashboardService`, and `AuthController`.

### 3. Refresh Token Revocation & In-Memory Storage

- **Issue:** Refresh tokens are validated purely by stateless JWT signature verification in `JwtUtil`. There is currently no persistent token blacklist or Redis store for tracking invalidated/rotated refresh tokens.
- **Impact:** A stolen refresh token cannot be prematurely revoked until its 7-day expiration.
- **Recommended Fix:** Implement Refresh Token Rotation (RTR) or a lightweight revoked token table in Phase 6.

### 4. Rate Limiting on Auth Endpoints

- **Issue:** `/api/v1/auth/login` and `/api/v1/auth/register` have no rate limiting or brute-force protection.
- **Impact:** Vulnerable to credential stuffing attempts.
- **Recommended Fix:** Add a Bucket4j filter or rate limiting gateway before public launch.

<!-- refreshed: 2026-10-09 -->
