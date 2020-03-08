import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { 
  format,
  HeaderChoice,
  DoHeaderChoice,
  HeaderMultiChoice,
  DoHeaderMultiChoice
} from './index';
import Style from './demo.less';
class Demo extends Component{
  constructor(props){
    super(props);
    this.state={
      userAnswers:{}
    }
  }
  render(){
    const { userAnswers } = this.state;
    const { topics , cTopics , sTopics } = this.props.topicModal;
    console.log( topics )
    return <Fragment>
      {
        topics && topics.map( (item,index) => {
          return <div className={Style.questionItem} key={index}>
            {
              item.type == 1076 && <HeaderChoice 
                                    question={format.formatQuestion1(item)}
                                    questionIndex={item.topicNo}
                                    />
            }
            {
              item.type == 1077 && <HeaderMultiChoice 
                                    question={format.formatQuestion1(item)}
                                    questionIndex={item.topicNo}
                                    />
            }
          </div>
        })
      }
      {
        topics && topics.map( (item,index) => {
          return <div className={Style.questionItem} key={index}>
            {
              item.type == 1076 && <DoHeaderChoice
                                    question={format.formatQuestion1(item)}
                                    optionClick={(ans)=>this.setState({
                                      userAnswers:Object.assign(userAnswers,{[index]:ans})
                                    })}
                                    userAnswer={userAnswers[index]?userAnswers[index]:''}
                                    questionIndex={item.topicNo}
                                    />
            }
            {
              item.type == 1077 && <DoHeaderMultiChoice 
                                    question={format.formatQuestion1(item)}
                                    optionClick={(ans)=>this.setState({
                                      userAnswers:Object.assign(userAnswers,{[index]:ans})
                                    })}
                                    userAnswer={userAnswers[index]?userAnswers[index]:''}
                                    questionIndex={item.topicNo}
                                    />
            }
          </div>
        })
      }
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(Demo);