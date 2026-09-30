import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const res = await login(email, password);
    if (!res.success) {
      Alert.alert('Đăng nhập thất bại', res.message);
    }
  };

  const handleDemoLogin = async () => {
    await login('demo@akadigital.net', '123456');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}>AKA DIGITAL</Text>
      <Text style={styles.subtitle}>Chuyển đổi số & Giải pháp MarTech</Text>

      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={handleDemoLogin}>
        <Text style={styles.btnSecondaryText}>Dùng tài khoản Demo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>
          Chưa có tài khoản? <Text style={{ fontWeight: 'bold', color: colors.primary }}>Đăng ký ngay</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  brandTitle: { fontSize: 32, fontWeight: '900', color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.gray, textAlign: 'center', marginBottom: 32 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.dark, marginBottom: 16 },
  input: { backgroundColor: colors.white, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGray, marginBottom: 12, color: colors.dark },
  btnPrimary: { backgroundColor: colors.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  btnSecondary: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnSecondaryText: { color: colors.primary, fontWeight: '600' },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { color: colors.gray },
});