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
 /** 关闭音频播放
 */
export const releaseAudio = ()=>{
     window.PlayerHelper && PlayerHelper.releaseAudio();
}
/**
 * 视频播放
 * @param {string} name 视频名称
 * @param {string} id 视频OSS id
 */
export const playVideo=(name,id)=>{
    PlayerHelper.startVideo(name,id);
}

/**
 * 返回Andriod端的首页
 */
export const goHome=()=>{
    PlayerHelper.goHome();
}

/**
 * 拍照上传?此处是否应该有上传成功的回调？？？
 */
export const takeCamera=(qid)=>{

    window.ASPrecise && ASPrecise.takeCamera(qid);
}

/**
 * 文件上传
 * @param {string} fileName 文件名称
 */
export const upload=(qid,fileName)=>{
    let aliUrl="";
    ASPrecise.uploadAccessory(qid,aliUrl,fileName);
}

/**
 * 文档预览
 * @param {String} url 预览文档的路径
 */
export const previewFile=(url)=>{
    PlayerHelper.reviewFile(url) 
}


// let _arrLoading={};

window._arrCB={};
export const registerCB=(id,cb)=>{
    window._arrCB[id]=cb;
};
window.receiveAndroidUrl=(flag,filename,path,id)=>{
    if(!window._arrCB.hasOwnProperty(id)) return;
    if(typeof window._arrCB[id] == "function"){
        window._arrCB[id](flag,id,path);            
    }
    delete window._arrCB[id];
};
