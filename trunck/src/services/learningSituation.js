import { get} from '../utils/request';
import { pathJoin } from "../utils/utils";
import { prefix, studySituationPrefix } from "./config";

/**
 * 学生学情--概览(学生学科学情概览多传一个subjectId)
 * @param schoolYear    级界
 * @param subjectId     学科id（学生学情总览不传）
 * @param timeType      日期类型：0、自定义 1、day；2、week；3、month；4、term；5、year 当取值为0时，startRange 和 endRange启用
 * @param studentId     学生id
 */
export const getStudentOverView = (params={})=>{
    return get(pathJoin(prefix,studySituationPrefix,"studySituation/student/getStudentOverView/v1.0"),{...params}).then(res=>{
        return res;
    })
}

/**
 * 学生端--学生学科知识点详情
 * @param schoolYear    级界
 * @param subjectId     学科id（学生学情总览不传）
 * @param timeType      日期类型：0、自定义 1、day；2、week；3、month；4、term；5、year 当取值为0时，startRange 和 endRange启用
 * @param studentId     学生id
 * @param orgId         机构ID
 */
export const getKnowleadgeDetails =(param={})=>{
    return get(pathJoin(prefix,studySituationPrefix,"studySituation/student/getKnowledgeRateList/v1.0"),{...param}).then(res=>{
        return res;
    })
}

/**
 * 学生学情-学情总览
 * @param schoolYear    级界
 * @param timeType      日期类型：0、自定义 1、day；2、week；3、month；4、term；5、year 当取值为0时，startRange 和 endRange启用
 * @param studentId     学生id
 */
export const getStudentComprehensive=(params={})=>{
    return get(pathJoin(prefix,studySituationPrefix,"studySituation/student/getStudentComprehensive/v1.0"),{...params}).then(res=>{
        return res;
    })
}

/**
 * 学生端-学科知识图谱
 * @param schoolYear    级界
 * @param subjectId     学科id（学生学情总览不传）
 * @param timeType      日期类型：0、自定义 1、day；2、week；3、month；4、term；5、year 当取值为0时，startRange 和 endRange启用
 * @param studentId     学生id
 * @param orgId         机构ID
 */
export const getStudentKnowleageMap=(params={})=>{
    return get(pathJoin(prefix,studySituationPrefix,"studySituation/student/getTaskStatistics/v1.0"),{...params}).then(res=>{
        return res;
    })
}
