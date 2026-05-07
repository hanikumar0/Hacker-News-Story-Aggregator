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
export const fetchStories = () => API.get('/stories');
export const fetchStoryById = (id: string) => API.get(`/stories/${id}`);
export const toggleBookmark = (id: string) => API.post(`/stories/${id}/bookmark`);
export const fetchBookmarks = () => API.get('/stories/bookmarks');
export const triggerScrape = () => API.post('/scrape');

export default API;
