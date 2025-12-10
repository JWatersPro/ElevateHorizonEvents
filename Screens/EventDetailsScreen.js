import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function EventDetailsScreen({ route, navigation }) {
  // const { user = 'Guest' } = route.params ?? {};
  const { event } = route.params ?? {}

  if (!event) {
return (
<View style={styles.container}>
<Text style={styles.sub}>No event data available.</Text>
{/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
</View>
);
}
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>Event Details</Text>}
      { <Text style={styles.sub}>User: {user}</Text> */}

      <Text style={styles.title}>{(event.title ?? 'Details').replace(' REMOTE', '')}</Text>
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}




    <Text style={styles.sub}>Date: </Text>
    <Text style={styles.info}> {event.date ?? ''}</Text>

    <Text style={styles.sub}>Time: </Text>
    <Text style={styles.info}>{event.startTime ?? ''} - {event.endTime ?? ''}</Text>

    <Text style={styles.sub}>Location:</Text>
  <Text style={styles.info}> {event.location ?? ''}</Text>

    <Text style={styles.sub}>Category: </Text>
  <Text style={styles.info}>{event.category ?? ''}</Text>

    <Text style={styles.sub}>Description: </Text>
  <Text style={styles.info}>{event.description ?? ''}</Text>

    <Text style={styles.sub}>Capacity: {event.capacity ?? ''}</Text>
  <Text style={styles.info}></Text>

    <Text style={styles.sub}>Spots Remaining: </Text>
    <Text style={styles.info}>{event.spotsRemaining ?? ''}</Text>

    <Text style={styles.sub}>Status: </Text>
  <Text style={[styles.info, event.isCancelled && styles.cancelled]}>{event.isCancelled ? 'Cancelled' : 'Available'}</Text>





{!event.isCancelled && (
        <Button 
          title="Register" 
          onPress={() => navigation.navigate('EventRegister', { event })} 
        />
      )}

  {/*<Button title="Register"  onPress={() => navigation.navigate('EventRegister', { event })} />*/}
    
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}














const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
     alignItems: 'center' },

  title: { 
    fontSize: 24, 
    fontWeight: '600', 
    marginBottom: 8 },

  sub: { fontSize: 18, 
    marginBottom: 12, 
    fontWeight: '500'},

  info: { fontSize: 16, 
    marginBottom: 12, 
    flexWrap: 'wrap',
  },

  cancelled:{
    color: '#f44336',
  }
  







});

 



//ANCHOR What I need for this page Title, date/time, location, description, category, capacity, spots remaining, “Register”.