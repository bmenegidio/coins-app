import { useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { debounce } from 'lodash';
import { Icon, Input, VStack } from 'native-base';

import { AssetsRo } from '@/coins-project/types/assets/asset.ro';

import { List } from '../../../components/dataDisplay/list';
import { ContentWrapper } from '../../../components/layout/content';
import { ErrorContent } from '../../../components/layout/errorContent';
import { apiInstance } from '../../../services/api';

export default function CoinsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<AssetsRo[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);
  const listFiltered = filter
    ? coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(filter.toLowerCase()) ||
          coin.id.toLowerCase().includes(filter.toLowerCase())
      )
    : coins;

  async function handleFetchCoins() {
    setLoading(true);
    try {
      const { data } = await apiInstance.get<AssetsRo[]>('/assets');
      setCoins(parseCoinDataToListStandard(data));
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function parseCoinDataToListStandard(coinsData: AssetsRo[]) {
    return coinsData.map((coin) => ({
      ...coin,
      name: coin.label,
      description: coin.priceUsd,
    }));
  }

  function navigateToCoinDetail(coin: AssetsRo) {
    router.push(`/coin/${coin.id}`);
  }

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      setFilter(criteria);
    }, 200)
  ).current;

  useEffect(() => {
    handleFetchCoins();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  if (error) {
    return (
      <ErrorContent
        isVisible={!loading && error}
        onRefreshClick={handleFetchCoins}
      />
    );
  }

  return (
    <>
      <ContentWrapper title="Pesquisar" isScrollView={false}>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Digite.."
            borderRadius="8"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            onChangeText={debouncedSearch}
            autoFocus={false}
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="none"
          />
        </VStack>
      </ContentWrapper>
      <ContentWrapper title="Moedas" isScrollView={false} isFullHeight>
        <List
          data={listFiltered}
          isLoading={loading}
          onRefresh={handleFetchCoins}
          onItemClick={navigateToCoinDetail}
        />
      </ContentWrapper>
    </>
  );
}
