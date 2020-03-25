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
    const { topics } = this.props.topicModal;

    const answerScoreList = [
      [
        {
          answer:'D',
          score:10,
          time:'2019-11-20'
        },
        {
          answer:'A',
          score:0,
          time:'2019-11-18'
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
          return <div className={Style.questionItem} key={index}>
            <ErrorShow 
              question={item}
              answerScoreList={answerScoreList[index]}
            />
          </div>
        })
      }
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(ErrorDemo);