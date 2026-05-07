# Project Setup Guide

This document provides a detailed walkthrough for setting up the Hacker News Story Aggregator project from scratch.

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **MongoDB**: A local instance running on `localhost:27017` or a MongoDB Atlas connection string.

---

## 2. Backend Configuration

### Installation
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the `backend` folder with the following content:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hn_aggregator
JWT_SECRET=your_jwt_secret_key_here
```
*Note: Replace `your_jwt_secret_key_here` with a random strong string.*

### Running the Backend
Start the server in development mode:
```bash
npm run dev
```
The backend will automatically perform an initial scrape of Hacker News and store the data in your MongoDB collection.

---

## 3. Frontend Configuration

### Installation
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

### Environment Variables
The frontend communicates with the backend on `http://localhost:5000`. Ensure the backend is running before starting the frontend.

### Running the Frontend
Start the Next.js development server:
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

---

## 4. Verification Steps

1. **Database Check**: Open MongoDB Compass and verify that a database named `hn_aggregator` exists and contains a `stories` collection with 10 entries.
2. **Registration**: Go to `/register` and create a new account.
3. **Login**: Sign in with your new credentials.
4. **Sync**: In the Dashboard, click the **Sync Now** button and verify that the "System synchronized" toast appears.
5. **Bookmark**: Toggle a bookmark icon on a story and verify it appears in your **Bookmarks** page.

---

## 5. Troubleshooting

- **MongoDB Connection Error**: Ensure your MongoDB service is running or your `MONGO_URI` is correct.
- **Port Conflicts**: If port 5000 or 3000 is occupied, you can change them in the `.env` file and restart the servers.
- **Scraping Issues**: If the scraper fails, ensure you have an active internet connection to reach `news.ycombinator.com`.
