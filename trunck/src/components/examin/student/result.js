/* eslint-disable */
import React , { Fragment } from 'react';
import PropTypes from "prop-types";

import {
  format, 
  ResultHeaderChoice,
  ResultHeaderMultiChoice,
  ResultHeaderQuestion,
  Complex
} from '../index';

class Result extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let question = format.formatQuestion2(this.props.question);
        
        const props = Object.assign({},this.props,{
          question,
          questionIndex:question.topicNo
        })
        console.log( props )
         return (
           <Fragment>
            {
              question.qtype == 1076 && <ResultHeaderChoice {...props} />
            }
            {
              question.qtype == 1077 && <ResultHeaderMultiChoice {...props} />
            }
            {
              (question.qtype == 1079 || question.qtype == 1080) && <ResultHeaderQuestion {...props} />
            }
            { question.qtype === 1078 && <Complex question={question} >
              { 
                question.topics && question.topics.length>0 && question.topics.map( (child,index) => {
                  let arrAnswer = this.props.userAnswer ? this.props.userAnswer.split(";"):[];
                  let arrScore = `${this.props.userScore}`.split(";");
                  let childProps = Object.assign({},this.props,{
                    question:child,
                    questionIndex:child.topicNo,
                    userAnswer:arrAnswer[index],
                    userScore:arrScore[index]
                  });
                  if( this.props.revisedAnswer ){
                    let arrRAnswer = this.props.revisedAnswer.split(";");
                    childProps={...childProps,
                      rAnswer:arrRAnswer[index],
                    }
                  }
                  return <Fragment key={child.id}>
                    {
                      child.qtype == 1076 && <ResultHeaderChoice {...childProps} />
                    }
                    {
                      child.qtype == 1077 && <ResultHeaderMultiChoice {...childProps} />
                    }
                    {
                      (child.qtype == 1079 || child.qtype == 1080) && <ResultHeaderQuestion {...childProps} />
                    }
                  </Fragment>
                })
              }
              </Complex> }
           </Fragment>
         )
    }
}
Result.propTypes={
  question:PropTypes.shape({
    id:PropTypes.string.isRequired,
    qtypename:PropTypes.string,
    score:PropTypes.number.isRequired,
    content:PropTypes.string,
    topicBranches:PropTypes.array,
    topicNo:PropTypes.isRequired,
    topicGroup:PropTypes.string
  }),
  userAnswer:PropTypes.string,
  userScore:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
export default Result;