import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:3001';

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    if (response.data.length === 0) {
      throw new Error('User not found');
    }

    const user = response.data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Create session
    await axios.post(`${API_URL}/sessions`, { userId: user.id });
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    // Check if user exists
    const emailCheck = await axios.get(`${API_URL}/users?email=${userData.email}`);
    if (emailCheck.data.length > 0) {
      throw new Error('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      ...userData,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
      profileImage: ''
    };

    // Create user
    const response = await axios.post(`${API_URL}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // Clear all sessions (simplified)
    const sessions = await axios.get(`${API_URL}/sessions`);
    await Promise.all(sessions.data.map(session => 
      axios.delete(`${API_URL}/sessions/${session.id}`)
    ));
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const sessions = await axios.get(`${API_URL}/sessions`);
    if (sessions.data.length === 0) return null;
    
    const userId = sessions.data[0].userId;
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};