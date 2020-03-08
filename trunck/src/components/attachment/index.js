import React from 'react'

export default class Attachment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div>附件</div>
            <div>{this.props.video}</div>
            <div>{this.props.Attachment}</div>
            </div>)
    }
}