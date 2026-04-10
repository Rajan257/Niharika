// frontend/js/auth.js - Niharika User Authentication Module v3.0

const AUTH = {
  API: 'http://localhost:5000/api',
  
  getToken: () => localStorage.getItem('niharika_token'),
  getUser:  () => { try { return JSON.parse(localStorage.getItem('niharika_user')); } catch { return null; } },
  
  setSession: (token, user) => {
    localStorage.setItem('niharika_token', token);
    localStorage.setItem('niharika_user', JSON.stringify(user));
  },
  clearSession: () => {
    localStorage.removeItem('niharika_token');
    localStorage.removeItem('niharika_user');
  },
  isLoggedIn: () => !!localStorage.getItem('niharika_token'),
  
  async register(name, email, password) {
    const r = await fetch(`${this.API}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return await r.json();
  },
  
  async login(email, password) {
    const r = await fetch(`${this.API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await r.json();
  },
  
  async getMe() {
    const token = this.getToken();
    if (!token) return null;
    const r = await fetch(`${this.API}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!r.ok) { this.clearSession(); return null; }
    const data = await r.json();
    return data.success ? data.data : null;
  },
  
  async toggleFavorite(poemId, poemText, poet) {
    const token = this.getToken();
    if (!token) return { success: false, message: 'Please login to save favorites.' };
    const r = await fetch(`${this.API}/user/favorites`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ poemId, poemText, poet })
    });
    return await r.json();
  },
  
  async getFavorites() {
    const token = this.getToken();
    if (!token) return [];
    const r = await fetch(`${this.API}/user/favorites`, { headers: { 'Authorization': `Bearer ${token}` } });
    const data = await r.json();
    return data.success ? data.data : [];
  },
  
  async toggleBookmark(poetId, poetName) {
    const token = this.getToken();
    if (!token) return { success: false, message: 'Please login to bookmark poets.' };
    const r = await fetch(`${this.API}/user/bookmarks`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ poetId, poetName })
    });
    return await r.json();
  },
  
  async getBookmarks() {
    const token = this.getToken();
    if (!token) return [];
    const r = await fetch(`${this.API}/user/bookmarks`, { headers: { 'Authorization': `Bearer ${token}` } });
    const data = await r.json();
    return data.success ? data.data : [];
  },
  
  async addHistory(poetId, poetName) {
    const token = this.getToken();
    if (!token) return;
    await fetch(`${this.API}/user/history`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ poetId, poetName })
    });
  },
  
  // ── UI methods ──────────────────────────────────────────────────────────
  updateHeaderUI() {
    const user = this.getUser();
    const authBtn = document.getElementById('authBtn');
    const userMenu = document.getElementById('userMenu');
    const userAvatar = document.getElementById('userAvatar');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (user && this.isLoggedIn()) {
      if (authBtn) authBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (userAvatar) userAvatar.textContent = user.avatar || user.name.charAt(0).toUpperCase();
      if (userNameDisplay) userNameDisplay.textContent = user.name.split(' ')[0];
    } else {
      if (authBtn) authBtn.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
    }
  },
  
  logout() {
    this.clearSession();
    this.updateHeaderUI();
    if (window.showToast) window.showToast('Logged out. See you soon!', 'info');
    setTimeout(() => { window.location.href = 'index.html'; }, 500);
  },
  
  requireAuth(redirectUrl) {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('niharika_redirect', redirectUrl || window.location.href);
      window.location.href = 'auth.html';
      return false;
    }
    return true;
  }
};

// ── Auth Modal/Page Logic ───────────────────────────────────────────────
const AuthUI = {
  init() {
    AUTH.updateHeaderUI();
    // Bind logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => AUTH.logout());
    
    // Bind user dropdown toggle
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    if (userAvatar && userDropdown) {
      userAvatar.addEventListener('click', () => {
        userDropdown.classList.toggle('show');
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#userMenu')) userDropdown.classList.remove('show');
      });
    }
  }
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => AuthUI.init());
