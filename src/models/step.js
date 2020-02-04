const Model = {
  namespace: 'modalAndStepForm',
  state: {
    current: 0,
    step: {},
  },
  effects: {
    *updateStepFormData({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    initStepFormData(state, { payload }) {
      return { ...state, step: payload }
    },
  },
};
export default Model;
