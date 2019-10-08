import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;
  height: 46px;
  background: #f94d6a;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
