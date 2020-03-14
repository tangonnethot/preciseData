import {
    getTaskList,
    getTaskModule,
    getCourseModuleInfo,
    getTaskDetails
} from '../services/task';
import { Select } from 'antd';
export default {
    namespace: "task",
    state: {
        taskList: [],
        taskname:"",
        taskModuleInfo:{},
        refModuleInfo:{},
        questionModuleInfo:{
            questionContent:{}
        },
        answerList:[],
        loading:true
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
            let data = coureseinfo.data;
            data.questionContent = JSON.parse(coureseinfo.data.moduleContent).courseModule;
            data.questionContent.topics = data.questionContent.practises;
            yield put({
                type:"save",
                payload:{
                    questionModuleInfo:data,
                    answerList:coureseinfo.data.taskStudentTopicList,
                }
            });
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
            let data = taskinfo.data;
            data.questionContent = JSON.parse(taskinfo.data.moduleContent)
            yield put({
                type:"save",
                payload:{
                    questionModuleInfo:data,
                    answerList:taskinfo.data.taskStudentTopicList,
                    loading:false
                }
            })
        },
        *cleanRefData({payload},{call,put}){
            yield put({
                type:"save",
                payload:{
                    refModuleInfo:{}
                }
            })
        },
        *cleanCourseData({payload},{call,put}){
            yield put({
                type:"save",
                payload:{
                    questionModuleInfo:{},
                    taskStudentTopicList:{}
                }
            })
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        updateAnswerList(state,action){
            debugger
            state.answerList=Object.assign(state.answerlist,{[action.payload.idx]:action.payload.answer})
            // return{...state,...action.payload};
        }
    },
}