import { Tabs } from 'expo-router';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D97757',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#1C1917',
          borderTopColor: '#44403C',
        },
        headerStyle: {
          backgroundColor: '#1C1917',
          borderBottomColor: '#44403C',
          borderBottomWidth: 1,
        },
        headerTintColor: '#F8FAFC',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: 'E-Course',
          tabBarIcon: ({ color }) => <FontAwesome5 name="graduation-cap" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color }) => <FontAwesome5 name="calculator" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="backtest"
        options={{
          title: 'Backtest',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-line-variant" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
