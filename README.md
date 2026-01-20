# inventory-auth-app
# 🔐 Inventory Management System (Authentication Module)

This project is a **full-stack Inventory Management System** currently implementing the **Authentication module (up to Login)** using **Spring Boot, JWT, React (Vite), and SQL database**.

The system provides:
- A public **Landing Page**
- **User Registration**
- **User Login**
- **Role selection (ADMIN / USER)** stored in the same users table

---

## 🚀 Features Implemented (Till Login)

### 🌐 Landing Page
- Publicly accessible
- Displays basic application information
- Contains **Login** and **Register** buttons

### 📝 User Registration
- Fields:
  - Name
  - Email
  - Mobile Number
  - Password
  - Role (ADMIN / USER)
- Validation using **Jakarta Validation**
- Password encryption using **BCrypt**
- Role saved in the same `users` table

### 🔑 User Login
- Login using **Email + Password**
- JWT token generation on successful login
- Token returned in response

---

## 🏗️ Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- JPA / Hibernate
- Maven
- SQL Database (MySQL / PostgreSQL)

### Frontend
- React
- Vite
- Axios
- React Router

---

## 📁 Project Structure


---

## 🖼️ Screenshots

### 🏠 Landing Page
![Landing Page](images/landing.png)

### 📝 Register Page
![Register Page](images/register.png)

### 🔑 Login Page
![Login Page](images/login.png)

> 📌 Create an `images` folder in the project root and place screenshots there.

---

## ⚙️ Backend Setup

```bash
git clone https://github.com/your-username/inventory-management-system.git
cd backend
