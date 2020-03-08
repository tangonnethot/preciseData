/* eslint-disable */
/**
 * 提供回调Andriod的方法
 * 根据邸永明的文档提供的方法
 * 
 */

 /** 音频播放
 * @param {string} url 音频播放地址
 * @param {string} name 音频名称,缺省为空
 * @param {string} isSeek 进度条是否允许拖动，true为可以拖动，false为不可拖动
 */
export const playAudio = (url,name,isSeek)=>{
    PlayerHelper.startAudio(url,name,isSeek);
}
/**
 * 视频播放
 * @param {string} url 视频播放地址
 */
export const playVideo=(url)=>{
    PlayerHelper.startVideo(url);
}

/**
 * 返回Andriod端的首页
 */
export const goHome=()=>{
    ASPrecise.goHome();
}

/**
 * 拍照上传?此处是否应该有上传成功的回调？？？
 */
export const takeCamera=()=>{
    ASPrecise.takeCamera();
}

/**
 * 文件上传
 * @param {string} fileName 文件名称
 */
export const upload=(fileName)=>{
    let aliUrl="";
    ASPrecise.uploadAccessory(aliUrl,fileName);
}

/**
 * 文档预览
 * @param {String} url 预览文档的路径
 */
export const previewFile=(url)=>{
    fileReview.reviewFile(url) 
}