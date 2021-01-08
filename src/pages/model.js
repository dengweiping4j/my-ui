import * as services from './services/services';

export default {
  namespace: 'user',

  state: {
    data: [],
  },

  effects: {
    * login({ payload, callback }, { call }) {
      const result = yield call(services.login, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },
  },
};