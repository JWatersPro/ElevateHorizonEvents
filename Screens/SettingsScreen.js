import * as React from 'react';
import { View,StyleSheet, useColorScheme } from 'react-native';
import { Text, List, Switch, RadioButton, Snackbar, Button, MD3LightTheme, MD3DarkTheme, useTheme} from 'react-native-paper';

  const createTheme = (isDark: boolean, fontSize: string) => {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const fontMap = { small: 14, medium: 18, large: 22 };
  
  return {
    ...baseTheme,
    fonts: {
      ...baseTheme.fonts,
      bodyLarge: { fontSize: fontMap[fontSize], letterSpacing: 0.5 },
      bodyMedium: { fontSize: fontMap[fontSize] * 0.9, letterSpacing: 0.25 },
      bodySmall: { fontSize: fontMap[fontSize] * 0.8, letterSpacing: 0.4 },
      headlineSmall: { fontSize: fontMap[fontSize] * 1.4, letterSpacing: 0.25 },
    }
  };
};

export default function SettingsScreen() {
  const systemScheme = useColorScheme();
  const [sounds, setSounds] = React.useState(true);
  const [snack, setSnack] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(systemScheme === 'dark'); 
  const [fontSize, setFontSize] = React.useState('medium');
  const fontSizeMap = {
  small: 14,
  medium: 18,
  large: 22,
};

const theme = createTheme(isDarkTheme, fontSize); 


  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.mb16}>Settings</Text>

      <List.Section>
        <List.Item
          title="Sounds"
          description={sounds ? 'On' : 'Off'}
          titleStyle={{ fontSize: fontSizeMap[fontSize] }}  // ✅ FONT SIZE WORKS
          descriptionStyle={{ fontSize: fontSizeMap[fontSize] * 0.8 }}
          right={() => (
            <Switch value={sounds} onValueChange={() => setSounds(!sounds)} />
          )}
        />


{/*TODO Figure out how to make the font actually change sizes*/}
<List.Subheader>Text Size</List.Subheader>
        <RadioButton.Group
          onValueChange={newValue => setFontSize(newValue)}
          value={fontSize}
        >
          <RadioButton.Item label="Small" value="small" />
          <RadioButton.Item label="Medium" value="medium" />
          <RadioButton.Item label="Large" value="large" />
        </RadioButton.Group>


      

{/*TODO Make the dark theme work*/}
<List.Item
  title="Dark Mode"
  description={isDarkTheme ? 'Enabled' : 'Disabled'}
  right={() => (
    <Switch
      value={isDarkTheme}
      onValueChange={() => setIsDarkTheme(!isDarkTheme)} // Just toggles switch visually
    />
  )}
/>




      </List.Section>

      
      
      
      
      
      <Button mode="contained" onPress={() => setSnack(true)}>
        Save Settings
      </Button>

      <Snackbar visible={snack} onDismiss={() => setSnack(false)} duration={1500}>
        Settings saved
      </Snackbar>
      
     



    
      












    </View>
  );
}


 

//ANCHOR What I need to add to this page Text size, theme toggle, sound on/off.




const styles = StyleSheet.create({
  container: { flex: 1, 
      padding: 20, 
      justifyContent: 'flex-start',
      alignItems: 'center', 
      marginTop: '24', 
      marginBottom: 16},
  title: { fontSize: 24, fontWeight: '600' },
  
});