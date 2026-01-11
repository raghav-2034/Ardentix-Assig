# API Documentation

Complete API documentation for the Personal Task Management System backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow this format:

```json
{
  "message": "Success message",
  "data": {}, // Response data
  "error": {} // Error details (only on errors)
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error or user already exists
- `500` - Server error

---

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid credentials
- `500` - Server error

---

#### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

---

### Tasks

#### Get All Tasks
```http
GET /tasks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `completed` (optional): `true` or `false` - Filter by completion status
- `priority` (optional): `low`, `medium`, or `high` - Filter by priority
- `sort` (optional): Sort field with optional `-` prefix for descending order
  - `createdAt` - Sort by creation date
  - `-createdAt` - Sort by creation date (newest first)
  - `title` - Sort by title alphabetically
  - `priority` - Sort by priority

**Example:**
```http
GET /tasks?completed=false&priority=high&sort=-createdAt
```

**Response:**
```json
{
  "message": "Tasks retrieved successfully",
  "count": 5,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the task management system",
      "completed": false,
      "priority": "high",
      "dueDate": "2024-01-15T00:00:00.000Z",
      "user": "user_id",
      "createdAt": "2024-01-10T10:00:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

---

#### Create Task
```http
POST /tasks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "high",
  "dueDate": "2024-01-15"
}
```

**Required Fields:**
- `title` (string, 1-100 characters)

**Optional Fields:**
- `description` (string, max 500 characters)
- `priority` (string: `low`, `medium`, `high`) - defaults to `medium`
- `dueDate` (ISO date string)

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management system",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

#### Get Single Task
```http
GET /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task retrieved successfully",
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management system",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid task ID
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

---

#### Update Task
```http
PUT /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "medium",
  "dueDate": "2024-01-20"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "priority": "medium",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-11T15:30:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error or invalid task ID
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

---

#### Delete Task
```http
DELETE /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "task_id",
    "title": "Deleted task",
    // ... other task fields
  }
}
```

**Status Codes:**
- `200` - Deleted successfully
- `400` - Invalid task ID
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

---

#### Get Task Statistics
```http
GET /tasks/stats/summary
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task statistics retrieved successfully",
  "stats": {
    "total": 10,
    "completed": 6,
    "pending": 4,
    "high": 2,
    "medium": 5,
    "low": 3
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

---

### Health Check

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Task Manager API is running",
  "timestamp": "2024-01-10T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Service is healthy

---

## Error Responses

### Validation Errors
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Authentication Errors
```json
{
  "message": "Access denied. No token provided."
}
```

### Not Found Errors
```json
{
  "message": "Task not found"
}
```

### Server Errors
```json
{
  "message": "Internal server error"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute per IP
- Task endpoints: 100 requests per minute per user
- Health check: No limit

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required, 1-100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date (optional),
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the API

### Using cURL

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Create a task (replace TOKEN with actual token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Task","description":"This is a test task","priority":"high"}'

# Get all tasks
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API collection (if available)
2. Set up environment variables for base URL and token
3. Test each endpoint systematically

## WebSocket Support (Future Enhancement)

Real-time updates for task changes could be implemented using Socket.io:

```javascript
// Client-side
socket.on('taskUpdated', (task) => {
  // Update UI with new task data
});

// Server-side
io.to(userId).emit('taskUpdated', updatedTask);
```

This would enable real-time collaboration and instant updates across multiple devices.