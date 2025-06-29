# ZynkStack

A modern, full-stack chat application with real-time messaging, video calling, and friend management. Built with Node.js, Express, MongoDB, React, Vite, and Socket.io.

## Features
- 🔒 Secure authentication (JWT)
- 💬 Real-time chat (Socket.io)
- 📹 Video calling (Stream API)
- 👫 Friend management
- 🔔 Notifications
- 🌙 Theme support
- 📱 Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT authentication
- Stream API

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Socket.io client
- Stream API client

## Project Structure
```
ZynkStack/
├── backend/          # Node.js/Express server
├── frontend/         # React/Vite client
└── package.json      # Root package.json for scripts
```

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Stream API account (for video calling)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Utkarsh-Tyagi-16/ZynkStack.git
cd ZynkStack
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key

# Stream API (for video calling)
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory with the following variables:
```env
# Stream API Key (for video calling)
VITE_STREAM_API_KEY=your_stream_api_key
```

### 4. Running the Application

#### Development Mode
```bash
# Start backend server
cd backend && npm run dev

# Start frontend development server (in a new terminal)
cd frontend && npm run dev
```

#### Production Mode
```bash
# Build frontend
cd frontend && npm run build

# Start backend
cd backend && npm start
```

## Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port number |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET_KEY` | Secret key for JWT token generation |
| `STEAM_API_KEY` | Stream API key for video calling |
| `STEAM_API_SECRET` | Stream API secret for video calling |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_STREAM_API_KEY` | Stream API key for video calling |

