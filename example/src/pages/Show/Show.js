import React, {PureComponent,Component} from 'react'
import './Show.scss'
import {withRouter} from 'react-router-dom'
import restore from 'restores'

class Show extends Component {
	state = {}
	constructor(props) {
        super(props);
    }

	componentDidMount(){

	}

	render() {
		return (
		<div className=''>
			<br />
			我是list
			{this.state.list &&this.state.list.map((item,index)=>{
				if(this.state.value === item.status || this.state.value === 'all') {
					return <div
						onClick={()=>{
							this.state.list[index].status = 'complete'
							let l = this.state.list
							this.list._update({
								list:l
							})
						}}
						key={index}>
				    	{item.val}
					</div>
				}
			})}
		</div>)
	}
}
export default withRouter(restore(Show,['list','filter']))
