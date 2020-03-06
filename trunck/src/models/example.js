
export default {

  namespace: 'example',

  state: {
    selKnowleadge: {
      "knowledgeId": "28afd24931c711ea8bef000c29aefb8e",
      "gradeScoreRate": 0.736268,
      "avgTopNum": 50.0000,
      "name": "语文思维方法",
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
