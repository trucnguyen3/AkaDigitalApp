import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors } from '../styles/theme';

export default function ProductsScreen() {
  const products = [
    {
      id: 'appsflyer',
      name: 'AppsFlyer',
      category: 'Mobile Attribution & Marketing Analytics',
      badge: 'Attribution Partner',
      badgeColor: '#00c853',
      description:
        'Nền tảng đo lường hiệu quả quảng cáo ứng dụng di động, phân tích nguồn cài đặt (Attribution) và bảo vệ gian lận quảng cáo (Fraud Protection) hàng đầu thế giới.',
      features: ['Deep Linking (OneLink)', 'SKAdNetwork / SKAN', 'Attribution Analytics', 'Anti-Fraud Protection'],
    },
    {
      id: 'clevertap',
      name: 'CleverTap',
      category: 'Customer Engagement & Retention',
      badge: 'Engagement Platform',
      badgeColor: '#ff3d00',
      description:
        'Nền tảng tương tác khách hàng thông minh kết hợp AI, giúp doanh nghiệp gửi thông báo Push Notification, In-App Message, Email và SMS cá nhân hóa theo thời gian thực.',
      features: ['Omnichannel Messaging', 'Real-time User Segmentation', 'Automated Customer Journeys', 'A/B Testing & AI Predictive'],
    },
    {
      id: 'mparticle',
      name: 'mParticle',
      category: 'Customer Data Platform (CDP)',
      badge: 'CDP Partner',
      badgeColor: '#29b6f6',
      description:
        'Nền tảng quản lý dữ liệu khách hàng (CDP) giúp kết nối, chuẩn hóa và luân chuyển dữ liệu người dùng an toàn giữa App/Web và các công cụ Marketing.',
      features: ['Data Pipelines & Integrations', 'Identity Resolution', 'Audience Building', 'Data Governance & Privacy'],
    },
    {
      id: 'onetrust',
      name: 'OneTrust',
      category: 'Privacy & Consent Management',
      badge: 'Consent & Privacy',
      badgeColor: '#7e57c2',
      description:
        'Giải pháp quản lý quyền riêng tư và sự đồng ý của người dùng (CMP) tuân thủ các quy định bảo mật quốc tế và trong nước (GDPR, Nghị định 13/ND-CP).',
      features: ['Cookie & App Consent Banner', 'Privacy Rights Management', 'Data Mapping & Assessment', 'Regulatory Compliance'],
    },
    {
      id: 'responsys',
      name: 'Oracle Responsys',
      category: 'Enterprise Email & Cross-Channel Campaign',
      badge: 'Enterprise Campaign',
      badgeColor: '#f4511e',
      description:
        'Hệ thống quản lý và tự động hóa chiến dịch Marketing quy mô lớn (Cross-channel Campaign Management) chuyên dụng cho doanh nghiệp Enterprise.',
      features: ['Program Orchestration', 'Dynamic Email Personalization', 'Relational Database Queries', 'Advanced Analytics'],
    },
  ];

  const handleConsult = (productName) => {
    Alert.alert(
      'Tư vấn Giải pháp',
      `Bạn muốn nhận tài liệu và tư vấn kỹ thuật triển khai cho ${productName}?`,
      [
        { text: 'Đóng', style: 'cancel' },
        { text: 'Gửi yêu cầu', onPress: () => Alert.alert('Thành công', 'Chuyên gia AKA Digital sẽ liên hệ với bạn trong vòng 24h!') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản Phẩm & Công Nghệ</Text>
        <Text style={styles.headerSubtitle}>
          AKA Digital tư vấn, tích hợp SDK & triển khai các nền tảng MarTech hàng đầu thế giới.
        </Text>
      </View>

      {/* Product List */}
      <View style={styles.listContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Header Card */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: item.badgeColor + '15' }]}>
                <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.productDesc}>{item.description}</Text>

            {/* Features Tags */}
            <Text style={styles.featureTitle}>Tính năng triển khai chính:</Text>
            <View style={styles.tagsContainer}>
              {item.features.map((feat, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>• {feat}</Text>
                </View>
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.btnAction} onPress={() => handleConsult(item.name)}>
              <Text style={styles.btnActionText}>Tư vấn tích hợp SDK</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: 20, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: colors.white },
  headerSubtitle: { fontSize: 13, color: '#e0e7ff', marginTop: 6, lineHeight: 18 },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  productName: { fontSize: 20, fontWeight: 'bold', color: colors.dark },
  productCategory: { fontSize: 12, color: colors.gray, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  productDesc: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 12 },
  featureTitle: { fontSize: 12, fontWeight: 'bold', color: colors.dark, marginBottom: 6 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  tag: { backgroundColor: '#f1f5f9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#475569', fontWeight: '500' },
  btnAction: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnActionText: { color: colors.white, fontWeight: 'bold', fontSize: 13 },
});