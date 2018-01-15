import React, {PureComponent,Component} from 'react'
import './Footer.scss'
import restore from 'restores'

class Footer extends Component {
	constructor(props) {
        super(props);

		this.state = {

		}
    }

	componentDidMount(){
	}

	render() {
		return (
		<div className=''>
			<br />
			我是footer
			<div onClick={()=>{
				this.filter._update({
					value:'all',
				})
			}}>
			    all
			</div>
			<div onClick={()=>{
				this.filter._update({
					value:'active',
				})
			}}>
			    active
			</div>
			<div onClick={()=>{
				this.filter._update({
					value:'complete',
				})
			}}>
			    complete
			</div>
		</div>)
	}
}
export default restore(Footer,'filter')
