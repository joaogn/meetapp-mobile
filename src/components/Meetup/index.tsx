import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  MeetupView,
  MeetupBanner,
  MeetupTitle,
  MeetupDetail,
  MeetupDetailText,
  MeetupButton,
} from './styles';

interface Meetup {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  created_at: string;
  updated_at: string;
  banner_id: number;
  user_id: number;
  past: boolean;
  file: {
    url: string;
    path: string;
  };
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  item: Meetup;
  buttonName: string;
  buttonHandle(meetuuId: number): any;
}

export default function Meetup({ item, buttonName, buttonHandle }: Props) {
  return (
    <MeetupView>
      <MeetupBanner
        source={{
          uri: item.file.url,
        }}
      />
      <MeetupTitle>{item.title}</MeetupTitle>

      <MeetupDetail>
        <Icon name="event" size={14} color="#999" />
        <MeetupDetailText>
          {format(parseISO(item.date), "dd 'de' MMMM', às' HH'h'", {
            locale: pt,
          })}
        </MeetupDetailText>
      </MeetupDetail>
      <MeetupDetail>
        <Icon name="place" size={14} color="#999" />
        <MeetupDetailText>{item.location}</MeetupDetailText>
      </MeetupDetail>
      <MeetupDetail>
        <Icon name="person" size={14} color="#999" />
        <MeetupDetailText>{`Organizado(a): ${item.user.name}`}</MeetupDetailText>
      </MeetupDetail>
      <MeetupButton onPress={() => buttonHandle(item.id)} enabled={!item.past}>
        {buttonName}
      </MeetupButton>
    </MeetupView>
  );
}
