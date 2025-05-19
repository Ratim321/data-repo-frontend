import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Configure axios to handle cookies
axios.defaults.withCredentials = true;

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UpdateUserData {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  new_password2: string;
}

const userApi = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/users/register/`, data);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await axios.post(`${API_URL}/users/login/`, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_URL}/users/logout/`);
  },

  getProfile: async (): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/profile/`);
    return response.data;
  },

  updateProfile: async (data: UpdateUserData): Promise<User> => {
    const response = await axios.patch(`${API_URL}/users/update/`, data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await axios.patch(`${API_URL}/users/change-password/`, data);
  },
};

export default userApi; 