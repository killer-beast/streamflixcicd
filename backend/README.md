# Streamflow Backend (Spring Boot + Maven)

Minimal auth backend for login and signup. Uses MySQL by default.

- Spring Boot 3: Web, Security, Validation
- JPA + H2 (in-memory)
- JWT (jjwt)

## Endpoints
- POST /api/auth/register { email, password } -> { token }
- POST /api/auth/login { email, password } -> { token }

Send Authorization: Bearer <token> for protected routes.

## MySQL Setup
- Create database: `CREATE DATABASE streamflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
- Update credentials in `src/main/resources/application.properties`:
  - `spring.datasource.username`
  - `spring.datasource.password`

## Run
- Requires Java 17+
- From backend/:
  - mvn spring-boot:run

Runs on http://localhost:8080 with CORS for http://localhost:5173.

### Notes
- Lombok: Enable annotation processing in your IDE if you see errors on Lombok annotations.
- CORS: Override origin via env `APP_CORS_ORIGIN` or JVM `-Dapp.cors.origin=`.

## Config
- Edit src/main/resources/application.properties
- H2 console: /h2
- Change app.jwt.secret for production

## Build
- mvn clean package

