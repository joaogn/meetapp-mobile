import AsyncStorage from '@react-native-community/async-storage';

// import storage from 'redux-persist/lib/storage';

import { Reducer, AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';

export default (reducers: Reducer<any, AnyAction>) => {
  const persistedReducer = persistReducer(
    {
      key: 'meetapp',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
