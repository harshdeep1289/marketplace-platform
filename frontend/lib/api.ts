const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window === 'undefined') return null
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
  return user?.token || null
}

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  login: async (data: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  getProfile: async () => {
    return apiRequest('/auth/profile')
  },
}

// Listings API
export const listingsAPI = {
  create: async (data: any) => {
    return apiRequest('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  getAll: async (params?: { type?: string; category?: string; status?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append('type', params.type)
    if (params?.category) queryParams.append('category', params.category)
    if (params?.status) queryParams.append('status', params.status)
    
    const queryString = queryParams.toString()
    return apiRequest(`/listings${queryString ? `?${queryString}` : ''}`)
  },
  
  getById: async (id: string) => {
    return apiRequest(`/listings/${id}`)
  },
  
  getMyListings: async () => {
    return apiRequest('/listings/my-listings')
  },
  
  update: async (id: string, data: any) => {
    return apiRequest(`/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
  
  delete: async (id: string) => {
    return apiRequest(`/listings/${id}`, {
      method: 'DELETE',
    })
  },
  
  markAsSold: async (id: string) => {
    return apiRequest(`/listings/${id}/mark-sold`, {
      method: 'PATCH',
    })
  },
  
  markAsActive: async (id: string) => {
    return apiRequest(`/listings/${id}/mark-active`, {
      method: 'PATCH',
    })
  },
}

// Users API
export const usersAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile')
  },
  
  updateProfile: async (data: any) => {
    return apiRequest('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
}

export default {
  auth: authAPI,
  listings: listingsAPI,
  users: usersAPI,
}
