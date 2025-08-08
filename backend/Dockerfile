FROM openjdk:17 AS builder
WORKDIR /app

# 전체 복사
COPY . .

# 1) 라인엔딩 정규화( CRLF → LF ) + 실행권한 부여
#    dos2unix 없이 sed로 처리
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

# 2) noexec 환경 대비: 셸로 실행
RUN /bin/sh ./gradlew clean build -x test --no-daemon

FROM openjdk:17
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
