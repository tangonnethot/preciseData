import {
    getTaskList,
    getTaskModule,
    getCourseModuleInfo,
    getTaskDetails,
    getMarkingDetails,
    submitMarking,
    getMarkingCount
} from '../services/task';
export default {
    namespace: "task",
    state: {
        taskListLoading: true,
        taskList: [],
        taskListPageInfo: {},
        taskname: "",
        taskModuleInfo: {},
        moduleContentList: {},
        loading: false,
        answerDetailsInfo: "",
        markingCount: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },

    },

    effects: {
        *getTaskList({ payload }, { call, put }) {
            yield put({
                type: "save",
                palyload: {
                    taskListLoading: true
                }
            })
            const taskData = yield getTaskList(payload);
            yield put({
                type: "appendArray",
                payload: {
                    taskList: taskData.data.datalist
                }
            })
            let pageInfo = taskData.data.page;
            pageInfo.showMore = !(pageInfo.pageSize * pageInfo.currentPage >= pageInfo.totalCount);
            yield put({
                type: "save",
                payload: {
                    taskListPageInfo: pageInfo
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
        *getMarkingDetails({ payload }, { call, put, select }) {
            yield put({ type: 'fetch/start' });
            let { data } = yield call(getMarkingDetails, payload)
            data && (yield put({
                type: 'save',
                payload: {
                    answerDetailsInfo: data
                },
            }))
            yield put({ type: 'fetch/end' });
        },
        //批阅任务
        *submitMarking({ payload }, { call, put, select }) {
            yield put({ type: 'fetch/start' });
            let { data } = yield call(submitMarking, payload)
            data && (yield put({
                type: 'fetchAfter'
            }))
            yield put({ type: 'fetch/end' });
        },
        *getMarkingCount({ payload }, { call, put, select }) {
            yield put({ type: 'fetch/start' });
            const markingCount = yield call(getMarkingCount, payload);
            markingCount.code == 200 && (yield put({
                type: 'save',
                payload: {
                    markingCount:markingCount.data
                    // markingCount: {
                    //     unCorrectTasks:2,
                    //     unReadNotices: 1
                    // }
                }

            }))
            yield put({ type: "fetch/end" });
        }
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
        },
        appendArray(state, action) {
            let taskList = state.taskList.concat(action.payload.taskList);
            return { ...state, ...{ taskList: taskList, taskListLoading: false } };
        }
    },
}