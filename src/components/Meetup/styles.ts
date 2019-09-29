import styled from 'styled-components/native';

export const MeetupView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 335px;
  background-color: #fff;
  align-items: flex-start;
  border-radius: 4px;
  margin-bottom: 20px;
`;
export const MeetupBanner = styled.Image`
  height: 150px;
  width: 335px;
`;
export const MeetupTitle = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  margin-top: 22px;
  margin-left: 20px;
`;

export const MeetupDetail = styled.View`
  margin-left: 20px;
  flex-direction: row;
  margin-top: 15px;
`;

export const MeetupDetailText = styled.Text`
  color: #999;
  font-size: 13px;
  line-height: 15px;
  margin-left: 5px;
`;
export const MeetupButton = styled.TouchableOpacity`
  height: 40px;
  width: 295px;
  background-color: #f94d6a;
  border-radius: 4px;
  margin: 15px 0;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
export const MeetupButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
`;
