import dva from 'dva';
import './index.css';
import { createBrowserHistory as createHistory } from 'history';
// 1. Initialize
const app = dva({
    history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/learningSituation').default);
app.model(require('./models/task').default);
app.model(require('./models/topicModal').default);//题目基础组件测试数据

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
