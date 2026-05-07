# 🚀 Hacker News Story Aggregator (MERN)

A premium, full-stack SaaS application that scrapes top stories from Hacker News, provides real-time data synchronization, and features a robust user authentication and bookmarking system.

---

## 📺 Project Walkthrough
> [!NOTE]
> **Loom Video:** [Insert Your Loom Link Here]

---

## 🌟 Key Features

### 1. Advanced Web Scraper
- **Automated Intelligence**: Scrapes the top 10 stories from Hacker News on server startup.
- **Cheerio Integration**: Precisely extracts Title, URL, Points, Author, and Timestamp.
- **Manual Override**: Dedicated API and UI button to trigger real-time data refreshes.

### 2. Secure Authentication
- **JWT-Powered**: Secure session management using JSON Web Tokens.
- **Bcrypt Hashing**: Industry-standard password encryption for user safety.
- **Protected Routes**: Middleware-driven access control for sensitive user data.

### 3. Personal Knowledge Base
- **Bookmark Persistence**: Save high-signal stories to your personal collection via MongoDB.
- **Real-time UI Updates**: Immediate feedback on bookmark toggles with persisted state.

### 4. High-End SaaS UI/UX
- **Modern Aesthetic**: Dark-themed "Glassmorphism" design with vibrant gradients.
- **Responsive Layout**: Optimized for Desktop, Tablet, and Mobile.
- **Animations**: Fluid transitions and micro-interactions using Framer Motion.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB (NoSQL) |
| **Auth** | JWT (JSON Web Tokens) & Bcrypt |

---

## 📈 Assessment Checklist (Status)

- [x] **Web Scraper**: Top 10 stories, all fields extracted, MongoDB storage.
- [x] **Backend APIs**: Register, Login, Story Fetching (Sorted), Bookmarking.
- [x] **Frontend UI**: List View, Auth Pages, Protected Bookmarks Page.
- [x] **Auth State**: React Context API management.
- [x] **Code Quality**: Clean folder structure, no hardcoded secrets (.env).
- [x] **Bonus**: **Pagination Implemented** (`/api/stories?page=1&limit=10`).

---

## 💻 Local Installation

### 1. Clone the Repository
```bash
git clone https://github.com/hanikumar0/Hacker-News-Story-Aggregator.git
cd Hacker-News-Story-Aggregator
```

### 2. Backend Setup
1. Navigate to `/backend`
2. Install dependencies: `npm install`
3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hn_aggregator
JWT_SECRET=your_super_secret_key
```
4. Start server: `npm run dev`

### 3. Frontend Setup
1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Visit `http://localhost:3000`

---

## 📐 Project Structure

```text
├── backend/
│   ├── controllers/ # Logic for Auth, Stories, and Scraper
│   ├── middleware/  # Authentication guards
│   ├── models/      # Mongoose Schemas (User, Story)
│   ├── routes/      # API Endpoints
│   └── services/    # Scraper implementation
├── frontend/
│   ├── src/
│   │   ├── app/     # Dashboard & Marketing routes
│   │   ├── components/ # Atomic UI & Feature components
│   │   ├── context/ # Global Auth State
│   │   └── lib/     # API utilities
└── README.md
```

## 👤 Author
**Hani Kumar**
*Full Stack Developer Assessment Submission*

