import React from 'react'
import Styles from './index.less'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className={Styles.navbar}>
        <span onClick={this.props.onLeftClick}></span>
        <span>{this.props.title}</span>
        </div>)
    }
}