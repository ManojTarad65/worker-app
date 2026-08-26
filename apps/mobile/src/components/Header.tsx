import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

interface HeaderProps {
  location: string;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  searchQuery,
  onSearchChange,
  unreadCount = 2,
}) => {
  return (
    <View style={styles.container}>
      {/* Top row: Location & Notification badge */}
      <View style={styles.topRow}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
            <Text style={styles.pinIcon}>📍</Text>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
          <Text style={styles.bellIcon}>🔔</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Greeting Title */}
      <View style={styles.titleRow}>
        <Text style={styles.greeting}>Find Local Help</Text>
        <Text style={styles.subGreeting}>Trusted professionals near you</Text>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search electricians, plumbers, tutors..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6366f1',
    letterSpacing: 1,
    marginBottom: 2,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f8fafc',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#94a3b8',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
  },
  bellIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  titleRow: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#f8fafc',
    padding: 0,
  },
  clearIcon: {
    fontSize: 14,
    color: '#94a3b8',
    paddingHorizontal: 4,
  },
});
