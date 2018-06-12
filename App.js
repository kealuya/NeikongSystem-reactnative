import React, { Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    AppState,
    Image,
} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './redux-store/CreatStore';
import Storage from 'react-native-storage';
import { AsyncStorage,StatusBar } from 'react-native';
import MainNavigator from './mainNavigator';
import Orientation from 'react-native-orientation';

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});
global.storage = storage;
const store = configureStore();
Orientation.lockToPortrait();
 StatusBar.setTranslucent(false);
 StatusBar.setBackgroundColor('rgba(0,0,0,1)');
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
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {

        }else if(nextAppState === 'active'){

        }
    }
}

