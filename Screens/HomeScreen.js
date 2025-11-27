//NOTE Imported Libraries from react
import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button, Divider} from 'react-native-paper';

//TODO Fix image Aspect Ratio
const IMAGE_ASPECT_RATIO = 2;

//try adding hard coded event 

//NOTE MAIN body Component for the Home Screen 
export default function HomeScreen({ navigation }) {
    return (
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




        </View>
    );
}















//NOTE MAIN Styles ref 
const styles = StyleSheet.create({
//NOTE THESE ARE VIEW PROPERTIES 
  container: { flex: 1, padding: 20, justifyContent: 'fles-start', alignItems: 'flex-start'},
  divider: {marginVertical:18}, //16 or 18 is good divider gap 
  homeMarg: {marginBottom: 16},
  logoImage: { width: 100, height: 100, aspectRatio: IMAGE_ASPECT_RATIO, marginBottom: 20},

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