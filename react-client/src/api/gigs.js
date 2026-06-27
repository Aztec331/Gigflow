import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
    baseURL: API_BASE_URL
})

export const getAllGigs = () => {
    return api.get('/api/gigs/')
}

export const postGig = (gigData, token) => {
    return api.post(
        '/api/gigs/',
        gigData,
        
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
    )
}