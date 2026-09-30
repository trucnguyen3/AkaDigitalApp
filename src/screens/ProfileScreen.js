import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/theme';

export default function ProfileScreen() {
  const { user, logout, deleteAccount } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: logout },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Xóa Tài Khoản',
      'Hành động này sẽ xóa vĩnh viễn dữ liệu tài khoản của bạn khỏi hệ thống và không thể hoàn tác. Bạn có chắc chắn không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa Vĩnh Viễn',
          style: 'destructive',
          onPress: async () => {
            const res = await deleteAccount();
            if (res.success) {
              Alert.alert('Thành công', 'Tài khoản của bạn đã bị xóa.');
            } else {
              Alert.alert('Lỗi', res.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.fullName?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.userName}>{user?.fullName || 'Người dùng'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
      </View>

      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnLogoutText}>Đăng Xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDelete} onPress={handleDeleteAccount}>
          <Text style={styles.btnDeleteText}>Xóa Tài Khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background, paddingTop: 20 },
  card: { backgroundColor: colors.white, padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: colors.lightGray },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: colors.white, fontSize: 28, fontWeight: 'bold' },
  userName: { fontSize: 20, fontWeight: 'bold', color: colors.dark },
  userEmail: { fontSize: 14, color: colors.gray, marginTop: 4 },
  menuGroup: { gap: 12 },
  btnLogout: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray, padding: 16, borderRadius: 12, alignItems: 'center' },
  btnLogoutText: { color: colors.dark, fontWeight: 'bold', fontSize: 16 },
  btnDelete: { backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fca5a5', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnDeleteText: { color: colors.danger, fontWeight: 'bold', fontSize: 16 },
});