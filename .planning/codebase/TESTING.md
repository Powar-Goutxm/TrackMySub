---
last_mapped_commit: 589d98358dd3f20eefe8d8ec8e0febd82d6e8588
last_mapped_at: 2026-10-09
---
# Testing Patterns

**Analysis Date:** 2026-10-09

## Current Test Suite Status

- **Status:** Unpopulated / Missing test classes in `src/test/java`.
- **Infrastructure Ready:** The Maven build file (`pom.xml`) is fully equipped with modern testing starters:
  - `spring-boot-starter-test` (JUnit 5, AssertJ, Mockito).
  - `spring-security-test` (Security context mock utilities).
  - `com.h2database:h2` (In-memory testing database).

## Prescribed Testing Patterns

When writing tests in this codebase, adhere to the following rules:

### 1. Mockito in Spring Boot 4

- **Rule:** Never use `@MockBean` (removed in Boot 4).
- **Rule:** Use `@MockitoBean` and `@MockitoSpyBean` for injecting mock dependencies into the Spring context.

### 2. Unit Testing Service Logic

- Mock repositories using pure Mockito (`@ExtendWith(MockitoExtension.class)`):
  ```java
  @ExtendWith(MockitoExtension.class)
  class SubscriptionServiceTest {
      @Mock
      private SubscriptionRepository subscriptionRepository;
      @InjectMocks
      private SubscriptionService subscriptionService;
  }
  ```

### 3. Web Slice Testing Controllers

- Use `@WebMvcTest` with `@MockitoBean`:
  ```java
  @WebMvcTest(SubscriptionController.class)
  @AutoConfigureMockMvc(addFilters = false)
  class SubscriptionControllerTest {
      @Autowired
      private MockMvc mockMvc;
      @MockitoBean
      private SubscriptionService subscriptionService;
  }
  ```

### 4. Running Tests

```powershell

# Fast unit and slice tests

.\mvnw.cmd clean test

# Full package and verification

.\mvnw.cmd clean verify
```

<!-- refreshed: 2026-10-09 -->
