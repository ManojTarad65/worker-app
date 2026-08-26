import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const TasksScreen: React.FC = () => {
  const [filter, setFilter] = useState<'ongoing' | 'completed'>('ongoing');

  const tasks = [
    {
      id: '1',
      title: 'Ceiling Fan & Switchboard Wiring',
      category: 'Electrical',
      worker: 'Rajesh Kumar',
      workerAvatar: '👨🏽‍🔧',
      date: 'Today, 2:30 PM',
      status: 'IN_PROGRESS',
      statusColor: '#38bdf8',
      amount: '₹450',
    },
    {
      id: '2',
      title: 'Bathroom Leakage & Pipe Fit',
      category: 'Plumbing',
      worker: 'Amit Sharma',
      workerAvatar: '🧑🏻‍🔧',
      date: 'Yesterday',
      status: 'COMPLETED',
      statusColor: '#22c55e',
      amount: '₹600',
    },
    {
      id: '3',
      title: 'Full Kitchen Deep Cleaning',
      category: 'Cleaning',
      worker: 'Pooja Verma',
      workerAvatar: '👩🏻‍🌾',
      date: '24 Aug 2026',
      status: 'COMPLETED',
      statusColor: '#22c55e',
      amount: '₹1,200',
    },
  ];

  const filteredTasks = tasks.filter((t) =>
    filter === 'ongoing' ? t.status === 'IN_PROGRESS' : t.status === 'COMPLETED',
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings & Tasks</Text>
        <Text style={styles.subtitle}>Track your ongoing services and history</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, filter === 'ongoing' && styles.activeToggle]}
            onPress={() => setFilter('ongoing')}
          >
            <Text style={[styles.toggleText, filter === 'ongoing' && styles.activeToggleText]}>
              Active (1)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, filter === 'completed' && styles.activeToggle]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.toggleText, filter === 'completed' && styles.activeToggleText]}>
              History (2)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{task.category}</Text>
              </View>
              <Text style={[styles.statusText, { color: task.statusColor }]}>{task.status}</Text>
            </View>

            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDate}>📅 {task.date}</Text>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              <View style={styles.workerRow}>
                <Text style={styles.avatar}>{task.workerAvatar}</Text>
                <Text style={styles.workerName}>{task.worker}</Text>
              </View>
              <Text style={styles.amount}>{task.amount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#6366f1',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  activeToggleText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContent: {
    padding: 20,
  },
  taskCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#818cf8',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 18,
    marginRight: 6,
  },
  workerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38bdf8',
  },
});
