import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANK_OPTIONS = [
  { id: 'axis', name: 'Axis Bank', letter: 'A', color: '#97144D' },
  { id: 'hdfc', name: 'HDFC Bank', letter: 'H', color: '#004C8F' },
  { id: 'sbi', name: 'SBI', letter: 'S', color: '#22409A' },
  { id: 'icici', name: 'ICICI Bank', letter: 'I', color: '#F37B21' },
  { id: 'kotak', name: 'Kotak', letter: 'K', color: '#ED1C24' },
  { id: 'yes', name: 'Yes Bank', letter: 'Y', color: '#0052CC' },
  { id: 'bob', name: 'Bank of Baroda', letter: 'B', color: '#F15A22' },
  { id: 'pnb', name: 'PNB', letter: 'P', color: '#9B1B30' },
];

const INITIAL_CARDS = [
  {
    id: 'axis-6354',
    bankId: 'axis',
    last4: '6354',
    amount: '₹ 4,500.00',
    billDate: '10 Aug',
    dueDate: '30 Aug',
    billNumber: '1800000003297256',
    failedAttempts: 6,
    timestamp: '4:32 pm',
    mobile: '8452829567',
  },
  {
    id: 'hdfc-8821',
    bankId: 'hdfc',
    last4: '8821',
    amount: '₹ 12,340.00',
    billDate: '08 Aug',
    dueDate: '28 Aug',
    billNumber: '1800000004418821',
    failedAttempts: 2,
    timestamp: '3:10 pm',
    mobile: '8452829567',
  },
  {
    id: 'sbi-4409',
    bankId: 'sbi',
    last4: '4409',
    amount: '₹ 8,750.50',
    billDate: '05 Aug',
    dueDate: '25 Aug',
    billNumber: '1800000005504409',
    failedAttempts: 1,
    timestamp: '1:45 pm',
    mobile: '8452829567',
  },
];

const getBank = (bankId) =>
  BANK_OPTIONS.find((bank) => bank.id === bankId) || BANK_OPTIONS[0];

const cardLabel = (card) => {
  const bank = getBank(card.bankId);
  return `${bank.name} Credit Card ${card.last4}`;
};

const GooglePayScreen = ({ navigation }) => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState(INITIAL_CARDS[0].id);
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showFailScreen, setShowFailScreen] = useState(false);
  const [newBankId, setNewBankId] = useState('hdfc');
  const [newLast4, setNewLast4] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) || cards[0],
    [cards, selectedCardId],
  );
  const selectedBank = getBank(selectedCard.bankId);

  const openFailScreen = () => {
    setShowCardPicker(false);
    setShowAddCard(false);
    setShowFailScreen(true);
  };

  const closeFailScreen = () => {
    setShowFailScreen(false);
  };

  const selectCard = (cardId) => {
    setSelectedCardId(cardId);
    setShowCardPicker(false);
  };

  const addCard = () => {
    const last4 = newLast4.replace(/\D/g, '').slice(-4);
    if (last4.length !== 4) return;
    const amountValue = newAmount.trim() || '4,500.00';
    const id = `${newBankId}-${last4}-${Date.now()}`;
    const card = {
      id,
      bankId: newBankId,
      last4,
      amount: amountValue.startsWith('₹') ? amountValue : `₹ ${amountValue}`,
      billDate: '12 Aug',
      dueDate: '01 Sep',
      billNumber: `18000000${last4}${last4}`,
      failedAttempts: 0,
      timestamp: '5:20 pm',
      mobile: '8452829567',
    };
    setCards((prev) => [...prev, card]);
    setSelectedCardId(id);
    setNewLast4('');
    setNewAmount('');
    setShowAddCard(false);
    setShowCardPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#202124" />
        </TouchableOpacity>
        <View style={styles.headerBrand}>
          <View style={[styles.axisLogo, { backgroundColor: selectedBank.color }]}>
            <Text style={styles.axisLogoText}>{selectedBank.letter}</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>{selectedBank.name} Credit Card</Text>
            <Text style={styles.headerSubtitle}>Bharat Connect</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="#202124" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.accountBar}
        onPress={() => setShowCardPicker(true)}
        activeOpacity={0.8}
      >
        <View style={[styles.accountAvatar, { backgroundColor: selectedBank.color }]}>
          <Text style={styles.accountAvatarText}>{selectedBank.letter}</Text>
        </View>
        <Text style={styles.accountName}>{cardLabel(selectedCard)}</Text>
        <Ionicons name="chevron-down" size={20} color="#5f6368" />
      </TouchableOpacity>
      <View style={styles.accountDivider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.timeRow}>
          <View style={styles.timeLine} />
          <Text style={styles.timeText}>{selectedCard.timestamp}</Text>
          <View style={styles.timeLine} />
        </View>

        <View style={styles.billCard}>
          <Text style={styles.amount}>{selectedCard.amount}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Bill date</Text>
            <Text style={styles.metaValue}>{selectedCard.billDate}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Due date</Text>
            <Text style={styles.metaValue}>{selectedCard.dueDate}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Bill number</Text>
            <Text style={styles.metaValue}>{selectedCard.billNumber}</Text>
          </View>

          <Text style={styles.failedText}>
            {selectedCard.failedAttempts} failed payment attempts
          </Text>

          <TouchableOpacity style={styles.statusRow} activeOpacity={0.7}>
            <Ionicons name="time-outline" size={20} color="#5f6368" />
            <Text style={styles.statusText}>Not paid</Text>
            <Ionicons name="chevron-forward" size={18} color="#5f6368" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.payBillButton}
            onPress={openFailScreen}
            activeOpacity={0.85}
          >
            <Text style={styles.payBillText}>Pay bill</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.bharatConnect}>
          <View style={styles.bharatDot} />
          <Text style={styles.bharatText}>Bharat Connect</Text>
        </View>
        <TouchableOpacity style={styles.refreshFab} activeOpacity={0.85}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCardPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCardPicker(false)}
      >
        <Pressable style={styles.sheetOverlay} onPress={() => setShowCardPicker(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Select credit card</Text>
            <ScrollView style={styles.cardList} showsVerticalScrollIndicator={false}>
              {cards.map((card) => {
                const bank = getBank(card.bankId);
                const selected = card.id === selectedCardId;
                return (
                  <TouchableOpacity
                    key={card.id}
                    style={[styles.cardOption, selected && styles.cardOptionSelected]}
                    onPress={() => selectCard(card.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.cardOptionLogo, { backgroundColor: bank.color }]}>
                      <Text style={styles.cardOptionLogoText}>{bank.letter}</Text>
                    </View>
                    <View style={styles.cardOptionText}>
                      <Text style={styles.cardOptionTitle}>{bank.name} Credit Card</Text>
                      <Text style={styles.cardOptionSub}>•••• {card.last4}  •  {card.amount}</Text>
                    </View>
                    {selected && (
                      <Ionicons name="checkmark-circle" size={22} color="#1a73e8" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.addCardButton}
              onPress={() => {
                setShowCardPicker(false);
                setShowAddCard(true);
              }}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={20} color="#1a73e8" />
              <Text style={styles.addCardButtonText}>Add credit card</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showAddCard}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddCard(false)}
      >
        <Pressable style={styles.sheetOverlay} onPress={() => setShowAddCard(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Add credit card</Text>
              <Text style={styles.addLabel}>Bank</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bankChips}
              >
                {BANK_OPTIONS.map((bank) => {
                  const selected = bank.id === newBankId;
                  return (
                    <TouchableOpacity
                      key={bank.id}
                      style={[
                        styles.bankChip,
                        selected && { borderColor: bank.color, backgroundColor: '#e8f0fe' },
                      ]}
                      onPress={() => setNewBankId(bank.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.bankChipDot, { backgroundColor: bank.color }]} />
                      <Text style={[styles.bankChipText, selected && { color: bank.color }]}>
                        {bank.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <Text style={styles.addLabel}>Last 4 digits</Text>
              <TextInput
                style={styles.input}
                value={newLast4}
                onChangeText={(text) => setNewLast4(text.replace(/\D/g, '').slice(0, 4))}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="1234"
                placeholderTextColor="#9aa0a6"
              />
              <Text style={styles.addLabel}>Bill amount (optional)</Text>
              <TextInput
                style={styles.input}
                value={newAmount}
                onChangeText={setNewAmount}
                keyboardType="decimal-pad"
                placeholder="4,500.00"
                placeholderTextColor="#9aa0a6"
              />
              <TouchableOpacity
                style={[
                  styles.confirmPayButton,
                  newLast4.length !== 4 && styles.confirmPayButtonDisabled,
                ]}
                onPress={addCard}
                disabled={newLast4.length !== 4}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmPayText}>Add card</Text>
              </TouchableOpacity>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      <Modal
        visible={showFailScreen}
        animationType="slide"
        onRequestClose={closeFailScreen}
      >
        <View style={styles.failScreen}>
          <View style={styles.failHeader}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={closeFailScreen}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={26} color="#5f6368" />
            </TouchableOpacity>
            <View style={[styles.failHeaderLogo, { backgroundColor: selectedBank.color }]}>
              <Text style={styles.failHeaderLogoText}>{selectedBank.letter}</Text>
            </View>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <Ionicons name="ellipsis-vertical" size={20} color="#5f6368" />
            </TouchableOpacity>
          </View>

          <View style={styles.failBody}>
            <Text style={styles.failRecipient}>
              Paying {selectedBank.name} Credit Card
            </Text>
            <Text style={styles.failMobile}>
              Mobile Number : {selectedCard.mobile}
            </Text>
            <Text style={styles.failAmount}>{selectedCard.amount}</Text>
          </View>

          <View style={styles.failFooter}>
            <View style={styles.failBanner}>
              <View style={styles.failExclaim}>
                <Text style={styles.failExclaimText}>!</Text>
              </View>
              <View style={styles.failBannerTextWrap}>
                <Text style={styles.failBannerTitle}>Cannot complete payment</Text>
                <Text style={styles.failBannerMessage}>
                  It’s taking too long to reach our servers. Please try again later.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.dismissButton}
              onPress={closeFailScreen}
              activeOpacity={0.8}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>

            <View style={styles.failBrands}>
              <Text style={styles.failBrandIcici}>ICICI Bank</Text>
              <Text style={styles.failBrandBharat}>Bharat Connect</Text>
              <Text style={styles.failBrandUpi}>POWERED BY UPI</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBrand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  axisLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#97144D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  axisLogoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#5f6368',
    marginTop: 1,
  },
  accountBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accountAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e8e3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  accountName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#202124',
  },
  accountDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 100,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#c4c7c5',
  },
  timeText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#5f6368',
  },
  billCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  amount: {
    fontSize: 32,
    fontWeight: '500',
    color: '#202124',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  metaLabel: {
    fontSize: 14,
    color: '#5f6368',
  },
  metaValue: {
    fontSize: 14,
    color: '#202124',
    fontWeight: '500',
  },
  failedText: {
    fontSize: 13,
    color: '#3c4043',
    marginTop: 14,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    marginBottom: 18,
  },
  statusText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#202124',
    fontWeight: '500',
  },
  payBillButton: {
    backgroundColor: '#c2e7ff',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  payBillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#001d35',
  },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bharatConnect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bharatDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1a73e8',
    marginRight: 6,
  },
  bharatText: {
    fontSize: 12,
    color: '#5f6368',
    fontWeight: '500',
  },
  refreshFab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  refreshText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#dadce0',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 14,
  },
  cardList: {
    maxHeight: 320,
  },
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardOptionSelected: {
    borderColor: '#1a73e8',
    backgroundColor: '#e8f0fe',
  },
  cardOptionLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardOptionLogoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardOptionText: {
    flex: 1,
  },
  cardOptionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#202124',
  },
  cardOptionSub: {
    fontSize: 13,
    color: '#5f6368',
    marginTop: 2,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1a73e8',
  },
  addCardButtonText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a73e8',
  },
  addLabel: {
    fontSize: 13,
    color: '#5f6368',
    marginBottom: 8,
    marginTop: 8,
  },
  bankChips: {
    paddingBottom: 8,
    gap: 8,
  },
  bankChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  bankChipDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  bankChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3c4043',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#202124',
    marginBottom: 8,
  },
  confirmPayButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  confirmPayButtonDisabled: {
    opacity: 0.5,
  },
  confirmPayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  failScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  failHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  failHeaderLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  failHeaderLogoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  failBody: {
    alignItems: 'center',
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  failRecipient: {
    fontSize: 16,
    color: '#202124',
    fontWeight: '500',
    marginBottom: 6,
  },
  failMobile: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 28,
  },
  failAmount: {
    fontSize: 44,
    fontWeight: '400',
    color: '#202124',
    letterSpacing: -0.5,
  },
  failFooter: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  failBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fce8e6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  failExclaim: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#5f6368',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  failExclaimText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5f6368',
  },
  failBannerTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  failBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 4,
  },
  failBannerMessage: {
    fontSize: 13,
    color: '#5f6368',
    lineHeight: 18,
  },
  dismissButton: {
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 22,
    backgroundColor: '#fff',
  },
  dismissButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a73e8',
  },
  failBrands: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  failBrandIcici: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F37B21',
  },
  failBrandBharat: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5f6368',
  },
  failBrandUpi: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5f6368',
    letterSpacing: 0.3,
  },
});

export default GooglePayScreen;
