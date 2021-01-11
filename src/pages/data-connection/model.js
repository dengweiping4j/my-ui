import * as services from './services/services';

const namespace = 'dataConnection';

export default {
  namespace: namespace,

  state: {
    data: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
    queryBuilder: {},//查询条件
    labels: [],
    testLoading: false,
    saveLoading: false,
    visible: false,
  },

  effects: {

    * queryList({ payload }, { put, call }) {
      yield put({
        type: 'updateState',
        payload: {
          queryBuilder: payload.queryBuilder,
        },
      });
      const result = yield call(services.queryList, payload);
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            data: result,
          },
        });
      }
    },

    * testConnect({ payload, callback }, { put, call }) {
      yield put({
        type: 'updateState',
        payload: {
          testLoading: true,
        },
      });
      const result = yield call(services.testConnect, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },

    * save({ payload, callback }, { call }) {
      const result = yield call(services.save, payload);
      if (callback && typeof callback === 'function') {
        callback(result);
      }
    },

    * edit({ payload, callback }, { call }) {
      const result = yield call(services.edit, payload);
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

