// frontend/js/auth.js - Niharika User Authentication Module v3.0

const AUTH = {
  API: '/api',
  
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
  
  async register(name, email, phone, password) {
    const r = await fetch(`${this.API}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    return await r.json();
  },

  async verifyOtp(email, otp) {
    const r = await fetch(`${this.API}/auth/verify-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    return await r.json();
  },
  
  async login(identifier, password) {
    const r = await fetch(`${this.API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
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

  async updateProfile(formData) {
    const token = this.getToken();
    const r = await fetch(`${this.API}/auth/update-profile`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return await r.json();
  },
  
  // ── UI methods ──────────────────────────────────────────────────────────
  updateHeaderUI() {
    const user = this.getUser();
    const authBtn = document.getElementById('authBtn');
    const userMenu = document.getElementById('userMenu');
    const userAvatar = document.getElementById('userAvatar');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const mobileProfileLink = document.querySelector('.drawer-link[href="profile.html"]');
    
    const loggedIn = this.isLoggedIn();

    if (loggedIn) {
      if (authBtn) authBtn.style.setProperty('display', 'none', 'important');
      if (userMenu) userMenu.style.setProperty('display', 'flex', 'important');
      
      const u = user || {};
      const displayName = u.username || u.name || u.displayName || 'User';
      const initial = displayName.charAt(0).toUpperCase();
      
      if (userAvatar) {
        if (u.profilePictureUrl || u.avatarUrl || u.photoURL) {
          userAvatar.innerHTML = `<img src="${u.profilePictureUrl || u.avatarUrl || u.photoURL}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
        } else {
          userAvatar.textContent = initial;
          userAvatar.style.background = 'linear-gradient(135deg, var(--gold), #C9982A)';
        }
      }
      
      if (userNameDisplay) userNameDisplay.textContent = displayName.split(' ')[0];
      if (dropdownName) dropdownName.textContent = displayName;
      if (dropdownEmail) dropdownEmail.textContent = u.email || '';
      
      if (mobileProfileLink) {
        mobileProfileLink.innerHTML = `<i class="fas fa-user"></i> My Profile (${displayName.split(' ')[0]})`;
      }
    } else {
      if (authBtn) authBtn.style.setProperty('display', 'flex', 'important');
      if (userMenu) userMenu.style.setProperty('display', 'none', 'important');
      if (mobileProfileLink) {
        mobileProfileLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login / Join`;
        mobileProfileLink.href = 'auth.html';
      }
    }
  },
  
  logout() {
    this.clearSession();
    this.updateHeaderUI();
    if (window.showToast) window.showToast('Logged out successfully.', 'info');
    setTimeout(() => { 
      if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html'; 
      } else {
        window.location.reload();
      }
    }, 800);
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
    
    // Bind all logout buttons (desktop & potentially mobile)
    document.querySelectorAll('#logoutBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        AUTH.logout();
      });
    });
    
    // Bind user dropdown toggle
    const userMenu = document.getElementById('userMenu');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenu && userDropdown) {
      userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
      });
      
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#userMenu')) {
          userDropdown.classList.remove('show');
        }
      });
    }
  }
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => AuthUI.init());
