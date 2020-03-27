import React from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import { Link } from 'dva/router'
function IndexPage() {
  return (
    <div>
      <List>
        <List.Item>
          <Link to="/task"><div>任务</div></Link>
        </List.Item>
        <List.Item>
          <Link to="/learningsituation"><div>学情</div></Link>
        </List.Item>
        <List.Item>
          <Link to="/errorbook"><div>错题本</div></Link>
        </List.Item>
        <List.Item>
          <Link to="/taskmarking"><div>批阅</div></Link>
        </List.Item>
      </List>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
