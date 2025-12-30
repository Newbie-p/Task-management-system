# Task Manager – MERN Stack

A full-stack Task Management System built using the MERN stack.  
This application allows users to manage tasks efficiently with priorities, due dates, and status tracking.

---

## 🚀 Features

- User Authentication (JWT-based)
- Create, edit, delete tasks
- Priority-based task management (High / Medium / Low)
- Dashboard view with upcoming tasks
- My Tasks view grouped by:
  - Today
  - Tomorrow
  - This Week
- Inline priority update
- Task status management (Pending / Completed)
- Clean, responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

---
## ⚙️ How to Run Locally

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev

Create a .env file in backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

👨‍💻 Author
Praful Suryawanshi

📌 Notes
This project was built as part of a placement assignment.
The system is designed to be scalable and user-friendly.
Future enhancements may include calendar view and task assignment to multiple users.