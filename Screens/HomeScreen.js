//NOTE Imported Libraries from react
import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button, Divider} from 'react-native-paper';

//NOTE MAIN body Component for the Home Screen 
export default function HomeScreen({ navigation }) {
    return (
        <View style= {styles.container}>
            <Text variant='headlineMedium' style = {styles.homeMarg}>Home</Text>
            <Image source={require('./EHCLogo.jpg')} />

            <Text variant='headlineMedium' style = {styles.homeMarg}>Welcome to the Elevate Horizon App!</Text>


        </View>
    );
}

//NOTE MAIN Styles ref 
const styles = StyleSheet.create({
//NOTE THESE ARE VIEW PROPERTIES 
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'},
  divider: {marginVertical:18}, //16 or 18 is good divider gap 
  homeMarg: {marginBottom: 16},
});

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