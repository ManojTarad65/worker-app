import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Worker } from './WorkerCard';

interface BookingModalProps {
  visible: boolean;
  worker: Worker | null;
  onClose: () => void;
  onConfirm: (bookingDetails: { taskDescription: string; scheduledTime: string }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  worker,
  onClose,
  onConfirm,
}) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState('Immediately (Within 30m)');

  if (!worker) return null;

  const timeSlots = [
    'Immediately (Within 30m)',
    'Today at 4:00 PM',
    'Today at 6:30 PM',
    'Tomorrow Morning',
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Book {worker.name}</Text>
              <Text style={styles.subtitle}>
                {worker.profession} • ₹{worker.hourlyRate}/hr
              </Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Task Description */}
            <Text style={styles.fieldLabel}>DESCRIBE YOUR TASK</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Fan repair, water leakage in bathroom, wall paint touch-up..."
              placeholderTextColor="#64748b"
              multiline
              numberOfLines={3}
              value={taskDescription}
              onChangeText={setTaskDescription}
            />

            {/* Time Slot Selection */}
            <Text style={styles.fieldLabel}>SELECT TIMING</Text>
            <View style={styles.slotsWrapper}>
              {timeSlots.map((slot, index) => {
                const isSelected = selectedTime === slot;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.slotChip, isSelected && styles.selectedSlot]}
                    onPress={() => setSelectedTime(slot)}
                  >
                    <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Price Estimate Card */}
            <View style={styles.estimateCard}>
              <View style={styles.estimateRow}>
                <Text style={styles.estimateLabel}>Base Rate</Text>
                <Text style={styles.estimateValue}>₹{worker.hourlyRate}</Text>
              </View>
              <View style={styles.estimateRow}>
                <Text style={styles.estimateLabel}>Platform & Safety Fee</Text>
                <Text style={styles.estimateValue}>₹29</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.estimateRow}>
                <Text style={styles.totalLabel}>Estimated Total</Text>
                <Text style={styles.totalValue}>₹{worker.hourlyRate + 29}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Confirm CTA */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              onConfirm({ taskDescription, scheduledTime: selectedTime });
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmText}>Confirm & Dispatch Worker 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#475569',
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#818cf8',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    color: '#f8fafc',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#334155',
    textAlignVertical: 'top',
    height: 80,
  },
  slotsWrapper: {
    gap: 8,
  },
  slotChip: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedSlot: {
    borderColor: '#6366f1',
    backgroundColor: '#1e1b4b',
  },
  slotText: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
  },
  selectedSlotText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  estimateCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  estimateLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  estimateValue: {
    fontSize: 13,
    color: '#f8fafc',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38bdf8',
  },
  confirmBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
