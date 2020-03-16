import React from 'react';
import Styles from './index.less';
import classnames from 'classnames';
import { connect } from 'dva';

class TaskStatistics extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {answerList} = this.props;
        
        const renderNumberItem=(item,index)=>{
            return(!item.answerContent?<div className={Styles.item_number} >{index+1}</div>:
            <div className={classnames(Styles.item_number,Styles.green)} >{index+1}</div>)
        }
        return(
            <div className={Styles.statistics}>
            <div className={Styles.title}>答案统计</div>
            <div>{
                answerList&& answerList.map((element,idx)=>renderNumberItem(element,idx))
            }</div>
        </div>
        )
    }
}

export default connect(({ task }) => ({ task:task }))(TaskStatistics);