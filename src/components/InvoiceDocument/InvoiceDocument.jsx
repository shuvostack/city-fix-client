import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", color: "#333" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },
  companyName: { fontSize: 24, fontWeight: "bold", color: "#3B82F6" },
  companyDetails: { fontSize: 10, textAlign: "right", color: "#666" },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  section: { marginBottom: 15 },
  label: { fontSize: 10, color: "#888", marginBottom: 2 },
  value: { fontSize: 12, marginBottom: 5 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  table: { marginTop: 20, borderWidth: 1, borderColor: "#eee" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  col1: { width: "60%", fontSize: 10 },
  col2: { width: "40%", fontSize: 10, textAlign: "right" },

  totalSection: { marginTop: 20, alignItems: "flex-end" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 5,
  },
  totalLabel: { fontSize: 12, fontWeight: "bold" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "#3B82F6" },

  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#aaa",
    borderTop: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  paidStamp: {
    position: "absolute",
    top: 180,
    right: 40,
    fontSize: 40,
    color: "rgba(34, 197, 94, 0.2)",
    transform: "rotate(-20deg)",
    fontWeight: "bold",
  },
});

const InvoiceDocument = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.companyName}>CityFix</Text>
          <Text style={{ fontSize: 10, marginTop: 5 }}>
            Better City, Better Life
          </Text>
        </View>
        <View style={styles.companyDetails}>
          <Text>CityFix HQ, Dhaka</Text>
          <Text>support@cityfix.com</Text>
          <Text>+880 1311338689</Text>
        </View>
      </View>

      <Text style={styles.title}>Invoice / Receipt</Text>

      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Billed To:</Text>
          <Text style={styles.value}>{payment.userEmail}</Text>
          <Text style={styles.value}>
            Customer ID: #{payment.userEmail.split("@")[0]}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>
            {new Date(payment.date).toLocaleDateString()}
          </Text>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica" }}>
            {payment.transactionId}
          </Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Description</Text>
          <Text style={styles.col2}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.col1}>
            {payment.type === "subscription"
              ? "Premium Membership Subscription"
              : "Priority Issue Boost Service"}
          </Text>
          <Text style={styles.col2}>{payment.amount} BDT</Text>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalValue}>{payment.amount} BDT</Text>
        </View>
      </View>

      <Text style={styles.paidStamp}>PAID</Text>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for contributing to make our city better. This is a
        computer-generated invoice.
      </Text>
    </Page>
  </Document>
);

export default InvoiceDocument;
