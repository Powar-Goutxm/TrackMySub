---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# Codebase Structure

**Analysis Date:** 2026-10-09

## Directory Organization

```
TrackMySub/
├── .mvn/                                # Maven wrapper configuration
├── docs/                                # Project documentation & ADRs
├── src/
│   ├── main/
│   │   ├── java/com/trackmysub/
│   │   │   ├── TrackMySubApplication.java  # Spring Boot entry point
│   │   │   ├── config/                     # Security, JWT, filter configurations
│   │   │   ├── controller/                 # REST API controllers (@RestController)
│   │   │   ├── dto/                        # Request and Response Java Records
│   │   │   ├── entity/                     # JPA domain entities & enums/
│   │   │   ├── exception/                  # Custom exceptions & GlobalExceptionHandler
│   │   │   ├── repository/                 # Spring Data JPA repositories
│   │   │   ├── scheduler/                  # @Scheduled background tasks
│   │   │   ├── service/                    # Business logic and services
│   │   │   └── util/                       # JWT utilities and helpers
│   │   └── resources/
│   │       ├── application.yml             # Global configuration & profiles
│   │       └── db/migration/               # Flyway SQL migration scripts
│   └── test/                               # Test source root (currently unpopulated)
├── .gitignore
├── AGENTS.md                            # Agent guidelines & Boot 4 invariants
├── docker-compose.yml                   # PostgreSQL 16 local database container
├── mvnw / mvnw.cmd                      # Cross-platform Maven wrappers
├── pom.xml                              # Maven build descriptor
└── README.md                            # Comprehensive project overview & API spec
```

## Key File Locations

### Entry Points

- `src/main/java/com/trackmysub/TrackMySubApplication.java`: Main Spring Boot application runner with `@EnableScheduling`.

### Configuration

- `src/main/resources/application.yml`: Database, Flyway, JWT, Mail, and OpenAPI settings.
- `src/main/java/com/trackmysub/config/SecurityConfig.java`: Spring Security filter chain and endpoint rules.
- `src/main/java/com/trackmysub/config/JwtProperties.java`: Type-safe configuration binding for JWT properties.

### Data Migrations

- `src/main/resources/db/migration/V1__init_schema.sql`: Initial PostgreSQL table definitions and indexes.
- `src/main/resources/db/migration/V2__seed_coupons.sql`: Seed data for subscription coupons.

### Rules & Guidance for Adding Code

1. **Adding New Endpoints:**
   - Define immutable Java Record request/response DTOs in `com.trackmysub.dto`.
   - Add service interface/implementation in `com.trackmysub.service`.
   - Expose endpoint in `com.trackmysub.controller` with OpenAPI `@Operation` annotations and `@Valid` constraints.
2. **Database Changes:**
   - **Never** modify existing `V1` or `V2` migrations.
   - Always create `V<NextNumber>__<description>.sql` in `src/main/resources/db/migration/`.
3. **Frontend Placement:**
   - New frontend client application belongs in a dedicated `frontend/` directory at the project root.

<!-- refreshed: 2026-10-09 -->
