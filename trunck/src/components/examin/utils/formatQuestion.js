import constant from '../../../utils/constant'
/**
 * 把外来question结构转化为题库组件内部定义结构，即：
 * {
 * stem：string,//题干
 * options：[//题支
 *   {
 *      "text":string//题支内容
 *   }
 *   ......
 * ],
 * answer:[//正确答案
 *   {
 *      "text":string//题支内容
 *   }
 *   ......
 * ],
 * analysis:string,//解析
 * knowledges:[知识点
 *   {
 *      "text":string//知识点名称
 *   }
 *   ......
 * ],
 * qtype:number,//题型 code
 * qtypename:string,//题型名称
 * degreeName:string,//题目难度
 * score:number,//分值
 * videoAddress:string,//视频解析地址
 * qcode:string,//题目编号
 * }
 */



/**
 * 格式化题目
 * 源格式一：
 * {
 *  "id":"",
 *  "content":"",
 *  "analysis":"",
 *  "trueTopicInfo":"",
 *  "type":3,
 *  "typeName":'填空题',
 *  "degree":10,
 *  "score":5,
 *  "videoAnalysis":'',
 *  "codeNumber":'#983312',
 *  "trKnowledges":[
 *    {
 *      pointId:3254,
 *      pointName:"1.3.2交集"
 *    }
 *    ...
 *  ],
 *  "appTopicBranchs":[
 *    {
 *      "id":"fd934492f7bd484490b336245f0becb2",
 *      "topicId":"20e8317637954ac9aa5a370472c2e6b9",
 *      "brchContent":"3+4+2=9",
 *      "brchOrder":0,
 *      "isAnswer":1
 *    }
 *  ]
 * }
 * @param {*} question
 */
const  formatQuestion1 = ( question ) => {
  let questionInfo = {
    "id":question.id,
    "stem":question.content?question.content:"",
    "options":question.topicBranches && question.topicBranches.map( item => ({"text":item.brchContent,"isAnswer":item.isAnswer})),
    "qtype":question.type,
    "qtypename":question.typeName?question.typeName:constant.questionType[question.type],
    "score":question.score,
    "topicGroup":question.topicGroup?question.topicGroup:'',
    "topics":(!question.topics || question.topics.length==0)?null:question.topics.map( item => formatQuestion1(item) ),
    "topicNo":question.topicNo
  };
  return questionInfo;
}

const  formatQuestion2 = ( question ) => {
  let questionInfo = {
    "id":question.id,
    "stem":question.content?question.content:"",
    "options":question.topicBranches && question.topicBranches.map( item => ({"text":item.brchContent,"isAnswer":item.isAnswer})),
    "qtype":question.type,
    "qtypename":question.typeName?question.typeName:constant.questionType[question.type],
    "score":question.score,
    "topicGroup":question.topicGroup?question.topicGroup:'',
    "topics":(!question.topics || question.topics.length==0)?null:question.topics.map( item => formatQuestion2(item) ),
    "topicNo":question.topicNo,
    "degree":question.degree,
    "videoAddress":question.videoAnalysis,
    "isChoice":question.type==1076||question.type==1077,
    "analysis":question.analysis
  };
  return questionInfo;
}

const  formatQuestion22 = ( question ) => {
  let questionInfo = {
    "id":question.id,
    "stem":question.content?question.content:"",
    "options":question.topicBranches && question.topicBranches.map( item => ({"text":item.brchContent,"isAnswer":item.isAnswer})),
    "answer":question.topicBranches && question.topicBranches.map( (item,index) => {
      if( item.isAnswer === 1 ){
        return {"text":item.brchContent,"index":index+1}
      }
    }).filter( item => item ),
    "analysis":question.analysis ? question.analysis : '',
    "qtype":question.type,
    "qtypename":question.typeName?question.typeName:constant.questionType[question.type],
    "degreeName": constant.questionDifficultyLevel[question.degree]?constant.questionDifficultyLevel[question.degree]:'',
    "score":question.score,
    "videoAddress":question.videoAnalysis,
    "qcode":question.topicNum,
    "knowledgeIds": question.knowledgeIds ? question.knowledgeIds.split(",") : [],
    "knowledges": question.knowledges ? question.knowledges.split(",") : [],
    "isChoice": question.type === 1076 || question.type === 1077,
    "trueTopicInfo":question.trueTopicInfo?question.trueTopicInfo:"",
    "isTrue":question.isTrue,
    "topicGroup":question.topicGroup?question.topicGroup:'',
    "topics":(!question.topics || question.topics.length==0)?null:question.topics.map( item => formatQuestion1(item) ),
    "topicNo":question.topicNo
  };
  return questionInfo;
}


export default {
  formatQuestion1,
  formatQuestion2
}
