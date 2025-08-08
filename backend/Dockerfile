# syntax=docker/dockerfile:1.7

###############
# Build stage #
###############
FROM openjdk:17-slim AS builder

# (빌드 중 find 명령이 꼭 필요하면 유지)
RUN apt-get update && apt-get install -y --no-install-recommends findutils \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1) Gradle 관련 파일만 먼저 복사 (의존성 캐시 유지용)
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle gradle.properties* ./

# 2) gradlew 권한 + Gradle/의존성 캐시 워밍업
RUN chmod +x gradlew
# BuildKit 캐시 마운트: Gradle distro/의존성 캐시를 레이어에 안 굽고, 외부 캐시에 보관
RUN --mount=type=cache,target=/root/.gradle ./gradlew --no-daemon -v || true
RUN --mount=type=cache,target=/root/.gradle ./gradlew --no-daemon dependencies || true

# 3) 나머지 소스 복사
COPY . .

# 4) 빌드 (테스트 제외)
RUN --mount=type=cache,target=/root/.gradle ./gradlew clean build -x test --no-daemon

################
# Runtime stage #
################
FROM openjdk:17-slim

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=prod"]