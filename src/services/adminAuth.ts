
const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'admin123'
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
