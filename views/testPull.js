import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    DeviceEventEmitter,
    Text,
    View
} from 'react-native';

import PullFlatList from '../selfmodules/flatlist_pull/PullFlatList';

const backgroundImage = require('../pic/backpic.jpg');
const ITEM_HEIGHT = 100;



export default class TestPull extends Component {
    constructor(props){
        super(props);
        this.state={
           // refreshing:false,
        }

    }
    _flatList;

    _renderItem = (item) => {
        var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        return <Text style={[{flex:1,height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
    };

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    };

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    };

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    };

    _keyExtractor = (item, index) => index;

    _onPullRelease = (resolve) => {
        //这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
            resolve();//停止刷新
        }, 1000);
    };

    _onPushing = (ss)=>{
        alert(ss);
    };
    _getItemLayout = (data, index) => {
        return {
            length: ITEM_HEIGHT,
            offset: (ITEM_HEIGHT+2) * index,
            index: index
        }
    };

    render(){
        var data = [];
        for (var i = 0; i < 16; i++) {
            data.push({key: i, title: i + ''});
        }
        return(
            <View style={{flex:1}}>

                <View style={{flex:1}}>
                    <PullFlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onPullRelease={this._onPullRelease}
                        //refreshing={this.state.refreshing}
                        //onRefresh={this._onRefresh}
                        keyExtractor={this._keyExtractor}
                        horizontal={false}
                        legacyImplementation={false}
                        getItemLayout={this._getItemLayout}
                        //numColumns={3}  //9宫格
                        //onPushing = {this._onPushing}
                        data={data}>
                    </PullFlatList>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        resizeMode:'contain',//stretch,cover,contain,center
        //width: deviceWidthDp,
        //height: deviceHeightDp + 80,
        justifyContent: 'center',//flex-start,flex-end,center,space-between,space-around
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});