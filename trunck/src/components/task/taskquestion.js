import React from 'react'

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