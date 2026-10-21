import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <MaterialCommunityIcons name="gift-outline" size={28} color="#1a1a1a" />
            <Text style={styles.headerTitle}>Rewards</Text>
          </View>
        </View>

        <View style={styles.content}>
          <MaterialCommunityIcons name="gift-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No rewards available</Text>
          <View style={styles.emptySubtextRow}>
            <MaterialCommunityIcons name="circle-multiple" size={16} color="#999" />
            <Text style={styles.emptySubtext}>Pay bills to earn CRED coins</Text>
          </View>
          <TouchableOpacity style={styles.exploreButton} activeOpacity={0.8}>
            <Ionicons name="compass-outline" size={20} color="#fff" />
            <Text style={styles.exploreButtonText}>Explore rewards</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  exploreButton: {
    marginTop: 24,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RewardsScreen;
