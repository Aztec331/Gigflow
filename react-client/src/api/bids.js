import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
    baseURL: API_BASE_URL
})

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const postBid = (gigId, bidData, token) => {
    return api.post(`/api/gigs/${gigId}/bids`, bidData, getAuthHeaders(token))
}

export const getBidsByGig = (gigId, token) => {
    return api.get(`/api/gigs/${gigId}/bids`, getAuthHeaders(token))
}

export const hireBid = (gigId, bidId, token) => {
    return api.patch(`/api/gigs/${gigId}/bids/${bidId}/hire`,{}, getAuthHeaders(token))
}