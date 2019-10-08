import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;
export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.5)',
})`
  font-size: 18px;
  margin-bottom: 10px;
  padding: 0 15px;
  height: 46px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const SubmitButton = styled(Button)`
  height: 50px;
  background: #f94d6a;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const LogoutButton = styled.TouchableOpacity`
  height: 42px;
  background: #d44059;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
