import { get, post } from '../utils/request';
import { pathJoin } from '../utils/utils';
import { prefix, taskPrefix } from '../services/config';

export const getSysTime = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, "/task/publish/getSysTime/v1.0"), { ...params }).then(res => {
        return res;
    });
};

export const getSubjects=(params={})=>{
    return get(pathJoin(prefix,taskPrefix,"/dic/getSubject"),{...params}).then(res=>{
        return res;
    })
}

/**获取学生可见的任务列表  
 * @param studentId 学生ID
 * @param taskFinishStatus 任务是否完成；完成状态 0：未完成 1：已完成
 * @param subjectId 学科ID 全部学科id：????
 * @param startNum  第几页
 * @param pageSize 每页显示数量
*/
export const getTaskList = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, '/task/student/queryPageList/v1.0'), { ...params }).then(
        res => { return res; }
    );
};

/**查询当前任务下所有模块列表（课程任务下调用此接口）
 * @param taskStudentId 学生任务ID
*/
export const getTaskModule = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, 'task/studentmodule/queryModuleList/v1.0'), { ...params }).then(
        res => { return res; }
    );
}

/**查询当前任务下所有模块列表（课程任务下调用此接口）
 * @param taskStudentModuleId 学生任务ID
*/
export const getCourseModuleInfo = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, 'task/studentmodule/courseTaskModuleDetail/v1.0'), { ...params }).then(
        res => { return res; }
    );
}


/**学生作答页面（含保存，批阅后，未批阅）数据
 * @param taskStudentId 学生任务ID
*/
export const getTaskDetails = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, 'task/studentmodule/singleTaskModuleDetail/v1.0'), { ...params }).then(
        res => { return res; }
    );
}

/** 提交学生作答结果
 * @param taskStudentId 学生任务ID
*/
export const submitTask = (params = {}) => {
    return post(pathJoin(prefix, taskPrefix, 'task/studentmodule/submitStudentTopic/v1.0'), { ...params },true).then(
        res => { return res; }
    );
}

/** 保存学生作答结果
 * @param taskStudentId 学生任务ID
*/
export const saveTask = (params = {}) => {
    return post(pathJoin(prefix, taskPrefix, 'task/studentmodule/saveStudentTopic/v1.0'), { ...params },true).then(
        res => { return res; }
    );
}

/** 更改订正答案上传
 * @param taskStudentId 学生任务ID
*/
export const correctTask = (params = {}) => {
    return post(pathJoin(prefix, taskPrefix, 'task/studenttopic/update/v1.0'), { ...params },true).then(
        res => { return res; }
    );
}

/** 批阅/被阅任务列表
 * @param type 消息类型 0:待阅任务列表 2:被阅任务列表
*/
export const markingTaskList = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, 'task/student/getNoticeList/v1.0'), { ...params },true).then(
        res => { return res; }
    );
}


/** 批阅单个学生/成绩详情页面
 * @param studentModuleId  
 * @param type  
*/
export const getMarkingTopic = (params = {}) => {
    return get(pathJoin(prefix, taskPrefix, 'task/class/getStudentAnswerDetails/v1.0'), { ...params },true).then(
        res => { return res; }
    );
}

/**
 * 批阅任务
 * @param {*} params 
 */
export const manualExaminesTopic = ( params = {} ) => {
    return post(pathJoin(prefix,taskPrefix, "task/teacher/manualExaminesTopic/v1.0"), {
      ...params
    },true);
  };