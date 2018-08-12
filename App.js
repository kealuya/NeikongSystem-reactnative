import React, { Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    AppState,
    Image,
} from 'react-native';
import {Provider} from 'react-redux';//Provider，redux提供用来包裹整个app
import configureStore from './redux-store/CreatStore';
import Storage from 'react-native-storage';
import { AsyncStorage,StatusBar } from 'react-native';
import MainNavigator from './mainNavigator';
import Orientation from 'react-native-orientation';//判断屏幕是否横屏

//reactnative-storage插件，提供存储，其实也是借用内置浏览器的存储
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,//异步存储库
    defaultExpires: null,
    enableCache: true,
});
global.storage = storage;//global是全局变量，可以在程序的任何一个位置引用
const store = configureStore();//一般会写一个store配置方法，把中间件引入进去
Orientation.lockToPortrait();//锁定竖屏
 StatusBar.setTranslucent(false);//状态栏是否透明，沉浸式体验
 StatusBar.setBackgroundColor('rgba(0,0,0,1)');//设定背景颜色
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }

    componentDidMount() {
        //给app状态追加监听事件，当状态改变的时候执行方法
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
            //被退到了  后台
        }else if(nextAppState === 'active'){
            //被激活
        }
    }
}

