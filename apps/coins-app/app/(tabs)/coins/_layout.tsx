import { Stack } from 'expo-router';
import { useTheme } from 'native-base';

export default function StackLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Coins APP',
        }}
      />
    </Stack>
  );
}
