import React from 'react';
import { connect } from 'dva';
import {Result} from '../examin/student';
import Styles from './index.less';
import { isNull} from '../../utils/utils';

class TaskResult extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {questionContent} = this.props.task.questionModuleInfo;
        const {answerList} = this.props.task;
        let _this =this;
        const renderQuestion = (questionItem,index) => {
            let stemContent;
            if (questionItem.hasOwnProperty("topic")) {
                stemContent = questionItem.topic;
            } else {
                stemContent = questionItem;
            }
            return (<div className={Styles.ques_item}>
                     <Result 
              question={stemContent}
              optionClick={(ans,index)=>_this.changeAnswer(ans,index)}
              userAnswer={answerList[index]?answerList[index].answerContent:''}
            />              
            </div>)
        }

        return (
             isNull(questionContent) ? <div></div> : <div className={Styles.questionContainer}>
                {questionContent.topics.map((element,idx) => renderQuestion(element,idx)
                )}
            </div>
        )
    }
}

export default connect((task)=>(task))(TaskResult);