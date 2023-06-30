import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, IconButton, Text, VStack } from 'native-base';

import ExclamationImg from '../../../assets/imgs/exclamation.svg';
import { ContentWrapper } from '../content';

import { IErrorContent } from './models/IErrorContent';

function ErrorContent(props: IErrorContent) {
  if (!props.isVisible) return <></>;

  return (
    <ContentWrapper>
      <VStack w="100%" space={5} alignSelf="center" alignItems="center">
        <ExclamationImg width="70" height="70" />
        <HStack space={3} alignItems="center" justifyContent="center">
          <Text>{props.message || 'Ocorreu um erro ao carregar os dados'}</Text>
          {props.onRefreshClick && (
            <IconButton onPress={props.onRefreshClick}>
              <FontAwesome5 name="sync" size={16} />
            </IconButton>
          )}
        </HStack>
      </VStack>
    </ContentWrapper>
  );
}

export { ErrorContent };
