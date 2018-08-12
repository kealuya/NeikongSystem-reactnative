import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    Animated,
    Easing,
    StatusBar,
    Dimensions,
    DeviceEventEmitter,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import * as types from '../redux-action/ActionTypes';
import CircleTest from './circleTest'
import LoginWindow from './login_window';
import Util from '../util/Util';
import Finger from 'react-native-touch-id-android';

const backgroundImage = require('./../pic/backpic.jpg');
//通过Animated制造出可以动画化的组件
var AnimatedLoginWindow = Animated.createAnimatedComponent(LoginWindow);
//var AnimatedCircleTest = Animated.createAnimatedComponent(CircleTest);
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //动画相关初始值设定，透明度，y轴动画
            fadeAnim: new Animated.Value(0), //设置初始值
            grassTransY : new Animated.Value(0),
            loginWindowOpacity : new Animated.Value(0),
            autoLoginFlg: false,
        };
        //通过reactNavigation直接引用的页面**通过reactnavigation打开的页面都会在props中带上navigation属性
        //用来控制、接受导航参数
        this.propNavigate = this.props.navigation;
        //bind：因为Util.displayToastMsg返回的是一个function，这个func内引用了this，所以需要
        //把this绑定到这个方法中。不能用()=>这个，这个是绑定当前环境的上下文的this，有限制。
        //
        this.displayToastMsg = Util.displayToastMsg.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image  source={backgroundImage} style={styles.image}>
                    <Animated.View style ={{opacity: this.state.fadeAnim,transform: [{
                                       //插参interpolate：用以返回对应参数
                                       translateY: this.state.grassTransY.interpolate({
                                               inputRange: [0, 1],
                                               outputRange: [100,-100]
                                           })
                                   }]}}>
                        <TouchableOpacity  onPress={this.versionMsg}>
                            <Text style={styles.welcome}>
                                中成智控移动审批系统
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <AnimatedLoginWindow
                        propNavigation = {this.propNavigate}
                        opacityLoginWindow={this.state.loginWindowOpacity}
                        renderToast = {this.displayToastMsg}
                    />
                </Image>
                {Util.displayToastError()}
                {Util.displayToastWarning()}
                {
                    //判断props的状态，通过redux，如果正在doing，就显示菊花，不然就返回null显示空
                }
                {this.props.status == types.LOGIN_IN_DOING?Util.loading:null}
            </View>
        );//jsx语法中，{}包裹的东西是可以执行的部分，比如三元式需要写到大括号中。
    }

    componentWillMount() {
        //test用
        //this.propNavigate.navigate('ReadMe');
    }
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.status == types.LOGIN_IN_ERROR){
            this.displayToastMsg(nextProps.toastMsg.msg,nextProps.toastMsg.type);
        }else if (nextProps.status == types.LOGIN_IN_DONE){
            this.propNavigate.navigate('TabDoNavigatorPage');
            return false;
        }
        //是否刷新
        return true;
    }


    componentDidMount() {
        //react-navigation官网上有关于登录验证的记载
        //可以参考记录


        //登录状态check
        // global.storage.load({
        //     key: 'loginState',
        //     autoSync: false,
        // }).then(ret => {
        //     if (ret.confirmState == 'ok'){
        //         this.setState(
        //             {
        //                 autoLoginFlg:true,
        //                 userInfo:{
        //                     username:ret.userInformation.username
        //                 }
        //             }
        //         );
        //         DeviceEventEmitter.emit('autoLoginStart',
        //             {
        //                 username:ret.userInformation.username
        //             }
        //         );
        //     }
        // }).then(() => {

        //Animated一般定义在DidMount方法中，
        //sequence：按顺序执行，所有Animated包含的组件都会以动画的形式显示
        //比如Title文字悄悄出现的意思是：opacity从0慢慢变成1.
        //easing：动画的运动形式，比如贝塞尔曲线，或者模拟皮球自由落地时的运动轨迹
            Animated.sequence([
                //Title文字悄悄出现
                Animated.timing(
                    this.state.fadeAnim,//初始值(Animated对象)
                    {
                        toValue: 1,//结束值
                        duration: 500,//一次动画的持续时间
                        easing: Easing.linear// 动画的缓冲函数
                    }
                ) ,
                //Title文字从下飞到上边
                Animated.timing(
                    this.state.grassTransY,//初始值(Animated对象)
                    {
                        toValue: 1 ,//结束值
                        duration: 1500,//一次动画的持续时间
                        easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)// 动画的缓冲函数，bezier贝塞尔曲线
                    }
                ),
                //LoginWindow悄悄出现
                Animated.timing(
                    this.state.loginWindowOpacity,//初始值(Animated对象)
                    {
                        toValue: 1 ,//结束值
                        duration: 500,//一次动画的持续时间
                        easing: Easing.linear// 动画的缓冲函数，bezier贝塞尔曲线
                    }
                )
            ]).start(()=>{
                //动画完成之后的回调方法
                // if (this.state.autoLoginFlg){
                //      this.webGetReq(this.state.userInfo);
                // }
            });


        // Animated.timing(
        //     this.state.fadeAnim,//初始值(Animated对象)
        //     {
        //         toValue: 0,//结束值
        //         duration: 2000,//一次动画的持续时间
        //         easing: Easing.linear// 动画的缓冲函数
        //     }
        // ).start(function ( ) {
        //     Alert.alert('','动画完成2');
        // })
    }
    versionMsg(){
        Alert.alert(
            '关于我们',
            `神州浩天科技有限公司--中成兆控
地址：天津华苑产业区榕苑路15号1号楼B座20层
电子邮箱：szht@szhtkj.com.cn` ,
            [
                //{text: '意见反馈', onPress: () => console.log('Cancel Pressed') },
                {text: '关闭', onPress: () => {
                    Finger.isSensorAvailable()
                        .then((isAvailable) => { alert(isAvailable)})
                        .catch(error => {  alert(error) });
                }},
            ],
            //{ cancelable: false }
            //{ onDismiss: () => {Alert.alert('Title msg','good morning!');} }
        )
    }
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        backgroundColor:'black',
        resizeMode:'contain',//stretch,cover,contain,center
        //width: deviceWidthDp,
        //height: deviceHeightDp + 80,
        justifyContent: 'center',//flex-start,flex-end,center,space-between,space-around
        flexDirection: 'column',
        alignItems: 'center'

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


function select(store)
{
    return {
        status: store.LoginReducer.status,
        toastMsg:store.LoginReducer.toastMsg
    }
}

export default connect(select)(LoginPage);