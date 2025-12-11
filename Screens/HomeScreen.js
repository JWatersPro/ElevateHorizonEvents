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
    date: "2025-12-15",
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
    
    {/*ANCHOR getTodaysEvents*/}
    const getTodayEvents = (events) => {
  const today = new Date().toISOString().split('T')[0];
  const allAvailableEvents = [...sampleEvents, ...events]; // Combine both!
  return allAvailableEvents.filter(event => event.date === today).slice(0, 3);
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


    
{/*ANCHOR VIEW - Start of display*/}
    return (
         <ScrollView style={styles.scrollContainer}refreshControl={<RefreshControl refreshing={refreshing}onRefresh={onRefresh}progressViewOffset={80}/>
      }
    >
        <View style= {styles.container}>
            <Image source={require('./EHCLogo.jpg')} style={styles.logoImage}resizeMode="contain"/>
            
            

            <Text variant='headlineMedium' style = {styles.appTitle}>Welcome to the Elevate Horizon App!</Text>


        

{/**/}
        



{/* ANCHOR Today's Event card and Display*/}
{(() => {
  const todayEvent = getTodayEvents(allEvents)[0];

  if (!todayEvent) {
    return (
      <View style={styles.emptyTodayCard}>
        <Text style={styles.emptyText}>No events today</Text>
        <Text style={styles.emptySubtext}>Check back tomorrow</Text>
      </View>
    );
  }

  
  return (
    <TouchableOpacity
      style={styles.todayEventCard}
      onPress={() => navigation.navigate('EventDetails', { event: todayEvent })}
      activeOpacity={0.8}
    >
      <Text style={styles.todayEventTitle}>
        {todayEvent.title.replace(' REMOTE', '')}
      </Text>
      <Text style={styles.todayEventTime}>
        {todayEvent.startTime} - {todayEvent.endTime}
      </Text>
      <Text style={styles.todayEventDate}>
        {new Date(todayEvent.date).toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        })}
      </Text>
      <Text style={styles.todayEventSpots}>
  {todayEvent.isCancelled 
    ? 'CANCELLED' 
    : `${todayEvent.spotsRemaining} spots`
  }
</Text>
    </TouchableOpacity>
  );
})()}

{/*ANCHOR Today's Events Button*/}
{/*TODO DO I LINK THE BUTTON TO A FILTERED TODAYS LIST?*/}
    <Button
        mode="contained"
        onPress={() => navigation.navigate('EventsListScreen')}
        accessibilityLabel="View today's events"
        buttonColor="#3CA6E5"      
        textColor="#FFFFFF"
        style={styles.buttons}
      >
        View Today’s Events
        </Button>











{/*TODO Figure out why the 4 events in the Featured Events display the details in a very skinny card instead of a laregr one*/}

        {/*ANCHOR Featured Events Carousel*/}
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
                    <Text style={styles.carouselSpots}>
                    {item.isCancelled 
                        ? 'CANCELLED' 
                        : `${item.spotsRemaining} spots`
                    }
                    </Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
            />

            {/*TODO Figure out why this is nto displaying*/}
             

            <Text style={styles.carouselLabel}>Swipe for Featured Events</Text>


            {/*ANCHOR Display All Events Button*/}
            <Button 
                mode="contained"
                onPress={() => navigation.navigate('EventsListScreen')}
                buttonColor="#3CA6E5"      
                    textColor="#FFFFFF"
                style={styles.carouselButton}
            >
                View All Events
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Calibri',
    
    },

    appTitle: {
    fontFamily: 'Georgia',
    fontSize: 28,
    fontWeight: '700',
    color: '#424754',  
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
    },

    sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: '600',
    color: '#424754',
    marginBottom: 6,
    },

  divider: {
    marginVertical:18
    }, //16 or 18 is good divider gap 

  homeMarg: {
    marginBottom: 16},

  logoImage: {
    width: 100,
    height: 100,
   
    marginBottom: 20
    },

    scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff'
    },
   
  

    welcomeContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
    },

    welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',  
    color: '#1A1A1A',   
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 4,
    },

    welcomeSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3CA6E5',   
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 24,
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
    backgroundColor: '#F5F5F5'     
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




//ANCHOR Todays Events Styles
    emptyTodayCard: {
    width: 280,
    height: 180,        
    padding: 24,
    backgroundColor: 'F5F5F5',
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


    todayEventCard: {
    width: 280,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginVertical: 16,
    alignSelf: 'center',
    elevation: 4,
    },

    todayEventTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
    },

    todayEventTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
    textAlign: 'center'
    },

    todayEventDate: {
    fontSize: 14,
    color: '#8d8787ff',
    marginBottom: 8,
    textAlign: 'center'
    },

    todayEventSpots: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
   
    },






































}
);





//ANCHOR What I need for this page App logo, welcome message, “View