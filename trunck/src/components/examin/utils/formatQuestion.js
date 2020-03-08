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
    "options":question.topicBranches.map( item => ({"text":item.brchContent,"isAnswer":item.isAnswer})),
    "answer":question.topicBranches.map( (item,index) => {
      if( item.isAnswer === 1 ){
        return {"text":item.brchContent,"index":index+1}
      }
    }).filter( item => item ),
    "analysis":question.analysis ? question.analysis : '',
    "qtype":question.type,
    "qtypename":question.typeName?question.typeName:"",
    "degreeName": constant.questionDifficultyLevel[question.degree]?constant.questionDifficultyLevel[question.degree]:'',
    "score":question.score,
    "videoAddress":question.videoAnalysis,
    "qcode":question.topicNum,
    "knowledgeIds": question.knowledgeIds ? question.knowledgeIds.split(",") : [],
    "knowledges": question.knowledges ? question.knowledges.split(",") : [],
    "isChoice": question.type === 1076 || question.type === 1077,
    "trueTopicInfo":question.trueTopicInfo?question.trueTopicInfo:"",
    "isTrue":question.isTrue
  };
  // if( question.type === 1076){
  //   questionInfo = Object.assign(questionInfo,{
  //     answerText:'B',
  //     score:5,
  //     isRight:true
  //   });
  // }
  // if( question.type === 1077){
  //   questionInfo = Object.assign(questionInfo,{
  //     answerText:'AB',
  //     score:4,
  //     isRight:false
  //   });
  // }
  // if( question.type === 1079){
  //   questionInfo = Object.assign(questionInfo,{
  //     answerText:[
  //       {
  //         url:'http://abcd3.oss.aliyuncs.com/lessonpackage/2443999/57b4477750844371bff0b2383f1e6322/1571895540403/15718955155201709412733/20191024133849_screenmp4_Pl.jpg'
  //       },
  //       {
  //         url:'http://abcd3.oss.aliyuncs.com/lessonpackage/2443999/57b4477750844371bff0b2383f1e6322/1571895540403/15718955155201709412733/20191024133849_screenmp4_Pl.jpg'
  //       },
  //       {
  //         url:'http://abcd3.oss.aliyuncs.com/lessonpackage/2443999/57b4477750844371bff0b2383f1e6322/1571895540403/15718955155201709412733/20191024133849_screenmp4_Pl.jpg'
  //       },
  //       {
  //         url:'http://abcd3.oss.aliyuncs.com/lessonpackage/2443999/57b4477750844371bff0b2383f1e6322/1571895540403/15718955155201709412733/20191024133849_screenmp4_Pl.jpg'
  //       }
  //     ],
  //     score:8,
  //     isRight:false
  //   });
  // }
  return questionInfo;
}

const formatQuestion2 = ( question ) => {
  const branchContent = JSON.parse(question.branchContent) || []
  let questionInfo = {
    "id":question.id,
    "stem":question.content?question.content:"",
    "options":branchContent.map( (item) => ({"text":item.brchContent})),
    "answer":branchContent.map( (item,index) => {
      if( item.isAnswer === 1 ){
        return {"text":item.brchContent,"index":index+1}
      }
    }).filter( item => item ),
    "analysis":question.analysis ? question.analysis : '',
    "qtype":question.type,
    "qtypename":question.typeName?question.typeName:"",
    "degreeName": constant.questionDifficultyLevel[question.degree]?constant.questionDifficultyLevel[question.degree]:'',
    "score":question.score,
    "videoAddress":question.videoAnalysis,
    "qcode":question.topicNum,
    "knowledgeIds": question.knowledgeIds ? question.knowledgeIds.split(",") : [],
    "knowledges": question.knowledges ? question.knowledges.split(",") : [],
    "isChoice": question.type === 1076 || question.type === 1077
  };
  return questionInfo;
}

export default {
  formatQuestion1,
  formatQuestion2
}
