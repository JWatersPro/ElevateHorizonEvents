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
<View style={styles.eventCard}>

      <Text style={styles.title}>{(event.title ?? 'Details').replace(' REMOTE', '')}</Text>
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}



    {/* Date */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Date:</Text>
        <Text style={styles.info}>{event.date ?? ''}</Text>
      </View>
      <View style={styles.divider} />

      {/* Time */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Time:</Text>
        <Text style={styles.info}>
          {event.startTime ?? ''} - {event.endTime ?? ''}
        </Text>
      </View>
      <View style={styles.divider} />

      {/* Location */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Location:</Text>
        <Text style={styles.info}>{event.location ?? ''}</Text>
      </View>
      <View style={styles.divider} />

      {/* Category */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Category:</Text>
        <Text style={styles.info}>{event.category ?? ''}</Text>
      </View>
<View style={styles.divider} />

      {/* Description */}
      {/*TODO Make the description appear directly under the Description title to make it easier to read */}
      <View style={styles.detailRowDescription}>
        <Text style={styles.sub}>Description:</Text>
        <Text style={styles.descriptionText}>{event.description ?? ''}</Text>
      </View>
      <View style={styles.divider} />

      {/* Capacity */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Capacity:</Text>
        <Text style={styles.info}>{event.capacity ?? ''}</Text>
      </View>
      <View style={styles.divider} />

      {/* Spots Remaining */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Spots Remaining:</Text>
        <Text style={styles.info}>{event.spotsRemaining ?? ''}</Text>
      </View>
      <View style={styles.divider} />

      {/* Status */}
      <View style={styles.detailRow}>
        <Text style={styles.sub}>Status:</Text>
        <Text style={[styles.info, event.isCancelled && styles.cancelled]}>
          {event.isCancelled ? 'Cancelled' : 'Available'}
        </Text>
      </View>




{!event.isCancelled && (
        <Button style = {styles.buttons} 
        buttonColor="#3CA6E5"      
                    textColor="#FFFFFF"
          title="Register" 
          onPress={() => navigation.navigate('EventRegister', { event })} 
        />
      )}

  {/*<Button title="Register"  onPress={() => navigation.navigate('EventRegister', { event })} />*/}
    
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>

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

  sub: {
  fontSize: 15,
  fontWeight: '600',
  color: '#424754',
  flex: 0.45,
},
info: {
  fontSize: 15,
  color: '#424754',
  flex: 0.55,
  textAlign: 'right',
},
detailRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

  cancelled:{
    color: '#f44336',
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

eventCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // alignItems: 'center'
  },

detailRowDescription: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 10,
  
},
descriptionText: {
  fontSize: 15,
  color: '#424754',
  flex: 0.55,
  textAlign: 'right',
  lineHeight: 20,
},

divider: {
  height: 1,
  width: 'auto',
  backgroundColor: 'rgba(141, 133, 133, 0.85)', 
  marginVertical: 2,
 
},

 buttons:{
        marginVertical: 12,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 12,
        buttonColor: "#3CA6E5",    
        textColor: "#FFFFFF"
    },


});

 



// //ANCHOR What I need for this page Title, date/time, location, description, category, capacity, spots remaining, “Register”.




