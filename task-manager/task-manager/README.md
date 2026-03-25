# Task Manager App

A full stack MERN application where users can register, login, and manage their personal tasks.

## Features
- User Registration and Login with JWT authentication
- Add, complete, and delete tasks
- Each user sees only their own tasks
- Task summary (total, pending, completed)
- Protected routes — only logged in users can access tasks

## Tech Stack
- **Frontend:** React.js, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Tokens), bcryptjs

## Project Structure
```
task-manager/
├── backend/
│   ├── server.js
│   ├── models/         User.js, Task.js
│   ├── routes/         authRoutes.js, taskRoutes.js
│   └── middleware/     authMiddleware.js
└── frontend/
    └── src/
        ├── pages/      LoginPage, RegisterPage, TasksPage
        └── components/ TaskCard, AddTaskForm
```

## How to Run

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
