# TrackMySub 💳

[![Java](https://img.shields.io/badge/Java-25-orange.svg?style=flat&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen.svg?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg?style=flat&logo=docker)](https://www.docker.com/)
[![Flyway](https://img.shields.io/badge/Flyway-Migrations-red.svg?style=flat&logo=flyway)](https://flywaydb.org/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-Swagger%20UI-85EA2D.svg?style=flat&logo=swagger)](https://swagger.io/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Animations-FF0055.svg?style=flat)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A high-performance, full-stack subscription tracking and expense intelligence platform built with **Java 25**, **Spring Boot 4.1.1**, and a premium **React 19 + Vite** frontend. TrackMySub empowers users to track recurring subscriptions, receive proactive renewal alerts, analyze monthly spending, and discover relevant discounts — all through a polished, animated SaaS-grade interface.


---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Backend Modules](#-backend-modules)
- [Data Model & Schema](#-data-model--schema)
- [API Surface & Endpoints](#-api-surface--endpoints)
- [Sample Payloads](#-sample-payloads)
- [Tech Stack](#-tech-stack)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Configuration Reference](#-configuration-reference)
- [Testing & Quality Verification](#-testing--quality-verification)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 💡 Overview

Modern consumers subscribe to dozens of software, streaming, and utility services, often losing track of active renewals, surprise price hikes, and unused trials. **TrackMySub** provides a centralized, multi-tenant backend platform to:
- Monitor recurring commitments and auto-calculate upcoming billing dates.
- Deliver automated background alerts before renewals or trial expirations.
- Provide spending analytics, cost distributions, and category breakdowns.
- Pair active subscriptions with curated discount coupons.

---

## 🚀 Key Features

- **🔐 Stateless Dual-Token Authentication**: Secure sessionless authentication using short-lived access tokens (15 min) and long-lived refresh tokens (7 days) via custom `OncePerRequestFilter`.
- **🛡️ Multi-Tenancy & IDOR Protection**: Strict user-scoped isolation enforced at the service layer where resource ownership is checked against the verified JWT principal.
- **📊 Subscription Lifecycle Management**: Full CRUD operations with automatic billing cycle logic, next renewal calculation, and category classification.
- **📈 Spending Analytics & Insights**: Aggregated monthly expense summaries, category breakdown distributions, and active subscription statistics.
- **⏰ Automated Renewal Alerts**: Autonomous background `@Scheduled` cron job checking for upcoming renewals and trial expirations, with built-in idempotency to prevent duplicate alerts.
- **🏷️ Coupon & Deal Engine**: Curated database matching discount coupons and deals directly against user subscriptions.
- **📋 Standardized RFC 7807 Error Handling**: Centralized exception management via `@RestControllerAdvice` emitting predictable `ProblemDetail` JSON responses.
- **🔄 Version-Controlled Migrations**: Zero-downtime, reproducible database schema management using Flyway with Hibernate `ddl-auto: validate`.

---

## 🏗️ System Architecture

TrackMySub is engineered using a clean, unidirectional N-Tier layered architecture:

```text
[ Client Application / Web / Mobile ]
                 │
                 ▼  (HTTPS / JSON)
        JwtAuthenticationFilter  ◄── Validates stateless Bearer token & sets SecurityContext
                 │
                 ▼
         Controller Layer        ◄── Java Record DTOs + Declarative Jakarta Validation (@Valid)
                 │
                 ▼
          Service Layer          ◄── Business logic, IDOR ownership verification, @Transactional
                 │
                 ▼
        Repository Layer         ◄── Spring Data JPA / Hibernate
                 │
                 ▼
       PostgreSQL Database       ◄── Flyway managed schema (V1, V2)
```

### Core Engineering Principles

- **N-Tier Layered Architecture**: Unidirectional flow (`Controller` → `Service` → `Repository` → `Entity`) guaranteeing clean separation of concerns and high testability.
- **Modern DTOs via Java Records**: API contracts are modeled as immutable native Java records (`SubscriptionRequest`, `DashboardSummaryResponse`), preventing entity state leaks and Jackson serialization cycles.
- **Fail-Fast Declarative Validation**: Jakarta Bean Validation (`@NotBlank`, `@NotNull`, `@DecimalMin`) validates input at the API boundary before hitting business logic.
- **Inversion of Control & Constructor Injection**: Clean dependency injection using `final` fields without field injection (`@Autowired`), ensuring immutability and straightforward unit testing.
- **Graceful Degradation**: External notification services (e.g. SMTP email sender) use `@ConditionalOnProperty` to degrade gracefully to in-app alerts if credentials are not configured.

---

## 📦 Backend Modules

### 1. Authentication & Security Module
- User registration and login with BCrypt password hashing.
- Stateless JWT issuance (`JwtUtil`) supporting 15-minute access tokens and 7-day refresh tokens.
- Custom `JwtAuthenticationFilter` populating the `SecurityContextHolder` per request.
- Secure endpoint authorization rules configured via `SecurityConfig`.

### 2. Subscription Management Module
- Create, Read, Update, and Delete (CRUD) operations for subscriptions.
- Automated billing cycle calculation (Monthly, Yearly, Quarterly).
- Dynamic calculation of upcoming renewal dates and trial end countdowns.
- Active/Paused/Cancelled status management.

### 3. Dashboard & Analytics Module
- Total monthly and annualized spending aggregation.
- Category expense breakdown (Entertainment, Productivity, Utilities, etc.).
- Active subscription count and high-level financial metrics.

### 4. Automated Alert & Notification Module
- Daily `@Scheduled` cron job (08:00 UTC) sweeping for renewals due within 3 days and 1 day.
- Idempotency check (`wasAlertAlreadySent`) preventing duplicate notifications.
- Multi-channel delivery: persistent in-app notifications + optional SMTP email alerts.
- Read/unread status tracking and unread count counters.

### 5. Coupon Discovery Engine
- Curated database of coupon codes, percentage discounts, and validity periods.
- Service-name matching pairing active user subscriptions with relevant promotional deals.

---

## 🗄️ Data Model & Schema

The relational schema is versioned and applied using Flyway migrations (`V1__init_schema.sql` and `V2__seed_coupons.sql`):

### Core Entities

| Table | Primary Key | Key Attributes | Relationships |
| :--- | :--- | :--- | :--- |
| `users` | `id` (UUID) | `email`, `password_hash`, `name`, `created_at` | 1-to-Many with `subscriptions`, `notifications` |
| `subscriptions` | `id` (UUID) | `service_name`, `category`, `cost`, `billing_cycle`, `status`, `next_renewal_date`, `trial_end_date` | Belongs to `users` (`user_id` FK) |
| `notifications` | `id` (UUID) | `type`, `channel`, `title`, `message`, `is_read`, `sent_at` | Belongs to `users` & `subscriptions` |
| `coupons` | `id` (UUID) | `service_name`, `code`, `description`, `discount_percentage`, `valid_until`, `is_active` | Standalone lookup / discovery |

### Enumerations

- **`BillingCycle`**: `MONTHLY`, `QUARTERLY`, `YEARLY`
- **`SubscriptionCategory`**: `STREAMING`, `SOFTWARE`, `GAMING`, `UTILITIES`, `FITNESS`, `OTHER`
- **`SubscriptionStatus`**: `ACTIVE`, `CANCELLED`, `PAUSED`
- **`NotificationType`**: `RENEWAL_REMINDER`, `TRIAL_EXPIRATION`, `COUPON_AVAILABLE`, `SYSTEM`
- **`NotificationChannel`**: `IN_APP`, `EMAIL`

---

## 📚 API Surface & Endpoints (`/api/v1`)

All endpoints (except auth registration/login/refresh) require an `Authorization: Bearer <access_token>` header.

### 🔐 Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user account | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user & return access/refresh tokens | Public |
| `POST` | `/api/v1/auth/refresh` | Generate a new access token using a valid refresh token | Public |

### 💳 Subscriptions (`/api/v1/subscriptions`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/subscriptions` | List all subscriptions for the authenticated user | Authenticated |
| `POST` | `/api/v1/subscriptions` | Create a new subscription | Authenticated |
| `GET` | `/api/v1/subscriptions/{id}` | Get subscription details by ID (IDOR-protected) | Authenticated |
| `PUT` | `/api/v1/subscriptions/{id}` | Update existing subscription details | Authenticated |
| `DELETE` | `/api/v1/subscriptions/{id}` | Delete a subscription | Authenticated |

### 📊 Dashboard Analytics (`/api/v1/dashboard`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/dashboard/summary` | Get monthly spending summary & subscription metrics | Authenticated |
| `GET` | `/api/v1/dashboard/categories` | Get spending breakdown grouped by category | Authenticated |

### 🔔 Notifications & Alerts (`/api/v1/notifications`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notifications` | List user notification history | Authenticated |
| `GET` | `/api/v1/notifications/unread-count` | Get count of unread notifications | Authenticated |
| `PATCH` | `/api/v1/notifications/{id}/read` | Mark a specific notification as read | Authenticated |

### 🏷️ Coupons & Deals (`/api/v1/coupons`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/coupons` | List curated discount coupons matching subscriptions | Authenticated |

---

## 📝 Sample Payloads

### 1. Register User (`POST /api/v1/auth/register`)

```json
// Request
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePassword123!"
}

// Response (201 Created)
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer"
}
```

### 2. Create Subscription (`POST /api/v1/subscriptions`)

```json
// Request
{
  "serviceName": "Netflix Premium",
  "category": "STREAMING",
  "cost": 19.99,
  "billingCycle": "MONTHLY",
  "status": "ACTIVE",
  "nextRenewalDate": "2026-10-15",
  "trialEndDate": null
}

// Response (201 Created)
{
  "id": "e7b0a880-9289-4e5a-939a-6c1f9e2bfb73",
  "serviceName": "Netflix Premium",
  "category": "STREAMING",
  "cost": 19.99,
  "billingCycle": "MONTHLY",
  "status": "ACTIVE",
  "nextRenewalDate": "2026-10-15",
  "trialEndDate": null,
  "createdAt": "2026-09-27T01:00:00",
  "updatedAt": "2026-09-27T01:00:00"
}
```

### 3. Dashboard Summary (`GET /api/v1/dashboard/summary`)

```json
// Response (200 OK)
{
  "totalMonthlySpend": 64.97,
  "totalYearlySpend": 779.64,
  "activeSubscriptionCount": 4,
  "upcomingRenewals": [
    {
      "id": "e7b0a880-9289-4e5a-939a-6c1f9e2bfb73",
      "serviceName": "Netflix Premium",
      "category": "STREAMING",
      "cost": 19.99,
      "billingCycle": "MONTHLY",
      "status": "ACTIVE",
      "nextRenewalDate": "2026-10-15",
      "trialEndDate": null,
      "createdAt": "2026-09-27T01:00:00",
      "updatedAt": "2026-09-27T01:00:00"
    }
  ]
}
```

### 4. Standardized Error Response (RFC 7807)

```json
// Response (400 Bad Request on Validation Failure)
{
  "type": "about:blank",
  "title": "Validation Failed",
  "status": 400,
  "detail": "serviceName: must not be blank, cost: must be greater than or equal to 0.0",
  "instance": "/api/v1/subscriptions"
}
```

---

## 🧰 Tech Stack

### Backend


| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Language** | Java 25 | Core platform language |
| **Framework** | Spring Boot 4.1.1 | REST API framework & dependency injection |
| **Security** | Spring Security 6 + JJWT 0.12.6 | Stateless JWT authentication & authorization |
| **Database** | PostgreSQL 16 | Relational primary data store |
| **ORM** | Spring Data JPA / Hibernate | Object-Relational Mapping & persistence |
| **Migrations** | Flyway | Version-controlled database schema migrations |
| **Documentation** | Springdoc OpenAPI 2.6.0 | Interactive Swagger UI & OpenAPI v3 specs |
| **Infrastructure** | Docker Compose | Local containerized PostgreSQL instance |


### Frontend (`frontend/`)

| Concern | Technology | Purpose |
| :--- | :--- | :--- |
| **Scaffold / Ideation** | Google Stitch (Gemini 2.5 Pro) | AI-native UI prototyping → React + Tailwind export |
| **Framework** | React 19 + TypeScript | Component model, type safety, modern React features |
| **Build Tool** | Vite 6 | Instant HMR, fast bundling, monorepo-friendly |
| **Styling** | Tailwind CSS v4 | Utility-first, zero-runtime, Stitch-compatible |
| **Components** | shadcn/ui + Radix UI | Accessible, fully-owned, Tailwind-native primitives |
| **Data Viz** | Recharts | Lightweight React-native charts for spending analytics |
| **UI Animations** | Motion (`motion/react`) | Declarative, state-driven micro-interactions & transitions |
| **Sequence / Landing** | GSAP + ScrollTrigger | Hero section, scroll storytelling, premium landing feel |
| **Server State** | TanStack Query v5 | Caching, background refetch & optimistic updates |
| **Global State** | Zustand | Auth tokens, user profile, notification count |
| **HTTP Client** | Axios | JWT Bearer interceptors against the Spring Boot API |
| **Forms** | React Hook Form + Zod | Type-safe form validation mirroring backend DTOs |


---

## 🛠️ Getting Started & Local Setup

### Prerequisites

- **Java Development Kit (JDK)**: Java 25 or compatible modern JDK
- **Docker & Docker Compose**: For containerized PostgreSQL database
- **Maven**: Included via Maven Wrapper (`mvnw` / `mvnw.cmd`)

### 1. Clone the Repository

```bash
git clone https://github.com/Powar-Goutxm/TrackMySub.git
cd TrackMySub
```

### 2. Start PostgreSQL via Docker Compose

```bash
docker-compose up -d
```

This launches a PostgreSQL 16 container on port `5432` with preconfigured credentials (`trackmysub`/`trackmysub`).

### 3. Run the Application

Execute using the included Maven wrapper:

**On Linux / macOS:**
```bash
./mvnw spring-boot:run
```

**On Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

Flyway will automatically apply migrations (`V1__init_schema.sql`, `V2__seed_coupons.sql`) on startup. The API will be live on `http://localhost:8080`.

---

## 📖 Interactive API Documentation

Once the backend is running, open the interactive Swagger UI in your browser:

```text
http://localhost:8080/swagger-ui.html
```

Or view the raw OpenAPI JSON specification at:
```text
http://localhost:8080/v3/api-docs
```

---

## ⚙️ Configuration Reference

Application configurations can be overridden in `application.yml` or through environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/trackmysub` | JDBC database connection URL |
| `SPRING_DATASOURCE_USERNAME` | `trackmysub` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `trackmysub` | Database password |
| `JWT_SECRET` | *(Default 256-bit dev secret)* | Secret key for signing HMAC-SHA256 JWTs |
| `APP_JWT_ACCESS_TOKEN_EXPIRATION_MS` | `900000` (15 min) | Access token validity duration in milliseconds |
| `APP_JWT_REFRESH_TOKEN_EXPIRATION_MS` | `604800000` (7 days) | Refresh token validity duration in milliseconds |
| `APP_ALERT_CRON` | `0 0 8 * * *` | Cron schedule for renewal reminder checks (08:00 UTC) |
| `MAIL_USERNAME` | *(Optional)* | SMTP mailer username (in-app alerts work if omitted) |
| `MAIL_PASSWORD` | *(Optional)* | SMTP mailer password |

---

## 🧪 Testing & Quality Verification

TrackMySub uses a layered verification strategy:

- **Unit Testing**: Testing service business logic, billing math, and utility classes in isolation with mocked repositories.
- **Slice & Integration Testing**: `@WebMvcTest` for controller routing/validation and `@DataJpaTest` with test fixtures.
- **Security Verification**: Testing JWT filter enforcement, expired token handling, and IDOR prevention rules.
- **Contract Verification**: Continuous OpenAPI schema verification via Swagger UI.

Execute the test suite via Maven:
```bash
./mvnw test
```

---

## 🗺️ Roadmap

- [x] **Phase 1: Foundation** — Stateless dual-token JWT authentication, PostgreSQL integration, Flyway migrations, Docker Compose.
- [x] **Phase 2: Subscription Management** — Full CRUD, billing cycle calculations, renewal dates, and category management.
- [x] **Phase 3: Dashboard & Analytics** — Monthly/annual spending calculations, category breakdowns, and summary APIs.
- [x] **Phase 4: Notifications & Automation** — Scheduled renewal alert engine, idempotency tracking, and in-app notifications.
- [ ] **Phase 5: Frontend Interface** — Premium "$1K SaaS" client application living in `frontend/` (monorepo). UI scaffolded with **Google Stitch** (Gemini 2.5 Pro), built on **React 19 + TypeScript + Vite**, styled with **Tailwind CSS v4** and **shadcn/ui**, animated with **Motion** (`motion/react`) for state-driven UI transitions and **GSAP + ScrollTrigger** for the marketing landing page. Data fetching via **TanStack Query v5** with optimistic updates; JWT auth via Axios interceptors.

- [ ] **Phase 6: Production Hardening** — Refresh Token Rotation (RTR) with Redis blacklisting, cursor-based pagination on list endpoints, and CI/CD automation.
- [ ] **Phase 7: Advanced Features** — Smart renewal forecasting, automated email digests, and subscription deal recommendations.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
