import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ActiveTaskCardProps {
  taskTitle: string;
  workerName: string;
  workerAvatar: string;
  eta: string;
  status: string;
  onTrackPress?: () => void;
}

export const ActiveTaskCard: React.FC<ActiveTaskCardProps> = ({
  taskTitle,
  workerName,
  workerAvatar,
  eta,
  status,
  onTrackPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <View style={styles.pulsingDot} />
          <Text style={styles.liveText}>ACTIVE TASK</Text>
        </View>
        <Text style={styles.statusBadge}>{status}</Text>
      </View>

      <Text style={styles.taskTitle}>{taskTitle}</Text>

      <View style={styles.workerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{workerAvatar}</Text>
        </View>
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{workerName}</Text>
          <Text style={styles.etaText}>⚡ Arriving in {eta}</Text>
        </View>

        <TouchableOpacity style={styles.trackButton} onPress={onTrackPress} activeOpacity={0.8}>
          <Text style={styles.trackButtonText}>Track 📍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#1e1b4b',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#4f46e5',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#818cf8',
    letterSpacing: 1,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34d399',
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#312e81',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f8fafc',
  },
  etaText: {
    fontSize: 12,
    color: '#a5b4fc',
    marginTop: 2,
  },
  trackButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
