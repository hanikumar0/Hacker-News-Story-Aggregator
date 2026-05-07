import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const login = (data: any) => API.post('/auth/login', data);
export const register = (data: any) => API.post('/auth/register', data);

// Always bust the browser cache for story fetches so Sync Now returns fresh data
export const fetchStories = () => API.get('/stories', {
    headers: { 'Cache-Control': 'no-cache' },
    params: { _t: Date.now() }, // cache-busting timestamp param
});

export const fetchStoryById = (id: string) => API.get(`/stories/${id}`);
export const toggleBookmark = (id: string) => API.post(`/stories/${id}/bookmark`);
export const fetchBookmarks = () => API.get('/stories/bookmarks', {
    headers: { 'Cache-Control': 'no-cache' },
    params: { _t: Date.now() },
});
export const triggerScrape = () => API.post('/scrape');

export default API;
