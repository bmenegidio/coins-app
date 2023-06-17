import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import { default as theme } from '../theme/ui-kitten-theme.json';

import AssetsPage from './pages/assets';

export const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <StatusBar barStyle="light-content" />
      <Layout style={{ flex: 1 }}>
        <SafeAreaView>
          <AssetsPage />
        </SafeAreaView>
      </Layout>
    </ApplicationProvider>
  );
};

export default App;
