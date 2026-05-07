# Implementation Plan: MERN Hacker News Aggregator

## 1. Project Setup
- [ ] Initialize `backend/` and `frontend/` directories.
- [ ] Backend: Install `express`, `mongoose`, `dotenv`, `cors`, `jsonwebtoken`, `bcryptjs`, `cheerio`, `axios`.
- [ ] Frontend: Initialize Vite + React + Tailwind CSS.

## 2. Backend Development
- [ ] **Models**: Define `User` and `Story` schemas.
- [ ] **Scraper Service**: Build `services/scraper.js` using Cheerio to fetch top 10 HN stories.
- [ ] **Authentication**: Implement JWT-based registration and login in `controllers/authController.js`.
- [ ] **Routes**:
    - `POST /api/auth/register`
    - `POST /api/auth/login`
    - `POST /api/scrape` (Trigger manual scrape)
    - `GET /api/stories` (Fetch stories from DB)
    - `POST /api/stories/:id/bookmark` (Toggle bookmark for user)

## 3. Frontend Development
- [ ] **Layout**: Create a premium, responsive navigation and main container.
- [ ] **Context**: Implement `AuthContext` for global user state and token management.
- [ ] **Components**:
    - `Navbar`: User profile and navigation links.
    - `StoryCard`: Display story details with "Bookmark" interaction.
    - `Toast`: feedback notifications.
- [ ] **Pages**:
    - `Home`: Main feed of stories.
    - `Login`/`Register`: Clean, modern forms.
    - `Bookmarks`: Filtered view for saved stories.

## 4. Polish & Integration
- [ ] Run scraper on server startup.
- [ ] Implement Skeleton loaders for better UX.
- [ ] Finalize Tailwind styling for a premium "Tech News" aesthetic.
