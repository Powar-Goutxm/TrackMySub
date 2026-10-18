---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# Technology Stack

**Analysis Date:** 2026-10-09

## Core Backend Stack

- **Language:** Java 25 (`<java.version>25</java.version>`)
- **Framework:** Spring Boot 4.1.1 (Spring Framework 7.x)
- **Build Tool:** Maven Wrapper (`mvnw` / `mvnw.cmd`)
- **Packaging:** JAR (Spring Boot executable)

## Key Dependencies & Libraries

### Web & API

- `spring-boot-starter-web`: RESTful endpoints, embedded Tomcat web server.
- `spring-boot-starter-validation`: Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@DecimalMin`, etc.).
- `springdoc-openapi-starter-webmvc-ui` (v2.6.0): OpenAPI 3.0 specification and interactive Swagger UI at `/swagger-ui.html`.

### Persistence & Database

- `spring-boot-starter-data-jpa`: Spring Data JPA with Hibernate ORM.
- `org.postgresql:postgresql`: PostgreSQL JDBC runtime driver.
- `org.flywaydb:flyway-core` & `flyway-database-postgresql`: Automated database migration management (`classpath:db/migration`).
- `com.h2database:h2`: In-memory database scoped for automated testing.

### Security & Authentication

- `spring-boot-starter-security`: Spring Security 7.x.
- `io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson` (v0.12.6): Stateless JSON Web Token creation and verification.
- BCrypt: Password hashing via Spring Security `BCryptPasswordEncoder`.

### Communications & Utilities

- `spring-boot-starter-mail`: SMTP email notifications (optional/graceful degradation).
- `org.projectlombok:lombok` (v1.18.48): Boilerplate reduction for entities and components.

## Target Frontend Stack (`frontend/` planned)

- **Framework:** React 19 + TypeScript 5
- **Build Tool & Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- **Animations:** Motion (`motion/react`) for micro-interactions & GSAP + ScrollTrigger for landing hero animations
- **State & Data Fetching:** TanStack Query v5 + Zustand (auth & global store) + Axios (JWT interceptors)
- **Forms & Validation:** React Hook Form + Zod

## Infrastructure

- **Containerization:** Docker Compose (`docker-compose.yml`) running PostgreSQL 16 on port `5432`.
- **Environment:** Windows host OS with PowerShell terminal.

<!-- refreshed: 2026-10-09 -->
