import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';

export const AssetsPage = () => {
  const facebookIcon = (props: any) => (
    <Icon name="plus-circle-outline" {...props} />
  );

  return (
    <Layout style={{ margin: 15 }}>
      <List
        data={[
          { id: 'BTC', name: 'Bitcoin' },
          { id: 'ETH', name: 'Ethereum' },
          { id: 'ADA', name: 'Cardano' },
          { id: 'DOT', name: 'Polkadot' },
          { id: 'SOL', name: 'Solana' },
          { id: 'LUNA', name: 'Terra' },
          { id: 'AVAX', name: 'Avalanche' },
          { id: 'DOGE', name: 'Dogecoin' },
          { id: 'SHIB', name: 'Shiba Inu' },
        ]}
        ItemSeparatorComponent={Divider}
        renderItem={(item) => (
          <ListItem
            title={item.item.name}
            description={item.item.id}
            accessoryLeft={facebookIcon}
            accessoryRight={facebookIcon}
          />
        )}
      />
    </Layout>
  );
};

export default AssetsPage;
