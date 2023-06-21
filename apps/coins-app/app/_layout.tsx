import { Stack } from 'expo-router';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { theme } from '../theme';

export default function RootLayout() {
  const appTheme = extendTheme(theme);
  return (
    <NativeBaseProvider theme={appTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NativeBaseProvider>
  );
}
