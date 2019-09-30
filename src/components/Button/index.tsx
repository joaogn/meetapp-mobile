import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Text } from './styles';

interface DefaultButton extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  ...rest
}: DefaultButton) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
