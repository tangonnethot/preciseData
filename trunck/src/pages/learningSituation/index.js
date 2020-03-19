import React from 'react';
import KnowLeadge from '../../components/knowleadge';
import TopNav from '../../components/nav';
import SubjectNav from '../../components/nav/subject';
import { goHome } from '../../utils/andriod';
import {AccordionTable} from '../../components/UI';
import Styles from './index.less';
export default class learingSituation extends React.Component {
    constructor(props) {
        super(props);
    }

    back = () => {
        goHome();
    }

    changeSubject = () => {

    }

    render() {
        const renderComprehensive = () => {
            return (
                <div>
                    <div className={Styles.container}>
                        <div className={Styles.title}>学习任务情况统计</div>
                        <div>任务量</div>
                        <div>题量</div>
                        <div>学习用时</div>
                    </div>
                    <div className={Styles.container}>
                        <div className={Styles.title}>各科得分率统计</div>
                    </div>
                </div>)
        }
        const renderKnowleadge = () => {
            return (<div><KnowLeadge /></div>)
        }
        const renderKnowleadgeTable = () => {
            return (<div><AccordionTable /></div>)
        }
        return (
            <div>
                <TopNav title="学情分析" onLeftClick={this.back}></TopNav>
                <SubjectNav onChange={this.changeSubject}></SubjectNav>
                {renderComprehensive()}
                {renderKnowleadge()}
                {/* {renderKnowleadgeTable()} */}
            </div>
        )
    }
}