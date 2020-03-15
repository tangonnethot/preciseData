import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { 
  format,

  // HeaderChoice,
  // DoHeaderChoice,
  // HeaderMultiChoice,
  // DoHeaderMultiChoice,
  // HeaderQuestion,
  // DoHeaderQuestion
} from './index';
import { Answer , Result } from './student/index'
import Style from './demo.less';
class Demo extends Component{
  constructor(props){
    super(props);
    this.state={
      userAnswer:{}
    }
  }
  render(){
    // const { userAnswer } = this.state;
    const { topics , cTopics , sTopics } = this.props.topicModal;
    const userAnswer = [
      {
        answer:'D',
        score:10
      },
      {
        answer:'AC',
        score:5
      },
      {
        answer:'',
        score:0
      },
      {
        answer:'img/bd_logo1.png,static/index/plus/plus_logo_web.png',
        score:15
      },
      [
        {
          answer:'img/bd_logo1.png',
          score:10
        },
        {
          answer:'D',
          score:0
        }
      ],
    ]
    return <Fragment>
      
      {
        topics && topics.map( (item,index) => {

          let answer=[],score=[];
          if(item.type!="1078"){
              answer.push(userAnswer[index].answer);
              score.push(userAnswer[index].score);
          }else{
            userAnswer[index].map(item=>{
              answer.push( item.answer );
              score.push( item.score );
            })
          }

          return <div className={Style.questionItem} key={index}>
            <Result 
              question={item}
              userAnswer={answer.join(";")}
              userScore={score.join(";")}
            />
          </div>
        })
      }
      {
        topics && topics.map( (item,index) => {
          return <div className={Style.questionItem} key={index}>
            <Answer 
              question={item}
              optionClick={(ans,id)=>{
                this.setState({
                  userAnswer:Object.assign({},userAnswer,{[id]:ans})
                },()=>{
                  console.log(this.state.userAnswer)
                })
              }}
              userAnswer={userAnswer[item.id]?userAnswer[item.id]:''}
            />
          </div>
        })
      }
      {/* {
        sTopics && sTopics.map( (item,index) => {
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
            {
              (item.type == 1079 || item.type == 1080) && <HeaderQuestion 
                                    question={format.formatQuestion1(item)}
                                    questionIndex={item.topicNo}
                                    />
            }
          </div>
        })
      } */}
      {/* {
        cTopics && cTopics.map( (item,index) => {
          return <div className={Style.questionItem} key={index}>
            {
              item.topic.type == 1076 && <HeaderChoice 
                                    question={format.formatQuestion1(item.topic)}
                                    questionIndex={item.topic.topicNo}
                                    />
            }
            {
              item.topic.type == 1077 && <HeaderMultiChoice 
                                    question={format.formatQuestion1(item.topic)}
                                    questionIndex={item.topic.topicNo}
                                    />
            }
            {
              (item.topic.type == 1079 || item.topic.type == 1080) && <HeaderQuestion 
                                    question={format.formatQuestion1(item.topic)}
                                    questionIndex={item.topic.topicNo}
                                    />
            }
          </div>
        })
      } */}
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(Demo);