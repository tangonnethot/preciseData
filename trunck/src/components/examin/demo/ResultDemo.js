import React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { Result } from '../student/index'
import Style from './demo.less';
class ResultDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      userAnswer:{
        '042fb56ea858491d8fd670d7862f9fc2':'img/bd_logo1.png,img/baidu_resultlogo@2.png,img/baidu_jgylogo3.gif',
        '01e4553a6db84229b962c1b3a6af0d44':''
      },
      revisedAnswer:{
        '042fb56ea858491d8fd670d7862f9fc2':'img/bd_logo1.png,img/baidu_resultlogo@2.png,img/baidu_jgylogo3.gif',
        '01e4553a6db84229b962c1b3a6af0d44':''
      },
      userScore:{
        '042fb56ea858491d8fd670d7862f9fc2':0,
        '01e4553a6db84229b962c1b3a6af0d44':15
      }
    }
  }
  render(){
    const { topics } = this.props.topicModal;
    const { userAnswer , revisedAnswer , userScore } = this.state
    return <Fragment>
      {
        topics && topics.map( (item,index) => {

          let answer='',ranswer='',score=-1;
          if(item.type!="1078"){
              answer=userAnswer[item.id]||'';
              ranswer=revisedAnswer[item.id]||'';
              score=userScore[item.id]||-1;
          }else{
              let childCount =item.topics.length;
              if( childCount>0 ){
                  answer = userAnswer[item.topics[0].id]||'';
                  ranswer = revisedAnswer[item.topics[0].id]||'';
                  score = userScore[item.topics[0].id]||-1;
                  for(let j=1;j<childCount;j++){
                    answer = `${answer};${userAnswer[item.topics[0].id]||''}`;
                    ranswer = `${ranswer};${revisedAnswer[item.topics[0].id]||''}`;
                    score = `${score};${userScore[item.topics[0].id]||-1}`;
                  }
              }
              
          }

          return <div className={Style.questionItem} key={index}>
            <Result 
              question={item}
              userAnswer={answer}
              revisedAnswer={ranswer}
              userScore={score}
              optionClick={(ans,id)=>{
                this.setState({
                  revisedAnswer:Object.assign({},revisedAnswer,{[id]:ans})
                },()=>{
                  console.log(this.state.revisedAnswer)
                })
              }}
            />
          </div>
        })
      }
    </Fragment>
  }
}
export default connect(({topicModal})=> ({topicModal}))(ResultDemo);