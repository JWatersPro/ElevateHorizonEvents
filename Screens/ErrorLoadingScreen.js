//ANCHOR What I need for this page Spinner, “Loading…”, error icon, helpful text.


import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // adjust to your icon library

const StatusView = ({
isLoading,
hasError,
errorMessage,
onRetry,
children,
}) => {
if (isLoading) {
return (
<View style={styles.center}>
<ActivityIndicator size="large" color="#555" />
<Text style={styles.loadingText}>Loading…</Text>
</View>
);
}

if (hasError) {
return (
<View style={styles.center}>
<Ionicons name="alert-circle" size={48} color="#d93025" />
<Text style={styles.errorText}>
{errorMessage || 'Something went wrong. Please try again.'}
</Text>
{onRetry ? (
<TouchableOpacity onPress={onRetry} style={styles.retryButton}>
<Text style={styles.retryText}>Retry</Text>
</TouchableOpacity>
) : (
<Text style={styles.helpText}>Check your connection or refresh.</Text>
)}
</View>
);
}

return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
center: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 16,
},
loadingText: {
marginTop: 12,
fontSize: 16,
color: '#555',
},
errorText: {
marginTop: 12,
fontSize: 16,
color: '#d93025',
textAlign: 'center',
},
helpText: {
marginTop: 6,
fontSize: 14,
color: '#666',
textAlign: 'center',
},
retryButton: {
marginTop: 12,
paddingHorizontal: 16,
paddingVertical: 8,
borderRadius: 4,
backgroundColor: '#e8f0fe',
},
retryText: {
color: '#1a73e8',
fontSize: 14,
},
content: {
// normal page content layout
},
});
