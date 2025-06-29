# ZynkStack

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E=16-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A modern, full-stack chat application with real-time messaging, video calling, and friend management. Built with Node.js, Express, MongoDB, React, Vite, and Socket.io.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Scripts Reference](#scripts-reference)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Frontend Structure](#frontend-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Best Practices](#security-best-practices)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Contact & Support](#contact--support)
- [License](#license)

---

## Project Overview
ZynkStack is a scalable chat platform supporting:
- Real-time messaging
- Video calls (via Stream API)
- Friend requests and notifications
- Secure authentication
- Responsive, modern UI

**Use Cases:**
- Social networking
- Team collaboration
- Customer support chat

---

## Architecture

```mermaid
graph TD;
  User-->|Browser|Frontend[Frontend (React/Vite)]
  Frontend-->|REST/Socket.io|Backend[Backend (Node.js/Express)]
  Backend-->|MongoDB Driver|Database[(MongoDB)]
  Backend-->|Stream API|Stream[Stream Video Service]
```

---

## Features
- 🔒 Secure authentication (JWT)
- 💬 Real-time chat (Socket.io)
- 📹 Video calling (Stream API)
- 👫 Friend management
- 🔔 Notifications
- 🌙 Theme support
- 📱 Responsive design

---

## Tech Stack
**Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JWT, Stream API  
**Frontend:** React, Vite, Tailwind CSS, Axios, Socket.io-client, Stream API client

---

## Project Structure
```
ZynkStack/
├── backend/          # Node.js/Express server
├── frontend/         # React/Vite client
└── package.json      # Root package.json for scripts
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance
- Stream API account

### 1. Clone the repository
```bash
git clone https://github.com/Utkarsh-Tyagi-16/ZynkStack.git
cd ZynkStack
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env # Copy and fill in your environment variables
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp env.example .env # Copy and fill in your environment variables
```

### 4. Running the Application
#### Development
```bash
# In separate terminals:
cd backend && npm run dev
cd frontend && npm run dev
```
#### Production
```bash
cd frontend && npm run build
cd backend && npm start
```

---

## Scripts Reference
**Root:**
- `npm run dev:backend` – Start backend in dev mode
- `npm run dev:frontend` – Start frontend in dev mode

**Backend:**
- `npm run dev` – Start backend with nodemon
- `npm start` – Start backend in production

**Frontend:**
- `npm run dev` – Start Vite dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET_KEY` | JWT secret key |
| `STEAM_API_KEY` | Stream API key |
| `STEAM_API_SECRET` | Stream API secret |

### Frontend (`frontend/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_STREAM_API_KEY` | Stream API key |

---

## API Overview

### Auth
- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login
- `GET /api/auth/me` – Get current user

### User
- `GET /api/users` – List users
- `GET /api/users/:id` – Get user by ID
- `POST /api/users/friends` – Add/remove friend

### Chat
- `GET /api/chats` – List chats
- `POST /api/chats` – Create chat
- `GET /api/chats/:id` – Get chat by ID

### Friend Requests
- `POST /api/friends/request` – Send friend request
- `POST /api/friends/accept` – Accept friend request
- `POST /api/friends/reject` – Reject friend request

> For full details, see the backend route files.

---

## Frontend Structure
- `src/components/` – Reusable UI components
- `src/pages/` – Main app pages (Chat, Friends, Notifications, etc.)
- `src/hooks/` – Custom React hooks
- `src/lib/` – API utilities and helpers
- `src/store/` – State management (e.g., theme)
- `src/constants/` – App-wide constants

---

## Testing
- _Backend:_ Add tests in `backend/tests/` and run with `npm test` (future support)
- _Frontend:_ Add tests in `frontend/tests/` and run with `npm test` (future support)

---

## Deployment
- **Vercel/Netlify:** Deploy frontend by connecting your repo and setting env vars
- **Heroku/Render:** Deploy backend, set env vars in dashboard
- **Docker:**
```dockerfile
# Example Dockerfile for backend
FROM node:18
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
CMD ["npm", "start"]
```

---

## Security Best Practices
- Never commit `.env` files (already in .gitignore)
- Use strong secrets for JWT and API keys
- Regularly update dependencies
- Validate and sanitize all user input

---

## FAQ
**Q: My chat/messages aren't updating in real time?**  
A: Ensure Socket.io server is running and frontend is connecting to the correct backend URL.

**Q: Video calls aren't working?**  
A: Check your Stream API keys and network permissions.

**Q: How do I reset my database?**  
A: Drop the MongoDB database or use a tool like MongoDB Compass.

---

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## Contact & Support
- Open an issue on [GitHub Issues](https://github.com/Utkarsh-Tyagi-16/ZynkStack/issues)

---

