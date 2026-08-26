import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export type TabType = 'explore' | 'tasks' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabSelect: (tab: TabType) => void;
  tasksBadge?: number;
  messagesBadge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabSelect,
  tasksBadge = 1,
  messagesBadge = 3,
}) => {
  const tabs: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'explore', label: 'Explore', icon: '🔍' },
    { id: 'tasks', label: 'My Tasks', icon: '📋', badge: tasksBadge },
    { id: 'messages', label: 'Messages', icon: '💬', badge: messagesBadge },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabSelect(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, isActive && styles.activeIcon]}>{tab.icon}</Text>
              {tab.badge !== undefined && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
    position: 'relative',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
    opacity: 0.6,
  },
  activeIcon: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0f172a',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  activeLabel: {
    color: '#6366f1',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#6366f1',
  },
});
