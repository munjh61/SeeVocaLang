# Dockerfile (호환 버전)

FROM openjdk:17-slim AS builder

# 필요하면 유지
RUN apt-get update && apt-get install -y --no-install-recommends findutils \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1) Gradle 관련 파일만 먼저 복사 (의존성 캐시 레이어)
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# 2) 권한 + 의존성만 선반영 (캐시됨)
RUN chmod +x gradlew
# dependencies 태스크가 없다면 아래 줄은 건너뛰어도 OK
RUN ./gradlew dependencies --no-daemon || true

# 3) 실제 소스 복사
COPY . .

# 4) 빌드
RUN ./gradlew clean build -x test --no-daemon

# ---- Runtime
FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=prod"]
