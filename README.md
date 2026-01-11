# Personal Task Management System

A full-stack web application for managing personal tasks with user authentication and CRUD operations.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Task Management**: Create, read, update, and delete tasks
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic task list updates
- **Secure**: JWT-based authentication with protected routes

## 🛠️ Tech Stack

### Frontend
- **React.js** with Hooks
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Database
- **MongoDB** with Mongoose ODM

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Quick Setup
Run the automated setup script:
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB connection and JWT secret in .env
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## 📱 Usage

1. **Register**: Create a new account with email and password
2. **Login**: Access your personal dashboard
3. **Add Tasks**: Create new tasks with title and description
4. **Manage Tasks**: Edit, complete, or delete existing tasks
5. **Logout**: Secure session termination

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

## 👨‍💻 Author

Created as part of the Ardentix Full Stack Developer Internship Technical Assignment.

## 📄 License

This project is for educational and assessment purposes.

## 🚀 Getting Started

1. Clone the repository
2. Run `./setup.sh` for automated setup
3. Configure your `.env` file in the backend directory
4. Start the backend: `cd backend && npm run dev`
5. Start the frontend: `cd frontend && npm start`
6. Open http://localhost:3000 in your browser

The application will be running with the backend API on port 5000 and frontend on port 3000.# Ardentix-Assig
