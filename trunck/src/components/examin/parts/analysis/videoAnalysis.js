import React from 'react';
import Style from './index.less';
import { playVideo } from '../../../../utils/andriod';
const VideoAnalysis = props => {
  return (
    <div className={Style.analysis}>
      <div className={Style.videoAnalysis} onClick={()=>playVideo(props.question.videoAddress)}>
        <i className={Style.playIcon} /> 视频详解
      </div>
    </div>
  )
}
export default VideoAnalysis;