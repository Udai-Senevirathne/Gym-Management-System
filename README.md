# Gym-Management-System

* Overview

This project is a gym management system built using Java Spring Boot microservices and a React frontend. It includes functionalities for  members, attendance, and trainers, with each service having its own MySQL database.

* Project Structure

1. Gym-Management - React interface for the system.
2. Attendance - Spring Boot microservice for gym attendance.
3. MemberMicroservice - Spring Boot microservice for gym members.
4. TrainerMicroservice - Spring Boot microservice for trainers.
5. Databases - Contains SQL files for database setup.
6. Group Details - Group and member details in PDF.

* Database Setup

1. Open phpMyAdmin.
2. Create databases: `attendance`, `memberdb`, `trainerdb`.
3. Import SQL files from the `Databases` folder into respective databases.

* Microservices Setup

1. Open each microservice (Attendance, MemberMicroservice, TrainerMicroservice) in your IDE.
2. Run each service: `mvn spring-boot:run`

* Frontend Setup (React)

1. Open the `Gym-Management` folder.
2. Install dependencies: `npm install`
3. Run the frontend: `npm run dev`
4. 4. Access the system at: `http://localhost:3000`
  
* Admin Login
