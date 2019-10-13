// plan
/*
 * 制定一个 state 修改计划，告诉 store，我的修改计划是什么。
 * 修改 store.changeState 方法，告诉它修改 state 的时候，按照我们的计划修改。
 * 我们来设置一个 plan 函数，接收现在的 state，和一个 action，返回经过改变后的新的 state。
 */


const createStore = function(reducer,initState) {
    let state = initState;
    let listeners = [];

    // 订阅
    function subscribe(listener) {
        listeners.push(listener);
    }

    // 改变状态
    function dispatch(action) {
        // 根据计划修改state
        state = reducer(state, action)
        // 通知
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    // 获取状态
    function getState() {
        return state;
    }
    dispatch({type: Symbol()})
    return {
        subscribe,
        dispatch,
        getState
    };
};

module.exports = {
    createStore
}
