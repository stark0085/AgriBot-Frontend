# AgriBot

AgriBot is a full-stack web application designed to assist farmers and agricultural professionals with personalized advice, weather updates, government schemes, and more.  
It consists of a **React frontend** and a **Node.js/Express backend**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (signup/login)
- Multilingual support (English, Hindi, Tamil, etc.)
- Personalized dashboard with weather and crop info
- Chatbot for agricultural queries
- Profile management
- Access to government schemes
- Insurance calculator
- Responsive UI

---

## Tech Stack

- **Frontend:** React, React Router, react-hot-toast, Axios, Lucide Icons, i18n
- **Backend:** Node.js, Express, MongoDB (or your DB), JWT, CORS, dotenv
- **Other:** REST API, Context API, CSS/Styled Components

---

## Project Structure

```
AgriBot/
├── AgriBot-Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
├── AgriBot-Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
└── README.md
```

---

## Getting Started

### Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd AgriBot-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in `AgriBot-Backend` with the following (example):
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/agribot
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend will run on [https://agri-bot-backend-ba3f.vercel.app/](https://agri-bot-backend-ba3f.vercel.app/).

---

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd AgriBot-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The frontend will run on [https://agri-bot-frontend.vercel.app/](https://agri-bot-frontend.vercel.app/) (or another port if configured).

---

## Environment Variables

- **Backend:**  
  - `PORT`: Port for the backend server (default: 3000)
  - `MONGODB_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT authentication

- **Frontend:**  
  - If you use environment variables (e.g., for API URLs), create a `.env` file in `AgriBot-Frontend`:
    ```
    VITE_API_URL=https://agri-bot-backend-ba3f.vercel.app/
    ```

---

## Usage

- Visit the frontend URL in your browser: [https://agri-bot-frontend.vercel.app/](https://agri-bot-frontend.vercel.app/)
- Sign up or log in.
- Explore the dashboard, chat with the bot, check weather, manage your profile, and more.

---

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)  
(c) 2025
