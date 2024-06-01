import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';

const FakePaymentScreen = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      const isSuccess = Math.random() < 0.8; // 80% chance of success
      setPaymentResult(isSuccess ? 'Payment successful' : 'Payment failed');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Card Details</Text>
        </View>
        <View style={styles.cardBody}>
          <TextInput
            placeholder="Card number"
            value={paymentDetails.cardNumber}
            onChangeText={text => setPaymentDetails({ ...paymentDetails, cardNumber: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Expiry date"
            value={paymentDetails.expiryDate}
            onChangeText={text => setPaymentDetails({ ...paymentDetails, expiryDate: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChangeText={text => setPaymentDetails({ ...paymentDetails, cvv: text })}
            style={styles.input}
          />
          <Button title="Pay" onPress={handlePayment} />
          {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
          {paymentResult !== '' && <Text style={{ marginTop: 20 }}>{paymentResult}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: '80%',
  },
  cardHeader: {
    backgroundColor: '#687eff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  cardHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBody: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FakePaymentScreen;
