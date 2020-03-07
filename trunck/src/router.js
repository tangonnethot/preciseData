import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TaskInfo from './pages/task';
// import TaskDetails from './pages/task/taskDetails';
import {AnswerDetails,AnswerSheet,CourseDetails,Reference,Testing} from './pages/task/details';
// import AnswerDetails from './pages/task/details/answer';
import ErrorBook from './pages/errorBook';
import LearningSituation from './pages/learningSituation';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/task" exact component={TaskInfo}
        ></Route>
        <Route path="/taskanswerdetails" exact component={AnswerDetails} />
        <Route path="/taskanswersheet" exact component={AnswerSheet} />
        <Route path="/taskcourse" exact component={CourseDetails} />
        <Route path="/taskreference" exact component={Reference} />
        <Route path="/tasktesting" exact component={Testing} />
        {/* <Route path="/taskdetails" exact component={TaskDetails} /> */}
        <Route path="/errorbook" exact component={ErrorBook} />
        <Route path="/learningsituation" exact component={LearningSituation} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
