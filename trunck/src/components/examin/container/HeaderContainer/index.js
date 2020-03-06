import React , { Component } from 'react';
import Style from './index.less';
import Header from './header.js';
const HeaderContainer = ( WrappedComponent ) =>
  class extends Component{
    render(){
      return (
        <div className={Style.HeaderContainer}>
          <Header {...this.props} />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
export default HeaderContainer