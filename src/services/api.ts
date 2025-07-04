
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.utm-tracker.com' 
  : 'http://localhost:5000';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await this.handleResponse<{ access_token: string, user: any }>(response);
    localStorage.setItem('auth_token', data.access_token);
    return data;
  }

  async register(email: string, password: string, name: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async logout() {
    localStorage.removeItem('auth_token');
    return { success: true };
  }

  // Dashboard endpoints
  async getDashboardOverview() {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/overview`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getDashboardAnalytics(period?: string, campaignId?: string) {
    const params = new URLSearchParams();
    if (period) params.append('period', period);
    if (campaignId) params.append('campaign_id', campaignId);
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/analytics?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Campaigns endpoints
  async getCampaigns(page = 1, limit = 10, search = '', isActive?: boolean) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(isActive !== undefined && { is_active: isActive.toString() })
    });
    
    const response = await fetch(`${API_BASE_URL}/api/campaigns?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getCampaign(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async createCampaign(data: {
    name: string;
    description?: string;
    telegram_bot_id: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async updateCampaign(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async deleteCampaign(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getCampaignLeads(campaignId: string, page = 1, limit = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}/leads?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Telegram Bots endpoints
  async getTelegramBots() {
    const response = await fetch(`${API_BASE_URL}/api/telegram-bots`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async createTelegramBot(data: {
    bot_token: string;
    chat_id?: string;
    chat_name?: string;
    chat_type?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/api/telegram-bots`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async updateTelegramBot(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/api/telegram-bots/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async deleteTelegramBot(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/telegram-bots/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async testTelegramBot(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/telegram-bots/${id}/test`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
