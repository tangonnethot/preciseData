import {
  getKnowleadgeDetails,
  getStudentComprehensive,
  getStudentKnowleageMap
} from '../services/learningSituation';

export default {
  namespace: 'learningSituation',
  state: {
    knowleadge:[],
    subjectRate: {},
    totalStatistics:[],
    totalOverView:{
      topicCount:0,
      taskCount:0,
      userTime:0
    },
    knowleadgeList:[],
    taskStatistics:{}
  },
  reducers: {
    "fetch/start"(state) {
      return {
        ...state,
        loading: true
      };
    },
    "fetch/end"(state) {
      return {
        ...state,
        loading: false
      };
    },
    fetchAfter(state, action) {
      return Object.assign({}, state, action.payload);
    },
  }, // 用于修改数据
  effects: {
     *getComprehensive({payload},{call,put}){
      const comprehensive = yield getStudentComprehensive(payload);
      let topicCount=0,taskCount=0,userTime=0;

      comprehensive.data.totalStatistics.forEach(element => {
        topicCount += element.topicCount;
        taskCount+=element.taskNum;
        userTime+=element.taskTotalTime;
      });
      yield put({
        type:"save",
        payload:{
          totalOverView:{
            topicCount:topicCount,
            taskCount:taskCount,
            userTime:userTime
          },
          totalStatistics:comprehensive.data.totalStatistics,
          // subjectStatistics:subjectData
        }
      })
    },

    *getKnowleadgeList({payload},{call,put}){
      const knowleadgeList = yield getKnowleadgeDetails(payload);
      yield put({
        type:"save",
        payload:{
          knowleadgeList:knowleadgeList.data
        }
      })
    },

    *getKnowleadgeMap({payload},{call,put}){
      const knowleadgeMap = yield getStudentKnowleageMap(payload);
      yield put({
        type:"save",
        payload:{
          knowleadge:knowleadgeMap.data&&knowleadgeMap.data.knowledgeRateList,
          taskStatistics:knowleadgeMap.data&&knowleadgeMap.data.taskStatistics
        }
      })
    }

  },

  reducers:{
    save(state,action){
      return{...state,...action.payload};
    }
  }
};
