//ANCHOR What I need for this page Title, date, time, location, category, spots remaining; filter & search.

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, Divider, TextInput  } from 'react-native-paper';



const sampleEvents = [
  {
    id: '1',
    title: 'Morning Yoga',
    date: '2025-11-28',
    startTime: '08:00',
    endTime: '09:00',
    location: 'Community Hall',
    category: 'Fitness',
    spotsRemaining: 12,
  },
  {
    id: '2',
    title: 'Scrabble',
    date: '2025-11-29',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Library',
    category: 'Entertainment',
    spotsRemaining: 5,
  },
];

export default function EventsListScreen({ navigation }) {
   const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={`${item.date} • ${item.startTime}-${item.endTime}\n${item.location}\nCategory: ${item.category}\nSpots Remaining: ${item.spotsRemaining}`}
      titleNumberOfLines={1}
      descriptionNumberOfLines={4}
      style={styles.listItem}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    />
  );






  return (
    <View style={styles.container}>
      {sampleEvents.map(event => (
        <React.Fragment key={event.id}>
          {renderItem({ item: event })}
          <Divider />
        </React.Fragment>
      ))}
    </View>
  );
}

 






  //SECTION StyleSheet
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchInput: { marginBottom: 12 },
  listItem: { paddingVertical: 8 },
});