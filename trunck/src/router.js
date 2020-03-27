import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TaskInfo from './pages/task';
// import TaskDetails from './pages/task/taskDetails';
import Taskmarking from './pages/task/taskmarking';
import TaskmarkingDetail from './pages/task/taskmarkingDetail';
import Taskbeimarking from './pages/task/taskbeimarking';

import {AnswerResult,AnswerSheet,CourseDetails,Reference,Testing} from './pages/task/details';
// import AnswerDetails from './pages/task/details/answer';
import ErrorBook from './pages/errorBook';
import LearningSituation from './pages/learningSituation';
import {
  DoDemo,
  ResultDemo,
  ErrorDemo
} from './components/examin/demo/index';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/task" exact component={TaskInfo} ></Route>
        <Route path="/taskresult" exact component={AnswerResult} />
        <Route path="/taskanswersheet" exact component={AnswerSheet} />
        <Route path="/taskcourse" exact component={CourseDetails} />
        <Route path="/taskreference" exact component={Reference} />
        <Route path="/tasktesting" exact component={Testing} />
        {/* <Route path="/taskdetails" exact component={TaskDetails} /> */}
        <Route path="/taskmarking" exact component={Taskmarking} />
        <Route path="/taskmarkingDetail" exact component={TaskmarkingDetail} />
        <Route path="/taskbeimarking" exact component={Taskbeimarking} /> 
        <Route path="/errorbook" exact component={ErrorBook} />
        <Route path="/learningsituation" exact component={LearningSituation} />
        <Route path="/dodemo" exact component={DoDemo} />
        <Route path="/resultDemo" exact component={ResultDemo} />
        <Route path="/errorDemo" exact component={ErrorDemo} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
