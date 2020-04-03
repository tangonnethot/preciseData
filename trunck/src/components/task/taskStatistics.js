import React from 'react';
import Styles from './index.less';
import classnames from 'classnames';
import { connect } from 'dva';

class TaskStatistics extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { answerList } = this.props;
        const renderMarkingNum = (item, index) => {
            return (item.examinesState != 2 ? <div className={Styles.item_number} >{index + 1}</div> :
                item.isRight ?
                    <div className={classnames(Styles.item_number, Styles.green)} >{index + 1}</div> :
                    <div className={classnames(Styles.item_number, Styles.red)} >{index + 1}</div>
            )
        }
        const renderAnswerNum = (item, index) => {
            return (!item.answerContent ? <div key={item.id} className={Styles.item_number} >{index + 1}</div> :
                <div key={item.id} className={classnames(Styles.item_number, Styles.green)} >{index + 1}</div>)
        }

        return (
            <div className={Styles.statistics}>
                <div className={Styles.title}>答案统计</div>
                <div>{
                    answerList && answerList.map((element, idx) => {
                        if (this.props.showMarking) {
                            renderMarkingNum(element, idx);
                        } else {
                            renderAnswerNum(element, idx);
                        }
                    })
                }</div>
            </div>
        )
    }
}

export default connect(({ task }) => ({ task: task }))(TaskStatistics);