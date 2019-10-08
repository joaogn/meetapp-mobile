import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const ListView = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const DateView = styled.View`
  flex-direction: row;
  margin-top: 35px;
  margin-bottom: 35px;
  justify-content: center;
  max-height: 30px;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
`;

export const MessageBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;
export const Message = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
