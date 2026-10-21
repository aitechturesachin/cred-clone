import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const EMI_PAY_AMOUNT = '30,121.87';

const EMIDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Needs Attention Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEEDS ATTENTION</Text>
          
          <View style={styles.needsCard}>
            {/* Top beige section */}
            <View style={styles.needsCardTop}>
              <View style={styles.needsCardHeader}>
                <View>
                  <Text style={styles.emiTitle}>
                    EMI <Text style={styles.dueTitleOrange}>Overdue 2 EMI(s)</Text>
                  </Text>
                  <Text style={styles.emiSubtitle}>
                    your autopay setup will take care of{'\n'}
                    paying your EMI on the due date
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="calendar-clock" size={32} color="#ff9500" />
                </View>
              </View>
            </View>

            {/* Bottom white section */}
            <View style={styles.needsCardBottom}>
              <Text style={styles.amount}>₹{EMI_PAY_AMOUNT}</Text>
              <Text style={styles.accountDetails}>
                Sandeep singh 103680 • EMI 22 of 24
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() =>
                    navigation?.navigate('LoanDetails', {
                      openPayModal: true,
                      payAmount: EMI_PAY_AMOUNT,
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.payNowText}>Pay now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => navigation?.navigate('LoanDetails')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Your Active Draws Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR ACTIVE DRAWS</Text>
          
          <View style={styles.activeDrawCard}>
            {/* Circular Progress (View-based to avoid native SVG issues on Android) */}
            <View style={styles.progressContainer}>
              <View style={styles.progressRingOuter} />
              <View style={styles.progressCenter}>
                <MaterialCommunityIcons name="shield-check" size={32} color="#00ff88" />
                <Text style={styles.progressPercentage}>80%</Text>
                <Text style={styles.progressLabel}>paid</Text>
              </View>
            </View>

            {/* Draw Info */}
            <View style={styles.drawInfo}>
              <Text style={styles.onTrackLabel}>ON TRACK</Text>
              <Text style={styles.drawName}>Sandeep singh 103680</Text>
              <Text style={styles.drawSubtitle}>4 months left</Text>
            </View>
          </View>
        </View>

        {/* Exclusive Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>
            exclusive benefits{'\n'}
            for your CRED cash
          </Text>
          <View style={styles.benefitsIndicator} />
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  needsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  needsCardTop: {
    backgroundColor: '#c9b5a0',
    padding: 20,
  },
  needsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  dueTitleOrange: {
    color: '#ff6b35',
  },
  emiSubtitle: {
    fontSize: 13,
    color: '#4a4a4a',
    lineHeight: 18,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 149, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  needsCardBottom: {
    backgroundColor: '#e8e8e8',
    padding: 20,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  accountDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  payNowButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  payNowText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  activeDrawCard: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  progressContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressRingOuter: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: '#2a2a2a',
  },
  progressCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  drawInfo: {
    alignItems: 'center',
    width: '100%',
  },
  onTrackLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  drawName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  drawSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  benefitsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  benefitsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  benefitsIndicator: {
    width: 80,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});

export default EMIDetailsScreen;