import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const TOKEN_KEY = 'suryavansh_portfolio_admin_token';
const USER_KEY = 'suryavansh_portfolio_admin_user';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(token && adminUser?.role === 'admin');

  // Verify token on mount
  useEffect(() => {
    const verifyTokenOnMount = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
            setToken(storedToken);
          } else {
            logout();
          }
        } else {
          // Token invalid or expired
          logout();
        }
      } catch (err) {
        console.error('Session verification error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyTokenOnMount();
  }, []);

  const login = async (usernameOrPassword, maybePassword) => {
    const username = maybePassword !== undefined ? usernameOrPassword : 'admin';
    const password = maybePassword !== undefined ? maybePassword : usernameOrPassword;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        let errMessage = data.error;
        if (res.status === 401) {
          errMessage = 'Incorrect password. Please try again.';
        } else if (res.status === 502 || res.status === 503 || res.status === 504) {
          errMessage = 'Backend server is unavailable. Please make sure the server is running on port 5000.';
        }
        return {
          success: false,
          status: res.status,
          error: errMessage || 'Login failed. Please check your credentials.'
        };
      }

      // Save token and user
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      setAdminUser(data.user);

      return {
        success: true,
        user: data.user
      };
    } catch (err) {
      console.error('Login network error:', err);
      return {
        success: false,
        isNetworkError: true,
        error: 'Backend server is unavailable. Please make sure the server is running on port 5000.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken('');
    setAdminUser(null);

    // Call server logout optionally
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  const getAuthHeaders = () => {
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        getAuthHeaders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
