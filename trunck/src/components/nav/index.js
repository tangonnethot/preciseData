import React from 'react'
import Styles from './index.less'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }
    onBack=()=>{
        if(typeof this.props.onLeftClick == "function"){
            this.props.onLeftClick();
        }else{
            window.history.back();
        }
        
    }
    render() {
        return (
        <div className={Styles.navbar}>
        <span onClick={this.onBack} className={Styles.backimg}><img src={require("../../assets/back.png")}/></span>
        <span className={Styles.title}>{this.props.title.length < 20 ? this.props.title :this.props.title.substring(0,20)+'...'}</span>
        </div>)
    }
}