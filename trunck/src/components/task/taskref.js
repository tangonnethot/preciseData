import React from 'react'
import {Button} from 'antd-mobile'

export default class TaskRef extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<div>
        <div>{this.props.content}</div>
        <Button onclick={this.props.complete}>完成学习</Button>
        </div>)
    }
}