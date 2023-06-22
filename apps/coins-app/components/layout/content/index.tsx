import {
  Box,
  Heading,
  ScrollView,
  useColorModeValue,
  useTheme,
  View,
} from 'native-base';

import { ContentProps } from './models/IContent';

const Title = ({ title }: { title?: string }) => (
  <View>
    {title && (
      <Heading pl={4} pt={4} fontSize="lg" fontWeight="bold">
        {title}
      </Heading>
    )}
  </View>
);

const ChildrenContent = (props: React.PropsWithChildren) => {
  const { colors } = useTheme();
  const backgroundColor = useColorModeValue(
    colors.coolGray['50'],
    colors.coolGray['800']
  );
  return (
    <Box backgroundColor={backgroundColor} my={6} p={4}>
      {props.children}
    </Box>
  );
};

function ContentWrapper({ children, title, isScrollView }: ContentProps) {
  isScrollView = isScrollView ?? true;
  return isScrollView ? (
    <ScrollView style={{ flex: 1 }}>
      <Title title={title} />
      <ChildrenContent>{children}</ChildrenContent>
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>
      <Title title={title} />
      <ChildrenContent>{children}</ChildrenContent>
    </View>
  );
}

export { ContentWrapper };
