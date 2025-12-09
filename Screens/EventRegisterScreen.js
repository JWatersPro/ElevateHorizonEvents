//ANCHOR WHat I need for this page Fields: full name, email; confirm; success/error message.

import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function EventRegisterScreen({ route, navigation }) {
  const { event } = route.params ?? {};
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = () => {
    if (!fullName || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        ` ${fullName} registered for ${event?.title}!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1000);
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>No event data available.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for {event.title}</Text>
      <Text style={styles.sub}>
        Date: {event.date} | {event.startTime} - {event.endTime}
      </Text>

      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { marginTop: 12 }]}
        keyboardType="email-address"
        mode="outlined"
      />

      <Button
        title={loading ? 'Registering...' : 'Confirm Registration'}
        onPress={handleRegister}
        disabled={loading}
      />

      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 16, marginBottom: 24, textAlign: 'center' },
  input: { width: '100%' },
});





