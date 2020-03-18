
// import { extend } from 'umi-request';
import { notification } from 'antd';
// import fetch from "dva/fetch"; 
import { objToSearch, message , cookie } from './utils'; 
import fetch from 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

// import constant from "@/utils/constant";
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

// export const request1 =  extend({
//   errorHandler,
//   // 默认错误处理
//   credentials: 'include', // 默认请求是否带上cookie
// }); 

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
 

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {

  return window.fetch(encodeURI(url), options)
    .then(checkStatus)
    .then(parseJSON);
}

const defaultParams = {  };

/**
 * 封装 GET 请求
 * @param {String} url
 * @param {Object} data
 */
export const get = (url, data) => {
  data = Object.assign({}, defaultParams, data);
  url =
    url.indexOf("?") >= 0
      ? url + objToSearch(data)
      : url + "?" + objToSearch(data);
  return request(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};

/**
 * 封装 POST 请求
 * @param {String} url
 * @param {Object} data
 */
export const post = (url, data, isJsonString) => { 
  data = Object.assign({}, defaultParams, data);
  if(isJsonString){
    return request(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, text/javascript, */*; q=0.01",
        'content-type': 'application/json',
        'X-XSRF-TOKEN':"8cdb3d57-22f2-4b2f-a371-9adb8e4591ff"
      },
      body: JSON.stringify(data)  
    });
  }else{
    return request(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, text/javascript, */*; q=0.01", 
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'X-XSRF-TOKEN':cookie.get('XSRF-TOKEN')
      }, 
      body: objToSearch(data)
    });
  }  
};

/**
 * 文件上传接口
 * @param {String} url
 * @param {Object} data
 */
export const upload = (url, data = {}) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append("key", data[key]);
  });
  return fetch(url, {
    method: "POST",
    body: data
  }).then(res => res.json());
};

