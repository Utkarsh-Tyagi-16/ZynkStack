# ZynkStack

A full-stack chat application with real-time messaging and video calling capabilities.

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
git clone <your-repo-url>
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

From the root directory:

```bash
# Start backend server
npm run dev:backend

# Start frontend development server
npm run dev:frontend
```

Or run them individually:

```bash
# Backend
cd backend && npm run dev

# Frontend
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

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT token generation | Yes |
| `STEAM_API_KEY` | Stream API key for video calling | Yes |
| `STEAM_API_SECRET` | Stream API secret for video calling | Yes |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_STREAM_API_KEY` | Stream API key for video calling | Yes |

## Features

- User authentication (signup/login)
- Real-time chat messaging
- Video calling
- Friend management
- Notifications
- Responsive design

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 