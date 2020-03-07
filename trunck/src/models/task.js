import {
    getTaskList
}from '../services/task';
export default {
    namespace: "task",
    state: {
        taskList:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
        *getTaskList({payload},{call,put}){
            const tasklist = yield getTaskList(payload);
            yield put({
                type:"save",
                taskList:tasklist.data
            })
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
}