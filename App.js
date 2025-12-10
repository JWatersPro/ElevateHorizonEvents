//NOTE - the Maint IMPORTs for the whole APP
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

//NOTE - Screen Imports of the screens in our APP
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import EventDetailsScreen from './Screens/EventDetailsScreen';
import EventsListScreen from './Screens/EventsListScreen';
import ErrorLoadingScreen from './Screens/ErrorLoadingScreen';
import EventRegisterScreen from './Screens/EventRegisterScreen';


// THEME 
// export const ThemeContext = React.createContext({
//   isDark: false,
//   toggleTheme: () => {},
//   fontSize: 'medium',
//   setFontSize: () => {},
// });


//ANCHOR - Primary Nav Approach
const Tab = createBottomTabNavigator();
//ANCHOR - Sub Nav Approach
const Stack = createStackNavigator();

//SECTION - TABS
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
              iconName = 'home-outline'}
              
          else if (route.name === 'Events') {          // Step 3: icon for new tab
            iconName = 'list-outline';} 
          
          else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
//!SECTION

//SECTION - Main APP wrapper
export default function App() {
  
//   const [isDark, setIsDark] = React.useState(false);
//   const [fontSize, setFontSize] = React.useState('medium'); // 'small' | 'medium' | 'large'

//   const theme = React.useMemo(() => {
//     const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
//     const fontMap = { small: 14, medium: 18, large: 22 };

// return {
//       ...baseTheme,
//       fonts: {
//         ...baseTheme.fonts,
//         bodyLarge: { ...baseTheme.fonts.bodyLarge, fontSize: fontMap[fontSize] },
//         bodyMedium: { ...baseTheme.fonts.bodyMedium, fontSize: fontMap[fontSize] * 0.9 },
//         bodySmall: { ...baseTheme.fonts.bodySmall, fontSize: fontMap[fontSize] * 0.8 },
//       },
//     };
//   }, [isDark, fontSize]);

//   const themeCtx = React.useMemo(
//     () => ({
//       isDark,
//       toggleTheme: () => setIsDark(prev => !prev),
//       fontSize,
//       setFontSize,
//     }),
//     [isDark, fontSize]
//   );

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="EventRegister" component={EventRegisterScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="EventsListScreen" component={EventsListScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
//!SECTION