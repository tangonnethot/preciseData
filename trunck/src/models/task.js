import {
    getTaskList,
    getTaskModule,
    getCourseModuleInfo,
    getTaskDetails,
    getStudentAnswerDetails,
    manualExaminesTopic
} from '../services/task';
// import { Select } from 'antd';
export default {
    namespace: "task",
    state: {
        taskList: [],
        taskname: "",
        taskModuleInfo: {},
        // refModuleInfo: {},
        // questionModuleInfo:{
        //     questionContent:{}
        // },
        moduleContentList: {},
        // answerList: [],
        loading: false, 
        answerDetailsInfo: "",
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },

    },

    effects: {
        // *fetch({ payload }, { call, put }) {  // eslint-disable-line
        //     yield put({ type: 'save' });
        // },
        *getTaskList({ payload }, { call, put }) {
            const taskData = yield getTaskList(payload);
            yield put({
                type: "save",
                payload: {
                    taskList: taskData.data.datalist
                }
            })
        },
        *getCourseDetail({ payload }, { call, put }) {
            const taskdetail = yield getTaskModule(payload);
            yield put({
                type: "save",
                payload: {
                    taskModuleInfo: taskdetail.data,
                    loading: false
                }
            })
        },
        *getRefModuleInfo({ payload }, { call, put }) {
            const coureseinfo = yield getCourseModuleInfo(payload);
            yield put({
                type: "saveModuleInfo",
                payload: {
                    id: coureseinfo.data.id,
                    refModuleInfo: coureseinfo.data
                }
            })
        },
        *getQuestionModuleInfo({ payload }, { call, put }) {
            const coureseinfo = yield getCourseModuleInfo(payload);
            let data = coureseinfo.data;
            data.questionContent = JSON.parse(coureseinfo.data.moduleContent).courseModule;
            data.questionContent.topics = data.questionContent.practises;
            yield put({
                type: "saveModuleInfo",
                payload: {
                    id: data.id,
                    questionModuleInfo: data,
                    answerList: coureseinfo.data.taskStudentTopicList,
                }
            });
        },
        *getRefTaskDetail({ payload }, { call, put }) {
            const taskinfo = yield getTaskDetails(payload);
            yield put({
                type: "saveModuleInfo",
                payload: {
                    id: taskinfo.data.taskStudentId,
                    refModuleInfo: taskinfo.data
                }
            });
            yield put({
                type: "save",
                payload: {
                    loading: false
                }
            })
        },
        *getQuestionTaskDetail({ payload }, { call, put }) {
            const taskinfo = yield getTaskDetails(payload);
            let data = taskinfo.data;
            data.questionContent = JSON.parse(taskinfo.data.moduleContent);
            yield put({
                type: "saveModuleInfo",
                payload: {
                    id: data.taskStudentId,
                    questionModuleInfo: data,
                    answerList: taskinfo.data.taskStudentTopicList
                }
            });
            yield put({
                type: "save",
                payload: {
                    loading: false

                }
            })
        },
        *cleanTaskData({ payload }, { put }) {
            yield put({
                type: "save",
                payload: {
                    taskList: [],
                    refModuleInfo: {},
                    questionModuleInfo: {},
                    answerList: []
                }
            })
        },

        *cleanRefData({ payload }, { call, put }) {
            yield put({
                type: "save",
                payload: {
                    refModuleInfo: {}
                }
            })
        },
        *cleanCourseData({ payload }, { call, put }) {
            yield put({
                type: "save",
                payload: {
                    questionModuleInfo: {},
                    answerList: []
                }
            })
        },
        *getStudentAnswerDetails({ payload }, { call, put, select }) {
            yield put({ type: 'fetch/start' });
            let { data } = yield call(getStudentAnswerDetails, payload)
            data && (yield put({
                type: 'fetchAfter',
                payload: {
                    answerDetailsInfo: data
                },
            }))
            yield put({ type: 'fetch/end' });
        },
        //批阅任务
        *manualExaminesTopic({ payload }, { call, put, select }) {
            yield put({ type: 'fetch/start' });
            let { data } = yield call(manualExaminesTopic, payload)
            data && (yield put({
                type: 'fetchAfter'
            }))
            yield put({ type: 'fetch/end' });
        },
    },

    reducers: {
        "fetch/start"(state) {
            return { ...state, loading: true };
        },
        "fetch/end"(state) {
            return { ...state, loading: false };
        },
        fetchAfter(state, action) {
            return Object.assign({}, state, action.payload);
        },
        saveModuleInfo(state, action) {
            let newModuleInfo = state.moduleContentList;
            // let newdata=;
            newModuleInfo[action.payload.id] = { ...action.payload };
            return { ...state, ...{ moduleContentList: newModuleInfo } };
        },
        save(state, action) {
            return { ...state, ...action.payload };
        },
        updateAnswerList(state, action) {
            let newanswerList = state.moduleContentList[action.payload.moduleid].answerList;
            for (let index = 0; index < newanswerList.length; index++) {
                if (newanswerList[index].topicId == action.payload.id) {
                    newanswerList[index].answerContent = action.payload.answer;
                    break;
                }
            }
            return { ...state, ...state };
            // return { ...state, ...{ answerList: newanswerList } }
        }
    },
}