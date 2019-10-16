import React, { useState, useEffect } from 'react';
import { FlatList, Alert, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '../../services/api';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Meetup from '../../components/Meetup';

import { Container, MessageBox, Message } from './styles';

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

interface Subscription {
  meetups: Meetup;
}

function Subscription({ isFocused }: Props) {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  async function loadSubscription() {
    const response = await api.get('subscriptions');

    setMeetups(response.data.map((item: Subscription) => item.meetups));
  }

  async function handleButton(meetupId: number) {
    try {
      await api.delete(`/subscriptions/${meetupId}`);
      Alert.alert('Cancelado com Sucesso');
      loadSubscription();
    } catch (err) {
      Alert.alert('Falha ao Cancelar');
    }
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadSubscription();
      setLoading(false);
    } else {
      setMeetups([]);
    }
  }, [isFocused]);

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator color="#f94d6a" />
        ) : meetups.length === 0 ? (
          <MessageBox>
            <Message>Se inscreva no seu primeiro Meetup</Message>
          </MessageBox>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            renderItem={({ item }) => (
              <Meetup
                item={item}
                buttonName="Cancelar Inscrição"
                buttonHandle={handleButton}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }: tabBarProps) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
