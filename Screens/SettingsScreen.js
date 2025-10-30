import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function SettingsScreen() {
 const [fontSize, setFontSize] = React.useState('medium');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Blank for now; we'll layer Paper components later */}

      <Text>Text Size</Text>
     

    </View>
  );
}


 

//ANCHOR What I need to add to this page Text size, theme toggle, sound on/off.




const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'top', alignItems: 'center', marginTop: '24' }, 
  title: { fontSize: 24, fontWeight: '600' },
});