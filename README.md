<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="WeatherWise Logo" width="120" />

  # 🌤️ WeatherWise Backend

  **An intelligent weather application empowered by AI insights, personalized alerts, and robust caching.**

  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
  [![Java 21](https://img.shields.io/badge/Java-21-blue.svg?logo=java)](https://openjdk.java.net/)
  [![Redis](https://img.shields.io/badge/Redis-Caching-red.svg?logo=redis)](https://redis.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg?logo=postgresql)](https://www.postgresql.org/)
  [![OpenAI](https://img.shields.io/badge/AI-OpenAI-black.svg?logo=openai)](https://openai.com/)
  [![JWT Auth](https://img.shields.io/badge/Security-JWT-blueviolet.svg)](https://jwt.io/)

</div>

---

## 📖 Overview

**WeatherWise** is a comprehensive Spring Boot backend application designed to deliver more than just basic weather data. It leverages real-time weather APIs and **OpenAI integration** to provide actionable, intelligent insights. With secure user authentication, personalized weather preferences, and automated email scheduling, WeatherWise acts as your personal daily weather assistant. 

Whether it's reminding you to take an umbrella or warning you about high temperatures, WeatherWise keeps you ahead of the forecast.

---

## ✨ Key Features

- **🔐 Secure Authentication:** JWT-based user registration and login to keep user profiles and preferences secure.
- **⛅ Real-time Weather:** Integration with third-party weather providers (via WebFlux) to fetch accurate atmospheric conditions.
- **🧠 AI-Powered Insights:** Uses Spring AI (OpenAI) to generate intelligent recommendations based on current weather (e.g., clothing suggestions, travel warnings).
- **⚙️ User Preferences:** Users can save their favorite locations and custom weather alert thresholds.
- **⚡ High-Performance Caching:** Redis is integrated to drastically reduce external API calls by caching weather reports and insights.
- **🔔 Scheduled Email Alerts:** Automated CRON jobs evaluate user preferences against current weather and dispatch beautifully formatted email alerts if conditions are met.
- **🗄️ Relational Data Management:** robust persistence of user data and preferences using Spring Data JPA and PostgreSQL.

---

## 🛠️ Tech Stack 

| Category | Technology |
|---|---|
| **Core Framework** | Java 21, Spring Boot 3.5 |
| **Database** | PostgreSQL, Spring Data JPA |
| **Caching** | Redis, Spring Data Redis |
| **Security** | Spring Security, JWT (JSON Web Tokens) |
| **External APIs** | Spring WebFlux (WebClient) |
| **AI Integration** | Spring AI (OpenAI APIs) |
| **Task Scheduling** | Spring Boot automated CRON jobs |
| **Email Service** | Spring Boot Starter Mail |

---

## 🚀 Getting Started

### Prerequisites
Before running the project locally, ensure you have the following installed:
* **Java 21** or higher
* **Maven** (or use the included Maven wrapper `mvnw`)
* **PostgreSQL** running locally or remotely
* **Redis server** running locally or remotely
* An **OpenAI API Key**

### 1. Configuration
The sensitive configuration files (`.properties`) are intentionally not included in the version control for security. 
Create your own `application.properties` in `src/main/resources/` with the following variables:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/weatherwise
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# Redis Configuration
spring.redis.host=localhost
spring.redis.port=6379

# JWT Configuration
jwt.secret=generate_a_very_long_secure_random_base64_string_here
jwt.expiration=86400000

# OpenAI Configuration
spring.ai.openai.api-key=your_openai_api_key

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### 2. Build and Run

You can run the application directly using the Maven wrapper:

```bash
# Windows
./mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
```

The server should start on the default port `8080`.

---

## 📁 Project Structure

```
src/main/java/com/backend/WheaterWise/
 ├── config/       # Spring Security, Redis, and WebFlux configurations
 ├── controller/   # REST API Endpoints (Auth, Weather, Preferences)
 ├── dto/          # Data Transfer Objects for API requests/responses
 ├── exception/    # Global error handling and custom exceptions
 ├── external/     # Integration logic for 3rd party APIs (Weather API / OpenAI)
 ├── model/        # JPA Entities (User, Preference, etc.)
 ├── repository/   # Spring Data JPA repositories
 └── service/      # Business logic (Auth, Weather, AI Insights, Emails, Scheduler)
```

---

<div align="center">
  <i>Developed with ❤️ for better weather forecasting.</i>
</div>
