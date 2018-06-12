import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Icon,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {doTest,doBackInit} from './LoginAction'

class MainPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            test:true,
        };
        this.user = this.props.navigation.state.params.user;
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `欢迎:${navigation.state.params.user.name}  `,
            //header : null
            headerLeft:<Button isCustom={true}
                               title = "返回"
                               onPress={
                                    ()=>navigation.state.params.getHeaderLeft(navigation)
                               } />
        }
    };
    componentDidMount(){
        //在static中使用this方法
        this.props.navigation.setParams({ getHeaderLeft:this.getHeaderLeft })
    }
    getHeaderLeft = (navigation)=>{
        this.props.dispatch(doBackInit());
        navigation.goBack()
    }

    componentWillUnmount() {
        alert("Main  componentWillUnmount");
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if (!nextProps.user){
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <TouchableOpacity style={{backgroundColor: '#FF0000'}} onPress={this.goback}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 100, height: 80}}>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>往回跳</Text>
                    </View>
                </TouchableOpacity>
                <Text>testText：{this.state.test?1111111111:22222222222}</Text>
                <Text>欢迎你：{this.user.name}</Text>
                <TouchableOpacity style={{backgroundColor: '#FF0000'}} onPress={this.chuli}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200, height: 100}}>
                        <Text style={{color: '#FFFFFF', fontSize: 40}}>处理测试</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    chuli=()=>{
        this.setState({
            test:!this.state.test,
        });
    };
    goback=()=>{
        //global.navigation.goBack();
        this.props.dispatch(doBackInit());
        this.props.navigation.goBack();
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


function select(store)
{
    return {
        //注意：LoginReducer是combineReducer中注册的reducer的引用名
        //即使没发生action，此处也会去的state的初期后的值
        isSuccess: store.LoginReducer.isSuccess,
    }
}




export default connect(select)(MainPage);
