# Gym-Management-System

## Overview
This project is a gym management system built using Java Spring Boot microservices and a React frontend. It includes functionalities for members, attendance, and trainers, with each service having its own MySQL database.

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Database Setup](#1-database-setup)
  - [Backend Setup](#2-backend-microservices-setup)
  - [Frontend Setup](#3-frontend-setup)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Member Management**: Complete CRUD operations for gym members
- **Trainer Management**: Manage trainer profiles and assignments
- **Attendance Tracking**: Real-time attendance monitoring and history
- **Admin Dashboard**: Comprehensive administrative interface
- **Microservices Architecture**: Independent, scalable services
- **RESTful APIs**: Well-structured API endpoints
- **Responsive UI**: Modern, user-friendly React interface
- **Database per Service**: Each microservice has its own MySQL database

---

## 🏗️ Architecture

This application follows a **microservices architecture** pattern where each service is independently deployable and maintains its own database.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (React Application)                       │
│                  http://localhost:3000                       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ REST API Calls
             │
    ┌────────┴─────────┬─────────────┬─────────────────┐
    │                  │             │                 │
┌───▼───────────┐ ┌───▼───────┐ ┌──▼──────────────┐
│   Member      │ │ Attendance │ │    Trainer      │
│ Microservice  │ │Microservice│ │  Microservice   │
└───┬───────────┘ └───┬────────┘ └──┬──────────────┘
    │                 │              │
┌───▼───────────┐ ┌───▼────────┐ ┌──▼──────────────┐
│   memberdb    │ │ attendance │ │   trainerdb     │
│   (MySQL)     │ │  (MySQL)   │ │    (MySQL)      │
└───────────────┘ └────────────┘ └─────────────────┘
```

---

## 🛠️ Technology Stack

### Backend
- **Java 11+**
- **Spring Boot 2.x/3.x**
- **Spring Data JPA**
- **MySQL 8.x**
- **Maven** - Dependency management

### Frontend
- **React 18.x**
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **CSS3** - Styling

### Development Tools
- **phpMyAdmin** - Database management
- **Postman** - API testing (recommended)
- **VS Code / IntelliJ IDEA** - IDEs

---

## Project Structure

1. **Gym-Management** - React interface for the system.
2. **Attendance** - Spring Boot microservice for gym attendance.
3. **MemberMicroservice** - Spring Boot microservice for gym members.
4. **TrainerMicroservice** - Spring Boot microservice for trainers.
5. **Databases** - Contains SQL files for database setup.
6. **Group Details** - Group and member details in PDF.

```
Gym-Management-System/
│
├── Gym-Management/                 # React Frontend Application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Attendance/                     # Attendance Microservice
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── MemberMicroservice/            # Member Management Microservice
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── TrainerMicroservice/           # Trainer Management Microservice
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── Databases/                     # SQL Database Scripts
│   ├── attendance.sql
│   ├── memberdb.sql
│   └── trainerdb.sql
│
├── Group Details/                 # Project Documentation
│   └── [Group and member details PDF]
│
└── README.md
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** - Version 11 or higher
  ```bash
  java -version
  ```

- **Maven** - Version 3.6 or higher
  ```bash
  mvn -version
  ```

- **Node.js** - Version 16 or higher
  ```bash
  node -v
  npm -v
  ```

- **MySQL** - Version 8.0 or higher
  ```bash
  mysql --version
  ```

- **XAMPP/WAMP** - For phpMyAdmin (optional but recommended)

---

## 🚀 Installation & Setup

### 1. Database Setup

1. Open phpMyAdmin.
2. Create databases: `attendance`, `memberdb`, `trainerdb`.
3. Import SQL files from the `Databases` folder into respective databases.

#### Detailed Steps:

**Step 1: Start MySQL Server**
- If using XAMPP/WAMP, start Apache and MySQL services
- Access phpMyAdmin at `http://localhost/phpmyadmin`

**Step 2: Create Databases**
Open phpMyAdmin or MySQL command line and execute:

```sql
CREATE DATABASE attendance;
CREATE DATABASE memberdb;
CREATE DATABASE trainerdb;
```

**Step 3: Import SQL Files**
1. In phpMyAdmin, select each database
2. Navigate to the **Import** tab
3. Import the corresponding SQL file from the `Databases/` folder:
   - Import `attendance.sql` into `attendance` database
   - Import `memberdb.sql` into `memberdb` database
   - Import `trainerdb.sql` into `trainerdb` database

Alternatively, use MySQL command line:
```bash
mysql -u root -p attendance < Databases/attendance.sql
mysql -u root -p memberdb < Databases/memberdb.sql
mysql -u root -p trainerdb < Databases/trainerdb.sql
```

---

### 2. Microservices Setup

1. Open each microservice (Attendance, MemberMicroservice, TrainerMicroservice) in your IDE.
2. Run each service: `mvn spring-boot:run`

#### Detailed Steps for Each Service:

**Attendance Microservice**

```bash
# Navigate to the Attendance directory
cd Attendance

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

Default port: `8081` (verify in `application.properties`)

---

**Member Microservice**

```bash
# Navigate to the MemberMicroservice directory
cd MemberMicroservice

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

Default port: `8082` (verify in `application.properties`)

---

**Trainer Microservice**

```bash
# Navigate to the TrainerMicroservice directory
cd TrainerMicroservice

# Install dependencies and run
mvn spring-boot:run
```

Default port: `8083` (verify in `application.properties`)

---

### 3. Frontend Setup (React)

1. Open the `Gym-Management` folder.
2. Install dependencies: `npm install`
3. Run the frontend: `npm run dev`
4. Access the system at: `http://localhost:3000`

#### Detailed Steps:

```bash
# Navigate to the React application directory
cd Gym-Management

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at: **http://localhost:3000**

---

## ⚙️ Configuration

### Backend Configuration

Update the `application.properties` file in each microservice with your MySQL credentials:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/[database_name]
spring.datasource.username=root
spring.datasource.password=[your_password]
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Port
server.port=[service_port]
```

### Frontend Configuration

Update API endpoints in your React application if the backend ports are different:

```javascript
// src/config/api.js (or wherever your API configuration is)
const API_BASE_URL = {
  member: 'http://localhost:8082',
  attendance: 'http://localhost:8081',
  trainer: 'http://localhost:8083'
};
```

---

## 💻 Usage

### Admin Login

Access the admin panel at `http://localhost:3000`

**Admin Credentials:**
- Username: `admin`
- Password: `admin123`

> Note: Please update these default credentials for production use.

### Main Features

1. **Dashboard**: View system overview and statistics
2. **Members**: Add, edit, delete, and view member information
3. **Trainers**: Manage trainer profiles and schedules
4. **Attendance**: Track and record member attendance
5. **Reports**: Generate various reports (if implemented)

---

## 🔌 API Endpoints

### Member Service (Port 8082)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | Get all members |
| GET | `/api/members/{id}` | Get member by ID |
| POST | `/api/members` | Create new member |
| PUT | `/api/members/{id}` | Update member |
| DELETE | `/api/members/{id}` | Delete member |

### Attendance Service (Port 8081)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance/{id}` | Get attendance by ID |
| POST | `/api/attendance` | Record attendance |
| GET | `/api/attendance/member/{memberId}` | Get member attendance history |

### Trainer Service (Port 8083)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trainers` | Get all trainers |
| GET | `/api/trainers/{id}` | Get trainer by ID |
| POST | `/api/trainers` | Create new trainer |
| PUT | `/api/trainers/{id}` | Update trainer |
| DELETE | `/api/trainers/{id}` | Delete trainer |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

For team member details, please refer to the **Group Details** folder.

---

## 📞 Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Contact: [Your contact information]

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MySQL Documentation
- All contributors to this project

---

**Made with ❤️ by [Your Team Name]**
