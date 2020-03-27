import React from 'react';
import { Modal, Toast } from 'antd-mobile';
import Styles from './index.less';
import classnames from 'classnames';
import { Result } from '../examin/student';

const prompt = Modal.prompt;
export default class Taskmarktopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yesState: false,
      wrong: false,
      part: false,
      score: 0,
    }

  }

  bingo = (e, index, score) => {
    this.setState({
      yesState: true,
      wrong: false,
      part: false,
      score: score
    }, () => {
      this.props.actIndex(index, 1, score);
    })
  }

  wrongAnswer = (e, index, score) => {
    this.setState({
      yesState: false,
      wrong: true,
      part: false,
      score: score
    }, () => {
      this.props.actIndex(index, 2, score);
    })
  }

  part = (score, index) => {
    this.setState({
      yesState: false,
      wrong: false,
      part: true,
      score: score
    }, () => {
      this.props.actIndex(index, 1, score);
    })
  }

  render() {
    const { yesState, wrong, part, score } = this.state;
    const { item, index } = this.props;
    return (
      <div className={Styles.topicDetailli}>
        {
          item.type === 1078 ?
            <Result
              question={item.topics[0]}
              userAnswer={item.topics[0].answerContent}
              userScore={item.topics[0].examinesState === 1 ? -1 : item.topics[0].answerScore}
            />
            : <Result
              question={item}
              userAnswer={item.answerContent}
              userScore={item.examinesState === 1 ? -1 : item.answerScore}
            />
        }

        <div className={Styles.readQuestions}>
          {
            item.type === 1078 ?
              <div className={classnames(Styles.item, Styles.info)}>当前得分：{score}/{item.topics[0].score}</div>
              :
              <div className={classnames(Styles.item, Styles.info)}>当前得分：{score}/{item.score}</div>
          }
          <div className={classnames(Styles.item, yesState === false ? Styles.yes : Styles.yes1)} onClick={e => { this.bingo(e, index, item.type === 1078 ? item.topics[0].score : item.score) }}><span></span>答对了</div>
          <div className={classnames(Styles.item, wrong === false ? Styles.no : Styles.no1)} onClick={e => { this.wrongAnswer(e, index, 0) }}><span></span>答错了</div>
          <div className={classnames(Styles.item, part === false ? Styles.part : Styles.part1)}
            onClick={() => prompt('部分答对得分', '',
              [
                {
                  text: '取消',
                  onPress: value => new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 200);
                  }),
                },
                {
                  text: '确定',
                  onPress: value => new Promise((resolve, reject) => {
                    if (value < 0.5) {
                      Toast.info('分值不能小于0.5分',2);
                      return;
                    }
                    if (value >= (item.type === 1078 ? item.topics[0].score : item.score)) {
                      Toast.info('分值不能大于等于该题总分', 2);
                      return;
                    }
                    setTimeout(() => {
                      resolve();
                    }, 200); 
                    this.part(value, index);
                  }),
                },
              ], 'default', null, ['请输入分值，最小单位0.5分'])}
          ><span></span>部分对了</div>
        </div>
      </div>

    )
  }
}