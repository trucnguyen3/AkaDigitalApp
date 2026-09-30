import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/theme';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const services = [
    { title: 'Customer Data Platform (CDP)', desc: 'Thu thập, hợp nhất và tối ưu dữ liệu khách hàng đa kênh.' },
    { title: 'Marketing Automation', desc: 'Tự động hóa chiến dịch Marketing cá nhân hóa theo thời gian thực.' },
    { title: 'Analytics & Insights', desc: 'Phân tích hành vi, đo lường hiệu quả chuyển đổi dựa trên AI/ML.' },
    { title: 'Omnichannel Experience', desc: 'Đồng bộ hóa trải nghiệm khách hàng trên Web, App & Store.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.welcomeText}>Xin chào, {user?.fullName || 'Khách hàng'} 👋</Text>
        <Text style={styles.heroTitle}>AKA DIGITAL</Text>
        <Text style={styles.heroSubtitle}>
          Đơn vị tư vấn & triển khai giải pháp Chuyển Đổi Số Marketing (MarTech) hàng đầu.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Về AKA Digital</Text>
        <Text style={styles.bodyText}>
          AKA Digital đồng hành cùng doanh nghiệp xây dựng nền tảng dữ liệu hiện đại, ứng dụng công nghệ Marketing tiên tiến để tối ưu hóa chi phí và gia tăng doanh thu vượt trội.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Giải Pháp Cốt Lõi</Text>
        {services.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>100+</Text>
          <Text style={styles.statLabel}>Dự án triển khai</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>50M+</Text>
          <Text style={styles.statLabel}>Hồ sơ dữ liệu</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>98%</Text>
          <Text style={styles.statLabel}>Khách hàng hài lòng</Text>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerBanner: { backgroundColor: colors.primary, padding: 24, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  welcomeText: { color: '#c7d2fe', fontSize: 14, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: '900' },
  heroSubtitle: { color: '#e0e7ff', fontSize: 14, marginTop: 6, lineHeight: 20 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.dark, marginBottom: 12 },
  bodyText: { fontSize: 14, color: colors.gray, lineHeight: 22 },
  card: { backgroundColor: colors.white, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.lightGray },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: colors.gray, lineHeight: 18 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  statBox: { flex: 1, backgroundColor: colors.white, padding: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: colors.lightGray },
  statNum: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 11, color: colors.gray, textAlign: 'center', marginTop: 4 },
});