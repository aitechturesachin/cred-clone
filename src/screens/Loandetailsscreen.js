import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const REASON_OPTIONS = [
  'I have a better loan offer',
  'I no longer need to use CRED cash',
  'I have another reason',
];

const LoanDetailsScreen = ({ navigation }) => {
  const [showRepaymentModal, setShowRepaymentModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);

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
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>all your details are here</Text>
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>for </Text>
            <Text style={styles.accountName}>Sandeep singh 103680</Text>
            <Ionicons name="pencil" size={16} color="#fff" style={styles.editIcon} />
          </View>
        </View>

        {/* Loan and EMI Amount Card */}
        <View style={styles.amountCard}>
          <View style={styles.amountRow}>
            <View style={styles.amountItem}>
              <Text style={styles.amountValue}>₹1,03,680</Text>
              <Text style={styles.amountLabel}>loan amount</Text>
            </View>
            <View style={styles.amountDivider} />
            <View style={styles.amountItem}>
              <Text style={styles.amountValue}>₹5,121</Text>
              <Text style={styles.amountLabel}>EMI amount</Text>
            </View>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => navigation?.navigate('EmiRepaymentSchedule')}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.poweredByRow}>
            <Text style={styles.poweredByText}>powered by</Text>
            <View style={styles.bankBadge}>
              <Text style={styles.bankBadgeText}>IDFC First Bank</Text>
            </View>
          </View>
        </View>

        {/* Autopay Card */}
        <View style={styles.autopayCard}>
          <View style={styles.autopayIconContainer}>
            <View style={styles.autopayIcon}>
              <Ionicons name="flash" size={20} color="#ff3b30" />
            </View>
          </View>
          <View style={styles.autopayContent}>
            <Text style={styles.autopayTitle}>your EMI will be autopaid</Text>
            <View style={styles.autopayDetails}>
              <Text style={styles.autopayDate}>2nd of every month</Text>
              <Ionicons name="arrow-forward" size={14} color="#999" />
              <Text style={styles.autopayBank}>Icici Bank XX6667</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation?.navigate('EmiRepaymentSchedule')}
              activeOpacity={0.8}
            >
              <Text style={styles.viewSchedule}>View EMI schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressPercentage}>67%</Text>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>paid</Text>
                <Text style={styles.progressLabel}>till date</Text>
              </View>
            </View>
            <Text style={styles.onTrackBadge}>ON TRACK</Text>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: '67%' }]} />
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.paymentDetails}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>amount paid</Text>
              <Text style={styles.paymentValue}>₹62355.53</Text>
            </View>
            {/* <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>principal paid</Text>
              <Text style={styles.paymentValue}>₹69,782.29</Text>
            </View> */}
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>principal left</Text>
              <Text style={styles.paymentValue}>₹41,334.71</Text>
            </View>
          </View>
        </View>

        {/* Want to Pay Now Button */}
        <TouchableOpacity style={styles.payNowCard}>
          <Text style={styles.payNowText}>Want to pay now?</Text>
          <Ionicons name="arrow-forward" size={20} color="#1a1a1a" />
        </TouchableOpacity>

        {/* Loan Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceContent}>
            <Text style={styles.insuranceTitle}>your loan insurance</Text>
            <Text style={styles.insuranceStatus}>
              is <Text style={styles.insuranceActive}>active</Text>
            </Text>
            <TouchableOpacity style={styles.insurancePolicyLink}>
              <Text style={styles.insurancePolicyText}>View insurance policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.insuranceIconContainer}>
            <View style={styles.insuranceShield}>
              <Ionicons name="shield-checkmark" size={32} color="#00ff88" />
            </View>
          </View>
        </View>

        {/* More Actions Section */}
        <View style={styles.moreActionsSection}>
          <Text style={styles.moreActionsTitle}>MORE ACTIONS</Text>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => setShowRepaymentModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.actionIconContainer}>
              <Ionicons name="calendar-outline" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>foreclose your loan</Text>
              <Text style={styles.actionSubtitle}>pay your dues early</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="document-text-outline" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>loan documents</Text>
              <Text style={styles.actionSubtitle}>access all your documents</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name="currency-inr" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>general charges</Text>
              <Text style={styles.actionSubtitle}>all applicable charges</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name="history" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>payment history</Text>
              <Text style={styles.actionSubtitle}>all repayments for this draw</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="document-outline" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>terms & conditions</Text>
              <Text style={styles.actionSubtitle}>important terms of your draw</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="help-circle-outline" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>FAQs</Text>
              <Text style={styles.actionSubtitle}>frequently asked questions</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>support</Text>
              <Text style={styles.actionSubtitle}>reach out for any help</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom sheet: Other Repayment Options */}
      <Modal
        visible={showRepaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRepaymentModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowRepaymentModal(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>OTHER REPAYMENT OPTIONS</Text>

            {/* Loan details row */}
            <View style={styles.bottomSheetLoanRow}>
              <View style={styles.bottomSheetLoanIcon}>
                <MaterialCommunityIcons name="file-document-outline" size={24} color="#999" />
              </View>
              <View style={styles.bottomSheetLoanInfo}>
                <Text style={styles.bottomSheetLoanName}>Sandeep singh 103680</Text>
                <Text style={styles.bottomSheetLoanAmount}>₹1,03,680</Text>
              </View>
            </View>

            {/* Close your loan early row - opens reason pop-up */}
            <TouchableOpacity
              style={styles.bottomSheetActionRow}
              onPress={() => {
                setShowRepaymentModal(false);
                setShowReasonModal(true);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.bottomSheetActionText}>close your loan early</Text>
              <Ionicons name="arrow-forward" size={20} color="#666" />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Bottom sheet: Why pay early (reason selection) */}
      <Modal
        visible={showReasonModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReasonModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowReasonModal(false)}
        >
          <Pressable style={styles.reasonSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.bottomSheetHandle} />
            {/* Chat bubbles icon */}
            <View style={styles.reasonIconRow}>
              <View style={styles.reasonBubbleGreen}>
                <View style={styles.reasonBubbleDots} />
                <View style={styles.reasonBubbleDots} />
                <View style={styles.reasonBubbleDots} />
              </View>
              <View style={styles.reasonBubblePurple}>
                <View style={styles.reasonBubbleDots} />
                <View style={styles.reasonBubbleDots} />
                <View style={styles.reasonBubbleDots} />
              </View>
            </View>
            <Text style={styles.reasonSubtitle}>we're curious</Text>
            <Text style={styles.reasonTitle}>let us know why you're choosing to pay early</Text>
            {/* Reason options */}
            {REASON_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.reasonOption,
                  selectedReason === option && styles.reasonOptionSelected,
                ]}
                onPress={() => setSelectedReason(option)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.reasonOptionText,
                    selectedReason === option && styles.reasonOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={() => {
                setShowReasonModal(false);
                setShowPayModal(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Bottom sheet: CRED PAY - Loan Foreclosure */}
      <Modal
        visible={showPayModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPayModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowPayModal(false)}
        >
          <Pressable style={styles.paySheet} onPress={(e) => e.stopPropagation()}>
            {/* Header: CRED PAY + Close */}
            <View style={styles.paySheetHeader}>
              <View style={styles.paySheetLogoRow}>
                <View style={styles.paySheetLogoIcon}>
                  <Text style={styles.paySheetLogoText}>C</Text>
                </View>
                <Text style={styles.paySheetTitle}>CRED PAY</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowPayModal(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Loan Foreclosure row */}
            <View style={styles.paySheetForeclosureRow}>
              <View style={styles.paySheetForeclosureIcon}>
                <MaterialCommunityIcons name="lightning-bolt" size={24} color="#1a1a1a" />
              </View>
              <View style={styles.paySheetForeclosureInfo}>
                <Text style={styles.paySheetForeclosureLabel}>LOAN FORECLOSURE</Text>
                <Text style={styles.paySheetForeclosureAmount}>₹57,600</Text>
              </View>
            </View>

            {/* Recommended methods */}
            <View style={styles.paySheetMethodsSection}>
              <View style={styles.paySheetMethodsHeader}>
                <Text style={styles.paySheetMethodsTitle}>RECOMMENDED METHODS</Text>
                <TouchableOpacity>
                  <Text style={styles.paySheetViewAll}>View all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.paySheetMethodRow}>
                <View style={styles.gpayLogoPlaceholder}>
                  <Text style={styles.gpayLogoText}>G</Text>
                </View>
                <View style={styles.paySheetMethodInfo}>
                  {/* <Text style={styles.paySheetMethodType}>upi app</Text> */}
                  <Text style={styles.paySheetMethodName}>GPay</Text>
                </View>
                <View style={styles.paySheetMethodRadio}>
                  <View style={styles.paySheetMethodRadioInner} />
                </View>
              </View>
            </View>

            {/* Bottom: net payable + Pay now */}
            <View style={styles.paySheetFooter}>
              <View style={styles.paySheetNetPayable}>
                <Text style={styles.paySheetNetLabel}>net payable</Text>
                <View style={styles.paySheetNetRow}>
                  <Text style={styles.paySheetNetAmount}>₹57,600</Text>
                  <Ionicons name="chevron-forward" size={18} color="#666" />
                </View>
              </View>
              <TouchableOpacity
                style={styles.payNowButton}
                onPress={() => setShowPayModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.payNowButtonText}>Pay now</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 12,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 14,
    color: '#999',
  },
  accountName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  editIcon: {
    marginLeft: 8,
  },
  amountCard: {
    backgroundColor: '#252525',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountItem: {
    flex: 1,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: '#999',
  },
  amountDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#3a3a3a',
    marginHorizontal: 16,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poweredByRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 11,
    color: '#666',
    marginRight: 8,
  },
  bankBadge: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  bankBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  autopayCard: {
    backgroundColor: '#252525',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  autopayIconContainer: {
    marginRight: 16,
  },
  autopayIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  autopayContent: {
    flex: 1,
  },
  autopayTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  autopayDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  autopayDate: {
    fontSize: 13,
    color: '#999',
    marginRight: 8,
  },
  autopayBank: {
    fontSize: 13,
    color: '#999',
    marginLeft: 8,
  },
  viewSchedule: {
    fontSize: 13,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  progressPercentage: {
    fontSize: 64,
    fontWeight: '700',
    color: '#00ff88',
    lineHeight: 64,
    marginRight: 12,
  },
  progressLabels: {
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
  onTrackBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 1,
  },
  progressBarContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 4,
  },
  paymentDetails: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#999',
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  payNowCard: {
    backgroundColor: '#e8e8e8',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  insuranceCard: {
    backgroundColor: '#e8f5f0',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  insuranceContent: {
    flex: 1,
  },
  insuranceTitle: {
    fontSize: 15,
    color: '#4a4a4a',
    marginBottom: 4,
  },
  insuranceStatus: {
    fontSize: 15,
    color: '#4a4a4a',
    marginBottom: 8,
  },
  insuranceActive: {
    fontWeight: '700',
    color: '#00c853',
  },
  insurancePolicyLink: {
    marginTop: 4,
  },
  insurancePolicyText: {
    fontSize: 13,
    color: '#4a4a4a',
    textDecorationLine: 'underline',
  },
  insuranceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insuranceShield: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreActionsSection: {
    paddingHorizontal: 20,
  },
  moreActionsTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  // Bottom sheet / pop-up styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  bottomSheetLoanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 12,
  },
  bottomSheetLoanIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bottomSheetLoanInfo: {
    flex: 1,
  },
  bottomSheetLoanName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  bottomSheetLoanAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  bottomSheetActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  bottomSheetActionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  // Reason selection bottom sheet (we're curious)
  reasonSheet: {
    backgroundColor: '#e8e8e8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  reasonIconRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 20,
  },
  reasonBubbleGreen: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#34c759',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginRight: -8,
    zIndex: 2,
  },
  reasonBubblePurple: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#af52de',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    zIndex: 1,
  },
  reasonBubbleDots: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  reasonSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  reasonOption: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  reasonOptionSelected: {
    borderColor: '#1a1a1a',
    backgroundColor: '#f5f5f5',
  },
  reasonOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  reasonOptionTextSelected: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  proceedButton: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  // CRED PAY Loan Foreclosure bottom sheet
  paySheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  paySheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  paySheetLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paySheetLogoIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  paySheetLogoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  paySheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  paySheetForeclosureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  paySheetForeclosureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paySheetForeclosureInfo: {
    flex: 1,
  },
  paySheetForeclosureLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  paySheetForeclosureAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  paySheetMethodsSection: {
    marginBottom: 24,
  },
  paySheetMethodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  paySheetMethodsTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
  },
  paySheetViewAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  paySheetMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 14,
  },
  gpayLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  gpayLogoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  paySheetMethodInfo: {
    flex: 1,
  },
  paySheetMethodType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  paySheetMethodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  paySheetMethodRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paySheetMethodRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
  },
  paySheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paySheetNetPayable: {
    flex: 1,
  },
  paySheetNetLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  paySheetNetRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paySheetNetAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 4,
  },
  payNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  payNowButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default LoanDetailsScreen;