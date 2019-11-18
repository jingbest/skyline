import { fakePassword, getFakeCaptcha } from './service';

const Model = {
  namespace: 'userAndpassword',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakePassword, payload);
      yield put({
        type: 'resetHandle',
        payload: response,
      });
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    resetHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
