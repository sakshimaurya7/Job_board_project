import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("jobhub_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("jobhub_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jobhub_token", token);
    } else {
      localStorage.removeItem("jobhub_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("jobhub_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jobhub_user");
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      if (data.success) {
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
        }
      }
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please check your credentials.";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      if (data.success && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("jobhub_user");
      localStorage.removeItem("jobhub_token");
    }
  };

  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const newUser = typeof updatedUserData === "function" ? updatedUserData(prev) : { ...prev, ...updatedUserData };
      localStorage.setItem("jobhub_user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
