import React from 'react'
import {connect} from "dva"

@connect(({ task }) => ({ task }))
export default class TaskQuestion extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(<div>
        <div>{this.props.content}</div>
        <button onclick={this.props.complete}>完成做答</button>
        </div>)
    }
}