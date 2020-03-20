import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { ErrorShow } from '../student/index'
import Style from './demo.less';
class ErrorDemo extends Component{
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
    ];
    const answerScoreList = [
      [
        {
          answer:'D',
          score:10,
          time:'2019-11-20'
        }
      ],
      [
        {
          answer:'AC',
          score:5,
          time:'2019-11-20'
        }
      ],
      [
        {
          answer:'',
          score:0,
          time:'2019-11-20'
        }
      ],
      [
        {
          answer:'img/bd_logo1.png,static/index/plus/plus_logo_web.png',
          score:15,
          time:'2019-11-20'
        }
      ],
      [
        [
          {
            answer:'img/bd_logo1.png',
            score:10,
            time:'2019-11-20'
          }
        ],
        [
          {
            answer:'D',
            score:0,
            time:'2019-11-20'
          }
        ]
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
            <ErrorShow 
              question={item}
              answerScoreList={answerScoreList}
            />
          </div>
        })
      }
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(ErrorDemo);