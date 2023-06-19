import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationTab,
  Divider,
  Icon,
  IconElement,
  IconRegistry,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as evaTheme } from '../theme/ui-kitten-theme.json';

import AssetsPage from './pages/assets';

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const bottomState = useBottomNavigationState();

  const moonIcon = (props: any): IconElement => (
    <Icon name="moon-outline" {...props} />
  );

  const sunIcon = (props: any): IconElement => (
    <Icon name="sun-outline" {...props} />
  );

  const renderToggleThemeAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={theme === 'light' ? moonIcon : sunIcon}
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[theme], ...evaTheme }}>
        <StatusBar barStyle="dark-content" />
        <Layout style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1 }}>
              <TopNavigation
                alignment="center"
                title="Coins APP"
                // accessoryLeft={renderBackAction}
                accessoryRight={renderToggleThemeAction}
              />
              <Divider />
              <AssetsPage />
            </Layout>
            <BottomNavigation {...bottomState}>
              <BottomNavigationTab title="Moedas" icon={moonIcon} />
              <BottomNavigationTab title="Configs" icon={sunIcon} />
            </BottomNavigation>
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

export default App;
