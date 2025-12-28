# 📚 Smart Library Management System

A modern, responsive, and interactive web application for managing university library resources. Built with **Pure HTML, CSS, and Vanilla JavaScript**, focusing on clean architecture, premium UI/UX, and academic code standards.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)

## ✨ Key Features

### 🔐 Authentication Module
*   **Animated Sliding Panels**: Smooth CSS transitions between Login and Sign Up views.
*   **Secure Access**: Mock authentication protects the dashboard from unauthorized access.
*   **Password Reset**: Interactive "Forgot Password" modal flow.

### 🎓 Student Dashboard
*   **Profile Management**: View student details (Name, ID, Course).
*   **Request History**: Track book requests with real-time status updates (Pending/Approved).
*   **Smart Integration**: New requests are automatically added to your history table.

### 📖 Library Catalog
*   **Dynamic Search**: Real-time filtering by Book Title or Author.
*   **Instant Availability**: Color-coded status badges (Available/Unavailable).
*   **Rich Details**: Modal view with comprehensive book descriptions.

### 🛠️ Technical Highlights
*   **Zero Frameworks**: 100% native DOM manipulation and CSS3 animations.
*   **Responsive Design**: Fully adaptable layout for Desktop, Tablet, and Mobile.
*   **Toast Notifications**: Custom non-intrusive alerts for user feedback.

---

## 🚀 How to Run

Since this project uses pure frontend technologies, no build step or backend server is required.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/smart-library.git
    ```
2.  **Open the Project**
    *   Navigate to the project folder.
    *   Double-click `index.html` to open it in your default browser.

---

## 📂 Project Structure

```text
smart-library/
├── index.html          # Main application entry point (SPA structure)
├── css/
│   └── style.css       # Global styles, variables, and animations
├── js/
│   └── app.js          # Core logic (Auth, Mock DB, Event Handling)
└── README.md           # Project documentation
```

## 💻 Usage Guide

1.  **Sign Up**: Click "Sign Up" on the customized login screen to create a mock account.
2.  **Login**: Use any email/password to enter the dashboard.
3.  **Browse**: Scroll through the list of Business and Programming books.
4.  **Request**: Click "Request" on an available book.
    *   *Note: You cannot request unavailable books.*
5.  **Check Status**: Click the **"My Profile"** button in the header to view your request history.

## 🎨 Design Philosophy

*   **Typography**: Uses `Inter` (Google Fonts) for a clean, professional academic look.
*   **Color Palette**:
    *   Primary: Professional Blue (`#2563eb`)
    *   Status: Green (Available) / Red (Unavailable) / Slate (Text)
*   **Interaction**: Hover effects, focus states, and backdrop blurs for depth.

---

**Developed for Academic Assignment | 2025**

