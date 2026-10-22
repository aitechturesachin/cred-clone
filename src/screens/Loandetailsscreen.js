import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

const STATEMENT_PDF_ASSET = require('../../assets/StatementofAccount.pdf');

// Lazy-load native modules so app doesn't crash in Expo Go (they're only in dev builds)
const getFileSystem = () => require('expo-file-system/legacy');
const getSharing = () => require('expo-sharing');
const getIntentLauncher = () => require('expo-intent-launcher');

const REASON_OPTIONS = [
  'I have a better loan offer',
  'I no longer need to use CRED cash',
  'I have another reason',
];

const getStatementPdfUri = async () => {
  const asset = Asset.fromModule(STATEMENT_PDF_ASSET);
  await asset.downloadAsync();
  if (!asset.localUri) throw new Error('PDF not available');
  return asset.localUri;
};

// Loan math: EMI 22 of 24, with 2 EMIs overdue → 20 EMIs actually paid
const LOAN_AMOUNT = 103680;
const EMI_AMOUNT = 5121;
const CURRENT_EMI = 22;
const OVERDUE_EMI_COUNT = 2;
const PAID_EMI_COUNT = CURRENT_EMI - OVERDUE_EMI_COUNT; // 20

const formatAmount = (value, decimals = 2) =>
  value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const TOTAL_EMI_PAID = PAID_EMI_COUNT * EMI_AMOUNT; // ₹1,02,420.00
// Overdue breakdown (matches EMI Details Pay now)
const PRINCIPAL_LEFT = 10243; // actual outstanding for 2 overdue EMIs
const OVERDUE_CHARGES = 19879.75; // late fees on 2 unpaid EMIs
const OVERDUE_PAY_AMOUNT = 30121; // principal + charges
// Amount paid shown = total EMI paid − principal left
const AMOUNT_PAID = TOTAL_EMI_PAID - PRINCIPAL_LEFT;
const PERCENT_PAID = Math.round(
  ((LOAN_AMOUNT - PRINCIPAL_LEFT) / LOAN_AMOUNT) * 100
);
const DEFAULT_PAY_AMOUNT = formatAmount(OVERDUE_PAY_AMOUNT); // ₹30,121.00

const LoanDetailsScreen = ({ navigation, route }) => {
  const [showRepaymentModal, setShowRepaymentModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSummaryPanel, setShowSummaryPanel] = useState(false);
  const [showLoanDocumentsModal, setShowLoanDocumentsModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [payAmount, setPayAmount] = useState(DEFAULT_PAY_AMOUNT);

  useEffect(() => {
    if (route?.params?.openPayModal) {
      if (route?.params?.payAmount) {
        setPayAmount(route.params.payAmount);
      }
      setShowPayModal(true);
      navigation?.setParams?.({ openPayModal: false });
    }
  }, [route?.params?.openPayModal, route?.params?.payAmount, navigation]);

  const showDevBuildRequired = () => {
    Alert.alert(
      'Development build required',
      'View/Download PDF uses native modules (ExpoSharing, etc.) that are not included in Expo Go. Run a development build:\n\n• Android: npx expo run:android\n• iOS: npx expo run:ios',
      [{ text: 'OK' }]
    );
  };

  const handleViewStatementPdf = async () => {
    try {
      const uri = await getStatementPdfUri();
      if (Platform.OS === 'android') {
        const FileSystem = getFileSystem();
        const IntentLauncher = getIntentLauncher();
        const contentUri = await FileSystem.getContentUriAsync(uri);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          type: 'application/pdf',
          flags: 1,
        });
      } else {
        const canOpen = await Linking.canOpenURL(uri);
        if (canOpen) {
          await Linking.openURL(uri);
        } else {
          const Sharing = getSharing();
          await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Statement of Account' });
        }
      }
    } catch (e) {
      const msg = e?.message || '';
      if (msg.includes('ExpoSharing') || msg.includes('native module') || msg.includes('Cannot find native')) {
        showDevBuildRequired();
      } else {
        Alert.alert('Error', msg || 'Could not open PDF');
      }
    }
  };

  const handleDownloadStatementPdf = async () => {
    try {
      const uri = await getStatementPdfUri();
      const Sharing = getSharing();
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Not available', 'Sharing is not available on this device.');
        return;
      }
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Save Statement of Account',
      });
    } catch (e) {
      const msg = e?.message || '';
      if (msg.includes('ExpoSharing') || msg.includes('native module') || msg.includes('Cannot find native')) {
        showDevBuildRequired();
      } else {
        Alert.alert('Error', msg || 'Could not download PDF');
      }
    }
  };

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
              <MaterialCommunityIcons
                name="bank-outline"
                size={18}
                color="#999"
                style={styles.amountItemIcon}
              />
              <Text style={styles.amountValue}>₹1,03,680</Text>
              <Text style={styles.amountLabel}>loan amount</Text>
            </View>
            <View style={styles.amountDivider} />
            <View style={styles.amountItem}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={18}
                color="#999"
                style={styles.amountItemIcon}
              />
              <Text style={styles.amountValue}>₹5,121</Text>
              <Text style={styles.amountLabel}>EMI amount</Text>
            </View>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => setShowSummaryPanel(true)}
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
              style={styles.viewScheduleRow}
              onPress={() => navigation?.navigate('EmiRepaymentSchedule')}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={14} color="#00ff88" />
              <Text style={styles.viewSchedule}>View EMI schedule</Text>
              <Ionicons name="chevron-forward" size={14} color="#00ff88" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressPercentage}>{PERCENT_PAID}%</Text>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>paid</Text>
                <Text style={styles.progressLabel}>till date</Text>
              </View>
            </View>
            <View style={styles.onTrackBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#00ff88" />
              <Text style={styles.onTrackBadgeText}>ON TRACK</Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressBarFill, { width: `${PERCENT_PAID}%` }]}
              />
            </View>
          </View>

          {/* Payment Details — based on 20 paid EMIs (2 overdue) */}
          <View style={styles.paymentDetails}>
            <View style={styles.paymentRow}>
              <View style={styles.paymentLabelRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#999" />
                <Text style={styles.paymentLabel}>amount paid</Text>
              </View>
              <Text style={styles.paymentValue}>₹{formatAmount(AMOUNT_PAID)}</Text>
            </View>
            <View style={styles.paymentRow}>
              <View style={styles.paymentLabelRow}>
                <MaterialCommunityIcons name="cash-plus" size={16} color="#00ff88" />
                <Text style={styles.paymentLabel}>principal left</Text>
              </View>
              <Text style={[styles.paymentValue, styles.paymentValueGreen]}>
                ₹{formatAmount(PRINCIPAL_LEFT)}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <View style={styles.paymentLabelRow}>
                <Ionicons name="alert-circle" size={16} color="#ff9500" />
                <Text style={styles.paymentLabel}>overdue charges</Text>
              </View>
              <Text style={[styles.paymentValue, styles.paymentValueOrange]}>
                ₹{formatAmount(OVERDUE_CHARGES)}
              </Text>
            </View>
            <View style={[styles.paymentRow, styles.paymentRowTotal]}>
              <View style={styles.paymentLabelRow}>
                <Ionicons name="card-outline" size={18} color="#fff" />
                <Text style={styles.paymentLabelTotal}>Pay now / total</Text>
              </View>
              <View style={styles.paymentValueTotalBadge}>
                <Ionicons name="flash" size={16} color="#fff" style={{ marginRight: 4 }} />
                <Text style={styles.paymentValueTotal}>
                  ₹{formatAmount(OVERDUE_PAY_AMOUNT)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Want to Pay Now Button */}
        <TouchableOpacity
          style={styles.payNowCard}
          onPress={() => {
            setPayAmount(DEFAULT_PAY_AMOUNT);
            setShowPayModal(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.payNowCardLeft}>
            <Ionicons name="flash" size={20} color="#1a1a1a" />
            <Text style={styles.payNowText}>Want to pay now?</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#1a1a1a" />
        </TouchableOpacity>

        {/* Loan Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceContent}>
            <Text style={styles.insuranceTitle}>your loan insurance</Text>
            <Text style={styles.insuranceStatus}>
              is <Text style={styles.insuranceActive}>active</Text>
            </Text>
            <TouchableOpacity style={styles.insurancePolicyLink} activeOpacity={0.8}>
              <Ionicons name="document-text-outline" size={14} color="#00ff88" />
              <Text style={styles.insurancePolicyText}>View insurance policy</Text>
              <Ionicons name="chevron-forward" size={14} color="#00ff88" />
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

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => setShowLoanDocumentsModal(true)}
            activeOpacity={0.7}
          >
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
                setPayAmount(DEFAULT_PAY_AMOUNT);
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
                <Text style={styles.paySheetForeclosureAmount}>₹{payAmount}</Text>
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
                <Image
                  source={require('../../assets/id0cwZB6-t_1769970753412.png')}
                  style={styles.paySheetMethodLogo}
                  resizeMode="contain"
                />
                <View style={styles.paySheetMethodInfo}>
                  <Text style={styles.paySheetMethodType}>upi</Text>
                  <Text style={styles.paySheetMethodName}>Icici Bank XX6667</Text>
                </View>
                <View style={styles.paySheetMethodRadio}>
                  {/* <View style={styles.paySheetMethodRadioInner} /> */}
                </View>
              </View>
              
              <View style={styles.paySheetMethodRow}>
                <Image
                  source={require('../../assets/pngegg.png')}
                  style={styles.gpayLogoImage}
                  resizeMode="contain"
                />
                <View style={styles.paySheetMethodInfo}>
                  <Text style={styles.paySheetMethodType}>upi app</Text>
                  <Text style={styles.paySheetMethodName}>kotak bank XX3257</Text>
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
                  <Text style={styles.paySheetNetAmount}>₹{payAmount}</Text>
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

      {/* Bottom sheet: Loan SUMMARY (arrow on amount card) */}
      <Modal
        visible={showSummaryPanel}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSummaryPanel(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowSummaryPanel(false)}
        >
          <Pressable style={styles.summarySheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.bottomSheetHandle} />
            <View style={styles.summarySheetHeader}>
              <Text style={styles.summarySheetTitle}>SUMMARY</Text>
              <Text style={styles.summarySheetRate}>@16.99% PER YEAR</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.summarySheetScroll}>
              {/* Your total loan amount */}
              <View style={styles.summaryBlock}>
                <View style={styles.summaryRowMain}>
                  <Text style={styles.summaryBlockTitle}>your total loan amount</Text>
                  <Text style={styles.summaryBlockValue}>₹1,03,680</Text>
                </View>
                <View style={styles.summaryBreakdown}>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>+ credit amount</Text>
                    <Text style={styles.summaryBreakdownValue}>₹1,00,000</Text>
                  </View>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>+ insurance</Text>
                    <Text style={styles.summaryBreakdownValue}>₹1,180</Text>
                  </View>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>+ processing fee (inc. taxes)</Text>
                    <View style={styles.summaryBreakdownRight}>
                      <Text style={styles.summaryBreakdownValue}>₹2,500</Text>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </View>
                  </View>
                </View>
              </View>

              {/* EMI per month */}
              <View style={styles.summaryBlock}>
                <View style={styles.summaryRowMain}>
                  <Text style={styles.summaryBlockTitle}>EMI per month</Text>
                  <Text style={styles.summaryBlockValue}>₹5,121</Text>
                </View>
                <View style={styles.summaryBreakdown}>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>first EMI date</Text>
                    <Text style={styles.summaryBreakdownValue}>02 oct '24</Text>
                  </View>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>last EMI date</Text>
                    <Text style={styles.summaryBreakdownValue}>02 sep '26</Text>
                  </View>
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>duration</Text>
                    <Text style={styles.summaryBreakdownValue}>24 months</Text>
                  </View>
                  
                  <View style={styles.summaryBreakdownRow}>
                    <Text style={styles.summaryBreakdownLabel}>total repayment amount</Text>
                    <Text style={styles.summaryBreakdownValue}>₹1,22,904.34</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.summarySheetFooter}>
              <Text style={styles.summaryPoweredBy}>powered by</Text>
              <View style={styles.summaryBankBadge}>
                <Text style={styles.summaryBankBadgeText}>IDFC FIRST Bank</Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Bottom sheet: Loan Documents */}
      <Modal
        visible={showLoanDocumentsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLoanDocumentsModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowLoanDocumentsModal(false)}
        >
          <Pressable style={styles.documentsSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.bottomSheetHandle} />
            <View style={styles.documentsSheetHeader}>
              <View style={styles.documentsSheetHeaderIcon}>
                <Ionicons name="document-text-outline" size={24} color="#666" />
              </View>
              <View style={styles.documentsSheetHeaderText}>
                <Text style={styles.documentsSheetUserName}>Sandeep singh 103680</Text>
                <Text style={styles.documentsSheetWithdrawal}>₹103,680.00 withdrawal</Text>
              </View>
            </View>

            <Text style={styles.documentsSheetTitle}>keep track of your important documents</Text>
            <Text style={styles.documentsSheetSubtitle}>everything you need, exactly where you need it</Text>

            <View style={styles.documentsList}>
              {/* Statement of Account */}
              <View style={styles.documentRow}>
                <View style={styles.documentRowLeft}>
                  <Text style={styles.documentRowTitle}>Statement of Account</Text>
                  <Text style={styles.documentRowDesc}>document generated on 4th feb 26</Text>
                </View>
                <View style={styles.documentRowActions}>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={handleViewStatementPdf}>
                    <Ionicons name="eye-outline" size={22} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={handleDownloadStatementPdf}>
                    <Ionicons name="download-outline" size={22} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={() => {}}>
                    <Ionicons name="mail-outline" size={22} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Loan Agreement */}
              <View style={styles.documentRow}>
                <View style={styles.documentRowLeft}>
                  <Text style={styles.documentRowTitle}>Loan Agreement</Text>
                </View>
                <View style={styles.documentRowActions}>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={() => {}}>
                    <Ionicons name="eye-outline" size={22} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={() => {}}>
                    <Ionicons name="download-outline" size={22} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.documentActionBtn} onPress={() => {}}>
                    <Ionicons name="mail-outline" size={22} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* No Objection Certificate - disabled */}
              <View style={styles.documentRow}>
                <View style={styles.documentRowLeft}>
                  <Text style={styles.documentRowTitle}>No Objection Certificate</Text>
                  <Text style={styles.documentRowDescMuted}>available once loan is closed</Text>
                </View>
                <View style={styles.documentRowActions}>
                  <View style={styles.documentActionBtnDisabled}>
                    <Ionicons name="eye-outline" size={22} color="#bbb" />
                  </View>
                  <View style={styles.documentActionBtnDisabled}>
                    <Ionicons name="download-outline" size={22} color="#bbb" />
                  </View>
                  <View style={styles.documentActionBtnDisabled}>
                    <Ionicons name="mail-outline" size={22} color="#bbb" />
                  </View>
                </View>
              </View>
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
  amountItemIcon: {
    marginBottom: 6,
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
  viewScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  viewSchedule: {
    fontSize: 13,
    color: '#00ff88',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onTrackBadgeText: {
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
  paymentLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  paymentValueGreen: {
    color: '#00ff88',
  },
  paymentValueOrange: {
    color: '#ff9500',
  },
  paymentRowTotal: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  paymentLabelTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  paymentValueTotalBadge: {
    backgroundColor: '#c62828',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentValueTotal: {
    fontSize: 22,
    fontWeight: '700',
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
  payNowCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insurancePolicyText: {
    fontSize: 13,
    color: '#00ff88',
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
  paySheetMethodLogo: {
    width: 40,
    height: 40,
    marginRight: 14,
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
  gpayLogoImage: {
    width: 40,
    height: 40,
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
  // Summary bottom sheet (arrow on loan card)
  summarySheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 28,
    maxHeight: '85%',
  },
  summarySheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summarySheetTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  summarySheetRate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00c853',
  },
  summarySheetScroll: {
    maxHeight: 400,
  },
  summaryBlock: {
    marginBottom: 24,
  },
  summaryRowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryBlockTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'lowercase',
    flex: 1,
  },
  summaryBlockValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  summaryBreakdown: {
    paddingLeft: 4,
  },
  summaryBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryBreakdownLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  summaryBreakdownRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryBreakdownValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  summarySheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryPoweredBy: {
    fontSize: 11,
    color: '#666',
    marginRight: 8,
  },
  summaryBankBadge: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  summaryBankBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  // Loan Documents bottom sheet
  documentsSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '85%',
  },
  documentsSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  documentsSheetHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  documentsSheetHeaderText: {
    flex: 1,
  },
  documentsSheetUserName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  documentsSheetWithdrawal: {
    fontSize: 14,
    color: '#666',
  },
  documentsSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  documentsSheetSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  documentsList: {
    gap: 0,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  documentRowLeft: {
    flex: 1,
  },
  documentRowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  documentRowDesc: {
    fontSize: 13,
    color: '#666',
  },
  documentRowDescMuted: {
    fontSize: 13,
    color: '#999',
  },
  documentRowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentActionBtn: {
    padding: 8,
  },
  documentActionBtnDisabled: {
    padding: 8,
    opacity: 0.5,
  },
});

export default LoanDetailsScreen;