import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Profile' },
  { icon: 'card-outline', label: 'Payment methods' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'settings-outline', label: 'Settings' },
  { icon: 'shield-checkmark-outline', label: 'Security' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
  { icon: 'document-text-outline', label: 'Terms & privacy' },
  { icon: 'information-circle-outline', label: 'About' },
  { icon: 'log-out-outline', label: 'Logout', danger: true },
];

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="apps-outline" size={28} color="#1a1a1a" />
            <Text style={styles.headerTitle}>More</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              danger={item.danger}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label, danger }) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
    <View style={[styles.menuIconContainer, danger && styles.menuIconDanger]}>
      <Ionicons name={icon} size={22} color={danger ? '#c62828' : '#1a1a1a'} />
    </View>
    <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  menuSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIconDanger: {
    backgroundColor: '#ffebee',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  menuLabelDanger: {
    color: '#c62828',
  },
});

export default MoreScreen;
