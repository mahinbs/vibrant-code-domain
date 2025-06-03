const ADMIN_CREDENTIALS = {
  id: 'webadmin_2024_secure',
  password: 'W3b$ecur3!2024#Admin'
};

const AUTH_KEY = 'admin_authenticated';

export const adminAuth = {
  login: (id: string, password: string): boolean => {
    if (id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }
};
