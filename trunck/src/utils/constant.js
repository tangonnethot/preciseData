export default {
    projectName: "preciseData",  
    username: "username",
    password: "password",   
    PAGE_SIZE: 10,
    copyright:"明博教育科技股份有限公司",
    copyrightVersion:'1.5', 
    questionDifficultyLevel: {
      10: "易",
      20: "中",
      30: "难"
    },
    questionType: {
      1076: "单选题",
      1077: "多选题",
      1079: "非选择题",
      1078: "复合题",
      1080:'非选择题'//答题卡非选择题
    },
    gradeId: {
      928: "高一",
      929: "高二",
      930: "高三"
    },
    scoreStrategy:{
      0:'全选对给满分，其他情况不给分',
      1:'全选对给满分，选对但不全给一半分'
    },
    taskType:{
      0:'全部',
      1:'课程任务',
      2:'试题任务',
      3:'试卷任务',
      4:'答题卡任务',
      5:'资料任务'
    },
    taskScene:{
      0:'全部',
      1:'作业',
      2:'测试',
      3:'考试'
    },
    isDraft:{
      0:'全部',
      1:'未发布',
      2:'撤回'
    },
    remarkMethods:[
      {
        title:"教师在线阅",
        mes:"主观题由教师在线阅。学生将主观题答案拍照上传，教师线上批阅，系统记录得分情况。",
        value:1
      },
      {
        title:"学生自阅",
        mes:"主观题由学生线下阅卷。学生将答题情况拍照上传，并录入得分情况。",
        value:2
      },
      {
        title:"学生互阅",
        mes:"主观题由学生随机批阅他人。互阅时不显示被阅者，只记录阅卷者，教师可直接采用成绩，也可进行复核。",
        value:3
      },
    ],
    isAccomplish:{
      0:'未完成',
      1:'已完成',
      2:'已批阅'
    },
    taskCorrectStartegy:{
      1:'教师在线阅',
      2:'学生自阅',
      3:'学生互阅'
    },
    taskDelayStrategy:{
      1:'允许延期提交',
      2:'不允许延期提交'
    },
    taskAnswerStrategy:{
      1:'提交后可见',
      2:'指定最早时间可见'
    },
    groupData : {
      'group1':"选做分组1",
      'group2':"选做分组2",
      'group3':"选做分组3",
      'group4':"选做分组4",
      'group5':"选做分组5",
    }
  };
  