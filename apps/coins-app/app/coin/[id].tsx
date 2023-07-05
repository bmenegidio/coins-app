import { useEffect, useState } from 'react';
import { Stack, useSearchParams } from 'expo-router';
import { Text, useTheme, View, VStack } from 'native-base';

import { SkeletonList } from '../../components/feedback/skeletonList';
import { ContentWrapper } from '../../components/layout/content';
import { ErrorContent } from '../../components/layout/errorContent';
import { apiInstance } from '../../services/api';
import { ICoin } from '../(tabs)/coins/models/ICoin';

const CoinDetailPage = () => {
  const { id: coinId } = useSearchParams();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState<ICoin>();
  const [error, setError] = useState(false);

  async function handleFetchCoinDetail() {
    try {
      setLoading(true);
      const { data } = await apiInstance.get<ICoin>(`/assets/${coinId}`);
      setCoin(data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchCoinDetail();
  }, [coinId]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: String(coinId),
          headerStyle: { backgroundColor: colors.primary[500] },
          headerTintColor: colors.white,
        }}
      />

      {error && (
        <ErrorContent
          isVisible={!loading && error}
          onRefreshClick={handleFetchCoinDetail}
        />
      )}

      {!error && (
        <ContentWrapper title={coin?.name} isScrollView>
          <SkeletonList isLoading={loading} />
          {!loading && (
            <>
              <VStack mb={2}>
                <Text fontSize="lg">Preço atual</Text>
                <Text bold>{coin?.priceUsd}</Text>
              </VStack>
              <VStack>
                <Text fontSize="lg">Volume de transação (1hr)</Text>
                <Text bold>{coin?.volume1HrsUsd}</Text>
              </VStack>
            </>
          )}
        </ContentWrapper>
      )}
    </View>
  );
};

export default CoinDetailPage;
