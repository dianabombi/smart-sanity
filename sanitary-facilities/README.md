# Sanitary Facilities Management System

A minimalistic MERN stack application for household sanitary facilities management.

## Features

- **Minimalistic Design**: Black background with white text for a clean, professional look
- **Responsive Layout**: Works on desktop and mobile devices
- **Modern Tech Stack**: Built with MongoDB, Express.js, React, and Node.js
- **Tailwind CSS**: For efficient and customizable styling

## Project Structure

```
sanitary-facilities/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Entrance.js
│   │   │   └── WhoWeAre.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Express.js backend
│   ├── server.js
│   ├── package.json
│   └── .env
├── package.json
└── README.md
```

## Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install server dependencies:**
   ```bash
   npm run install-server
   ```

3. **Install client dependencies:**
   ```bash
   npm run install-client
   ```

   Or install all at once:
   ```bash
   npm run install-all
   ```

## Running the Application

1. **Development mode (runs both client and server):**
   ```bash
   npm run dev
   ```

2. **Run server only:**
   ```bash
   npm run server
   ```

3. **Run client only:**
   ```bash
   npm run client
   ```

## Environment Variables

Create a `.env` file in the `server` directory with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sanitary-facilities
NODE_ENV=development
```

## Technology Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Development**: Concurrently for running multiple processes

## Design Philosophy

The application follows a minimalistic design approach with:
- Pure black (#000000) background
- White (#ffffff) text and borders
- Clean typography using Inter font
- Subtle hover effects and transitions
- Responsive design for all screen sizes

## Getting Started

1. Make sure MongoDB is running on your system
2. Install all dependencies using `npm run install-all`
3. Start the development servers with `npm run dev`
4. Open your browser to `http://localhost:3000`

The home page features two main navigation buttons:
- **ENTRANCE**: Access to the main application features
- **WHO WE ARE**: Information about the service

## Development

- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- Hot reloading is enabled for both frontend and backend during development
