import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
    console.log('>>> Bắt đầu gửi login demo');
    try {
      setLoading(true);
      
      // Thử 1 trong 2 dạng tham số tùy vào hàm login trong project của bạn:
      // Dạng 1: 2 tham số riêng biệt
      await login('demo@akadigital.net', '123456'); 
      
      // Dạng 2: Object (nếu AuthContext của bạn viết nhận object)
      // await login({ email: 'demo@akadigital.net', password: '123456' });

      console.log('>>> Login thành công');
    } catch (error) {
      console.error('>>> Lỗi Login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.brandTitle}>AKA DIGITAL</Text>
      <Text style={styles.subtitle}>Chuyển đổi số & Giải pháp MarTech</Text>

      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor={colors.gray}
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
  brandTitle: { fontSize: 34, fontWeight: '900', color: colors.primary, textAlign: 'center', letterSpacing: 1.5 },
  subtitle: { fontSize: 13, color: colors.gray, textAlign: 'center', marginBottom: 36, marginTop: 4 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.textLight, marginBottom: 16 },
  input: { backgroundColor: colors.cardBg, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGray, marginBottom: 12, color: colors.textLight },
  btnPrimary: { backgroundColor: colors.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: colors.dark, fontWeight: 'bold', fontSize: 16 },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  btnSecondaryText: { color: colors.primary, fontWeight: '600' },
  linkBtn: { marginTop: 24, alignItems: 'center' },
  linkText: { color: colors.gray },
});