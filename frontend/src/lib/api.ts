import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    timeout: 15000, // 15 seconds timeout
});

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for Global Error Handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        let errorMessage = 'An unexpected error occurred';
        
        if (error.code === 'ECONNABORTED') {
            errorMessage = 'Request timed out. Please try again.';
        } else if (!error.response) {
            errorMessage = 'Network error. Please check your connection or CORS settings.';
        } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
            errorMessage = 'Session expired. Please log in again.';
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        } else if (error.response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
        }

        toast.error(errorMessage, { id: 'api-error' }); // Use ID to prevent duplicate toasts
        return Promise.reject(error);
    }
);

export const login = (data: any) => API.post('/auth/login', data);
export const register = (data: any) => API.post('/auth/register', data);

// Always bust the browser cache for story fetches so Sync Now returns fresh data
export const fetchStories = () => API.get('/stories', {
    headers: { 'Cache-Control': 'no-cache' },
    params: { _t: Date.now() },
});

export const fetchStoryById = (id: string) => API.get(`/stories/${id}`);
export const toggleBookmark = (id: string) => API.post(`/stories/${id}/bookmark`);
export const fetchBookmarks = () => API.get('/stories/bookmarks', {
    headers: { 'Cache-Control': 'no-cache' },
    params: { _t: Date.now() },
});
export const triggerScrape = () => API.post('/scrape');

export default API;
