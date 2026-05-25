# Pragyan — Workshop and Personal Class Management Website

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Project Structure
```
pragyan/
├── backend/          # Express API
├── frontend/         # React app
└── package.json      # Root scripts
```

## Setup

### 1. Install all dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment
Copy `backend/.env.example` to `backend/.env` and fill in your values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pragyan
ADMIN_PASSWORD=your_secure_password
API_KEY=your_api_key
CLIENT_URL=http://localhost:3000
```

### 3. Run development servers
From root:
```bash
npm install          # installs concurrently
npm run dev          # starts both backend and frontend
```

Or separately:
```bash
npm run server       # backend on port 5000
npm run client       # frontend on port 3000
```

## Features
- View upcoming workshops sorted by date
- View available personal classes
- Submit class inquiries
- Admin panel: login, add/delete custom workshops, view inquiries
"# pragyann" 
"# freeworkshopwithPragyann" 
"# freeworkshopwithPragyann" 
"# freeworkshopwithPragyann" 
"# freeworkshopwithPragyann" 
"# freeworkshopwithPragyann" 
