import React from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    View,
    StatusBar,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Toast , {DURATION}  from 'react-native-easy-toast';
var Util = {
    windowSize:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height
    },
    getRequest:function (url, successCallback, failCallback) {
        fetch(url).then((response)=>response.json())
            .then((responseData)=>successCallback(responseData))
            .catch((error)=>failCallback(error));
    },
    loading:<ActivityIndicator color='blue' size={70} style={{opacity :0.5 ,position: 'absolute',
                left:Dimensions.get("window").width/2-35,top:Dimensions.get("window").height/2-70}}/>,

    displayToastError:()=>{
        return(
            <Toast ref="toastError" style={{backgroundColor:'red'}} position={'bottom'}/>
        )
    },
    //因为没有this问题，所以用什么生命func都可以
    //return多组件的时候，一般会用括号把他们包裹起来
    displayToastWarning:()=>{
        return(
            <Toast ref="toastWarning" position={'bottom'}/>
        )
    },
    displayToastMsg:function(text, toastStyle) {
        switch(toastStyle) {
            case 'error':
                //任何一个组件都可以生命ref，说明该component可以被当前页面的其他代码引用
                //可以拿到该组件的应用对象，并调用其中的方法。
                //调用LoginPage页面中的Toast组件的方法
                this.refs.toastError.show(text, DURATION.LENGTH_LONG);
                break;
            case 'warning':
                this.refs.toastWarning.show(text, DURATION.LENGTH_LONG);
                break;
            default:
                this.refs.toastWarning.show(text, DURATION.LENGTH_LONG);
                break;
        }
    },
    getCurrentDate:()=>{
        return Util.dateFormat(new Date(),'yyyy-MM-dd');
    },

    dateFormat : function(date,fmt) {
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)                   ));
            }
        }
        return fmt;
    }

};

module.exports = Util;
