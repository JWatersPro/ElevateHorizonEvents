// //ANCHOR What I need to add to this page Text size, theme toggle, sound on/off.



import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { 
  Text, List, Switch, RadioButton, Snackbar, Button, 
  MD3LightTheme, MD3DarkTheme, PaperProvider, useTheme 
} from 'react-native-paper';

const createTheme = (isDark: boolean, fontSize: string) => {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const fontMap = { small: 14, medium: 18, large: 22 };
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      

      primary: isDark ? '#374151' : '#3CA6E5', 
      surface: isDark ? '#1F1F1F' : '#3CA6E5',
      onPrimaryContainer: isDark ? '#FFFFFF' : baseTheme.colors.onPrimaryContainer,
      onPrimary: isDark ? '#FFFFFF' : baseTheme.colors.onPrimary,
      elevation: {
        level1: isDark ? '#2D2D2D' : '#E5E7EB',
        level2: isDark ? '#1A1A1A' : '#D1D5DB',
      }
      
 
    },
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

  const theme = React.useMemo(() => createTheme(isDarkTheme, fontSize), [isDarkTheme, fontSize]);

  return (
    <PaperProvider theme={theme}>
      <ScreenContent 
        isDarkTheme={isDarkTheme} 
        fontSize={fontSize} 
        sounds={sounds}
        setSounds={setSounds}
        setFontSize={setFontSize}
        setIsDarkTheme={setIsDarkTheme}
        snack={snack}
        setSnack={setSnack}
      />
    </PaperProvider>
  );
}

function ScreenContent({ isDarkTheme, fontSize, sounds, setSounds, setFontSize, setIsDarkTheme, snack, setSnack }) {
  const theme = useTheme();
  return (
    <View style = {{ flex: 1, backgroundColor: isDarkTheme ? '#1A1A1A' : '#FFFFFF' }}>
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text 
        variant="headlineMedium" 
        style={{ color: theme.colors.onBackground, marginBottom: 16 }}
      >
        Settings
      </Text>

      <List.Section>
        <List.Item
          title="Sounds"
          description={sounds ? 'On' : 'Off'}
          right={() => (
            <Switch value={sounds} onValueChange={() => setSounds(!sounds)} />
          )}
        />

        <List.Subheader>Text Size</List.Subheader>
        <RadioButton.Group
          onValueChange={newValue => setFontSize(newValue)}
          value={fontSize}
        >
          <RadioButton.Item label="Small" value="small" />
          <RadioButton.Item label="Medium" value="medium" />
          <RadioButton.Item label="Large" value="large" />
        </RadioButton.Group>

        <List.Item
          title="Dark Mode"
          description={isDarkTheme ? 'Enabled' : 'Disabled'}
          right={() => (
            <Switch
              value={isDarkTheme}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
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
    </View>
  );
}





const styles = StyleSheet.create({
  container: { flex: 1, 
      padding: 20, 
      justifyContent: 'flex-start',
      alignItems: 'center', 
      marginTop: '24', 
      marginBottom: 16},
      title: { fontSize: 24, fontWeight: '600' },

  
 
});