import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity, Alert } from 'react-native';

import { format, addDays, subDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '../../services/api';
import Header from '../../components/Header';
import Background from '../../components/Background';

import {
  Container,
  DateView,
  DateText,
  MeetupView,
  MeetupBanner,
  MeetupTitle,
  MeetupDetail,
  MeetupDetailText,
  MeetupButton,
  MeetupButtonText,
} from './styles';

interface Props {
  isFocused: boolean;
}

interface tabBarProps {
  tintColor: string;
}

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
  file: {
    url: string;
    path: string;
  };
  user: {
    name: string;
    email: string;
  };
}

function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  async function loadMeetups() {
    const response = await api.get('openmeetups', {
      params: {
        date: format(date, 'yyyy-MM-dd'),
        page,
      },
    });

    setMeetups([...meetups, ...response.data]);
  }

  const formatedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    loadMeetups();
  }, []);

  useEffect(() => {
    loadMeetups();
  }, [date, page]);

  async function nextDate() {
    setDate(addDays(date, 1));
  }

  async function prevDate() {
    setDate(subDays(date, 1));
  }

  async function loadMore() {
    setPage(page + 1);
  }

  function refreshList() {
    setPage(1);
    setRefreshing(true);
    setMeetups([]);
  }

  async function handleSubscription(meetuuId: number) {
    try {
      await api.post(`/subscriptions/${meetuuId}`);
      Alert.alert('Inscrito com Sucesso');
      setPage(1);
    } catch (err) {
      Alert.alert('Falha ao se inscrever');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateView>
          <TouchableOpacity onPress={() => prevDate()}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateText>{formatedDate}</DateText>
          <TouchableOpacity onPress={() => nextDate()}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={meetups}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item }) => (
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
                <MeetupDetailText>{item.description}</MeetupDetailText>
              </MeetupDetail>
              <MeetupDetail>
                <Icon name="person" size={14} color="#999" />
                <MeetupDetailText>
                  {`Organizado: ${item.user.name}`}
                </MeetupDetailText>
              </MeetupDetail>
              <MeetupButton onPress={() => handleSubscription(item.id)}>
                <MeetupButtonText>Realizar Inscrição</MeetupButtonText>
              </MeetupButton>
            </MeetupView>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          onRefresh={refreshList}
          refreshing={refreshing}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }: tabBarProps) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
