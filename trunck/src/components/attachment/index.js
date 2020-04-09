import React from 'react'
import Styles from './index.less'
import {getFileExtName,isNull} from '../../utils/utils'
import {previewFile,playVideo,playAudio} from "../../utils/andriod"
export default class Attachment extends React.Component {
    constructor(props) {
        super(props);
    }
    onPreview=(id,type,url,name)=>{
        console.log(id);

        if(type=="video"){
            playVideo(name,id);
        }
        if(getFileExtName(name)=="mp3"){
            playAudio(url,name);
        }else{
            previewFile(url);
        }           
    }

    getImgbyType=(type,name)=>{
        if(type=="video"){
            return require("../../assets/video.png");
        }
        if(getFileExtName(name)=="mp3")
            return require("../../assets/audio.png");
        return require("../../assets/word.png");
    }

    render() {
        let docs = this.props.docs;
        if(isNull(docs)) return(<div/>);
        if(typeof this.props.docs == "string"){
            docs = JSON.parse(this.props.docs);
        }
        const renderAttachment=(element)=>{
            console.log(element);
            let name = element.enclosureName || element.name;
            return(<div key={element.url} className={Styles.attachmentItem} onClick={this.onPreview.bind(this,element.id,element.type,element.url,name)}>
                        <div><img src={this.getImgbyType(element.type,name)}></img></div>
                        <div>{name}</div>
                    </div>)
        }
        const renderVideo=(element)=>{
            element = JSON.parse(element);
            element = element&&element[0];
            return(element&&<div key={element.id} className={Styles.attachmentItem} onClick={this.onPreview.bind(this,element.id,'video',"",element.name)}>
                <div><img src={this.getImgbyType("video",element.name)}></img></div>
                <div>{element.name}</div>
            </div>)
        }
        return (<div className ={Styles.container}>
            <div className={Styles.title}>附件：</div>
            <div>
                {!isNull(this.props.video)&&renderVideo(this.props.video)}
                {docs.map(element=>renderAttachment(element))}</div>
            </div>)
    }
}