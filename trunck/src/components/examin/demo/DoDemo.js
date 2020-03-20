import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { Answer } from '../student/index'
import Style from './demo.less';
class DoDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      userAnswer:{
        '042fb56ea858491d8fd670d7862f9fc2':'img/bd_logo1.png,img/baidu_resultlogo@2.png,img/baidu_jgylogo3.gif'
      }
    }
  }
  render(){
    const { topics } = this.props.topicModal;
    const { userAnswer } = this.state;
    return <Fragment>
      {
        topics && topics.map( (item,index) => {
          let answer = '';
          if(item.type!="1078"){
              answer=userAnswer[item.id]||'';
          }else{
              let childCount =item.topics.length;
              if( childCount>0 ){
                  answer = userAnswer[item.topics[0].id]||'';
                  for(let j=1;j<childCount;j++){
                    answer = `${answer};${userAnswer[item.topics[0].id]||''}`;
                  }
              }
              
          }
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
              userAnswer={answer}
            />
          </div>
        })
      }
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(DoDemo);