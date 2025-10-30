//ANCHOR What I need for this page Title, date, time, location, category, spots remaining; filter & search.

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function EventsListScreen() {
  return (
    <View style = {styles.container}>
      <Text>Events List Screen</Text>
    </View>
  );
}


//NOTE MAIN Styles ref 
const styles = StyleSheet.create({
//NOTE THESE ARE VIEW PROPERTIES 

  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  
});



/*ANCHOR CODE GRAVEYARD 
title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  sub: { fontSize: 16, marginBottom: 12 },

  */