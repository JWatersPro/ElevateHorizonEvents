//ANCHOR What I need for this page Title, date, time, location, category, spots remaining; filter & search.

import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView  } from 'react-native';
import { Text, List, Divider, TextInput, Button  } from 'react-native-paper';

const JSON_URL = 'https://tafeshaun.github.io/elevate-data/events.json';

const sampleEvents = [
  {
    id: '1',
    title: 'Squash',
    date: '2025-12-13',
    startTime: '08:00',
    endTime: '09:00',
    location: 'Community Hall',
    category: 'Fitness',
    description: 'Competitive squash matches and coaching for all skill levels.',
    capacity: 20,
    spotsRemaining: 12,
    isCancelled: true
  },
  {
    id: '2',
    title: 'Scrabble',
    date: '2025-12-29',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Library',
    category: 'Entertainment',
    description: 'Weekly Scrabble tournament with prizes for top scorers.',
    capacity: 25,
    spotsRemaining: 5,
    isCancelled: true
  },
  {
    id: 3,
    title: "Live Jazz Night",
    date: "2025-12-21",
    startTime: "19:30",
    endTime: "21:30",
    location: "Community Hall A",
    category: "Entertainment",
    description: "Smooth jazz performances by local musicians.",
    capacity: 50,
    spotsRemaining: 20,
    isCancelled: false
  },
  {
    id: 4,
    title: "Comedy Open Mic",
    date: "2025-12-22",
    startTime: "20:00",
    endTime: "22:00",
    location: "Community Hall B",
    category: "Entertainment",
    description: "Amateur and pro comedians share laughs.",
    capacity: 40,
    spotsRemaining: 15,
    isCancelled: false
  },
  {
    id: 5,
    title: "Spin Cycling Class",
    date: "2025-12-10",
    startTime: "07:30",
    endTime: "08:30",
    location: "Community Hall A",
    category: "Fitness",
    description: "Indoor cycling session with interval training.",
    capacity: 20,
    spotsRemaining: 10,
    isCancelled: true
  },
  {
    id: 6,
    title: "Beginner CrossFit",
    date: "2025-12-015",
    startTime: "06:30",
    endTime: "07:30",
    location: "Community Hall C",
    category: "Fitness",
    description: "Beginner CrossFit with scaled movements and coaching.",
    capacity: 18,
    spotsRemaining: 7,
    isCancelled: false
  }




];

export default function EventsListScreen({ navigation }) {
  const [events, setEvents] = React.useState([]);        //Events
  const [loading, setLoading] = React.useState(false);   //Loading
  const [errorMsg, setErrorMsg] = React.useState('');    //Errors
  
  
  
  
  const renderItem = ({ item }) => (
    <List.Item
      title={item.title.replace(' REMOTE', '')}
      description={`${item.date} • ${item.startTime}-${item.endTime}\n${item.location}\nCategory: ${item.category}\nSpots Remaining: ${item.spotsRemaining}`}
      titleNumberOfLines={1}
      descriptionNumberOfLines={4}
      style={styles.listItem}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    />
  );

  {/*Displays the remote data when loaded but displays the sample when remote data loading fails*/}
  {/*const displayEvents = events.length > 0 ? events : sampleEvents;*/}

{/*Dsiplays both remote and sample events together*/}
  const displayEvents = [...sampleEvents, ...events];

  const [q, setQ] = React.useState('');
const filteredEvents = displayEvents.filter((event) =>
  (event.title ?? '').toLowerCase().includes(q.toLowerCase())
);

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

      <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      >

      <TextInput 
        label="Search events"
        value={q}
        onChangeText={setQ}
        mode="outlined"
        left={<TextInput.Icon icon="magnify" />}
        style={styles.searchInput}
      />

          {filteredEvents.map((event, index) => (
        <React.Fragment key={event.id}>
          {renderItem({ item: event })}
          {index < filteredEvents.length - 1 && <Divider />}
        </React.Fragment>
      ))}

          <Button mode="outlined" onPress={loadRemote} icon="refresh">
            Refresh Events
          </Button>

       </ScrollView>
    </View>
  );
}

 






  //SECTION StyleSheet
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingHorizontal: 20,    
    justifyContent: 'flex-start',
    alignItems: 'stretch',},

  scrollContent: {            
    paddingBottom: 40,
  },

  formRow: {                  
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16
  },

  marg16: { 
    marginBottom: 16 
  },  

  input: { 
    flex: 1, 
    margin: 5 }, 

  searchInput: {
    marginTop: 8,
    marginBottom: 24,
  },

  searchInput: {
     marginTop: 50,
     marginBottom: 24 
    },

  listItem: {
     paddingVertical: 8 
    },
});


{/**/}