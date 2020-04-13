import React from 'react';
import Style from './index.less';
import { playVideo } from '../../../../utils/andriod';
const VideoAnalysis = props => {
  const { id,name} = JSON.parse(props.question.videoAddress)[0]
  return (
    <div className={Style.analysis}>
      <div className={Style.videoAnalysis} onClick={()=>playVideo(name,id)}>
        <i className={Style.playIcon} /> 视频详解
      </div>
    </div>
  )
}
export default VideoAnalysis;