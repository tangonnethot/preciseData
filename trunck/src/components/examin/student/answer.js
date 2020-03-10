/* eslint-disable */
import React , { Fragment } from 'react'

import { 
  DoHeaderChoice,
  DoHeaderMultiChoice,
  DoHeaderQuestion,
  Complex
} from '../index';

export default class Answer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { question } = this.props;
        console.log( question )
         return (
           <Fragment>
            {
              question.qtype == 1076 && <DoHeaderChoice {...this.props}  questionIndex={question.topicNo} />
            }
            {
              question.qtype == 1077 && <DoHeaderMultiChoice {...this.props} questionIndex={question.topicNo} />
            }
            {
              (question.qtype == 1079 || question.qtype == 1080) && <DoHeaderQuestion {...this.props} questionIndex={question.topicNo} />
            }
            { question.qtype === 1078 && <Complex question={question} >
              {
                question.topics && question.topics.length>0 && question.topics.map( (child,index) => {
                  return <Fragment key={child.id}>
                    {
                      child.qtype == 1076 && <DoHeaderChoice {...this.props} question={child} questionIndex={child.topicNo} />
                    }
                    {
                      child.qtype == 1077 && <DoHeaderMultiChoice {...this.props} question={child} questionIndex={child.topicNo} />
                    }
                    {
                      (child.qtype == 1079 || child.qtype == 1080) && <DoHeaderQuestion {...this.props} question={child} questionIndex={child.topicNo} />
                    }
                  </Fragment>
                })
              }
              </Complex> }
           </Fragment>
         )
    }
}