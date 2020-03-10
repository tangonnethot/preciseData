import {
    getTaskList,
    getTaskModule,
    getCourseModuleInfo,
    getTaskDetails

} from '../services/task';
export default {
    namespace: "task",
    state: {
        taskList: [],
        taskname:"",
        taskModuleInfo:{},
        refModuleInfo:{},
        questionModuleInfo:{},
        loading:true
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
                    taskModuleInfo:taskdetail.data,
                    loading:false
                }
            })
        },
        *getRefModuleInfo({payload},{call,put}){
            const coureseinfo = yield getCourseModuleInfo(payload);
            yield put({
                type:"save",
                payload:{
                    refModuleInfo:coureseinfo.data
                }
            })
        },
        *getQuestionModuleInfo({payload},{call,put}){
            const coureseinfo = yield getCourseModuleInfo(payload);
            yield put({
                type:"save",
                payload:{
                    questionModuleInfo:coureseinfo.data
                }
            })
        },
        *getRefTaskDetail({payload},{call,put}){
            const taskinfo = yield getTaskDetails(payload);
            yield put({
                type:"save",
                payload:{
                    refModuleInfo:taskinfo.data,
                    loading:false
                }
            })
        },
        *getQuestionTaskDetail({payload},{call,put}){
            const taskinfo = yield getTaskDetails(payload);
            yield put({
                type:"save",
                payload:{
                    questionModuleInfo:taskinfo.data,
                    loading:false
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