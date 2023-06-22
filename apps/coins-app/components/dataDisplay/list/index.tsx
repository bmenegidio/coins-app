import { FontAwesome5 } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Divider,
  FlatList,
  HStack,
  IconButton,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base';

import { IListProps } from './models/IListProps';
import { IRenderItem } from './models/IRenderItem';

function RenderItem(props: IRenderItem) {
  return (
    <Pressable>
      {({ isPressed }) => (
        <Box py="2" opacity={isPressed ? 0.8 : 1}>
          <HStack space={[2, 3]} justifyContent="space-between">
            {props.itemKeyAvatar && (
              <Avatar
                size="40px"
                source={{
                  uri: props.item[props.itemKeyAvatar],
                }}
              />
            )}
            <VStack alignSelf={'center'}>
              <Text bold>{props.item[props.itemKeyLabel]}</Text>
              {props.itemKeyDescription && (
                <Text>{props.item[props.itemKeyDescription]}</Text>
              )}
            </VStack>
            <Spacer />
            <IconButton>
              <FontAwesome5 name="chevron-right" />
            </IconButton>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}

function List(props: IListProps) {
  return (
    <FlatList
      data={props.data}
      extraData={(item: any) => item[props.itemKeyId]}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => (
        <RenderItem
          item={item}
          itemKeyId="id"
          itemKeyLabel={props.itemKeyLabel}
          itemKeyDescription={props.itemKeyDescription}
          itemKeyAvatar={props.itemKeyAvatar}
        />
      )}
    />
  );
}

export { List };
