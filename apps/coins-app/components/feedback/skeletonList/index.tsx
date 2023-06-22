import { Divider, HStack, Skeleton, View } from 'native-base';

import { ISkeletonList } from './models/ISkeletonList';

function SkeletonList({ isLoading }: ISkeletonList) {
  return (
    <View>
      {isLoading && (
        <View>
          {new Array(5).fill(0).map((item, itemIndex) => (
            <HStack
              key={itemIndex}
              space={8}
              overflow="hidden"
              rounded="md"
              alignItems={`center`}
            >
              <Skeleton rounded="full" w={`40px`} />
              <Skeleton.Text px="4" />
              <Skeleton.Text divider={<Divider />} />
            </HStack>
          ))}
        </View>
      )}
    </View>
  );
}

export { SkeletonList };
