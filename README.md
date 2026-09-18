# TrackMySub 💳

A subscription management REST API backend built with Spring Boot that tracks recurring subscriptions, discovers discount coupons, and alerts users before renewal dates and trial expirations.

## 🚀 Tech Stack

- **Framework**: Spring Boot 4.1.1
- **Language**: Java 25
- **Database**: PostgreSQL (with Flyway database migrations)
- **Security**: Spring Security + Stateless JWT Authentication
- **API Docs**: Swagger / OpenAPI (Springdoc)
- **Containerization**: Docker Compose (PostgreSQL)

## 📦 Features

- **Authentication**: JWT-based User Registration, Login, and Token Refresh.
- **Subscription Management**: Full CRUD operations with categorization, monthly/yearly billing cycles, and next renewal calculation.
- **Automated Alerts**: Dual-channel alerts (Email + In-App notifications) scheduled at 3 days and 1 day before renewal or trial end dates.
- **Coupons & Deals**: Curated coupon database matching active user subscriptions.
- **Spending Dashboard**: Monthly & annual spending analytics and category breakdowns.

## 🛠️ Getting Started

### 1. Prerequisites
- Java 25
- Docker & Docker Compose

### 2. Start PostgreSQL
```bash
docker-compose up -d
```

### 3. Run the Application
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```

### 4. Interactive API Documentation
Once started, visit Swagger UI:
```
http://localhost:8080/swagger-ui.html
```
