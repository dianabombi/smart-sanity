const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5001/api';

class ApiService {
  // Authentication
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    return response.json();
  }

  // Brands
  async getBrands() {
    const response = await fetch(`${API_BASE_URL}/brands`);
    return response.json();
  }

  async getBrand(id) {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`);
    return response.json();
  }

  async createBrand(brandData) {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
    return response.json();
  }

  async updateBrand(id, brandData) {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
    return response.json();
  }

  async uploadBrandImages(brandId, files) {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/images`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  async deleteBrandImage(brandId, imageId) {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/images/${imageId}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  async initializeBrands() {
    const response = await fetch(`${API_BASE_URL}/brands/initialize`, {
      method: 'POST',
    });
    return response.json();
  }

  // Messages
  async getMessages(status = 'all', page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        status,
        page: page.toString(),
        limit: limit.toString()
      });
      
      const response = await fetch(`${API_BASE_URL}/messages?${params}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { success: false, message: 'Chyba pri načítavaní správ' };
    }
  }

  async sendMessage(messageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, message: 'Chyba pri odosielaní správy' };
    }
  }

  async markMessageAsRead(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, message: 'Chyba pri označovaní správy' };
    }
  }

  async updateMessageStatus(messageId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating message status:', error);
      return { success: false, message: 'Chyba pri aktualizácii statusu' };
    }
  }

  async updateMessageNotes(messageId, notes) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating message notes:', error);
      return { success: false, message: 'Chyba pri aktualizácii poznámok' };
    }
  }

  async deleteMessage(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, message: 'Chyba pri odstraňovaní správy' };
    }
  }

  async getMessageStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/stats`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching message stats:', error);
      return { success: false, message: 'Chyba pri načítavaní štatistík' };
    }
  }

  // Content Management
  async getContent(pageId = null) {
    const url = pageId ? `${API_BASE_URL}/content/${pageId}` : `${API_BASE_URL}/content`;
    const response = await fetch(url);
    return response.json();
  }

  async updateContent(pageId, contentData) {
    const response = await fetch(`${API_BASE_URL}/content/${pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentData),
    });
    return response.json();
  }

  async createContent(contentData) {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentData),
    });
    return response.json();
  }

  async initializeContent() {
    const response = await fetch(`${API_BASE_URL}/content/initialize`, {
      method: 'POST',
    });
    return response.json();
  }
}

export default new ApiService();
