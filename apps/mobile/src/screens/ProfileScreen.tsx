import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';

export const ProfileScreen: React.FC = () => {
  const [isWorkerMode, setIsWorkerMode] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>Manoj Tarad</Text>
        <Text style={styles.phone}>+91 98765 43210 • Bengaluru</Text>
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>🛡️ Verified Customer</Text>
        </View>
      </View>

      {/* Role Switcher */}
      <View style={styles.switchCard}>
        <View style={styles.switchInfo}>
          <Text style={styles.switchTitle}>Worker Mode</Text>
          <Text style={styles.switchDesc}>Switch to offer your services and earn</Text>
        </View>
        <Switch
          value={isWorkerMode}
          onValueChange={setIsWorkerMode}
          thumbColor={isWorkerMode ? '#6366f1' : '#64748b'}
          trackColor={{ false: '#334155', true: '#4338ca' }}
        />
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>★ 4.9</Text>
          <Text style={styles.statLabel}>User Rating</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>₹4,850</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Quick Settings */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionHeader}>ACCOUNT & SECURITY</Text>

        {[
          { icon: '📍', label: 'Saved Addresses', detail: 'Indiranagar, Koramangala' },
          { icon: '💳', label: 'Payment Methods', detail: 'UPI & Cards' },
          { icon: '🔔', label: 'Notification Preferences', detail: 'SMS, Push' },
          { icon: '🔒', label: 'Privacy & Safety', detail: 'Encrypted' },
          { icon: '❓', label: 'Help & 24/7 Support', detail: 'Live Chat' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuDetail}>{item.detail}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f8fafc',
  },
  phone: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4ade80',
  },
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4f46e5',
  },
  switchInfo: {
    flex: 1,
    marginRight: 12,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  switchDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38bdf8',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6366f1',
    letterSpacing: 1,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f8fafc',
  },
  menuDetail: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#64748b',
  },
});
