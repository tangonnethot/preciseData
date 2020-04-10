const prefix = '';
let coursePrefix,questionBankPrefix , taskPrefix , studySituationPrefix , ErrorBookPrefix,htmlPrefix;

//正式环境使用，测试环境屏蔽该行代码 
//start
 coursePrefix = questionBankPrefix = taskPrefix = studySituationPrefix = ErrorBookPrefix = 'precise-web';
//end

//测试环境使用，正式环境打包时屏蔽下面代码 
//start
// htmlPrefix = ''
// coursePrefix="courseM", 
// questionBankPrefix="questionBankM",
// taskPrefix="taskM",
// studySituationPrefix='studySituationM';
// ErrorBookPrefix="ErrorBookM";
//end 

export {
  prefix,
  coursePrefix,
  questionBankPrefix,
  taskPrefix,
  studySituationPrefix,
  ErrorBookPrefix,
}