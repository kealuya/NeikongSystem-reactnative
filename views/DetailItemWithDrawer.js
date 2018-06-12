import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    DeviceEventEmitter,
    Text,
    View
} from 'react-native';

import {connect} from 'react-redux';
import {displayDetailByYwid} from '../redux-action/DetailAction'
import Drawer from 'react-native-drawer';
import FlowChart from '../selfmodules/flowchart/FlowChart';
import DetailItem from './detailItem';
import * as types from '../redux-action/ActionTypes';

class DetailItemWithDrawer extends Component {
    static navigationOptions = ({navigation}) => ({
        //标题
        title: `${navigation.state.params.yewuName}`,
        headerStyle:{
            backgroundColor: '#1DBAF1',
            elevation: 0,
        },
        headerTitleStyle: {
            alignSelf : 'center',
        },
        headerTintColor:'white',//设置导航栏全部文字颜色
        //headerRight:<Text>   </Text>,//安卓title居中的场合，会因为左箭头把居中文字挤偏，借由右边再挤回去，居中。
        //是否允许右滑返回，在iOS上默认为true，在Android上默认为false

        headerRight:(
                            navigation.state.params.stepid == '4'?
                                    (<TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
                                    <Text style={styles.item1Text}>审批</Text>
                                </TouchableOpacity>):(<Text>   </Text>)

                    ),
        gesturesEnabled: true,
    });

    constructor(props){
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        this.state={
            stepid:''
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.state.stepid != nextProps.stepid
            && nextProps.status == types.DISPLAY_STEP_DETAIL){
            this.setState({
                stepid:nextProps.stepid
            });
            this.props.navigation.setParams({ stepid:nextProps.stepid });
        }
    };
    componentWillMount(){
        this.props.navigation.setParams({ navigatePress:this.submit })
        this.props.dispatch(displayDetailByYwid(this.params.yewuID));
    }

    submit=()=>{
        Alert.alert(
            '审批发布',
            '您确定发布审批吗',
            [
                {text: '确定', onPress: () => {
                    alert('发布成功！');
                    this.props.navigation.goBack();
                }},
                {text: '取消', onPress: () => {}},
            ]
        )
    }

    closeDrawer=()=>{
        this._drawer.close();
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay" // displace:overlay:static;表现样式：实体显示（占用屏幕）；
                                // 透明显示不占用显示，实体不占用
                tapToClose={true} //【点击关闭】功能
                openDrawerOffset={0.6} // 开到屏幕的哪里
                panCloseMask={0.6}//手势从哪里关闭
                panOpenMask={0.1}//手势从哪里开启
                side="right"
                closedDrawerOffset={0.01}//关闭抽屉，到哪里（是否完全关闭）
                styles={drawerStyles}
                tweenHandler={
                    (ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}//主屏透明度

                content={<FlowChart closeDrawer = {this.closeDrawer}/>}
            >
               <DetailItem params={this.params}/>
            </Drawer>
        );
    }

}
const drawerStyles = {
    //根据源码，drawerContainer包含着drawer和main两个组件。
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingRight: 0,backgroundColor:'white',},//paddingRight：关闭后是否显示一个小边边
}
const styles = StyleSheet.create({
    item1Text: {
        fontSize: 20,
        color:'white',
        margin:10,
        fontWeight:'bold',
    },
})

function select(store)
{
    return {
        stepid: store.DetailReducer.stepid,
        status: store.DetailReducer.status,
    }
}
export default connect(select)(DetailItemWithDrawer);