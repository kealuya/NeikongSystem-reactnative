import React, { Component } from 'react';
import {
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
import Util from '../util/Util';
export default class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item:null,
        };
    }
    render(){
        var itemContent = this.state.item.item;
        var txt =  '审批业务:' + this.state.item.item.title;
        this.yewuName = txt;
        var msgColor = this.state.item.index % 2 == 0 ? 'red' : '#7cff75';
        msgColor = this.state.item.index % 3 == 0 ? '#f9ffa3' : msgColor;
        if (this.state.item.index < 4){
            msgColor='#7cff75';
        }

        var bgColor = 'white';
        var height = this.state.item.height;
        return (
            <View style={[{flexDirection:'row',justifyContent: 'flex-start'},
            {backgroundColor:bgColor,height:height}]}  >
                    <View style={{backgroundColor:msgColor,width:22,height:22,borderRadius: 11,
                    left:Util.windowSize.width - 50,top:118,position: 'absolute',}}/>
                    <TouchableOpacity style={[styles.container]} onPress={this.detailForward}>
                            <View style={[styles.title]}>
                                <View style={[styles.titleView,{  flex:1}]}>
                                    <Text style={styles.textTitle}>YW0{this.state.item.index}</Text>
                                </View>
                                <View style={[styles.titleView,{  flex:4}]}>
                                    <Text numberOfLines={1} style={styles.textTitle}>业务名称:{txt}</Text>
                                </View>
                            </View>
                            <View style={[styles.title]}>
                                <View style={[styles.contentView]}>
                                    <Text style={styles.text}>所属部门:{itemContent.bumen}</Text>
                                </View>
                                <View style={[styles.contentView]}>
                                    <Text style={styles.text}>子业务名称:{itemContent.ziyewu}</Text>
                                </View>
                            </View>
                            <View style={[styles.title]}>
                                <View style={[styles.contentView]}>
                                    <Text style={styles.text}>当前步骤:{itemContent.dangqianbuzhou}</Text>
                                </View>
                                <View style={[styles.contentView]}>
                                    <Text style={styles.text}>        确认人:{itemContent.querenren}</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
            </View>
        )
    }
    componentWillMount(){
        this.setState({
            item:this.props.itemData
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.itemData
        })
    }

    detailForward = () => {
        //获取用户信息，判断当前用户是否有审批权限   stepid=4
        this.state.item.goToDetailItem(this.state.item.index,this.yewuName,'4');
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
    },
    title: {
        flexDirection:'row',
        justifyContent: 'flex-start',
    },
    titleView: {
        margin:2,

    },
    contentView: {
        flex:1,
        marginRight:14,
    },
    textTitle: {
        fontSize: 24,
        color: 'black',
        fontWeight: "bold",

    },
    text: {
        fontSize: 17,
        color: 'gray',
    },
});