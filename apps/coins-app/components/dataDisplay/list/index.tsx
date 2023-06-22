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

import { IListProps } from './models/IListProps';
import { IRenderItem } from './models/IRenderItem';

const AVATAR_WIDTH_PX = 40;

function RenderItem(props: IRenderItem) {
  return (
    <Pressable>
      {({ isPressed }) => (
        <Box py="2" opacity={isPressed ? 0.8 : 1}>
          <HStack space={[2, 3]} justifyContent="space-between">
            {props.itemKeyAvatar && (
              <Avatar
                size={`${AVATAR_WIDTH_PX}px`}
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
  const { colors } = useTheme();
  props.isLoading = props.isLoading ?? false;
  return (
    <>
      <SkeletonList isLoading={props.isLoading} />
      {!props.isLoading && (
        <FlatList
          data={props.data}
          extraData={(item: any) => item[props.itemKeyId]}
          ItemSeparatorComponent={Divider}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={props.onRefresh}
              tintColor={colors.primary[400]}
            />
          }
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
      )}
    </>
  );
}

export { List };
