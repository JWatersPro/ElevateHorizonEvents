//ANCHOR What I need for this page Title, date, time, location, category, spots remaining; filter & search.

import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, List, Divider, TextInput, Button  } from 'react-native-paper';

const JSON_URL = 'https://tafeshaun.github.io/elevate-data/events.json';

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
  const [events, setEvents] = React.useState([]);        //Events
  const [loading, setLoading] = React.useState(false);   //Loading
  const [errorMsg, setErrorMsg] = React.useState('');    //Errors
  
  
  
  
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

  const displayEvents = events.length > 0 ? events : sampleEvents;


const loadRemote = React.useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg('')
      const request = await fetch(JSON_URL, {cache: 'no-store'})
      if(!request.ok) throw new Error(`HTTP ${request.status}`);

      const jsonReq = await request.json();
      console.log('RAW JSON:', jsonReq); 

      const arrReq = Array.isArray(jsonReq) ? jsonReq : [];
      console.log('ARRAY LENGTH:', arrReq.length);

      // Clean + store remote tasks
      const cleaned = arrReq.filter(
        (x) => x && typeof x.id !== 'undefined' && typeof x.title === 'string'
      );
      setEvents(cleaned);
      console.log('REMOTE DATA:', cleaned); 
      //SEARCH HERE?
    }
    catch (e) {
      console.error(e);
      setErrorMsg('Failed to load remote data');
    }
    finally {
      setLoading(false);
    }
  }, 
  []);

React.useEffect(() => {
    loadRemote();
  }, [loadRemote]);

if (loading) {
  return (
    <View style={styles.center}>
      <ActivityIndicator animating size="large" />
      <Text style={styles.marg16}>Loading events…</Text>
    </View>
  );
}









  return (
    <View style={styles.container}>
     {/* * {sampleEvents.map(event => (
        <React.Fragment key={event.id}>
          {renderItem({ item: event })}
          <Divider />*/}

          {displayEvents.map((event, index) => (
        <React.Fragment key={event.id}>
          {renderItem({ item: event })}
          {index < displayEvents.length - 1 && <Divider />}
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