import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'native-base';

export default () => {
  const theme = useTheme();
  return (
    <Tabs>
      <Tabs.Screen
        name="coins"
        options={{
          headerShown: false,
          title: 'Moedas',
          tabBarInactiveTintColor: theme.colors.gray[500],
          tabBarActiveTintColor: theme.colors.primary[600],
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="coins" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
