import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-outline" size={32} color="#fff" />
            </View>
            <View>
              <Text style={styles.greeting}>hello,</Text>
              <Text style={styles.userName}>Kajal</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Promo Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoImageContainer}>
            <View style={styles.walletImage}>
              <MaterialCommunityIcons name="credit-card" size={60} color="#666" />
            </View>
          </View>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>CRED WALLET</Text>
            <Text style={styles.promoDescription}>
              20% off on fees on loads{'\n'}over 15k via credit card
            </Text>
            <TouchableOpacity style={styles.claimButton}>
              <Text style={styles.claimButtonText}>CLAIM NOW</Text>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Money Matters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MONEY MATTERS</Text>
          <View style={styles.moneyRow}>
            <TouchableOpacity
              style={styles.moneyCard}
              onPress={() => navigation?.navigate('EMIDetails')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="cash" size={24} color="#1a1a1a" />
              <Text style={styles.moneyCardTitle}>CRED cash</Text>
              <Text style={styles.moneyCardSubtitle}>view details</Text>
              <Ionicons name="chevron-forward" size={16} color="#666" style={styles.chevron} />
            </TouchableOpacity>
            <View style={styles.walletCard}>
              <MaterialCommunityIcons name="wallet" size={24} color="#1a1a1a" />
              <Text style={styles.walletCardTitle}>CRED wallet</Text>
              <Text style={styles.walletAmount}>₹1.00</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Bills Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING BILLS (5)</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>view all</Text>
            </TouchableOpacity>
          </View>
          
          <BillCard
            title="Mahavitaran Electricity (..."
            subtitle="Ganesh Chintamani Yadav • 021..."
            amount="₹4,400"
            dueText="DUE IN 5 DAYS"
            onPress={() => navigation.navigate('EMIDetails')}
          />
          
          <BillCard
            title="Mahavitaran Electricity (..."
            subtitle="Ganesh Chintamani Yadav • 021..."
            amount="₹4,400"
            dueText="DUE IN 5 DAYS"
            onPress={() => navigation.navigate('EMIDetails')}
          />
        </View>

        {/* For You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FOR YOU</Text>
          <View style={styles.forYouGrid}>
            <ForYouItem icon="account-multiple" label="pay contacts" />
            <ForYouItem icon="receipt" label="bills & recharges" />
            <ForYouItem icon="book-open" label="education fees" badge="INSTANT" />
            <ForYouItem icon="gift" label="rewards" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const BillCard = ({ title, subtitle, amount, dueText, onPress }) => (
  <TouchableOpacity style={styles.billCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.billIcon}>
      <MaterialCommunityIcons name="flash" size={24} color="#ff6b35" />
    </View>
    <View style={styles.billInfo}>
      <Text style={styles.billTitle}>{title}</Text>
      <Text style={styles.billSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.billAction}>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>{amount}</Text>
      </TouchableOpacity>
      <Text style={styles.dueText}>{dueText}</Text>
    </View>
  </TouchableOpacity>
);

const ForYouItem = ({ icon, label, badge }) => (
  <View style={styles.forYouItem}>
    <View style={styles.forYouIconContainer}>
      <MaterialCommunityIcons name={icon} size={32} color="#1a1a1a" />
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>{badge}</Text>
        </View>
      )}
    </View>
    <Text style={styles.forYouLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    color: '#999',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff3b30',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    marginTop: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  promoImageContainer: {
    width: '40%',
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  walletImage: {
    transform: [{ rotate: '-15deg' }],
  },
  promoContent: {
    flex: 1,
    padding: 20,
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 12,
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1,
    marginRight: 4,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: '#666',
  },
  moneyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  moneyCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  moneyCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  moneyCardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    position: 'absolute',
    right: 20,
    top: '50%',
  },
  walletCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  walletCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00c853',
  },
  billCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  billIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  billSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  billAction: {
    alignItems: 'flex-end',
  },
  payButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dueText: {
    fontSize: 11,
    color: '#ff6b35',
    fontWeight: '600',
  },
  forYouGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  forYouItem: {
    width: '22%',
    alignItems: 'center',
  },
  forYouIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeLabel: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '700',
  },
  forYouLabel: {
    fontSize: 12,
    color: '#1a1a1a',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;