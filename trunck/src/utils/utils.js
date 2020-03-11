import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { routerRedux } from "dva/router";
import { message as Message } from "antd";
// import constant from "./constant";

const toString = Object.prototype.toString;
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */


/**
 * 判断是否为null
 * @param {*} parameter
 */
export const isNull = parameter => {
  if (isUndefined(parameter)) return true;
  if (parameter === null) return true;
  if (isObject(parameter)) {
    if (Object.keys(parameter).length === 0) return true;
  }
  if (isArray(parameter)) {
    if (parameter.length === 0) return true;
  }
  return false;
};

/**
 * 判断是否为undefined
 * @param {*} parameter
 */
export const isUndefined = parameter => {
  return parameter === void 0;
};

/**
 * 判断是否为布尔值
 * @param {*} parameter
 */
export const isBoolean = parameter => {
  return (
    parameter === true ||
    parameter === false ||
    toString.call(parameter) === "[object Boolean]"
  );
};

/**
 * 判断是否为数字
 * @param {*} parameter
 */
export const isNumber = parameter => {
  return toString.call(parameter) === "[object Number]";
};

/**
 * 判断是否为字符串
 * @param {*} parameter
 */
export const isString = parameter => {
  return toString.call(parameter) === "[object String]";
};

/**
 * 判断是否为对象，不包括null
 * @param {*} parameter
 */
export const isObject = parameter => {
  const type = typeof parameter;
  return type === "function" || (type === "object" && !!parameter);
};

/**
 * 判断是否为数组
 * @param {*} parameter
 */
export const isArray = parameter => {
  return toString.call(parameter) === "[object Array]";
};

/**
 * 判断是否为日期类型
 * @param {*} parameter
 */
export const isDate = parameter => {
  return toString.call(parameter) === "[object Date]";
};

/**
 * 类型判断
 */
const type = {
  isNull,
  isUndefined,
  isBoolean,
  isNumber,
  isString,
  isObject,
  isArray
};

/**
 * 操作cookie
 */
export const cookie = {
  get: key => {
    const cookieStr = document.cookie;
    const map = new Map();
    cookieStr.split("; ").forEach(item => {
      map.set(item.split("=")[0], item.split("=")[1]);
    });
    return decodeURIComponent(map.get(key));
  },
  set: (key, value) => {
    document.cookie = key + "=" + encodeURIComponent(value);
  },
  remove: key => {
    document.cookie = key + "=0;expire=" + new Date().toUTCString();
  }
};

//生成一个32位uuid
export const getuuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23]

  var uuid = s.join("");
  return uuid;
}

//文档类型
export const fileType = (type) => {
  var arr = ['.doc', '.docx', '.ppt', '.pptx', '.pdf'];
  return arr.includes(type);
}
//音频类型
export const audioType = (type) => {
  var arr = ['.mp3'];
  return arr.includes(type);
}
//视频类型
export const videoType = (type) => {
  var arr = ['.mp4', '.avi'];
  return arr.includes(type);
}

/**
 * 拼接字符串
 * @param {String} args 要拼接的字符串，支持多个
 */
export const pathJoin = (...args) => {
  let arr = [].slice.call(args),
    len = arr.length,
    path = "";
  for (let i = 0; i < len; i++) {
    if (!arr[i]) continue;
    arr[i] = arr[i].replace(/^\//, "").replace(/\/$/, "");
    path += arr[i] + "/";
  }
  return path.slice(0, path.length - 1);
};

// 解析 location.search
export const parseSearch = () => {
  const str = decodeURIComponent(document.location.search.slice(1)),
    params = str.split("&");
  const obj = {};
  params.forEach(param => {
    const paramObj = param.split("=");
    obj[paramObj[0]] = paramObj[1];
  });
  return obj;
};

/**
 * 日期格式化
 * @param {Date|String} date 要格式化的时间，默认当前时间，日期对象或 Number 类型毫秒数
 * @param {String} fmt 格式，默认yyyy-MM-dd
 */
export const dateFormat = (date = new Date(), fmt = "yyyy-MM-dd") => {
  if (!isDate(date)) date = new Date(date);
  try {
    date.getMonth();
  } catch (e) {
    return new Error("参数错误");
  }
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};


/**
 * 判断日期与当前日期相差多少天
 * @param {String}  
 */

export const judgeTime = (data) => {
  const date = data.toString();
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const d1 = new Date(year + '/' + month + '/' + day);
  const dd = new Date();
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1;
  const d = dd.getDate();
  const d2 = new Date(y + '/' + m + '/' + d);
  const iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
  return iday;
}
/**
 * 对象转查询字符串
 * {name:'二胖', age:22} => name=二胖&age=22
 * @param {*} params
 */
export const objToSearch = params => {
  let result = "";
  for (let key in params) {
    (params[key] === 0 || params[key]) && (result += `${key}=${(params[key])}&`);
  }
  return result && result.slice(0, result.length - 1);
};

/**
 * localStorage简单封装
 */
// export const storage = {
//   setItem: (key, value) => {
//     if (!key) {
//       console.error("storage.setItem", "非法参数");
//       return false;
//     }
//     const oldStorage = JSON.parse(
//       localStorage.getItem(constant.storageKey) || "{}"
//     );
//     oldStorage[key] = value;
//     localStorage.setItem(constant.storageKey, JSON.stringify(oldStorage));
//   },
//   getItem: key => {
//     if (!key) {
//       console.error("storage.getItem", "非法参数");
//       return false;
//     }
//     const oldStorage = JSON.parse(
//       localStorage.getItem(constant.storageKey) || "{}"
//     );
//     return oldStorage[key];
//   },
//   remove: key => {
//     if (!key) {
//       console.error("storage.remove", "非法参数");
//       return false;
//     }
//     const oldStorage = JSON.parse(
//       localStorage.getItem(constant.storageKey) || "{}"
//     );
//     if (Object.keys(oldStorage).indexOf(key) >= 0) {
//       delete oldStorage[key];
//     }
//     return localStorage.setItem(
//       constant.storageKey,
//       JSON.stringify(oldStorage)
//     );
//   },
//   /**
//    * 清空localStorage
//    */
//   clear: () => {
//     localStorage.clear();
//   }
// };

// 页面跳转封装
const page = routerRedux;

const message = Message;

export const convertChar = num => {
  if (!/(^[1-9]\d*$)/.test(num)) {
    return false;
  } else {
    if (num <= 26) {
      return String.fromCharCode(64 + parseInt(num));
    }
  }
};

/**
 * 获取页面传参
 * 暂时只支持 state 方式
 */
// export const getPageParams = () => {
//   return storage.getItem(constant.pageState) || {};
// };

const translateViewReport = {
  student: "studentReport_new",
  class: "classReport_new",
  grade: "gradeReport_new"
},
  translateDownloadReport = {
    student: "8",
    class: "9",
    grade: "10"
  },
  translateExportReport = {
    grade: "2",
    class: "1"
  };

/**
 * 报告查看 URL
 * @param {string} type 类型 student-个人报告 class-班级报告 grade-年级报告
 * @param {string} id 报告ID
 */
export const reportViewUrl = (type, id) =>
  pathJoin(
    "http://youke.emingren.com",
    `report/${translateViewReport[type]}.html?&id=${id}`
  );

/**
 * 报告下载 URL
 * @param {string} type 类型 student-个人报告 class-班级报告 grade-年级报告
 * @param {string} id 报告ID
 * @param {string} name 报告名字
 */
export const reportDownloadUrl = (type, id, name) =>
  pathJoin(
    "http://115.29.220.75:8080",
    `WKPDFReport/import?type=${
    translateDownloadReport[type]
    }&key=id,system&value=${id},1&filename=${encodeURI(name)}`
  );


export const handleText = param => {
  if (!param) return param;
  param = param.replace(/<\/p>/gi, "</span>").replace(/<p>/gi, "<span>");
  // 替换图片地址
  var reg = new RegExp('src="/Public/pic/', "g");
  param = param.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
  return param;
};

export const throttle = (fn, interval = 300, ...args) => {
  let canExecute = true;
  return function () {
    if (!canExecute) return;
    canExecute = false;
    setTimeout(() => {
      fn.apply(this, args);
      canExecute = true;
    }, interval);
  };
};

/**
 * 加载文件
 * @param {*} list 
 * loadScript([{
      attrs:{ 
        src: "/lib/aliyun/aliplayer-2.2.0.min.js" 
      }
    },{
      tag:'link',
      attrs:{ 
        href: "/lib/aliyun/aliplayer-min.css"
      }
    }])
 */
export const loadFile = (list = []) => {
  list.map(item => {
    let tag = item.tag || 'script',
      target = item.target || document.getElementsByTagName('head')[0];
    let attrs = item.attrs || {};
    if (tag === 'link') {
      attrs = Object.assign({}, {
        rel: "stylesheet",
        type: "text/css"
      }, item.attrs);
    }
    let element = document.createElement(tag);
    if (attrs && typeof attrs === 'object') {
      for (let key in attrs) {
        element.setAtrribute ? element.setAtrribute(key, attrs[key]) : element[key] = attrs[key]
      }
    }
    target.append(element)
  });

}

export const convertTaskType = (type) => {
  switch (type) {
    case 1:
    case "1":
      return "课程";
    case 2:
    case "2":
      return "试题";
    case 3:
    case "3":
      return "试卷";
    case 4:
    case "4":
      return "答题卡";
    case 5:
    case "5":
      return "资料";
  }
  return "课程";
}

export const formatDate1 = (strdate)=>{
  var date = new Date(strdate);
  strdate = date.getMonth() + "-" + date.getDay();
  return strdate;
}

export const formatDate2=(strdate)=>{
  if(isNull(strdate)) return '';
  var date = new Date(strdate);
  let formateDate = date.getFullYear()+ "."+date.getMonth() + "." + date.getDay();
  let formateTime = date.getHours()+":"+date.getMinutes();
  return {date:formateDate,
          time:formateTime};
}

export const getUserID=()=>{
  // return "9d43a478532545adaabd9482d67a74da";
  return "c5d067e05f514403af8608f0c8f11b1a";
}

let begintime;

export const startTime=()=>{
    begintime = new Date();
}

export const endTime =()=>{
  let endTime = new Date();
  let timeFrame= (endTime.getTime()- begintime.getTime())/1000;
  return parseInt(timeFrame);
}