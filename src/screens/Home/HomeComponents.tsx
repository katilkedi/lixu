import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SectionItem, QuickAction } from './HomeLogic';
import { styles } from './HomeStyles';

interface SectionGridProps {
  title: string;
  items: SectionItem[];
  onPressItem?: (item: SectionItem) => void;
}

interface QuickActionBarProps {
  items: QuickAction[];
  onItemPress?: (item: QuickAction) => void;
}

interface InsightCardProps {
  onPress?: () => void;
}

export const SectionGrid: React.FC<SectionGridProps> = ({ title, items, onPressItem }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionMore}>⋮</Text>
    </View>
    <View style={styles.sectionGrid}>
      {items.map(item => (
        <TouchableOpacity
          key={item.key}
          style={styles.sectionCard}
          onPress={() => onPressItem?.(item)}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
          </View>
          <Text style={styles.cardLabel}>{item.label}</Text>
          {item.helper ? <Text style={styles.cardHelper}>{item.helper}</Text> : null}
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export const InsightCard: React.FC<InsightCardProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.insightCard} onPress={onPress}>
    <View>
      <Text style={styles.insightTitle}>İstatistiklerim</Text>
      <Text style={styles.insightText}>Bugün 12 dakikalık okuma zincirin var. Harika!</Text>
    </View>
    <Text style={styles.insightAction}>→</Text>
  </TouchableOpacity>
);

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ items, onItemPress }) => (
  <View style={styles.bottomNav}>
    {items.map(item => (
      <TouchableOpacity
        key={item.key}
        accessibilityRole="button"
        style={styles.bottomNavItem}
        onPress={() => onItemPress?.(item)}
      >
        <View style={styles.bottomNavIcon}>
          <Text style={styles.bottomNavEmoji}>{item.emoji}</Text>
        </View>
        <Text style={styles.bottomNavLabel}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
