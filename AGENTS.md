# 🏛️ TrackMySub — AI Agent Instructions & Guidelines

> **Project:** TrackMySub (Personal Subscription & Expense Management Platform)  
> **Repository:** https://github.com/Powar-Goutxm/TrackMySub  
> **Knowledge Anchor:** Governed by Goutam's Second Brain at `C:/Users/Goutam/second-brain/Second Brain`

---

## 1. 🧠 Second Brain Grounding & Tool Authority

This project references architectural decisions, playbooks, and tool selections from the Second Brain vault:

- **Tool Choices**: Check `00_Dashboard/Tool Finder - Master Hub.md` and `30_Resources_and_Tools/`. Use the "First choice" tool.
- **Workflow & Quality Gates**: Follow the S-T-A-R-C framework, P-D-E loop, and Verification Ladder from `60_Playbooks/AI-Power-User-Playbook.md`.
- **Backend Patterns**: Follow `40_Spring_Boot_AI/Spring Boot AI Toolkit.md`.

### 3-Tier Grounding Rules
1. **Tier 1 (Vault Authority)**: If a tool or architecture pattern is defined in the vault, its choice is **binding** (e.g. Bruno for API verification, pgvector/Flyway, Docker).
2. **Tier 2 (Open Fallback)**: For standard utilities and libraries not in the vault (e.g., standard Spring starters, Lombok, Jackson utilities), use modern minimal defaults. State your rationale.
3. **Tier 3 (Prohibited)**: Never import tools marked as Sunset or High-Risk in `90_Archive_or_Parked/Archive and Parked MOC.md`.

---

## 2. ⚡ Stack & Exact Versions

> [!IMPORTANT]
> This project runs on modern Spring Boot 4.x and Java 25. **Do NOT generate obsolete Spring Boot 2/3 code.**

- **Java Version:** 25 (`<java.version>25</java.version>`)
- **Spring Boot:** `4.1.1` (Spring Framework 7)
- **Database:** PostgreSQL + Flyway for schema migrations (`src/main/resources/db/migration/`)
- **Authentication:** Stateless JWT via Spring Security (Lambda DSL syntax only; no deprecated `.and()`)
- **API Documentation:** Springdoc OpenAPI `2.6.0` (Swagger UI at `/swagger-ui.html`)
- **Testing:** JUnit, Mockito (`@MockitoBean` / `@MockitoSpyBean`, **never** `@MockBean`), AssertJ
- **Build Tool:** Maven Wrapper (`mvnw` / `mvnw.cmd`)

### Boot 4 Invariants to Strictly Follow:
- Use `@MockitoBean` instead of removed `@MockBean`.
- Use modern Spring Security 7 Lambda DSL: `http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated())`.
- Jackson 3 codec is standard: use `tools.jackson` packages and `JsonMapper` builder patterns.

---

## 3. 🛠️ Build, Run & Verification Commands

Climb the Verification Ladder in order. Always run checks before declaring a task complete:

```powershell
# 1. Fast compile & lint check (run after every edit)
.\mvnw.cmd -q clean compile

# 2. Run unit & slice tests
.\mvnw.cmd clean test

# 3. Full package & integration verification
.\mvnw.cmd clean verify

# 4. Start local development server
.\mvnw.cmd spring-boot:run

# 5. Start supporting infrastructure (PostgreSQL)
docker compose up -d
```

*(On Linux / Bash, replace `.\mvnw.cmd` with `./mvnw`)*

---

## 4. 🏛️ Core Architectural Rules

1. **Spec Before Code (P-D-E Loop)**:
   - Before writing multi-file code, outline your step-by-step implementation plan, assumptions, and edge cases.
   - Wait for approval before modifying files.
2. **Flyway Migration Invariant**:
   - **NEVER** modify an existing applied Flyway migration file (`V1__*.sql`).
   - Any database schema change must be added as a **new versioned migration file**: `src/main/resources/db/migration/V<NextNumber>__<description>.sql`.
3. **API Contract First**:
   - Write or update DTOs, request validation constraints (`jakarta.validation`), and Swagger annotations before implementing controller logic.
   - Verify endpoints locally using Bruno or curl.
4. **Atomic Git Commits**:
   - Keep changes small and scoped to one testable feature or bugfix.
   - If tests fail, fix the root cause or revert to the last working git commit. Do not guess in loops.

---

## 5. 📋 Agent Workflow & Issue Tracking

- **Issue Tracker**: Issues live in GitHub Issues (using `gh` CLI). See `docs/agents/issue-tracker.md`.
- **Triage Labels**: Default canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.
- **Domain Docs**: Single-context documentation (`CONTEXT.md` and `docs/adr/` at repo root). See `docs/agents/domain.md`.
