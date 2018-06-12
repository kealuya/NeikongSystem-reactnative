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
class SelectButtonList extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <View style={[styles.container]}  >
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={this.allCase.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.text}>全件显示</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={this.approveCase.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.text}>待处理业务</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={this.notdoCase.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.text}>申请中业务</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    container: {
        flex:3,
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
    },
    text: {
        fontSize: 17,
        color: '#FFFFFF',
    },
    username:{
        marginTop: 10,
        marginBottom: 10,
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


export default connect()(SelectButtonList);