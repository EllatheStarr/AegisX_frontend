import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Token management
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    // Set the authorization header for all future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Initialize with token if exists
const token = getAuthToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Authentication API endpoints
export const authAPI = {
  // Register a new user
  async register(userData) {
    try {
      const response = await api.post('api/users/register', userData);
      if (response.data && response.data.success && response.data.token) {
        setAuthToken(response.data.token);
        // Store user data
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Login user - FIXED to handle various response formats
  async login(email, password) {
    try {
      // For demo purposes without a real backend, create a mock successful response
      // Remove this block when connecting to a real backend
      if (!API_BASE_URL) {
        console.log("Using mock login response");
        const mockUser = {
          id: "user123",
          email: email,
          firstName: "Demo",
          lastName: "User",
          role: "admin"
        };
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.8Jgx1wHojE3ePP-N50FkS90lcG7WitVpzOg4_v9mkNo";
        
        // Store user data and token
        localStorage.setItem('userData', JSON.stringify(mockUser));
        setAuthToken(mockToken);
        
        return {
          success: true,
          message: "Login successful",
          user: mockUser,
          token: mockToken
        };
      }
      
      // Actual API call for real backend
      const response = await api.post('api/users/login', { email, password });
      
      // Handle different response structures flexibly
      if (response.data) {
        // Extract token, checking different possible locations
        let token = null;
        let userData = null;
        
        if (response.data.token) {
          token = response.data.token;
        } else if (response.data.data && response.data.data.token) {
          token = response.data.data.token;
        }
        
        // Extract user data
        if (response.data.user) {
          userData = response.data.user;
        } else if (response.data.data && response.data.data.user) {
          userData = response.data.data.user;
        }
        
        // Store token and user data if available
        if (token) {
          setAuthToken(token);
        }
        
        if (userData) {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
      
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout user
  async logout() {
    try {
      // Only attempt to hit the logout endpoint if we have a token
      if (getAuthToken()) {
        await api.post('api/users/logout');
      }
      // Always clear token and user data regardless of API response
      setAuthToken(null);
      localStorage.removeItem('userData');
      localStorage.removeItem('blockchainConnectionState');
      return { success: true };
    } catch (error) {
      // Still clear the token even if the API call fails
      setAuthToken(null);
      localStorage.removeItem('userData');
      localStorage.removeItem('blockchainConnectionState');
      handleApiError(error);
    }
  },

  // Logout from all devices
  async logoutAll() {
    try {
      const response = await api.post('api/users/logoutAll');
      setAuthToken(null);
      return response.data;
    } catch (error) {
      setAuthToken(null);
      handleApiError(error);
    }
  },

  // Request password reset
  async forgotPassword(email) {
    try {
      const response = await api.post('api/users/forgotPassword', { email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Reset password with token
  async resetPassword(token, password) {
    try {
      const response = await api.post(`api/users/resetPassword/${token}`, { password });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Change password (authenticated)
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('api/users/password', { 
        currentPassword, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

// User API endpoints
export const userAPI = {
  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('api/users/profile');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('api/users/profile', profileData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Admin: Get all users
  async getAllUsers() {
    try {
      const response = await api.get('api/users');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Admin: Get user by ID
  async getUserById(userId) {
    try {
      const response = await api.get(`api/users/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Admin: Update user
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Admin: Delete user
  async deleteUser(userId) {
    try {
      const response = await api.delete(`api/users/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

// General request methods
export const apiRequest = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  post: async (endpoint, data = {}) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  put: async (endpoint, data = {}) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  delete: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Setup response interceptors to handle common response scenarios
api.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 unauthorized errors by logging out
    if (error.response && error.response.status === 401) {
      // Don't logout if trying to login already
      const isAuthEndpoint = 
        error.config.url.includes('/login') || 
        error.config.url.includes('/register') || 
        error.config.url.includes('/forgotPassword') ||
        error.config.url.includes('/resetPassword');

      if (!isAuthEndpoint) {
        console.log('Session expired or unauthorized, logging out...');
        setAuthToken(null);
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.navigate('/login');
        }
      }
    }

    return Promise.reject(error);
  }
);

// Error handling helper
function handleApiError(error) {
  // Create a standardized error object
  const errorData = {
    message: 'An unexpected error occurred',
    status: 500,
    details: null
  };

  if (error.response) {
    // Server responded with non-2xx status
    errorData.status = error.response.status;
    errorData.message = error.response.data.message || `Error: ${error.response.status}`;
    errorData.details = error.response.data;
  } else if (error.request) {
    // Request made but no response received
    errorData.status = 0;
    errorData.message = 'No response from server. Please check your connection.';
  } else {
    // Error setting up request
    errorData.message = error.message;
  }

  console.error('API Error:', errorData);
  throw errorData;
}

// Authentication state check
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  // Advanced: Check if token is expired
  try {
    // Parse the JWT payload
    const parts = token.split('.');
    if (parts.length !== 3) return false; // Not a valid JWT format
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration (exp is in seconds, Date.now() is in milliseconds)
    return payload.exp && payload.exp * 1000 > Date.now();
  } catch (e) {
    console.error('Error checking authentication status:', e);
    return false;
  }
};

/**
 * Gets the current authenticated user data from localStorage
 * @returns {Object|null} The user object or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    // FIXED to use 'userData' key to match where it's stored during login
    const userJson = localStorage.getItem('userData');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error retrieving user from localStorage:', error);
    return null;
  }
};

// Export the base API instance and token utilities
export { api, getAuthToken, setAuthToken };

export default api;
