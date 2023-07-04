import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
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
  useTheme,
  VStack,
} from 'native-base';

import { SkeletonList } from '../../feedback/skeletonList';

import { ILIstItem } from './models/IListItemProps';
import { IListProps } from './models/IListProps';

const AVATAR_WIDTH_PX = 40;
const LIST_ITEM_HEIGHT_PX = 60;

function ListItem({ item, onItemClick }: ILIstItem) {
  return (
    <Pressable
      h={`${LIST_ITEM_HEIGHT_PX}px`}
      justifyContent={'center'}
      onPress={onItemClick}
    >
      {({ isPressed }) => (
        <Box py="2" opacity={isPressed ? 0.8 : 1}>
          <HStack space={[2, 3]} justifyContent="space-between">
            {item.avatar && (
              <Avatar
                size={`${AVATAR_WIDTH_PX}px`}
                source={{
                  uri: item.avatar,
                }}
              />
            )}
            <VStack alignSelf={'center'}>
              <Text bold>{item.name}</Text>
              {item.description && <Text>{item.description}</Text>}
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
  const { colors } = useTheme();
  props.isLoading = props.isLoading ?? false;

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ListItem item={item} onItemClick={() => props.onItemClick?.(item)} />
    ),
    []
  );

  const renderSeparator = useCallback(() => <Divider />, []);

  return (
    <>
      <SkeletonList isLoading={props.isLoading} />
      {!props.isLoading && (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={props.data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          maxToRenderPerBatch={6}
          ItemSeparatorComponent={renderSeparator}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={props.onRefresh}
              tintColor={colors.primary[400]}
            />
          }
        />
      )}
    </>
  );
}

export { List };
