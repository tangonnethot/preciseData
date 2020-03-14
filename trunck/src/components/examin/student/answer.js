/* eslint-disable */
import React , { Fragment } from 'react';
import PropTypes from "prop-types";

import {
  format, 
  DoHeaderChoice,
  DoHeaderMultiChoice,
  DoHeaderQuestion,
  Complex
} from '../index';

class Answer extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let question = format.formatQuestion1(this.props.question);
        
        const props = Object.assign({},this.props,{
          question,
          questionIndex:question.topicNo
        })
         return (
           <Fragment>
            {
              question.qtype == 1076 && <DoHeaderChoice {...props} />
            }
            {
              question.qtype == 1077 && <DoHeaderMultiChoice {...props} />
            }
            {
              (question.qtype == 1079 || question.qtype == 1080) && <DoHeaderQuestion {...props} />
            }
            { question.qtype === 1078 && <Complex question={question} >
              { 
                question.topics && question.topics.length>0 && question.topics.map( (child,index) => {
                  let arrAnswer = this.props.userAnswer.split(",");
                  const childProps = Object.assign({},this.props,{
                    question:child,
                    questionIndex:child.topicNo,
                    userAnswer:arrAnswer[index]
                  })
                  return <Fragment key={child.id}>
                    {
                      child.qtype == 1076 && <DoHeaderChoice {...childProps} />
                    }
                    {
                      child.qtype == 1077 && <DoHeaderMultiChoice {...childProps} />
                    }
                    {
                      (child.qtype == 1079 || child.qtype == 1080) && <DoHeaderQuestion {...childProps} />
                    }
                  </Fragment>
                })
              }
              </Complex> }
           </Fragment>
         )
    }
}
Answer.PropTypes={
  question:PropTypes.shape({
    id:PropTypes.string.isRequired,
    qtypename:PropTypes.string.isRequired,
    score:PropTypes.number.isRequired,
    content:PropTypes.string.isRequired,
    topicBranches:PropTypes.array.isRequired,
    topicNo:PropTypes.isRequired,
    topicGroup:PropTypes.string
  }),
  optionClick:PropTypes.func.isRequired,
  userAnswer:PropTypes.string.isRequired
}
export default Answer;