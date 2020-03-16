import React from 'react';
import { connect } from 'dva';
import {Link } from 'dva/router'
function IndexPage() {
  return (
    <div>
      <div><Link to="/task">任务</Link></div>
      <div><Link to="/learningsituation">学情</Link></div>
      <div><Link to="/errorbook">错题本</Link></div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
