const createState = require('./index')
const combineReducers = require('./index')

let initState = {
    count: 0
}

function counterReducer(state, action) {
    if(!state) {
        state = initState
    }
    switch ((action.type)) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 5
            }
        default:
            return state
    }
}

function infoReducer(state, action) {
    switch ((action.type)) {
        case "SET_NAME":
            return {
                ...state,
                name: action.name 
            };
        case "SET_DESCRIPTION":
            return {
                ...state,
                decription: action.decription
            };
        default:
            return state
    }
}

const combineReducers = function (reducers) {
    /* reducerKeys = ['counter', 'info']*/ 
    const reducerKeys = Object.keys(reducers)
    /*返回合并后的新的reducer函数*/ 
    return function combination(state={}, action) {
        /*生成新的state*/ 
        const nextState = {}
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key]
            /* 之前key的state*/ 
            const previousStateForKey = state[key]
            /* 执行分reducer，获取新的state*/ 
            const nextStateForKey = reducer(previousStateForKey,action)

            nextState[key] = nextStateForKey
        }
        return nextState
    }
}

const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer
})




let initState = {
    counter: {
        count:0
    },
    info: {
        name:'whxcfz',
        decription:'love you !'
    }
}

const store = createState(reducer, initState);

store.subscribe(()=> {
    let state = store.getState()
    console.log(state.count)
})

store.dispatch({
    type: 'INCREMENT'
})

store.dispatch({
    type: 'DECREMENT'
})

store.dispatch({
    count: 'abc'
})