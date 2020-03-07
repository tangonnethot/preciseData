import {
    getTaskList,
    getTaskModule
} from '../services/task';
export default {
    namespace: "task",
    state: {
        taskList: [],
        taskname:"",
        moduleList:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
        *getTaskList({ payload }, { call, put }) {
            const taskData = yield getTaskList(payload);
            yield put({
                type: "save",
                payload: {
                    taskList: taskData.data.datalist
                }
            })
        },
        *getCourseDetail({payload},{call,put}){
            const taskdetail = yield getTaskModule(payload);
            yield put({
                type:"save",
                payload:{
                    moduleList:taskdetail.data.datalist
                }
            })
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
}