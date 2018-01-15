import React, {PureComponent,Component} from 'react'
import {HashRouter, Route, Switch, Link,Redirect} from 'react-router-dom'
import './Home.scss'
import Operate from '../Operate'
import Show from '../Show'
import Footer from '../Footer'





class Home extends PureComponent {
	constructor(props) {
        super(props);
		this.state = {
		}
    }

	componentDidMount(){
	}

	render() {
		return (
		<HashRouter>
			<div>
				<Operate/>
				<Show />
				<Footer />
			</div>
		</HashRouter>
		)
	}
}

export default Home
