import React, {PureComponent,Component} from 'react'
import './Operate.scss'
import restore from 'restores'
let id = 0;

const logger = (store) => (next) => (data) =>{
    // if(data) {
        console.group('准备打log')
        next(data)
        console.log('打log完成,整体store:',store)
        console.groupEnd()
    // }
}

restore.initState({
	list:{
		list:[]
	},
	filter:{
		value:'active'
	}
})

restore.applyMiddleware([logger])

class Operate extends Component {
	constructor(props) {
        super(props);

		this.state = {
			val:'',
		}
    }

	render() {
		return (
		<div className=''>
			我是输入的框
			<input onChange={(e)=>this.setState({val:e.target.value})} value={this.state.val} type="text"/>
			<button onClick={()=>{
				// this.list.list.push({
				// 	val:this.state.val,
				// 	status:'active',
				// 	id:id
				// })
				// id++
				if(id<3) {
					this.list._update({
						list:[...this.state.list,{
							val:this.state.val,
							status:'active',
							id:id
						}]
					})
				}else{
					let l = this.state.list
					l[0].val = 'hahaha'
					this.list._update({
						list:l
					})
				}
				id++
			}}>确认</button>
		</div>)
	}
}
export default restore(Operate,['list'])
