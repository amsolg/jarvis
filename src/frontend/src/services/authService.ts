import { mockUser } from '../mock/mockData';

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Interface for login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for registration data
export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  name: string;
}

// Auth service with mocked API calls
export const authService = {
  // Simulated login
  async login(credentials: LoginCredentials) {
    // Simulate API call delay
    await delay(800);
    
    // In a prototype, just check if email contains "@" for simplicity
    if (!credentials.email.includes('@') || credentials.password.length < 6) {
      throw new Error('Invalid credentials');
    }
    
    // Return mock user data and token
    return {
      user: mockUser,
      token: 'mock_jwt_token_for_prototype'
    };
  },
  
  // Simulated registration
  async register(data: RegistrationData) {
    // Simulate API call delay
    await delay(1000);
    
    // Basic validation
    if (!data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid registration data');
    }
    
    // Return mock user data and token
    return {
      user: {
        ...mockUser,
        username: data.username,
        email: data.email,
        name: data.name
      },
      token: 'mock_jwt_token_for_prototype'
    };
  },
  
  // Simulated logout
  async logout() {
    // Simulate API call delay
    await delay(300);
    
    // In a real app, this would invalidate the token
    return { success: true };
  },
  
  // Simulated check if user is logged in
  async isLoggedIn() {
    // Check if token exists in localStorage
    const token = localStorage.getItem('jarvis_auth_token');
    return !!token;
  },
  
  // Get current user
  async getCurrentUser() {
    // Simulate API call delay
    await delay(500);
    
    const token = localStorage.getItem('jarvis_auth_token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    
    return mockUser;
  }
};