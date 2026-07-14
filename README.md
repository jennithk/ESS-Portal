# ESS Portal (Employee Self-Service Portal)

A full-stack Employee Self-Service (ESS) Portal developed as an internship project. The application enables Employees, HR, and Administrators to manage daily HR operations through a secure and user-friendly web interface.

---

## Overview

ESS Portal is designed to simplify employee management by providing separate dashboards and functionalities for Employees, HR, and Administrators. The application includes attendance tracking, leave management, payroll, performance evaluation, training management, and notifications.

---

## Features

### Employee
- User Registration and Login
- Dashboard
- Profile Management
- Attendance Management
- Leave Application
- Payroll View
- Performance Records
- Training Records
- Notifications

### HR
- HR Dashboard
- Employee Management
- Leave Approval and Rejection
- Payroll Management
- Performance Management
- Training Management
- Notification Management

### Administrator
- Admin Dashboard
- User Management
- System Analytics

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

---

## Project Structure

```
ESS-Portal/
│
├── client/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── package.json
├── README.md
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/jennithk/ESS-Portal.git
```

### Navigate to the Project

```bash
cd ESS-Portal
```

### Install Dependencies

#### Root

```bash
npm install
```

#### Server

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Running the Project

### Start the Server

```bash
cd server
npm run dev
```

Server URL:

```
http://localhost:5000
```

---

## Modules

- Authentication
- Employee Dashboard
- HR Dashboard
- Admin Dashboard
- Attendance Management
- Leave Management
- Payroll Management
- Performance Management
- Training Management
- Notification Management
- Analytics

---

## User Roles

| Role | Access |
|------|--------|
| Employee | Employee Portal |
| HR | HR Portal |
| Admin | Admin Portal |

---

## Future Enhancements

- Email Notifications
- Payroll PDF Generation
- Employee Search and Filtering
- Dashboard Charts and Analytics
- Profile Picture Upload
- Mobile Responsive Improvements

---

## Author

**Jennith Pranay Kaile**

GitHub: https://github.com/jennithk

LinkedIn: https://www.linkedin.com/in/jennith-pranay-kaile-595761320/

---

## License

This project was developed for educational and internship purposes only.
