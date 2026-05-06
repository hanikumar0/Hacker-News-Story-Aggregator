# Hacker News Story Aggregator (MERN)

A production-grade full-stack application that scrapes top stories from Hacker News, stores them in MongoDB, and provides a premium dashboard for users to bookmark and track tech trends.

## 🚀 Key Features

- **Automated Web Scraper**: Built with Cheerio to extract Title, URL, Points, Author, and Timestamp from the Hacker News homepage.
- **Smart Sync**: Automatically scrapes on server startup and includes a manual trigger for real-time updates.
- **Enterprise-Grade Auth**: Secure JWT-based authentication system for user registration and session management.
- **Curated Bookmarking**: Personalized bookmarking system with persistence via MongoDB.
- **Premium UX/UI**: High-end SaaS aesthetic using Tailwind CSS, Glassmorphism, and Framer Motion for smooth transitions.
- **Optimized Performance**: Backend pagination and efficient database indexing.

## 🛠 Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion, Lucide Icons, React Hot Toast.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT).

---

## 💻 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas)

### 2. Environment Setup

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hn_aggregator
JWT_SECRET=your_secret_key_here
```

### 3. Installation & Local Run

**Step 1: Start the Backend**
```bash
cd backend
npm install
npm run dev
```

**Step 2: Start the Frontend**
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/auth/register` | Register a new account | ❌ |
| `POST` | `/api/auth/login` | Log in to existing account | ❌ |
| `POST` | `/api/scrape` | Manually trigger HN scraper | ❌ |
| `GET` | `/api/stories` | Fetch stories (Sorted by points) | ❌ |
| `GET` | `/api/stories?page=1&limit=10` | Paginated stories (Bonus) | ❌ |
| `POST` | `/api/stories/:id/bookmark` | Toggle bookmark status | ✅ |
| `GET` | `/api/stories/bookmarks` | Fetch user collection | ✅ |

---

## 📐 Project Structure

```text
├── backend/
│   ├── config/      # Database connection
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Auth & Error handling
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API endpoints
│   └── services/    # Scraper logic
├── frontend/
│   ├── src/
│   │   ├── app/     # Next.js App Router (Marketing & Dashboard)
│   │   ├── components/ # Shared UI & Specific features
│   │   ├── context/ # Auth State management
│   │   └── lib/     # API utilities & helpers
└── README.md
```

## 👤 Author
**Hani Kumar**
*Full Stack Developer Assessment Submission*

