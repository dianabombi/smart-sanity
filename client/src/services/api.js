const API_BASE_URL = 'http://localhost:5001/api';

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
