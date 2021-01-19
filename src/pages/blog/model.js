import * as services from './services/services';

export default {
  namespace: 'blog',

  state: {
  },

  effects: {
    /**
     * 创建文档
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