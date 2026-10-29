import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// CRED CASH one-time settlement (50% waiver on overdue charges)
const PRINCIPAL_LEFT = 10243;
const OVERDUE_CHARGES = 19879.75;
const WAIVER_PERCENT = 50;
const WAIVER_AMOUNT = 9939.88; // 50% of overdue charges
const REMAINING_CHARGES = 9939.88;
const SETTLEMENT_TOTAL = 20182.88; // principal + remaining charges
const OVERDUE_EMI_COUNT = 2;
const OFFER_DEADLINE = "02 Nov 2026";
const formatAmount = (value) =>
  value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const EMI_PAY_AMOUNT = formatAmount(SETTLEMENT_TOTAL);

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
              <View style={styles.offerBadge}>
                <Ionicons name="gift-outline" size={14} color="#fff" />
                <Text style={styles.offerBadgeText}>
                  SPECIAL ONE-TIME SETTLEMENT · {WAIVER_PERCENT}% WAIVER
                </Text>
              </View>
              <Text style={styles.amountLabel}>final settlement amount</Text>
              <Text style={styles.amount}>₹{EMI_PAY_AMOUNT}</Text>

              {/* Settlement calculation breakdown */}
              <View style={styles.breakdownBox}>
                <Text style={styles.breakdownTitle}>SETTLEMENT BREAKDOWN</Text>
                <Text style={styles.breakdownHint}>
                  {OVERDUE_EMI_COUNT} EMI(s) overdue · EMI 22 of 24
                </Text>

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownLabelRow}>
                    <MaterialCommunityIcons
                      name="cash-plus"
                      size={16}
                      color="#2e7d32"
                    />
                    <View style={styles.breakdownLabelWrap}>
                      <Text style={styles.breakdownLabel}>
                        Principal outstanding
                      </Text>
                      <Text style={styles.breakdownSub}>
                        actual outstanding loan principal
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.breakdownValueGreen}>
                    ₹{formatAmount(PRINCIPAL_LEFT)}
                  </Text>
                </View>

                <View style={styles.breakdownPlus}>
                  <Text style={styles.breakdownPlusText}>+</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownLabelRow}>
                    <Ionicons name="alert-circle" size={16} color="#ff9500" />
                    <View style={styles.breakdownLabelWrap}>
                      <Text style={styles.breakdownLabel}>Overdue charges</Text>
                      <Text style={styles.breakdownSub}>
                        late fees on {OVERDUE_EMI_COUNT} unpaid EMI(s)
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.breakdownValueOrange}>
                    ₹{formatAmount(OVERDUE_CHARGES)}
                  </Text>
                </View>

                <View style={styles.breakdownPlus}>
                  <Text style={styles.breakdownPlusText}>−</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownLabelRow}>
                    <Ionicons name="pricetag" size={16} color="#2e7d32" />
                    <View style={styles.breakdownLabelWrap}>
                      <Text style={styles.breakdownLabel}>
                        {WAIVER_PERCENT}% waiver on overdue charges
                      </Text>
                      <Text style={styles.breakdownSub}>
                        special one-time settlement offer
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.breakdownValueGreen}>
                    −₹{formatAmount(WAIVER_AMOUNT)}
                  </Text>
                </View>

                <View style={styles.breakdownPlus}>
                  <Text style={styles.breakdownPlusText}>=</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownLabelRow}>
                    <Ionicons name="receipt-outline" size={16} color="#ff9500" />
                    <View style={styles.breakdownLabelWrap}>
                      <Text style={styles.breakdownLabel}>
                        Remaining overdue charges
                      </Text>
                      <Text style={styles.breakdownSub}>
                        after {WAIVER_PERCENT}% waiver
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.breakdownValueOrange}>
                    ₹{formatAmount(REMAINING_CHARGES)}
                  </Text>
                </View>

                <View style={styles.breakdownDivider} />

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownLabelRow}>
                    <Ionicons name="card-outline" size={16} color="#c62828" />
                    <View style={styles.breakdownLabelWrap}>
                      <Text style={styles.breakdownLabelTotal}>
                        Total final settlement
                      </Text>
                      <Text style={styles.breakdownSub}>
                        principal + remaining charges
                      </Text>
                    </View>
                  </View>
                  <View style={styles.breakdownTotalBadge}>
                    <Text style={styles.breakdownTotalValue}>
                      ₹{EMI_PAY_AMOUNT}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.finalOfferBox}>
                <Ionicons name="warning" size={18} color="#c62828" />
                <Text style={styles.finalOfferText}>
                  This is the final and last offer. Pay before{' '}
                  <Text style={styles.finalOfferDate}>{OFFER_DEADLINE}</Text> to
                  avoid a lined up account.
                </Text>
              </View>

              <View style={styles.warningRow}>
                <Ionicons name="alert-circle" size={14} color="#ff6b35" />
                <Text style={styles.dueTitleOrange}>
                  clear ₹{EMI_PAY_AMOUNT} via CRED app to close your account
                  successfully
                </Text>
              </View>
              <View style={styles.accountRow}>
                <Ionicons name="person-outline" size={14} color="#666" />
                <Text style={styles.accountDetails}>
                  Sandeep singh 103680 • EMI 22 of 24
                </Text>
              </View>

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
                  <Ionicons name="flash" size={16} color="#1a1a1a" />
                  <Text style={styles.payNowText}>Pay now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => navigation?.navigate('LoanDetails')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="document-text-outline" size={16} color="#fff" />
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
                <Text style={styles.progressPercentage}>83%</Text>
                <Text style={styles.progressLabel}>paid</Text>
              </View>
            </View>

            {/* Draw Info */}
            <View style={styles.drawInfo}>
              <View style={styles.onTrackRow}>
                <Ionicons name="checkmark-circle" size={14} color="#00ff88" />
                <Text style={styles.onTrackLabel}>ON TRACK</Text>
              </View>
              <Text style={styles.drawName}>Sandeep singh 103680</Text>
              <View style={styles.monthsLeftRow}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.drawSubtitle}>2 months EMI left</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Exclusive Benefits Section */}
        <View style={styles.benefitsSection}>
          <MaterialCommunityIcons
            name="gift-outline"
            size={36}
            color="#fff"
            style={styles.benefitsIcon}
          />
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
    flex: 1,
    fontSize: 12,
    color: '#ff6b35',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 10,
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
  offerBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
  },
  offerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  finalOfferBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef9a9a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  finalOfferText: {
    flex: 1,
    fontSize: 13,
    color: '#b71c1c',
    lineHeight: 18,
    fontWeight: '500',
  },
  finalOfferDate: {
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  breakdownBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  breakdownTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  breakdownHint: {
    fontSize: 12,
    color: '#888',
    marginBottom: 14,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
    paddingRight: 8,
  },
  breakdownLabelWrap: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  breakdownLabelTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  breakdownSub: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  breakdownValueGreen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2e7d32',
  },
  breakdownValueOrange: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff9500',
  },
  breakdownPlus: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  breakdownPlusText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  breakdownTotalBadge: {
    backgroundColor: '#c62828',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  breakdownTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  accountDetails: {
    fontSize: 13,
    color: '#666',
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
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
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
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
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
  onTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  onTrackLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 1.5,
  },
  drawName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  monthsLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  drawSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  benefitsIcon: {
    marginBottom: 12,
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