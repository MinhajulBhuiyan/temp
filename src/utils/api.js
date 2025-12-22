import axios from 'axios'

// Use relative URL so it goes through Nginx proxy
const API_BASE_URL = '/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes timeout
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout - query took too long'))
    }
    return Promise.reject(error)
  }
)

export default api
