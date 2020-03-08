import React from 'react'
import { Button } from 'antd'
import { connect } from "dva"
import { isNull } from '../../utils/utils'
import Attachment from '../attachment'

@connect(({ task }) => ({ task }))
export default class TaskRef extends React.Component {
    constructor(props) {
        super(props);
        this.getModuleInfo();
    }

    getModuleInfo = () => {
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
        return content.courseModule;
    }

    render() {
        const content = this.convertContent();
        return (
            isNull(content) ? <div></div> : <div>
                <Attachment video={content.knowledge.knowledgeVedio} docs={content.knowledge.knowledgeEnclosures}></Attachment>
                <div dangerouslySetInnerHTML={{ __html: content.knowledge.knowledgeContent }}></div>
                <Button onclick={this.props.complete}>完成学习</Button>
            </div>
        )
    }
}