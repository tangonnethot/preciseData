import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TaskInfo from './pages/task';
import TaskDetails from './pages/task/taskDetails';
import ErrorBook from './pages/errorBook';
import LearningSituation from './pages/learningSituation';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/task" exact component={TaskInfo} />
        <Route path="/taskdetails" exact component={TaskDetails} />
        <Route path="/errorbook" exact component={ErrorBook} />
        <Route path="/learningsituation" exact component={LearningSituation} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
