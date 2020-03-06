import React , { Component } from 'react';
import Knowledge from "./knowledge";
import Style from './index.less';

const KnowledgeContainer = ( WrappedComponent ) =>
  class extends Component{
    render(){
      return (
        <div className={Style.KnowledgeContainer}>
          <WrappedComponent {...this.props} />
          <Knowledge {...this.props} />
        </div>
      )
    }
  }
export default KnowledgeContainer