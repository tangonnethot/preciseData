import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { Answer } from '../student/index'
import Style from './demo.less';
class DoDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      userAnswer:{}
    }
  }
  render(){
    const { topics } = this.props.topicModal;
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
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(DoDemo);