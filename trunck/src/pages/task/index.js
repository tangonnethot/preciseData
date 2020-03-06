import React from 'react'
import { NavBar,Icon } from 'antd-mobile'

export default class taskInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavBar mode="dark" leftContent={"<"} onLeftClick={() => console.log('onLeftClick')}>提分任务</NavBar>
                <div>任务列表页</div>
            </div>
        )
    }
}