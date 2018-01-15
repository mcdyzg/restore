// import React,{PureComponent} from 'react'
import StoreFunc from './StoreFunc'


// export default (WrapComponent,name) => {
//     return class Hoc extends PureComponent {
//         constructor(props){
//             super(props)
//
//             // 生命周期控制(以componentDidMount为例) 方法一：直接修改子类的原型方法
//             // let cdm = WrapComponent.prototype.componentDidMount
//             // WrapComponent.prototype.componentDidMount = function(){
//             //     cdm()
//             // }
//         }
//
//         // 方法二：父类增加componentDidMount方法，其实是子类先执行，父类后执行
//         componentDidMount(){
//             console.log('父类执行了')
//         }
//
//         render(){
//             return <WrapComponent {...this.props} />
//         }
//     }
// }



function StoreClass(WrapComponent,name){
    // 方法三：使用反向继承，返回一个WrapComponent的子类，然后在子类的componentDidMount里调用父类的componentDidMount
    return class Hoc extends WrapComponent {
        constructor(props){
            super(props)
        }

        componentDidMount(){
            // this.list = StoreFunc._regist(this,'list')
    		// this.filter = StoreFunc._regist(this,'filter')

            if(typeof name === 'string') {
                this[name] = StoreFunc._regist(this,name)
            }else if(Object.prototype.toString.call(name) === "[object Array]") {
                for(let i of name) {
                    this[i] = StoreFunc._regist(this,i)
                }
            }

            super.componentDidMount && super.componentDidMount()
        }

        // 可写可不写，如果写了，应该是return super.render()，如果不写，直接render方法就是父类的render
        // render(){
        //     return <WrapComponent {...this.props} />
        // }
    }
}





// 接收中间件
StoreClass.applyMiddleware = function(middlewares){
    if(middlewares && middlewares.length !== 0) {
        StoreFunc.applyMiddleware(middlewares)
    }
}


// 初始化全局state
StoreClass.initState = function(state){
    StoreFunc.initState(state)
}

export default StoreClass
