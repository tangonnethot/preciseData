import React , { Component , Fragment } from 'react';
import PropTypes from "prop-types";
import { Icon , Modal , Button , message , Popconfirm , Menu, Dropdown , Tooltip } from 'antd';
import Style from './index.less';
import { deleteQuestion } from '@/services/itemBank';
import Question from '@/components/curriculum/setScore/question';
import VideoPlayer from '@/components/common/videoPlayer/index';
import RelateKnowledge from '@/components/common/relateKnowledge/index';
import classNames from 'classnames'; 

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      showAtlas:false,
      questionId:"",
      knowledgeIds:[],
      showVideoAnalysis:false,
      videoAnalysis:null,
    }
  }
  reportProblem=()=>{
    alert("错题反馈")
  }
  collect=()=>{
    alert("收藏")
  }
  handleModalStatus = (key)=> {
    if( key === 'showAtlas' ){
      this.setState({
        questionId:"",
        knowledgeIds:[]
      })
    }
    if( key === 'showVideoAnalysis' ){
      this.setState({
        videoId:null
      })
    }
    this.setState({
      [key]:!this.state[key]
    })
    
  }
  delQuestion = ( id ) => {
    deleteQuestion({
      id
    }).then( res => {
      res.code===200 ? message.success('删除成功') : message.error('删除失败');
      this.props.delQuestion();
    })
  }
  render(){
    const { 
      question , 
      questionIndex , 
      reportProblem , 
      collect , 
      videoAnalysis , 
      addQuestion , 
      relateAtlas , 
      delQuestion,
      editQuestion , 
      collectStatus , 
      addQuestionStatus , 
      childQuestion 
    } = this.props;
    const { showAtlas , showVideoAnalysis } = this.state;
    const menu = (
      <Menu className={Style.menu}>
        {
          editQuestion && 
          <Menu.Item>
            <div className={Style.editQuestion} onClick={()=>{editQuestion(question.id)}}>
              <Icon type="edit" style={{"marginRight": "5px"}}/>
              编辑
            </div>
          </Menu.Item>
        } 
        {
          delQuestion &&
          <Menu.Item>
            <Popconfirm placement="top" title={"确定删除该题吗？"} onConfirm={()=>{this.delQuestion(question.id)}} okText="确定" cancelText="取消">
              <div className={Style.delQuestion}>
                <Icon type="delete" style={{"marginRight": "5px"}}/>
                删除
              </div>
            </Popconfirm>
          </Menu.Item>
        }
        {
          collect && 
          <Menu.Item>
            <div className={Style.collect} onClick={()=>this.collect()}>
              { collectStatus ? <Icon type="star" theme="filled" style={{"marginRight": "5px"}}/> : 
                <Icon type="star" style={{"marginRight": "5px"}}/> }
              收藏
            </div>
          </Menu.Item>
        }
        {
          reportProblem && 
          <Menu.Item>
            <div className={Style.reportProblem} onClick={() => this.reportProblem()}>
              <Icon type="form" style={{"marginRight": "5px"}}/>
              反馈
            </div>
          </Menu.Item>
        }
      </Menu>
    );
    return (
      <div className={childQuestion ? ( Style.header+" "+Style.childHeader ) : Style.header } >
        { childQuestion ? <div>【小题{questionIndex}】</div> : <div>第{questionIndex}题</div> }
        { question && question.qcode && <div>{'#'+question.qcode}</div> }
        <div>{question && question.qtypename}</div>
        <div>{question && question.score}分</div>
        <div>{question && question.degreeName}</div>
        <div className={Style.addLen}> 
          {
            !childQuestion && question.isTrue && question.trueTopicInfo ? <Tooltip placement="bottom" title={question.trueTopicInfo}>
            [{question.trueTopicInfo.length>10?question.trueTopicInfo.substring(0,10)+"……":question.trueTopicInfo}]
          </Tooltip> : ""
          }
          </div>
        {
          videoAnalysis && question.videoAddress && 
          <div className={Style.videoAnalysis}
            onClick={()=>{
              this.setState({
                showVideoAnalysis:!showVideoAnalysis,
                videoId:JSON.parse(question.videoAddress).length>0?JSON.parse(question.videoAddress)[0].id:""
              })
            }}>
            <Icon type="play-circle" />
            视频解析
          </div>
        }
        {
          relateAtlas && <div className={Style.relateAtlas} onClick={()=>this.setState({
              showAtlas:!showAtlas,
              questionId:question.id,
              knowledgeIds:question.knowledgeIds
            })}>
              <Icon type="link" />
              关联图谱
            </div>
        }
        {
          addQuestion && 
            <div className={Style.addQuestion} onClick={()=>{addQuestion(question.id)}}>
              { addQuestionStatus ? <Icon type="check-square" theme="filled" /> : <Icon type="border" /> }
              加入选题
            </div>
        }
        {
          !childQuestion && ( editQuestion || delQuestion || collect || reportProblem ) && <Dropdown overlay={menu}>
          <div>更多 <Icon type="down" /></div>
        </Dropdown>
        }
        <RelateKnowledge 
          showAtlas={showAtlas}
          questionId={this.state.questionId}
          knowledgeIds={this.state.knowledgeIds}
          onCancel={this.handleModalStatus}
          relateAtlas={this.props.relateAtlas}
        />
        <VideoPlayer 
          showVideoAnalysis={showVideoAnalysis}
          videoId={this.state.videoId}
          onCancel={this.handleModalStatus}
          />
      </div>
    )
  }
}
Header.propTypes = {
  question:PropTypes.shape({
    id:PropTypes.string.isRequired,
    qcode:PropTypes.number,
    qtypename:PropTypes.string.isRequired,
    score:PropTypes.number.isRequired,
    degreeName:PropTypes.string.isRequired
  }),
  questionIndex:PropTypes.number.isRequired,
  addQuestion:PropTypes.func,
  addQuestionStatus:PropTypes.bool,
  collectStatus:PropTypes.bool,
  relateAtlas:PropTypes.func,
  editQuestion:PropTypes.func,
  delQuestion:PropTypes.func,
}
export default Header;