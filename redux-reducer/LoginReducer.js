import * as types from '../redux-action/ActionTypes';

// 初始状态
const initialState = {
    status: types.LOGIN_IN_INIT, // init,doing,done
    isSuccess: false,
    user:null,
    toastMsg:null
};
/*
reducer是用来处理store.dispatch发送出来的action的处理类
首先判断action的type（唯一状态表示，因为所有的reducer会被combineReducers合并成一个）
然后返回相应的状态，因为action是带参过来的，所以这边接收后，存入store
...符号是解构操作符，用来把对象装换成'a,b,c,'这样的对象
拼接对象的方法还有一种，调用Object.assign，创造一个新的{}融入
case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
      三个参数，{}：新对象，希望把后面参数的内容copy进来。
      state：整体的state对象，先拷贝进新对象
      最后：【visibilityFilter】这个对象可能在state中有，如果直接修改，就会变成浅拷贝，
      所以要把【想要修改的对象的相同结构的对象传进去，其中想修改的值修改掉】

      一般还是...state好用
      return完成后，store就被更新了，每一个connect（select）的组件都会接受到这个state的变化
      🐷：必须得是这个Reducer下的state才会接受，如果reducer不同，即使state相同也不行
 */
export default function loginIn(state = initialState , action) {

    switch (action.type) {
        case types.LOGIN_IN_INIT: // 初始状态
            return {
                ...state,
                status: types.LOGIN_IN_INIT,
                isSuccess: false,
            } ;
        case types.LOGIN_IN_DOING: // 正在登录
            return {
                ...state,
                status: types.LOGIN_IN_DOING,
            };
        case types.LOGIN_IN_DONE: // 登录完成
            return {
                ...state,
                status: types.LOGIN_IN_DONE,
                isSuccess: action.payload.isSuccess,
                user:action.payload.user,
            };
        case types.LOGIN_IN_ERROR:
            return {
                ...state,
                status: types.LOGIN_IN_ERROR,
                toastMsg: action.payload.toastMsg
            };
        default:
            return state;
    }
}
