import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Animated,
    Easing,
    DeviceEventEmitter,
    Dimensions,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {doLogin} from '../redux-action/LoginAction'
import * as types from '../redux-action/ActionTypes';
import Util from '../util/Util';

class LoginWindow extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            disFlg:false
        };
        this.navigate = this.props.propNavigation.navigate ;
        this.params = this.props.propNavigation.state.params;
        this.renderToast = this.props.renderToast;
    }
    render(){
        //复用准备，如果没有组件传递opacity，就正常显示。
        var opacityLoginWindow = this.props.opacityLoginWindow;
        opacityLoginWindow = opacityLoginWindow == undefined ? 1:opacityLoginWindow;
        return (
            <View style={[styles.container,{opacity: opacityLoginWindow}]}  >
                <TextInput
                    style={styles.username}
                    onChangeText={(username) => this.setState({username:username})}
                    value={this.state.username}
                    placeholder='请输入用户名'
                    multiline = {false}
                    maxLength = {20}
                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                />
                <TextInput
                    style={styles.password }
                    onChangeText={(password) => this.setState({password:password})}
                    value={this.state.password}
                    placeholder='请输入密码'
                    secureTextEntry={true}
                    multiline = {false}
                    maxLength = {20}
                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                />

                    <TouchableOpacity ref="loginButton"
                                      disabled = {this.state.disFlg}
                                      onPress={this.jumpPage.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.text}>登 录</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        )
    }

    componentWillReceiveProps(nextProps){
       if ( nextProps.status !== types.LOGIN_IN_DOING
       && nextProps.status !== types.LOGIN_IN_DONE){
           this.setState({disFlg:false});
       }
    };

    jumpPage(){

        if (this.state.username == '' || this.state.password == ''){
            this.renderToast('请输入用户名和密码','warning');
        }else{
            //this.setState({disFlg:true});
            this.props.dispatch(doLogin(this.state.username,this.state.password));
        }

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(100,100,100,0.6)',
        borderRadius:8,
        padding:40,
        //resizeMode:'cover',//stretch,cover,contain
        width: Util.windowSize.width/2+120,
        height: 300,
        justifyContent: 'center',
        flexDirection:'column',

    },
    buttonView: {
        margin: 40,
        justifyContent: 'center',
        flexDirection:'row',
    },
    button: {
        height:40,
        backgroundColor: '#1DBAF1',
        //width:100,
        marginTop: 50,
        marginBottom: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    username:{
        height:40,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius:6,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:6,
        paddingRight:6,
        fontSize:18

    },
    password:{
        height:40,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 6,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:6,
        paddingRight:6,
        fontSize:18
    }
});

function select(store)
{
    return {
        status: store.LoginReducer.status,
        user: store.LoginReducer.user,
    }
}

export default connect(select)(LoginWindow);