import * as services from './services/services';

export default {
  namespace: 'redis',

  state: {
    data: [],
  },

  effects: {
    * read({ payload, callback }, { call }) {
      const result = yield call(services.read, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },
  },
};