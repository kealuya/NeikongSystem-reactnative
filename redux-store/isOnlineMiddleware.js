import {
    NetInfo
} from 'react-native';

import {loginInit} from '../redux-action/LoginAction';

export default function({getState,dispatch}) {
    return (next) => (action) => {
        NetInfo.isConnected.fetch().done(function(isConnected){
            if (!isConnected){
                alert('请联网后尝试');
            }else{
                next(action);
            }
        });
    }
}
