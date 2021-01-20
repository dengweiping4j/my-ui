import * as services from './services/services';

export default {
  namespace: 'blog',

  state: {
  },

  effects: {
    /**
     * 查询文档
     * @param payload
     * @param callback
     * @param call
     * @returns {Generator<*, void, *>}
     */
    * get({ payload, callback }, { call }) {
      const result = yield call(services.get, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },

    * query({ payload, callback }, { call }) {
      const result = yield call(services.query, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },

    * create({ payload, callback }, { call }) {
      const result = yield call(services.create, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },
  },

  reducers: {

    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

  },

};