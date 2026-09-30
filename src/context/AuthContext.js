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
  const signup = async (fullName, email, password) => {
    try {
      const usersData = await AsyncStorage.getItem('registeredUsers');
      let users = usersData ? JSON.parse(usersData) : [];

      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existingUser) {
        return { success: false, message: 'Email này đã được đăng ký!' };
      }

      const newUser = { fullName, email, password };
      users.push(newUser);

      await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Đã xảy ra lỗi khi đăng ký.' };
    }
  };

  // 2. Đăng nhập
  const login = async (email, password) => {
    try {
      if (email === 'demo@akadigital.net' && password === '123456') {
        const demoUser = { fullName: 'Demo User', email: 'demo@akadigital.net' };
        await AsyncStorage.setItem('currentUser', JSON.stringify(demoUser));
        setUser(demoUser);
        return { success: true };
      }

      const usersData = await AsyncStorage.getItem('registeredUsers');
      let users = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        return { success: true };
      } else {
        return { success: false, message: 'Email hoặc mật khẩu không chính xác.' };
      }
    } catch (e) {
      return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập.' };
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
      if (!user) return;
      const usersData = await AsyncStorage.getItem('registeredUsers');
      let users = usersData ? JSON.parse(usersData) : [];

      const updatedUsers = users.filter(
        (u) => u.email.toLowerCase() !== user.email.toLowerCase()
      );
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Không thể xóa tài khoản lúc này.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};