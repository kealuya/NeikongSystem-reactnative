import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


import HomePage from './HomePage';

import MainPage from './MainPage';


export default  StackDoNavigator = StackNavigator({
    //RouteConfigs
    HomePage: {
        screen: HomePage,
        navigationOptions: {
           // headerStyle:{height:0},
        }
    },
    MainPage: {
        screen: MainPage,
        // navigationOptions: {
        //     headerStyle:{height:0},
        // }
    },
    // TabDoNavigatorPage: {
    //     screen: TabDoNavigator,
    //     navigationOptions: {
    //        // headerStyle:{height:0},
    //     }
    // },
}, {
    //StackNavigatorConfig
    headerMode:'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal, })
});


