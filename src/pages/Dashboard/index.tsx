import React, { useState, useEffect, useMemo } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '../../services/api';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Meetup from '../../components/Meetup';

import { Container, DateView, DateText, Message, MessageBox } from './styles';

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

function Dashboard({ isFocused }: Props) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  async function loadMeetups(): Promise<Meetup[]> {
    const response = await api.get('openmeetups', {
      params: {
        date: format(date, 'yyyy-MM-dd'),
        page,
      },
    });
    return response.data;
  }

  const formatedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    async function load() {
      if (isFocused) {
        if (page === 1) {
          setLoading(true);
        }
        const data = await loadMeetups();
        await setMeetups([...meetups, ...data]);
        setLoading(false);
      } else {
        setMeetups([]);
        setPage(1);
      }
    }
    load();
  }, [isFocused, date, page]);

  async function nextDate() {
    setMeetups([]);
    setDate(addDays(date, 1));
    setPage(1);
  }

  async function prevDate() {
    setMeetups([]);
    setDate(subDays(date, 1));
    setPage(1);
  }

  async function loadMore() {
    setPage(page + 1);
  }

  async function handleButton(meetupId: number) {
    try {
      await api.post(`/subscriptions/${meetupId}`);
      if (page === 1) {
        setMeetups(meetups.filter(meetup => meetup.id !== meetupId));
      } else {
        setMeetups([]);
      }
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
        {loading ? (
          <ActivityIndicator color="#f94d6a" />
        ) : meetups.length === 0 ? (
          <MessageBox>
            <Message>Não existe Meetups disponiveis para essa data</Message>
          </MessageBox>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            renderItem={({ item }) => (
              <Meetup
                item={item}
                buttonName="Realizar Inscrição"
                buttonHandle={handleButton}
              />
            )}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }: tabBarProps) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
