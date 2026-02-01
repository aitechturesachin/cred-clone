import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>More</Text>
        </View>
        
        <View style={styles.menuSection}>
          <MenuItem icon="person-outline" label="Profile" />
          <MenuItem icon="settings-outline" label="Settings" />
          <MenuItem icon="help-circle-outline" label="Help & Support" />
          <MenuItem icon="shield-checkmark-outline" label="Security" />
          <MenuItem icon="information-circle-outline" label="About" />
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={24} color="#1a1a1a" />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
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
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});

export default MoreScreen;