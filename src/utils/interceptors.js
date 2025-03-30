/**
 * API request/response interceptors
 * Provides monitoring and handling of API requests
 */

// Flag to track if we're already refreshing the auth token
export let isRefreshingAuth = false;
// Queue of callbacks to execute after token refresh
let refreshSubscribers = [];

/**
 * Execute queued callbacks with new token
 * @param {string} token - New authentication token
 */
export const onRefreshSuccess = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

/**
 * Add callback to the queue for when token is refreshed
 * @param {Function} callback - Function to call when token is refreshed
 * @returns {Promise} Promise that resolves with the new token
 */
export const subscribeTokenRefresh = (callback) => {
  return new Promise(resolve => {
    refreshSubscribers.push(token => {
      callback(token);
      resolve(token);
    });
  });
};

/**
 * Handle global loading state for API requests
 */
export class LoadingHandler {
  constructor() {
    this.activeRequests = 0;
    this.loadingStateChangeCallbacks = [];
  }

  /**
   * Register callback for loading state changes
   * @param {Function} callback - Function called when loading state changes
   * @returns {Function} Function to unregister callback
   */
  onLoadingStateChange(callback) {
    this.loadingStateChangeCallbacks.push(callback);
    return () => {
      this.loadingStateChangeCallbacks = 
        this.loadingStateChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Start loading for a request
   */
  startLoading() {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this._notifyLoadingState(true);
    }
  }

  /**
   * End loading for a request
   */
  endLoading() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this._notifyLoadingState(false);
    }
  }

  /**
   * Notify all callbacks of loading state change
   * @param {boolean} isLoading - Current loading state
   * @private
   */
  _notifyLoadingState(isLoading) {
    this.loadingStateChangeCallbacks.forEach(callback => {
      try {
        callback(isLoading);
      } catch (error) {
        console.error('Error in loading state change callback:', error);
      }
    });
  }

  /**
   * Get current loading state
   * @returns {boolean} True if any requests are loading
   */
  isLoading() {
    return this.activeRequests > 0;
  }
}

/**
 * Global loading handler instance
 */
export const globalLoadingHandler = new LoadingHandler();

/**
 * Handle API error logging
 * @param {Error} error - API error
 * @param {string} endpoint - API endpoint
 */
export const logAPIError = (error, endpoint) => {
  // In production, this could send errors to a logging service
  console.error(`API Error [${endpoint}]:`, error);
  
  // Here you could add analytics, error tracking, etc.
};

/**
 * Format response data consistently
 * @param {Object} responseData - Raw API response
 * @returns {Object} Formatted response
 */
export const formatResponse = (responseData) => {
  // Ensure consistent response format
  return {
    success: responseData.success ?? true,
    message: responseData.message || '',
    data: responseData.data || responseData,
    timestamp: responseData.timestamp || new Date().toISOString()
  };
};

/**
 * Setup interceptors to handle auth token in API requests
 * @param {Object} axiosInstance - Axios instance
 */
export const setupAuthInterceptors = (axiosInstance) => {
  // Request interceptor for API calls
  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for API calls
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;
      
      // If error is 401 Unauthorized and not already retrying
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh token or handle session expiration
          // ...refresh token logic if you have it...
          
          // If unable to refresh, clear auth and redirect to login
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.navigate('/login');
          }
        } catch (refreshError) {
          // Clear auth data on refresh failure
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            window.navigate('/login');
          }
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};
