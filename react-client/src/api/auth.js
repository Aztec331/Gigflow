import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000' // Change to your backend port

const api = axios.create({
  baseURL: API_BASE_URL
})

export const loginUser = (data) => {
  return api.post('/api/auth/login', data)
}

export const registerUser = (data) => {
    return api.post('/api/auth/register', data)
}