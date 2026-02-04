import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EMI_SCHEDULE = [
  {
    date: "02 oct '24",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 nov '24",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 dec '24",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },

  {
    date: "02 jan '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 feb '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 mar '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 apr '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 may '25",
    status: "paid late",
    statusType: "late",
    amount: "₹5,121",
  },
  {
    date: "02 jun '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 jul '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },

  {
    date: "02 aug '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 sep '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 oct '25",
    status: "paid on time",
    statusType: "paid",
    amount: "₹5,121",
  },
  {
    date: "02 nov '25",
    statusType: "overdue",
    overdueCharges: "₹3,606.90",
    amount: "₹8,727.90",
  },
  {
    date: "02 dec '25",
    statusType: "overdue",
    overdueCharges: "₹2,417.63",
    amount: "₹7,538.63",
  },

  {
    date: "02 dec '25",
    statusType: "overdue",
    overdueCharges: "₹40",
    amount: "₹5,201.63",
  },

  {
    date: "02 feb '26",
    status: "due in 27 days",
    statusType: "due",
    amount: "₹5,121",
  },

  {
    date: "02 mar '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },
  {
    date: "02 apr '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },
  {
    date: "02 may '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },
  {
    date: "02 jun '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },
  {
    date: "02 jul '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },
  {
    date: "02 aug '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,121",
  },

  {
    date: "02 sep '26",
    status: "upcoming",
    statusType: "upcoming",
    amount: "₹5,118.34",
  },
];

const EMIRepaymentScheduleScreen = ({ navigation }) => {
  const getStatusColor = (statusType) => {
    if (statusType === "paid") return "#00c853";
    if (statusType === "late") return "#ff3b30";
    if (statusType === "overdue") return "#b71c1c";
    if (statusType === "due") return "#ff6b35";
    return "#999";
  };

  const OVERDUE_CHARGES_COLOR = "#ff9800";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Text style={styles.title}>EMI repayment schedule</Text>
        <Text style={styles.subtitle}>
          paying EMIs on time improves your credit score
        </Text>

        <View style={styles.list}>
          {EMI_SCHEDULE.map((item, index) => (
            <View
              key={item.date + index}
              style={[
                styles.emiRow,
                index < EMI_SCHEDULE.length - 1 && styles.emiRowBorder,
              ]}
            >
              <View style={styles.emiLeft}>
                <Text style={styles.emiDate}>{item.date}</Text>
                {item.statusType === "overdue" ? (
                  <Text style={styles.emiStatus}>
                    <Text
                      style={[
                        styles.emiStatus,
                        { color: getStatusColor("overdue") },
                      ]}
                    >
                      Overdue
                    </Text>
                    <Text
                      style={[
                        styles.emiStatus,
                        { color: OVERDUE_CHARGES_COLOR },
                      ]}
                    >
                      {" "}
                      charges applied + {item.overdueCharges}
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.emiStatus,
                      { color: getStatusColor(item.statusType) },
                    ]}
                  >
                    {item.status}
                  </Text>
                )}
              </View>
              <Text style={styles.emiAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerNote}>
          <View style={styles.footerIcon}>
            <Ionicons name="information-circle" size={20} color="#666" />
          </View>
          <Text style={styles.footerText}>
            your last EMI is slightly different due to daily method of interest
            calculation & difference in days between withdrawal date & first EMI
            date.
          </Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  list: {
    backgroundColor: "#252525",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  emiRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  emiRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  emiLeft: {
    flex: 1,
  },
  emiDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  emiStatus: {
    fontSize: 13,
    fontWeight: "500",
  },
  emiAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  footerNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 24,
    padding: 14,
    backgroundColor: "#252525",
    borderRadius: 12,
  },
  footerIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    color: "#999",
    lineHeight: 18,
  },
});

export default EMIRepaymentScheduleScreen;
