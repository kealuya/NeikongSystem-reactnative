/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    TouchableOpacity,
    Alert,
    Text,
    DeviceEventEmitter,
    View
} from 'react-native';
import { NavigationActions } from 'react-navigation'
export default class TestPage2 extends Component {
    constructor(props){
        super(props);
        this.navigate = this.props.propsNavigation.navigate ;
        this.params = this.props.propsNavigation.state.params;
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
                <TouchableOpacity onPress={this.goTo.bind(this)}>
                    <Text>跳转2: </Text>
                </TouchableOpacity>
                <Button title="buttonTest"
                        onPress={this.goTo.bind(this)}
                        accessibilityLabel="See an informative alert"
                        color="#841584"
                />

            </View>
        );
    }

    goTo(){
        //this.navigate('TabDoNavigatorPage',{user:"666"});
        //DeviceEventEmitter.emit('test1',"woshipapapaap");
        const navigateAction = NavigationActions.navigate({
            routeName: 'HomePage',
            params: {},

            // navigate can have a nested navigate action that will be run inside the child router
            action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
        })
        this.props.propsNavigation.dispatch(navigateAction)



    }

    testMsg2(cc){
        Alert.alert('','tetetet2222222222222:' + cc);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
