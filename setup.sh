#!/bin/bash

# Personal Task Management System Setup Script
# This script sets up the complete development environment

echo "🚀 Setting up Personal Task Management System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is running (optional - can use cloud)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally. You can:"
    echo "   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
fi

echo "📦 Installing backend dependencies..."
cd backend
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "✅ Please update the .env file with your MongoDB URI and JWT secret"
fi
npm install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "🎉 Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📚 For API documentation, see API_DOCUMENTATION.md"