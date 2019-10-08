import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import createRouter from './routes';
import Navigation from './services/navigation';

export default function App() {
  const signed = useSelector((state: ApplicationState) => state.auth.signed);

  const Routes = createRouter(signed);
  return <Routes ref={navigatorRef => Navigation.setNavigator(navigatorRef)} />;
}
