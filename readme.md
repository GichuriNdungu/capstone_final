# Reshift Africa - Capstone Project

**Reshift Africa** is a comprehensive platform designed to facilitate carbon offsetting partnerships by connecting offsetters and project developers. This website was developed as the final year capstone project, showcasing the integration of modern web technologies, user-centered design, and database-driven functionality.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [Project Architecture](#project-architecture)
7. [Screenshots](#screenshots)
8. [Testing](#testing)
9. [Future Enhancements](#future-enhancements)
10. [Acknowledgments](#acknowledgments)

---

## Project Overview

The primary goal of this platform is to streamline carbon offsetting initiatives by:
- Allowing **offsetters** to submit applications to partner with Reshift Africa.
- Enabling **admins** to manage offsetter applications via a secure dashboard.
- Displaying approved offsetters dynamically on a user-friendly page.

The platform focuses on sustainability, transparency, and efficient use of technology to promote climate action through accessible partnerships.

---

## Features

### **Frontend Features**
- **User Authentication**: Secure login system for admins.
- **Offsetters Page**: Dynamic display of approved offsetters with rich, responsive design.
- **Offsetter Application Form**: A submission form for offsetters to provide their details.
- **Admin Dashboard**: Allows admins to approve/reject applications and search pending offsetters.
- **Responsive Design**: Fully functional across devices.

### **Backend Features**
- **RESTful APIs**: Handle dynamic data operations (CRUD) for offsetters and pending applications.
- **Session Management**: Secure authentication and admin session handling.
- **Database Integration**: MongoDB for storing offsetter details.

### **Testing and Deployment**
- Comprehensive testing for validation, integration, and system performance.
- Deployed on a cloud platform with seamless frontend-backend communication.

---

## Technologies Used

### **Frontend**
- HTML, CSS, JavaScript
- Responsive design principles

### **Backend**
- Python (Flask)
- REST API architecture

### **Database**
- MongoDB (Atlas Cloud Database)

### **Deployment**
- Deployed using Railway

### **Version Control**
- Git and GitHub

---

## Installation and Setup

### **Clone the Repository**
```bash
git clone https://github.com/GichuriNdungu/capstone_final.git
cd capstone_final
```


```bash
pip install -r requirements.txt
```

### Set up environment variables in a .env file:
```plaintext
SECRET_KEY=your_secret_key
MONGO_URI=your_mongo_db_uri
```

### Run the Flask server:
```bash
python server.py
```

## Frontend Setup
1. Open the project folder in a code editor (e.g., VS Code).
2. Ensure the `index.html` file and other assets are linked correctly.

## Usage

### Admin Login:
- Visit `/login.html` and enter admin credentials.
- Access the admin dashboard to manage offsetter applications.

### Offsetter Application:
- Navigate to `/add-offsetter.html` to submit applications.

### Offsetters Page:
- View dynamically displayed approved offsetters at `/offsetters.html`.

## Project Architecture
```plaintext
+---------------------+         +-------------------------+
|  Client/Browser     |         |  Admin Dashboard        |
|  (Users & Admins)   |         |                         |
+---------------------+         +-------------------------+
         |                                 |
         |                                 |
         v                                 v
+---------------------------------------------------+
|                     Backend                      |
|              (Flask Python Server)               |
| +---------------------------------------------+  |
| |             Routing & APIs                  |  |
| |  - Serve HTML pages (login, index, etc.)    |  |
| |  - API Endpoints for CRUD operations        |  |
| +---------------------------------------------+  |
|        Data Validation & Authentication         |
| +---------------------------------------------+  |
| | Admin Login & Session Management            |  |
| | Admin Authorization                         |  |
| +---------------------------------------------+  |
|                                                   |
+---------------------------------------------------+
         |                                 |
         v                                 v
+---------------------------------------------------+
|                   Database (MongoDB)             |
| +---------------------------------------------+  |
| | Collections:                                |  |
| |  - offsetters (approved offsetters)        |  |
| |  - pending-approval (applications)         |  |
| +---------------------------------------------+  |
|                                                   |
+---------------------------------------------------+
```

## Screenshots
- **Login Page:**
- **Admin Dashboard:**
- **Offsetters Page:**
- **Offsetter Application Form:**

## Testing

### Unit Testing
- Tested individual endpoints for CRUD operations.
- Verified form validation and error handling.

### Integration Testing
- Ensured seamless interaction between frontend and backend for data retrieval.

### Functional Testing
- Verified that all features align with the functional requirements.

## Future Enhancements
- **Project Developers Module:** Allow project developers to connect with offsetters.
- **Analytics Dashboard:** Display statistics and trends for offsetting partnerships.
- **Email Notifications:** Notify admins and offsetters about application updates.

## Acknowledgments
Special thanks to the instructors and peers who provided guidance and support throughout the project development process.
```

Feel free to adjust any sections as needed!