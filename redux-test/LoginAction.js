import * as types from './ActionTypes';

// 模拟服务器返回的用户信息
// let user = {
//     'name': 'admin',
//     'age': '24'
// }

// 执行登录
//该方法基于thunk改造后的store.dispatch
//原本store.dispatch只能接受一个纯净action{}，现在可以接受一个action
export const doLogin = () => {
    return dispatch => {
        dispatch(isLogining());
    }
}

export const doLoginDone = () =>{
    return dispatch => {
        dispatch(loginSuccess(true));
    }
    ;
}




// 正在登录
function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

//返回初始化
function LoginInit() {
    return {
        type: types.LOGIN_IN_INIT
    }
}


// 登录完成
function loginSuccess(isSuccess ) {
    return {
        type: types.LOGIN_IN_DONE,
        isSuccess: isSuccess,
        //user: user
    }
}


export const doTest = (user) => {
    return dispatch => {
         dispatch(loginSuccess(false, user));
    }
}

export const doBackInit = () => {
    return dispatch => {
        dispatch(LoginInit());
    }
}
