const createState = require('./index')

let initState = {
    counter : {
        count: 0
    },
    info: {
        name:'',
        description:''
    }
}

let store = createState(initState)

store.subscribe(()=> {
    // 通过获取新值，在changeState时候，通过for循环改变state的值（listener的调用）
    let state = store.getState();
    console.log(`${state.info.name}: ${state.info.description}`);
})

store.subscribe(()=> {
    let state = store.getState()
    console.log(state.counter.count)
})

store.changeState({
    ...store.getState(),
    info: {
        name:'汪小菲',
        description: "love you !"
    }
})

store.changeState({
    ...store.getState(),
    counter: {
        count:1
    }
})