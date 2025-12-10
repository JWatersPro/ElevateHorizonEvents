//NOTE Imported Libraries from react
// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import {View, StyleSheet, Image, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import {Text, Button, Divider, Card,} from 'react-native-paper';

//TODO Fix image Aspect Ratio
const IMAGE_ASPECT_RATIO = 2;

//ANCHOR Sample Events
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
//NOTE MAIN body Component for the Home Screen 
export default function HomeScreen({ navigation }) {


    const [allEvents, setAllEvents] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    const getTodayEvents = (events) => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today).slice(0, 3);
    };

      const getRandomEvents = (events) => {
    if (events.length === 0) return sampleEvents.slice(0, 3);
    
    const remoteEvents = events.filter(e => !sampleEvents.some(s => s.id === e.id));
    const samples = sampleEvents.slice(0, 2);
    
    const mixed = [...samples, ...remoteEvents.slice(0, 2)];
    return mixed.sort(() => 0.5 - Math.random()).slice(0, 4);
  };

    useEffect(() => {
            fetchEvents();
        }, []);

        const fetchEvents = async () => {
            try {
                const response = await fetch('https://tafeshaun.github.io/elevate-data/events.json');
                const events = await response.json();
                setAllEvents(events);
            } catch (error) {
                console.log('API Error:', error);
                setAllEvents([]); 
            } finally {
                setLoading(false);
            }
        };


// const getRandomEvents = (events) => {
//         if (events.length === 0) return [];
//         const shuffled = [...events].sort(() => 0.5 - Math.random());
//         return shuffled.slice(0, 3);
//     };

useEffect(() => {
    fetchEvents();
  }, []);

   const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading events...</Text>
            </View>
        );
    }

    return (
         <ScrollView style={styles.scrollContainer}refreshControl={<RefreshControl refreshing={refreshing}onRefresh={onRefresh}progressViewOffset={80}/>
      }
    >
        <View style= {styles.container}>
            <Image source={require('./EHCLogo.jpg')} style={styles.logoImage}/>
            <Text variant='headlineMedium' style = {styles.homeMarg}>Home</Text>
            

            <Text variant='headlineMedium' style = {styles.homeMarg}>Welcome to the Elevate Horizon App!</Text>
{/* Button or someway to view todays events*/}
{/*TODO Fix the button so it goes to events page*/}
        <Button
        mode="contained"
        onPress={() => navigation.navigate('EventsListScreen')}
        accessibilityLabel="View today's events"
        style={styles.button}
      >
        View Today’s Events
        </Button>

{/**/}
        



        {/*This is the Carousel to dsiplay Featured events*/}
        <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <FlatList
                data={getRandomEvents(allEvents)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                
                ListEmptyComponent={
                <Text style={styles.carouselLabel}>No events available</Text>
                }
  renderItem={({ item }) => (
  <TouchableOpacity 
      style={styles.carouselCard}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
      activeOpacity={0.8}
    >
    
      <Text style={styles.carouselTitle}>{item.title.replace(' REMOTE', '')}</Text>
      <Text style={styles.carouselTime}>{item.startTime} - {item.endTime}</Text>
      <Text style={styles.carouselDate}>{new Date(item.date).toLocaleDateString('en-AU', { 
    day: 'numeric', 
    month: 'numeric', 
    year: 'numeric' 
  })}</Text>
      <Text style={styles.carouselSpots}>{item.spotsRemaining} spots</Text>
    </TouchableOpacity>
  )}
  keyExtractor={(item, index) => item.id || index.toString()}
  
/>
  <Text style={styles.carouselLabel}>Swipe for Featured Events</Text>
  <Button 
    mode="contained"
    onPress={() => navigation.navigate('EventsListScreen')}
    style={styles.carouselButton}
  >
    View All Events →
  </Button>
</View>
          
    


        

            

 














    </View>
</ScrollView>



       




    );
}















//NOTE MAIN Styles ref 
const styles = StyleSheet.create({
//NOTE THESE ARE VIEW PROPERTIES 
  container: { 
    flex: 1,
     padding: 20, 
     justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },

  divider: {
    marginVertical:18
}, //16 or 18 is good divider gap 

  homeMarg: {
    marginBottom: 16},

  logoImage: {
    width: 100,
    height: 100,
    aspectRatio: IMAGE_ASPECT_RATIO,
    marginBottom: 20
},

 scrollContainer: {
  flex: 1,
  backgroundColor: '#f8f9ff'
},
   

//ANCHOR Carsousel Styles
carouselContainer: {
  marginVertical: 16,
  alignItems: 'center',
},

carouselCard: {
  width: 280,
  padding: 16,                   
  maxHeight: 180,                 
  backgroundColor: 'white',
  borderRadius: 16,
  marginHorizontal: 12,
  alignItems: 'center',
  elevation: 4,
  justifyContent: 'center',       
},

carouselTitle: {
  fontSize: 18,                   
  fontWeight: '700',
  marginBottom: 6,                
  textAlign: 'center',
},
carouselTime: {
  fontSize: 16,
  color: '#666',
  marginBottom: 2,                
},
carouselDate: {
  fontSize: 14,
  color: '#8d8787ff',
  marginBottom: 8,
},
carouselSpots: {
  fontSize: 16,
  fontWeight: '600',
  color: '#4CAF50',
},
carouselLabel: {
  marginTop: 12,
  fontSize: 14,
  color: '#666',
},
carouselButton: {
  marginTop: 12,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 12,
  textAlign: 'center',
},





emptyTodayCard: {
  width: 280,
  height: 180,        
  padding: 24,
  backgroundColor: 'white',
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 4,
},
emptyText: {
  fontSize: 18,
  fontWeight: '600',
  color: '#666',
  marginBottom: 4,
},
emptySubtext: {
  fontSize: 14,
  color: '#999',
},









































}
);

/*Code Graveyard
    <Button mode ='contained'onPress={ () => navigation.navigate('Details',{user})}>
        Go to Details
    </Button>

    <Divider style = {styles.divider} />

    <Button mode='outlined' icon='camera' onPress={() => {}}>
        Go to Gallery
    </Button>




    OLD title CSS for text on react native core
    title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
*/




//ANCHOR What I need for this page App logo, welcome message, “View