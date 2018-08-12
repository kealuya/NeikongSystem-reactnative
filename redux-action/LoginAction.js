import * as types from './ActionTypes';
import Util from '../util/Util';
import ZCZK_APIS from '../util/URL';
// 执行登录
//该方法基于thunk改造后的store.dispatch
//原本store.dispatch只能接受一个纯净action{}，现在可以接受一个action函数
let cache = {};
export const doLogin = (username,password) => {
    if (cache.username == username && cache.password == password){
        return({type: types.NOTHING});
    }else{
        cache.username = username;
        cache.password = password;
        return dispatch => {
            dispatch({type: types.LOGIN_IN_DOING});
            // Util.getRequest(ZCZK_APIS.loginRequest + '?username=' + username + '&password=' + password ,
            //     (returnData)=>{
            //         if(returnData.confirmState == 'ok'){
            //             global.storage.save({
            //                 key: 'loginState',
            //                 data: {
            //                     confirmState: returnData.confirmState,
            //                     userInformation: returnData.userInformation,
            //                     token: new Date().toLocaleString()
            //                 },
            //                 expires: null
            //             });
            //             cache = {};
            //             dispatch(loginSuccess(true,returnData.userInformation));
            //         }else{
            //             cache = {};
            //             dispatch(loginError('用户名或密码错误','warning'));
            //         }
            //
            //     },(err)=>{
            //         cache = {};
            //         dispatch(loginError('发生错误','error'));
            //     }
            // );

            setTimeout(()=>{
                cache = {};
            },1000);
            setTimeout(()=>{
                userInformation = {
                    username:'admin',
                    openId:'666'
                };
                dispatch(loginSuccess(true,userInformation));
            },500);
        }
    }
}


// 登录Error
export function loginError(msg,type) {
    //其实action类里面也是返回纯净的json，
    //1，为了传参数方便，参数主要有type：状态，payload：带参
    //2，用action方法后，可以通过thunk改造action，使之可以传入action函数
    //doLogin返回了一个func，其中去网络请求确认登录信息，然后成功的话再返回action
    return {
        type: types.LOGIN_IN_ERROR,
        payload:{
            toastMsg:{
                msg:msg,
                type:type
            }
        }
    }
}

//返回初始化
export function loginInit() {
    return {
        type: types.LOGIN_IN_INIT
    }
}


// 登录完成
function loginSuccess(isSuccess,user) {
    return {
        type: types.LOGIN_IN_DONE,
        payload:{
            isSuccess: isSuccess,
            user:user
        }
    }
}


