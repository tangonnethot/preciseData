import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import KnowLeadge from'../components/knowleadge';
function IndexPage() {
  return (
    <KnowLeadge changeSelKnowLedge={function(e){alert();}}></KnowLeadge>
   );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
