import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { Action } from './types';

export function* updateProfile({ payload }: Action) {
  try {
    const { name, email, ...rest } = payload.data;
    console.tron.log(rest);
    const profile = {
      name,
      email,
      ...(rest.oldPassword !== '' ? rest : {}),
    };
    console.tron.log(profile);
    const response = yield call(api.put, 'users', profile);

    Alert.alert('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Error ao atualizar perfil, confira seus dados');
    yield put(updateProfileFailure());
  }
}
export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
