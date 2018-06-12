import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Animated,
    Button,
    Easing,
    Dimensions,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import {connect} from 'react-redux';
import * as types from '../redux-action/ActionTypes';
import {displayAllCase,displayApproveCase,displayNotCase} from '../redux-action/ListAction'

const searchImage = require('../pic/search.png');
var AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
class TopControlBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchContent:'',
            width:new Animated.Value(0),
            isSearchBarDisplay:false,
            focus:false,
        };
    }
    render(){
        let animatedTextInput = null;
        if (this.state.isSearchBarDisplay){
            animatedTextInput = (
                <View>
                    <AnimatedTextInput
                        style={[styles.searchContent,{width:this.state.width,} ]}
                        onChangeText={(searchContent) => this.setState({searchContent:searchContent})}
                        value={this.state.searchContent}
                        placeholder='请输入业务名称'
                        multiline = {false}
                        maxLength = {20}
                        autoFocus={this.state.focus}
                        onBlur = {this._onBlur}
                        underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                    />
                </View>
            )
        }

        return (

                <View style={[styles.containerView]}>
                    {animatedTextInput}
                    <TouchableOpacity onPress={this._onPress}>
                        <Image style={{width:45,height:45,marginTop:5,marginBottom:5,tintColor :'white'}}
                               source={searchImage} />
                    </TouchableOpacity>
                </View>

        )
    }
    _onPress=()=>{
        //open
        if(this.state.searchContent == '' && !this.state.isSearchBarDisplay){
            this.setState({
                isSearchBarDisplay:true,
            },()=>{
                Animated.timing(
                    this.state.width,
                    {
                        toValue: 200,
                        duration: 500,
                        easing: Easing.linear
                    }
                ).start(()=> {
                    this.setState({
                        focus:true,
                    });
                })
            });

        //search
        }else if(this.state.searchContent != '' && this.state.isSearchBarDisplay){
            alert(this.state.searchContent);
        //close
        }else if (this.state.searchContent == '' && this.state.isSearchBarDisplay) {
            Animated.timing(
                this.state.width,
                {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear
                }
            ).start(()=> {
                this.setState({
                    isSearchBarDisplay: false,
                }, ()=> {

                });
            })
        }
    }
    _onBlur=()=>{
        //close
        if (this.state.searchContent == '' && this.state.isSearchBarDisplay) {
            Animated.timing(
                this.state.width,
                {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear
                }
            ).start(()=> {
                this.setState({
                    isSearchBarDisplay: false,
                }, ()=> {

                });
            })
        }
    }

    allCase(){
        this.props.dispatch(displayAllCase());
    }
    notdoCase(){
        this.props.dispatch(displayNotCase());
    }
    approveCase(){
        this.props.dispatch(displayApproveCase());
    }
}

const styles = StyleSheet.create({
    containerView: {
        flexDirection:'row',
    },
    buttonView: {
        flex:1,
        marginLeft:2,
        marginRight:2,
        marginTop:2,
        marginBottom:2,
    },
    button: {
        flex:1,
        borderRadius:8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: '#1DBAF1',
        height:50,
        margin : 10,
    },
    text: {
        fontSize: 17,
        color: '#FFFFFF',
    },
    searchContent:{
        height:45,
        marginLeft : 10,
        marginTop : 5,
        marginBottom : 5,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 6,
        fontSize:18
    }
});


export default connect()(TopControlBar);