import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    ScrollView,
    View
} from 'react-native';
import {connect} from 'react-redux';
import * as types from '../../redux-action/ActionTypes';
const arrow = require('../../pic/downpic.png');
import {displayStepDetail} from '../../redux-action/DetailAction'

class FlowChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps:[],
            colorLight:new Animated.Value(0),
            ywid:'',
        };
        this.currentStep = '';
        this.todoStep = '';
    }
    render(){
        let count = this.state.steps.length - 1;

        return (
            <ScrollView contentContainerStyle={styles.container}  >
                {
                    this.state.steps.map((val,i)=>{
                        if (count != i){
                            return(
                                <View key={i} style={[styles.stepView]}>
                                    <TouchableOpacity disabled={val.stepDid||(val.isCurrent==true)?false:true}
                                                      onPress={this.stepOnClick.bind(this,val.stepKey)}>
                                        <Animated.View style={[styles.button,
                                        {backgroundColor:this.getStyle(val),opacity:this.getColorLight(val)}]}>
                                            <Text style={styles.text}>步骤：{val.stepName}</Text>
                                        </Animated.View>
                                    </TouchableOpacity>
                                    <View style={[styles.arrowView]}>
                                        <Image key={i} source={arrow}
                                               style = {[styles.arrow]} />
                                    </View>

                                </View>
                            )
                        }else{
                            return(
                                <View key={i} style={[styles.stepView]}>
                                    <TouchableOpacity disabled={val.stepDid||(val.isCurrent==true)?false:true}
                                                      onPress={this.stepOnClick.bind(this,val.stepKey)}>
                                        <Animated.View style={[styles.button,
                                        {backgroundColor:this.getStyle(val),opacity:this.getColorLight(val)}]}>
                                            <Text style={styles.text}>步骤：{val.stepName}</Text>
                                        </Animated.View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
        )
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.status == types.DISPLAY_DETAIL_BY_YWID){
            this.getData(nextProps.ywid);
        }
    };
    componentDidMount(){
       this.startAnimate();
    }

    getData=(ywid)=>{
        var tempStep = [];
        for(let i=0; i<15; i++){
            var t = {
                stepName: 'stepName' + i + ',业务id:' + ywid,
                stepDid:false,
                stepKey:i,
                isCurrent:false
            }
            tempStep.push(t);
        }
        tempStep[0].stepDid = true;
        tempStep[1].stepDid = true;
        tempStep[2].stepDid = true;
        tempStep[3].stepDid = true;
        //待处理步骤要设置stepDid = true
        tempStep[4].stepDid = true;
        tempStep[4].isCurrent = true;
        this.setState({steps:tempStep});
    }
    stepOnClick(stepKey){
        this.props.dispatch(displayStepDetail(stepKey));
        this.props.closeDrawer();

        let steps = this.state.steps;
        steps[this.currentStep].isCurrent = false;
        steps[stepKey].isCurrent = true;
        this.setState({steps:steps});
    }
    getStyle({stepDid,isCurrent,stepKey}){
        var bg;

        //三种状态，
        // 1、做过，灰色，可闪烁
        // 2、待处理，绿色，可闪烁
        // 3、未处理，蓝色，不可闪烁
        if (stepDid){
            if (isCurrent){
                if(this.todoStep === ''){
                    //设定待处理stepkey
                    this.todoStep = stepKey;
                    bg = '#1df0de';
                }else{
                    if (this.todoStep === stepKey){
                        bg = '#1df0de';
                    }else{
                        bg = 'gray';
                    }
                }
            }else{
                if (this.todoStep === stepKey){
                    bg = '#1df0de';
                }else{
                    bg = 'gray';
                }
            }
        }else{
            bg = '#1DBAF1';
        }
        return bg;
    }
    startAnimate=()=>{
        Animated.sequence([
            Animated.timing(
                this.state.colorLight,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }
            ) ,
            Animated.timing(
                this.state.colorLight,
                {
                    toValue: 0.3,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }
            ),
        ]).start(this.startAnimate);
    }
    getColorLight=(val)=>{
        let bkColor = 1;
        if (val.isCurrent){
            bkColor = this.state.colorLight;
            this.currentStep = val.stepKey;
        }

        return bkColor;
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor:'rgba(100,100,100,0.6)'
    },
    stepView: {
        justifyContent:'center',
    },
    arrowView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        height:40,
        width:60,
        resizeMode:'cover',//stretch,cover,contain,center
    },
    button: {
        margin: 10,
        borderRadius: 6,
    },
    text: {
        fontSize: 13,
        color: '#FFFFFF',
        margin: 10,
    },
});

function select(store)
{
    return {
        status: store.DetailReducer.status,
        ywid: store.DetailReducer.ywid,
        user: store.LoginReducer.user,
    }
}

export default connect(select)(FlowChart);