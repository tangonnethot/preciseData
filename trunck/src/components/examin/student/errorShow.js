/* eslint-disable */
import React , { Fragment } from 'react';
import PropTypes from "prop-types";

import {
  format, 
  ErrorHeaderChoice,
  ErrorHeaderMultiChoice,
  ErrorHeaderQuestion,
  Complex
} from '../index';

class ErrorShow extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let question = format.formatQuestion2(this.props.question);
        
        const props = Object.assign({},this.props,{
          question,
          questionIndex:question.topicNo
        })
         return (
           <Fragment>
            {
              question.qtype == 1076 && <ErrorHeaderChoice {...props} />
            }
            {
              question.qtype == 1077 && <ErrorHeaderMultiChoice {...props} />
            }
            {
              (question.qtype == 1079 || question.qtype == 1080) && <ErrorHeaderQuestion {...props} />
            }
            { question.qtype === 1078 && <Complex question={question} >
              { 
                question.topics && question.topics.length>0 && question.topics.map( (child,index) => {
                  let arrAnswer = this.props.userAnswer.split(";");
                  let arrScore = this.props.userScore.split(";");
                  const childProps = Object.assign({},this.props,{
                    question:child,
                    questionIndex:child.topicNo,
                    userAnswer:arrAnswer[index],
                    userScore:arrScore[index]
                  })
                  return <Fragment key={child.id}>
                    {
                      child.qtype == 1076 && <ErrorHeaderChoice {...childProps} />
                    }
                    {
                      child.qtype == 1077 && <ErrorHeaderMultiChoice {...childProps} />
                    }
                    {
                      (child.qtype == 1079 || child.qtype == 1080) && <ErrorHeaderQuestion {...childProps} />
                    }
                  </Fragment>
                })
              }
              </Complex> }
           </Fragment>
         )
    }
}
ErrorShow.propTypes={
  question:PropTypes.shape({
    id:PropTypes.string.isRequired,
    qtypename:PropTypes.string,
    score:PropTypes.number.isRequired,
    content:PropTypes.string.isRequired,
    topicBranches:PropTypes.array,
    topicNo:PropTypes.isRequired,
    topicGroup:PropTypes.string
  }),
  userAnswer:PropTypes.string,
  userScore:PropTypes.string
}
export default ErrorShow;