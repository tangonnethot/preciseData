import React from 'react'
import { Button } from 'antd'
import { connect } from "dva"
import { isNull } from '../../utils/utils'
import Attachment from '../attachment'

@connect(({ task }) => ({ task }))
export default class TaskRef extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.isCourse)
            this.getModuleInfo();
    }

    getModuleInfo = () => {
        if(!this.props.moduleID) return;
        this.props.dispatch({
            type: "task/getRefModuleInfo",
            payload: {
                taskStudentModuleId: this.props.moduleID,
            }
        })
    }

    convertContent = () => {
        if (isNull(this.props.task.refModuleInfo) || isNull(this.props.task.refModuleInfo.moduleContent)) return null;
        let content = JSON.parse(this.props.task.refModuleInfo.moduleContent);
        let ref={};
        if(this.props.isCourse){
            ref.video=content.courseModule.knowledge.knowledgeVedio;
            ref.attachment = content.courseModule.knowledge.knowledgeEnclosures;
            ref.content = content.courseModule.knowledge.knowledgeContent;
        }else{
            ref.content = content.content;
            ref.attachment= content.files;
        }
        return ref;        
    }

    render() {
        const content = this.convertContent();
        return (
            isNull(content) ? <div></div> : <div>
                <Attachment video={content.vedio} docs={content.attachment}></Attachment>
                <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
                <Button onclick={this.props.complete}>完成学习</Button>
            </div>
        )
    }
}