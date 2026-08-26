import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const MessagesScreen: React.FC = () => {
  const conversations = [
    {
      id: '1',
      name: 'Rajesh Kumar (Electrician)',
      avatar: '👨🏽‍🔧',
      lastMessage: "I'm 5 minutes away, please keep the main switch accessible.",
      time: '2m ago',
      unread: 1,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Amit Sharma (Plumber)',
      avatar: '🧑🏻‍🔧',
      lastMessage: 'Task completed! Please rate the service when convenient.',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Support & Help Desk',
      avatar: '🛡️',
      lastMessage: 'Welcome to Local Task Marketplace! How can we assist you?',
      time: '2 days ago',
      unread: 0,
      isOnline: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Direct chat with your hired pros</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {conversations.map((item) => (
          <TouchableOpacity key={item.id} style={styles.convoItem} activeOpacity={0.7}>
            <View style={styles.avatarWrapper}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
              {item.isOnline && <View style={styles.onlineDot} />}
            </View>

            <View style={styles.textCol}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={[styles.lastMsg, item.unread > 0 && styles.unreadMsg]} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
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
  },
  list: {
    padding: 16,
  },
  convoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 22,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderWidth: 1.5,
    borderColor: '#1e293b',
  },
  textCol: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f8fafc',
  },
  time: {
    fontSize: 11,
    color: '#64748b',
  },
  lastMsg: {
    fontSize: 12,
    color: '#94a3b8',
  },
  unreadMsg: {
    color: '#ffffff',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
});
