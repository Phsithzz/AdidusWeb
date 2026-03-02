<h1 align="center">✨ Adidus Sneaker E-commerce Platform ✨</h1>

![Demo App](/frontend/public/adidus.png)

Adidus is a full-stack web application sample that demonstrates a product catalog, shopping cart, order management, and user authentication. It pairs a Node.js + Express backend with a React frontend built on Vite.

## 🌐 Live Demo Youtube
🔗 View the app online: [https://www.youtube.com/watch?v=JNIvrwGOgtM]

## Project Overview

- Purpose: Provide a small e-commerce-like system for managing products (with variants and images), handling shopping carts and orders, and basic user account flows (register/login).
- Architecture: REST API server (backend) + SPA frontend (React). The backend also includes an OpenAPI/Swagger specification at `backend/Services/swagger.yaml`.

## Key Features

- Product and variant management (images supported)
- Shopping cart operations and order creation
- User registration, authentication (JWT), and basic user management
- API documentation via Swagger (YAML spec included)

## Tech Stack

- Backend: Node.js, Express, PostgreSQL (pg), JWT, multer for file uploads
- Frontend: React, Vite, Tailwind CSS, axios for API calls

## Quick Start

1. Clone this repository  
   ```bash
    git clone https://github.com/Phsithzz/AdidusWeb.git
    cd AdidusWeb
    ```

Backend (API)

2. Change to the backend folder and install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` in `backend/` with the required variables (example):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

4. Run the backend in development (uses nodemon):

```bash
npm run dev
```

Frontend (UI)

1. Change to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

2. Start the Vite dev server:

```bash
npm run dev
```

