# Project Structure

This document provides an overview of the Personal Task Management System project structure.

## 📁 Root Directory

```
task-management-system/
├── backend/                 # Node.js Express API server
├── frontend/               # React.js client application
├── setup.sh               # Automated setup script
├── README.md              # Main project documentation
├── API_DOCUMENTATION.md   # Complete API reference
└── PROJECT_STRUCTURE.md   # This file
```

## 🔧 Backend Structure

```
backend/
├── models/                 # Database models
│   ├── User.js            # User schema and methods
│   └── Task.js            # Task schema and methods
├── routes/                 # API route handlers
│   ├── auth.js            # Authentication routes
│   └── tasks.js           # Task CRUD routes
├── middleware/             # Custom middleware
│   └── auth.js            # JWT authentication middleware
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
└── server.js             # Main application entry point
```

### Backend Key Files

- **server.js**: Main Express application setup, middleware configuration, and server initialization
- **models/User.js**: User data model with password hashing and validation
- **models/Task.js**: Task data model with user relationship and indexing
- **routes/auth.js**: User registration, login, and profile endpoints
- **routes/tasks.js**: Complete CRUD operations for tasks with filtering and statistics
- **middleware/auth.js**: JWT token verification and user authentication

## ⚛️ Frontend Structure

```
frontend/
├── public/                 # Static assets
│   └── index.html         # HTML template
├── src/                   # React source code
│   ├── components/        # Reusable UI components
│   │   ├── LoadingSpinner.js
│   │   ├── Navbar.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   ├── TaskList.js
│   │   └── TaskStats.js
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.js # Authentication state management
│   ├── pages/             # Page components
│   │   ├── Dashboard.js   # Main task management interface
│   │   ├── Login.js       # User login form
│   │   └── Register.js    # User registration form
│   ├── App.js             # Main app component with routing
│   ├── index.css          # Global styles with Tailwind
│   └── index.js           # React app entry point
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

### Frontend Key Files

- **App.js**: Main application component with routing and authentication guards
- **contexts/AuthContext.js**: Global authentication state management with JWT handling
- **pages/Dashboard.js**: Main task management interface with CRUD operations
- **components/TaskForm.js**: Modal form for creating and editing tasks
- **components/TaskList.js**: Task display with filtering and sorting
- **components/TaskStats.js**: Visual statistics and progress tracking

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  priority: String (enum: low/medium/high),
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Data Flow

### Authentication Flow
1. User submits login/register form
2. Frontend sends request to backend API
3. Backend validates credentials and returns JWT
4. Frontend stores JWT and updates auth context
5. Subsequent requests include JWT in headers

### Task Management Flow
1. User interacts with task interface
2. Frontend sends API request with JWT
3. Backend validates JWT and processes request
4. Database operation performed
5. Response sent back to frontend
6. UI updated with new data

## 🎨 UI/UX Design Patterns

### Component Hierarchy
```
App
├── Navbar
├── Login/Register (public routes)
└── Dashboard (protected route)
    ├── TaskStats
    ├── TaskList
    │   └── TaskItem (multiple)
    └── TaskForm (modal)
```

### State Management
- **Global State**: Authentication (React Context)
- **Local State**: Component-specific data (useState)
- **Server State**: API data with local caching

## 🔒 Security Architecture

### Backend Security
- Password hashing with bcrypt
- JWT token authentication
- Input validation with express-validator
- CORS configuration
- Helmet.js security headers
- Rate limiting (recommended)

### Frontend Security
- JWT token storage in localStorage
- Automatic token cleanup on logout
- Protected routes with authentication guards
- Input sanitization
- HTTPS enforcement (production)

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT implementation",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables",
  "express-validator": "Input validation",
  "helmet": "Security headers"
}
```

### Frontend Dependencies
```json
{
  "react": "UI library",
  "react-router-dom": "Client-side routing",
  "axios": "HTTP client",
  "react-hot-toast": "Notifications",
  "lucide-react": "Icons",
  "tailwindcss": "CSS framework"
}
```

## 🚀 Build Process

### Development
1. Backend: `npm run dev` (nodemon for auto-restart)
2. Frontend: `npm start` (React dev server with hot reload)
3. Database: MongoDB running locally or cloud

### Production
1. Backend: `npm start` (production server)
2. Frontend: `npm run build` → static files served
3. Database: MongoDB with authentication enabled

## 📊 Performance Considerations

### Backend Optimizations
- Database indexing on user and date fields
- Query optimization with aggregation pipelines
- Response compression
- Connection pooling

### Frontend Optimizations
- Code splitting with React.lazy()
- Memoization with React.memo()
- Efficient re-renders with proper key props
- Image optimization and lazy loading

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for models and utilities
- Integration tests for API endpoints
- Authentication flow testing
- Database operation testing

### Frontend Testing
- Component unit tests with React Testing Library
- Integration tests for user flows
- E2E tests with Cypress (recommended)
- Accessibility testing

## 📈 Monitoring and Logging

### Backend Monitoring
- Health check endpoint
- Error logging with Winston
- Performance metrics
- Database connection monitoring

### Frontend Monitoring
- Error boundary for crash reporting
- User analytics (optional)
- Performance monitoring
- Console error tracking

## 🔄 Development Workflow

### Git Workflow
```
main (production)
├── develop (integration)
├── feature/task-creation
├── feature/user-auth
└── hotfix/critical-bug
```

### Code Standards
- ESLint for JavaScript linting
- Prettier for code formatting
- Conventional commits
- Pre-commit hooks with Husky

## 🚀 Local Development Setup

### Development Environment
- Local MongoDB instance or MongoDB Atlas
- Backend on localhost:5000
- Frontend on localhost:3000

### Getting Started
1. Run `./setup.sh` for automated setup
2. Configure `.env` file in backend directory
3. Start backend: `cd backend && npm run dev`
4. Start frontend: `cd frontend && npm start`

This structure provides a solid foundation for a scalable, maintainable task management application with modern development practices and security considerations.