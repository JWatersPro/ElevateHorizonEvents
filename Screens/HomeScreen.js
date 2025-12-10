//NOTE Imported Libraries from react
// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import {View, StyleSheet, Image, ScrollView, FlatList} from 'react-native';
import {Text, Button, Divider, Card,} from 'react-native-paper';

//TODO Fix image Aspect Ratio
const IMAGE_ASPECT_RATIO = 2;

//try adding hard coded event 

//NOTE MAIN body Component for the Home Screen 
export default function HomeScreen({ navigation }) {


    const [allEvents, setAllEvents] = useState([]); 
    const [loading, setLoading] = useState(true);
    const getTodayEvents = (events) => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today).slice(0, 3);
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


const getRandomEvents = (events) => {
        if (events.length === 0) return [];
        const shuffled = [...events].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading events...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollContainer}>
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
        {/*This is the Carousel to display todays events*/} 
        <View style={styles.todayCarouselContainer}>
        <Text style={styles.sectionTitle}>Today's Events</Text>
        <FlatList
            data={getTodayEvents(allEvents)}  
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
            <View style={styles.emptyTodayCard}>
                <Text style={styles.emptyText}>No events today</Text>
                <Text style={styles.emptySubtext}>Check back tomorrow!</Text>
            </View>
            }
            renderItem={({ item }) => (
            <View style={styles.carouselCard}>
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselTime}>{item.startTime}-{item.endTime}</Text>
                <Text style={styles.carouselSpots}>{item.spotsRemaining} spots</Text>
            </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>



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
                        <View style={styles.carouselCard}>
                            <Text style={styles.carouselTitle}>{item.title}</Text>
                            <Text>{item.startTime} - {item.endTime}</Text>
                            <Text style={styles.carouselSpots}>
                                {item.spotsRemaining} spots
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}  
                />
                <Text style={styles.carouselLabel}>Swipe for Today's Events (F1)</Text>
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
  color: '#999',
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


 

todayCarouselContainer: {
  marginVertical: 24,
  alignItems: 'center',
},
sectionTitle: {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 12,
  textAlign: 'center',
},
emptyTodayCard: {
  width: 280,
  height: 180,        // ⭐ SAME HEIGHT always
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




//ANCHOR What I need for this page App logo, welcome message, “View Today’s Events” shortcut.