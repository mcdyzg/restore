let _store = {}
import compose from './compose'



Object.defineProperty(_store,'_regist',{
    value:function(component,name,params){
        if(typeof _store[name] === 'undefined') {
            _store[name] = {}
            Object.defineProperty(_store[name],'_listeners',{
                value:[component]
            })
            Object.defineProperty(_store[name],'_update',{
                // configurable:false,
                // enumerable:true,
                writable:true,
                value:function _update(obj){
                    let currentInitState = _store._initState && _store._initState[name]
                    // if(obj) {
                        console.log('正在执行update',obj,_store[name]._listeners.length)
                        _store[name] = Object.assign(_store[name],currentInitState,obj)
                    // }else{
                    //
                    // }
                    for(let c of _store[name]._listeners) {
                        c.setState(_store[name])
                    }
                }
            })

            // 将中间件注入
            let middlewares = _store._middlewares || []
            let chain = middlewares.map(function (middleware) {
              return middleware(_store);
            });
            _store[name]._update = compose.apply(undefined, chain)(_store[name]._update);
        }else{
            if(_store[name]._listeners.indexOf(component) === -1) {
                _store[name]._listeners.push(component)
            }
        }

        // 每个注册组件都要走一遍setState
        _store[name]._update(params)
        return _store[name]
    }
})





// 将中间件放到_store的middlewares属性上
Object.defineProperty(_store,'applyMiddleware',{
    value:function(middlewares){
        Object.defineProperty(_store,'_middlewares',{
            value:middlewares
        })
    }
})


// 初始化全局state
Object.defineProperty(_store,'initState',{
    value:function(state){
        Object.defineProperty(_store,'_initState',{
            value:state
        })
    }
})

export default _store
