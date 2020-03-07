import { get , post } from '../utils/request';
import { pathJoin } from '../utils/utils';
import { prefix , taskPrefix } from '../services/config';

export const getSysTime = ( params = {} ) => {
    return get(pathJoin(prefix,taskPrefix, "/task/publish/getSysTime/v1.0"));
  };

/**获取学生可见的任务列表  
 * @param studentId 学生ID
 * @param taskFinishStatus 任务是否完成；完成状态 0：未完成 1：已完成
 * @param subjectId 学科ID 全部学科id：????
 * @param startNum  第几页
 * @param pageSize 每页显示数量
*/ 
export const getTaskList=(params={})=>{
    return get(pathJoin(prefix,taskPrefix,'/task/student/queryPageList/v1.0'));
};

/**查询当前任务下所有模块列表（课程任务下调用此接口）
 * @param taskStudentId 学生任务ID
*/
export const getTaskModule=(params={})=>{
    return get(pathJoin(prefix,taskPrefix,'task/studentmodule/queryPageList/v1.0'))
}

/**学生作答页面（含保存，批阅后，未批阅）数据
 * @param taskStudentId 学生任务ID
 * @param id    模块id ？？？
 * @param moduleId  moduleId ？？？
*/
export const getTaskDetails=(params={})=>{
    return get(pathJoin(prefix,taskPrefix,'task/studentmodule/detail/v1.0'))
}

/** 提交学生作答结果
 * @param taskStudentId 学生任务ID
*/
export const submitTask=(params={})=>{
    return post(pathJoin(prefix,taskPrefix,'task/studentmodule/submit/v1.0'))
}

/** 保存学生作答结果
 * @param taskStudentId 学生任务ID
*/
export const saveTask=(params={})=>{
    return post(pathJoin(prefix,taskPrefix,'task/studentmodule/save/v1.0'))
}

/** 更改订正答案上传
 * @param taskStudentId 学生任务ID
*/
export const correctTask=(params={})=>{
    return post(pathJoin(prefix,taskPrefix,'task/studenttopic/update/v1.0'))
}