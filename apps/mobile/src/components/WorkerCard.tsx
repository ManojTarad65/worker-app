import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  distanceKm: number;
  isVerified: boolean;
  isTopPro: boolean;
  skills: string[];
  availability: 'AVAILABLE_NOW' | 'BUSY' | 'TOMORROW';
}

interface WorkerCardProps {
  worker: Worker;
  onBookPress: (worker: Worker) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onBookPress }) => {
  return (
    <View style={styles.card}>
      {/* Top row: Avatar, Info, and Rate */}
      <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarEmoji}>{worker.avatar}</Text>
          {worker.isVerified && (
            <View style={styles.verifiedCheck}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{worker.name}</Text>
            {worker.isTopPro && (
              <View style={styles.topProBadge}>
                <Text style={styles.topProText}>TOP PRO</Text>
              </View>
            )}
          </View>
          <Text style={styles.profession}>{worker.profession}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>{worker.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>({worker.reviewsCount} jobs)</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.distanceText}>📍 {worker.distanceKm} km</Text>
          </View>
        </View>

        <View style={styles.rateCol}>
          <Text style={styles.rateAmount}>₹{worker.hourlyRate}</Text>
          <Text style={styles.rateUnit}>/hr</Text>
        </View>
      </View>

      {/* Skills chips */}
      <View style={styles.skillsRow}>
        {worker.skills.map((skill, index) => (
          <View key={index} style={styles.skillChip}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      {/* Bottom CTA Row */}
      <View style={styles.actionRow}>
        <View style={styles.availabilityWrapper}>
          <View
            style={[
              styles.availDot,
              {
                backgroundColor: worker.availability === 'AVAILABLE_NOW' ? '#22c55e' : '#f59e0b',
              },
            ]}
          />
          <Text style={styles.availText}>
            {worker.availability === 'AVAILABLE_NOW' ? 'Available Today' : 'Next: Tomorrow'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => onBookPress(worker)}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Hire / Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  verifiedCheck: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1e293b',
  },
  checkText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  topProBadge: {
    backgroundColor: '#f59e0b20',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  topProText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#f59e0b',
  },
  profession: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    color: '#fbbf24',
    fontSize: 13,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f8fafc',
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#64748b',
  },
  dot: {
    color: '#475569',
    marginHorizontal: 6,
  },
  distanceText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  rateCol: {
    alignItems: 'flex-end',
  },
  rateAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38bdf8',
  },
  rateUnit: {
    fontSize: 11,
    color: '#64748b',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  skillChip: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  skillText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
  },
  availabilityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  availText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
