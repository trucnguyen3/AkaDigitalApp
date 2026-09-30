import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/theme';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ các thông tin!');
      return;
    }
    const res = await signup({ fullName, email, mobile, password });
    if (!res.success) {
      Alert.alert('Đăng ký thất bại', res.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Tài Khoản Mới</Text>
      <Text style={styles.subtitle}>Khám phá giải pháp chuyển đổi số tại AKA Digital</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        placeholderTextColor="#94a3b8"
        value={fullName}
        onChangeText={setFullName}
      />

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
        placeholder="Mobile"
        placeholderTextColor="#94a3b8"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
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

      <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup}>
        <Text style={styles.btnText}>Đăng Ký</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Đã có tài khoản? <Text style={{ fontWeight: 'bold', color: colors.primary }}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.gray, marginBottom: 24 },
  input: { backgroundColor: colors.white, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGray, marginBottom: 12, color: colors.dark },
  btnPrimary: { backgroundColor: colors.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { color: colors.gray },
});