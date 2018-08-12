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
        //将传过来的navigation对象中的navigate()跳转方法进行引用
        this.navigate = this.props.propNavigation.navigate ;
        this.params = this.props.propNavigation.state.params;
        //一般会把通过props传递过来的父组件中的方法进行引用，方便调用
        this.renderToast = this.props.renderToast;
    }
    render(){
        //复用准备，如果没有组件传递opacity，就正常显示。
        var opacityLoginWindow = this.props.opacityLoginWindow;
        opacityLoginWindow = opacityLoginWindow == undefined ? 1:opacityLoginWindow;
        return (
            //style=可以有两种写法：1，像平常一样传入一个StyleSheet.Create的对象。
            //2，传入数组，就可以放两个json对象。
            <View style={[styles.container,{opacity: opacityLoginWindow}]}  >
                <TextInput
                    style={styles.username}
                    onChangeText={(username) => this.setState({username:username})}
                    value={this.state.username}
                    //除了字符串，其他都是通过对象的形式传入的，所以要{}
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
                                      //这里写的不好，这一步bind最好写到constructor中，
                                      onPress={this.jumpPage.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.text}>登 录</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        )
    }
    //1，最新的react16.3中，这个方法已经被废弃了，采用了【getDerivedStateFromProps】
    //2，react自己生命周期的方法，是不需要绑定this的。
    //3，在这里这个方法主要用来接收store传过来的参数，根据状态判断是否需要更新。
    //   比如，status不是doing和done的场合的时候，是不需要disable登录按钮的。

    //redux通过props传递state变化，因为该组件本身并没有相关state的影响，所以不会刷新。
    //必须通过props 判断一下，需不需要更新自身state，进行刷新
    //组件刷新的要素：1父组件刷新，2props更新
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
            //this.setState({disFlg:true}
            /*
            这里是redux的最主要用法。分发action。
            一般情况下action不会直接以json的相识写出，因为需要传参数。
             */
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


//redux的标准写法，connect带着select包裹元类，HOC高阶函数
//select中return回的状态，就是该组件可以接受到的状态，
//任何一个地方发生的LoginReducer处理的action，这里都可以接收到状态的变化，从而更新自身组件的状态


function select(store)
{
    return {
        status: store.LoginReducer.status,
        user: store.LoginReducer.user,
    }
}

export default connect(select)(LoginWindow);