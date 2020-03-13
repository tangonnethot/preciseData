import React from 'react'
import Styles from './index.less'
import {getFileExtName} from '../../utils/utils'
export default class Attachment extends React.Component {
    constructor(props) {
        super(props);
    }

    onPreview=(id,type,url)=>{
        console.log(id);
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
        if(typeof this.props.docs == "string"){
            docs = JSON.parse(this.props.docs);
        }
        const renderAttachment=(element)=>{
            debugger
            return(<div className={Styles.attachmentItem} onClick={this.onPreview.bind(this,element.id,element.type,element.url)}>
                        <div><img src={this.getImgbyType(element.type)}></img></div>
                        <div>{element.name}</div>
                    </div>)
        }
        return (<div className ={Styles.container}>
            <div className={Styles.title}>附件：</div>
            <div>{this.props.video}</div>
            <div>{docs.map(element=>renderAttachment(element))}</div>
            </div>)
    }
}