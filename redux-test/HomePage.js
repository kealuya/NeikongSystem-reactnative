import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {doLogin,doLoginDone} from './LoginAction'
import WebUtil from '../util/WebUtil';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.user = null;
    }

    static navigationOptions = ({navigation}) => {
        return {
            header : null
        }
    };


    componentWillUnmount() {
        alert("Home  componentWillUnmount");
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        // 登录完成，且成功登录
        if (nextProps.status === 'done' && nextProps.isSuccess) {
            //alert('跳转');
            global.navigation.navigate('MainPage',{user:this.user});
            return false;
        }

        if (nextProps.status === 'doing'  ) {
            setTimeout(()=>{
                this.user = {name:'神州浩天',age : 66};
                this.props.dispatch(doLoginDone());
            },2000);
        }
        return true;
    }
    componentDidMount(){
        global.navigation = this.props.navigation;
    }

    render() {
        let tips;
        if (this.props.status === 'init')
        {
            tips = '请点击登录';
        }
        else if (this.props.status === 'doing')
        {
            //alert(this.props.status + ':' + this.props.isSuccess + ':' + this.props.user);
            tips = '正在登录...';
        }
        else if (this.props.status === 'done' && !this.props.isSuccess)
        {
            tips = '登录失败, 请重新登录';
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Text>{tips}</Text>
                <TouchableOpacity style={{backgroundColor: '#FF0000'}} onPress={this.handleLogin.bind(this)}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200, height: 100}}>
                        <Text style={{color: '#FFFFFF', fontSize: 40}}>登录</Text>
                    </View>
                </TouchableOpacity>
                {this.getLoading()}
            </View>
        );
    }

    getLoading = ()=> {
        if (this.props.status === 'doing'){
            return WebUtil.loading;
        }else{
            return;
        }

    };

    // 执行登录
    handleLogin()
    {
        //alert(this.props.status + ':' + this.props.isSuccess + ':' + this.props.user);
        this.props.dispatch(doLogin());
    }
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
        status: store.LoginReducer.status,
        isSuccess: store.LoginReducer.isSuccess,
    }
}




export default connect(select)(HomePage);
