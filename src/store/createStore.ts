import { createStore, compose, applyMiddleware, Reducer, Action } from 'redux';
import { SagaMiddleware } from 'redux-saga';

export default (
  reducers: Reducer<any, Action<any>>,
  middlewares: SagaMiddleware<Object>[],
) => {
  const enhancer = __DEV__
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(...middlewares),
      )
    : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
