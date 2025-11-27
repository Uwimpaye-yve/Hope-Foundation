const API_BASE_URL = 'http://localhost:3000'

export const userService = {
  async updateProfile(profileData: any) {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      console.log('Profile data:', profileData);
      
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(responseText || 'Failed to update profile');
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async updatePassword(passwordData: any) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/users/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update password');
    }

    return response.json();
  },
};