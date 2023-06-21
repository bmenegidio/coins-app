import {
  Box,
  ScrollView,
  Text,
  useColorModeValue,
  useTheme,
  View,
} from 'native-base';

type ContentProps = {
  children: React.ReactNode;
  title?: string;
  isScrollView?: boolean;
};

const Title = ({ title }: { title?: string }) => (
  <View>
    {title && (
      <Text pl={4} pt={4} fontSize="lg" fontWeight="bold">
        {title}
      </Text>
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
