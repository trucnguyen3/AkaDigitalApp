import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Lỗi kiểm tra phiên đăng nhập:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Đăng ký
  const signup = async ({ fullName, email, password, mobile }) => {
    try {
      const response = await fetch('https://uat1.akadigital.net/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, mobile }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Dữ liệu user trả về đã có fullName, email, mobile
        await AsyncStorage.setItem('currentUser', JSON.stringify(result.data));
        setUser(result.data);
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Đăng ký thất bại' };
      }
    } catch (error) {
      return { success: false, message: 'Không thể kết nối đến máy chủ.' };
    }
  };

  // 2. Đăng nhập
  const login = async (email, password) => {
    try {
      const response = await fetch('https://uat1.akadigital.net/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // result.data bây giờ đã có đầy đủ: { id, fullName, email, mobile }
        await AsyncStorage.setItem('currentUser', JSON.stringify(result.data));
        setUser(result.data); 
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  };

  // 3. Đăng xuất
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
    } catch (e) {
      console.error('Lỗi đăng xuất:', e);
    }
  };

  // 4. Xóa tài khoản
  const deleteAccount = async () => {
    try {
      const response = await fetch('https://uat1.akadigital.net/api/auth/delete-account', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          // Nếu dùng Cookie Session trong React Native, nhớ truyền credentials: 'include'
        },
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Xóa thông tin user cục bộ
        await AsyncStorage.removeItem('currentUser');
        setUser(null);
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || 'Không thể xóa tài khoản lúc này.' };
      }
    } catch (error) {
      console.error('❌ Delete Account Client Error:', error);
      return { success: false, message: 'Không thể kết nối đến máy chủ.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};