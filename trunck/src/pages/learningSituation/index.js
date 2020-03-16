import React from'react';
import KnowLeadge from'../../components/knowleadge';
import TopNav from '../../components/nav';
import SubjectNav from '../../components/nav/subject';
import {goHome} from '../../utils/andriod'
export default class learingSituation extends React.Component{
    constructor(props){
        super(props);
    }

    back=()=>{
        goHome();
    }

    changeSubject=()=>{

    }

    render(){
        const renderComprehensive=()=>{
            return(
                <div>
                   <div>
                       <div>学习任务情况统计</div>
                       <div>任务量</div>
                       <div>题量</div>
                       <div>学习用时</div>
                   </div>
                   <div>
                       <div>各科得分率统计</div>
                   </div>
               </div>)
        }
        return(
            <div>
                <TopNav title="学情分析" onLeftClick={this.back}></TopNav>
                   <SubjectNav onChange={this.changeSubject}></SubjectNav>
            {renderComprehensive()}
            <div><KnowLeadge/></div>
            </div>
            )
    }
}