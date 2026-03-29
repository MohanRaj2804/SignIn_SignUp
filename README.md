# SignIn/SignUp Full-Stack Application

A complete authentication system with React frontend and Node.js/Express backend.

## Architecture

- **Frontend**: React + TypeScript + Vite + Bootstrap
- **Backend**: Node.js + Express + MongoDB + JWT
- **Authentication**: JWT tokens with bcrypt password hashing

## Features

- User registration and login
- Secure password storage
- JWT-based session management
- Responsive UI
- Form validation
- Error handling

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   MONGO_URL=mongodb://localhost:27017/yourdb
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Request/Response Examples

#### Sign Up
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Sign In
```json
POST /api/auth/signin
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Project Structure

```
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Environment variable configuration
- CORS protection
- Input validation

## Development

- Run `npm run lint` in frontend for code quality checks
- Build frontend with `npm run build`
- Use nodemon for backend auto-restart during development

## Deployment

1. Build the frontend: `cd frontend && npm run build`
2. Set production environment variables
3. Deploy backend to your hosting service
4. Serve frontend static files or deploy to CDN

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request