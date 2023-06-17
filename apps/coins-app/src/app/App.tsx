import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import AssetsPage from './pages/assets';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AssetsPage />
      </SafeAreaView>
    </>
  );
};

export default App;
