import React from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ApproveSubmit from './views/ApproveSubmit';
import NeikongStructure from './views/NeikongStructure';
import VersionControl from './views/VersionControl';
import LoginPage from './views/LoginPage';
import ApproveList from './views/approveList';
import DetailItemWithDrawer from './views/DetailItemWithDrawer';
const listIcon = require('./pic/listIcon.png');
const approveIcon = require('./pic/approveIcon.png');
const buildIcon = require('./pic/buildIcon.png');
const systemIcon = require('./pic/systemIcon.png');
const TabDoNavigator = TabNavigator({
    Main: {
        screen: ApproveList,
        navigationOptions: {
            tabBarLabel: '审批一览',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={listIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        }
    },
    ApproveSubmit: {
        screen: ApproveSubmit,
        navigationOptions: {
            tabBarLabel: '业务申请',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={approveIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        }
    },
    NeikongStructure: {
        screen: NeikongStructure,
        navigationOptions: {
            tabBarLabel: '内控建设',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={buildIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        }
    },
    VersionControl: {
        screen: VersionControl,
        navigationOptions: {
            tabBarLabel: '系统',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={systemIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        }
    },
}, {
    tabBarOptions: {
        lazy:true,
        activeTintColor: 'white',
        labelStyle: {
            fontSize: 12,
            fontWeight:'bold',
        },
        style: {
            backgroundColor: '#1DBAF1',
            height:60,
        },
        iconStyle:{
            width: 35,
            height: 35,
            margin:-5,
        },
        showIcon:true,
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    activeBackgroundColor:'white',
    tabBarPosition:'bottom',
    swipeEnabled:true,
});

export default  StackDoNavigator = StackNavigator({
    //RouteConfigs
    HomePage: {
        screen: LoginPage,
        navigationOptions: {
            header:null,
        }
    },
    TabDoNavigatorPage: {
        screen: TabDoNavigator,
        navigationOptions: {
            header:null,
        }
    },
    DetailItem:{
        screen:DetailItemWithDrawer,
        navigationOptions: {
        }
    }
}, {
    //StackNavigatorConfig
    headerMode:'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal, })
});
const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35,
        resizeMode:'stretch',//stretch,cover,contain,center
    },
});

