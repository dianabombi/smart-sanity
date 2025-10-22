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
```

## 📁 Project Structure

```
smart-sanit/
├── client/              # React frontend application
│   ├── public/         # Static assets (images, fonts)
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── hooks/      # Custom hooks
│   └── build/          # Production build
├── database/           # Database setup and migrations
│   ├── setup/         # Initial database setup files
│   └── fixes/         # Database fix scripts
├── docs/              # Documentation and guides
└── README.md          # This file
```

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel
- **State Management**: React Hooks
- **Image Optimization**: Sharp (development)

## 🔧 Features

- **Responsive Design**: Optimized for all devices
- **Modern UI**: Smooth animations and glass effects
- **Brand Showcase**: Interactive galleries with image uploads
- **Contact System**: Form with database integration
- **Admin Panel**: Content management system
- **Background Management**: Dynamic background images
- **Image Compression**: Optimized loading performance

## 📱 Pages

- **Úvodná stránka**: Hero carousel and company introduction
- **O nás**: Company information and partnerships  
- **Čo ponúkame**: Services and offerings
- **Obchodované značky**: Partner brands showcase
- **Inšpirácie**: Bathroom design gallery
- **Referencie**: Completed projects
- **Kontakt**: Contact form and information
## Development

- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- Hot reloading is enabled for both frontend and backend during development
