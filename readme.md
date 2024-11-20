# Reshift Africa - Capstone Project

**Reshift Africa** is a comprehensive end-to-end website designed to facilitate carbon offsetting partnerships by connecting offsetters and project developers. This website was developed as the final year capstone project, showcasing the integration of modern web technologies, user-centered design, and database-driven functionality.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Local Installation and Setup](#Local-installation-and-setup)
5. [Deployed application links](#Deployed-application-links)
5. [Usage](#usage)
6. [Project Architecture](#project-architecture)
7. [Testing](#testing)
8. [Future Enhancements](#future-enhancements)
9. [Authors](#Author)

---

## Project Overview

The primary goal of this platform is to streamline carbon offsetting initiatives by:
- Allowing **offsetters** to submit applications to partner with Reshift Africa.
- Enabling **admins** to manage offsetter applications via a secure dashboard.
- Displaying approved offsetters dynamically on a user-friendly page
- Enabling Reshift Africa to generate leads on potential project developers through brand awareness

For a detailed walkthrough of the entire website, see demo here[]

---

## Features

### **Frontend Features**
- **User Authentication**: Secure login system for admins.
- **Offsetters Page**: Dynamic display of approved offsetters with rich, responsive design.
- **Offsetter Application Form**: A submission form for offsetters to provide their details.
- **Admin Dashboard**: Allows admins to approve/reject applications and search pending offsetters.

### **Backend Features**
- **RESTful APIs**: Handle dynamic data operations (CRUD) for offsetters and pending applications.
- **Session Management**: Secure authentication and admin session handling.
- **Database Integration**: MongoDB for storing offsetter details.

### **Testing and Deployment**
- Comprehensive testing for validation, integration, and system performance.
- Deployed on Vercel with seamless frontend-backend communication.

---

## Technologies Used

### **Frontend**
- HTML, CSS, JavaScript

### **Backend**
- Python (Flask)
- REST API architecture

### **Database**
- MongoDB (Atlas Cloud Database)

### **Deployment**
- Deployed using Vercel

### **Version Control**
- Git and GitHub

---

## Local Installation and Setup

### **Clone the Repository**
```bash
git clone https://github.com/GichuriNdungu/capstone_final.git
cd capstone_final
```
### To Acess the Admin dashboard:

```bash 
cd admin
```
### To Access the Reshift client website

```bash
cd main
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
1. Open the project folder in a code editor, navigate to the index.html file at the root of each folder (admin/main) as entry points to either the client side or the admin dashboard
## Usage

### Admin Login:
- Visit `/admin/login.html` and enter admin credentials.
- Access the admin dashboard to manage offsetter applications.

### Offsetters Page:
- view the main client website at `/main/index.html`.

## Deployed Application Links
- [Main Client Website](https://reshift.vercel.app/index.html)
- [Admin Dashboard](https://adminreshift.vercel.app/)

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


## Testing

### Unit Testing
- Tested individual endpoints for CRUD operations.
- Verified form validation and error handling.

### Integration Testing
- Ensured seamless interaction between frontend and backend for data retrieval.

### Functional Testing
- Verified that all features align with the functional requirements.

## Future Enhancements
- **Analytics Dashboard:** Display statistics and trends for offsetting partnerships.
- **Email Notifications:** Notify admins and offsetters about application updates.

## Author
Martin Ndungu
