import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  tag: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Tasks', icon: '⚡', color: '#6366f1', tag: 'Popular' },
  { id: 'electrician', name: 'Electrician', icon: '🔌', color: '#f59e0b', tag: 'High Demand' },
  { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#0ea5e9', tag: 'Emergency' },
  { id: 'cleaning', name: 'Deep Cleaning', icon: '🧹', color: '#10b981', tag: 'Top Rated' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', color: '#d97706', tag: 'Custom' },
  { id: 'appliance', name: 'Appliance Fix', icon: '❄️', color: '#ec4899', tag: 'Fast' },
  { id: 'painting', name: 'Painting', icon: '🎨', color: '#8b5cf6', tag: 'Quality' },
  { id: 'moving', name: 'Moving & Lifting', icon: '📦', color: '#14b8a6', tag: 'Helpers' },
  { id: 'tutor', name: 'Tutoring', icon: '📚', color: '#3b82f6', tag: 'Academics' },
];

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.subText}>{CATEGORIES.length} services available</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                isSelected && styles.selectedCard,
                { borderColor: isSelected ? cat.color : '#334155' },
              ]}
              onPress={() => onSelectCategory(cat.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrapper, { backgroundColor: `${cat.color}20` }]}>
                <Text style={styles.icon}>{cat.icon}</Text>
              </View>
              <Text style={[styles.categoryName, isSelected && styles.selectedCategoryName]}>
                {cat.name}
              </Text>
              <View style={[styles.tagBadge, { backgroundColor: `${cat.color}15` }]}>
                <Text style={[styles.tagText, { color: cat.color }]}>{cat.tag}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  subText: {
    fontSize: 12,
    color: '#64748b',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: 110,
    borderWidth: 1.5,
  },
  selectedCard: {
    backgroundColor: '#1e1b4b',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 22,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 6,
    height: 30,
  },
  selectedCategoryName: {
    color: '#ffffff',
    fontWeight: '700',
  },
  tagBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
  },
});
