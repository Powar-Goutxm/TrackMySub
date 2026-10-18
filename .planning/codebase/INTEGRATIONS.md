---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# External Integrations

**Analysis Date:** 2026-10-09

## Database Integrations

### PostgreSQL (Primary Data Store)

- **Engine:** PostgreSQL 16
- **Connection Configuration:** Configured in `src/main/resources/application.yml` via JDBC URL `jdbc:postgresql://localhost:5432/trackmysub`.
- **Default Credentials:** Username `trackmysub`, password `trackmysub` (overrideable via environment variables).
- **Schema Management:** Flyway manages schema migrations on application startup from `src/main/resources/db/migration/`:
  - `V1__init_schema.sql`: Core schema for `users`, `subscriptions`, `notifications`, `coupons`, and corresponding indexes.
  - `V2__seed_coupons.sql`: Seed data for curated subscription discounts.

## Security & Identity

### Stateless JWT Provider

- **Mechanism:** HMAC-SHA256 tokens generated and validated locally via `src/main/java/com/trackmysub/util/JwtUtil.java`.
- **Token Durations:**
  - Access Token: 15 minutes (`900000 ms`).
  - Refresh Token: 7 days (`604800000 ms`).
- **Secret Key:** Injected via `app.jwt.secret` (environment variable `JWT_SECRET`).

## External Services & Notifications

### SMTP Email Service

- **Provider:** Spring Mail / JavaMailSender (`smtp.gmail.com:587`).
- **Configuration:** Optional credentials via `MAIL_USERNAME` and `MAIL_PASSWORD`.
- **Graceful Degradation:** Managed in `src/main/java/com/trackmysub/service/EmailService.java`. If credentials are not supplied, logs a warning and falls back to persistent in-app notifications without throwing exceptions.

## API & Documentation

### OpenAPI / Swagger UI

- **Specification Endpoint:** `/api-docs` (`/v3/api-docs`).
- **Interactive UI:** `/swagger-ui.html`.
- **Public Access:** Explicitly permitted in `src/main/java/com/trackmysub/config/SecurityConfig.java`.

## Planned Frontend Integration

### REST API Boundary (`/api/v1`)

- The upcoming React 19 frontend will consume:
  - Auth endpoints: `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/refresh`
  - Subscription CRUD: `/api/v1/subscriptions`
  - Dashboard analytics: `/api/v1/dashboard/summary`, `/api/v1/dashboard/categories`
  - Notifications: `/api/v1/notifications`
  - Coupons: `/api/v1/coupons`
- Requires CORS allowance or Vite development server proxy.

<!-- refreshed: 2026-10-09 -->
