FROM maven:3.8.3-openjdk-17
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package
RUN cp target/server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
