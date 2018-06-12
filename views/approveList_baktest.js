import React, { Component,PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList,
    Platform,
    Image,ActivityIndicator,
    Alert,
    DeviceEventEmitter,
    Text,
    View
} from 'react-native';
import UltimateListView from "react-native-ultimate-listview";


const backgroundImage = require('../pic/backpic.jpg');
const ITEM_HEIGHT = 100;

export default class ApproveList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            layout: 'list',
            text: ''
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

    _onRefresh = () => {
        this.setState({refreshing: true})//开始刷新
        //这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
            alert('没有可刷新的内容！');
            this.setState({refreshing: false});//停止刷新
        }, 1000);
    };

    _onEndReached = (ss)=>{
        alert(ss);
    };
    _getItemLayout = (data, index) => {
       return {
            length: ITEM_HEIGHT,
            offset: (ITEM_HEIGHT+2) * index,
            index: index
       }
    };
    renderItem = (item, index, separator) => {
            var txt = '第' + item.index + '个' + ' title=' + item.item.title;
            var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
            return (
              <Text style={[{flex:1,height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
            );
    };
    renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={{textAlign: 'center'}}>I'm the Header View, you can put some Instructions or Ads Banner
                        here!</Text>
                </View>
                <View style={styles.headerSegment}>
                </View>
            </View>
        );
    };
    renderPaginationFetchingView = () => {
        return (
            <ActivityIndicator  />
        );
    };

    _onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            //This is required to determinate whether the first loading list is all loaded.
            let pageLimit = 24;
            if (this.state.layout === 'grid') pageLimit = 60;
            let skip = (page - 1) * pageLimit;

            //Generate dummy data
            let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`);

            //Simulate the end of the list if there is no more data returned from the server
            if (page === 10) {
                rowData = [];
            }

            //Simulate the network loading in ES7 syntax (async/await)
            await this.sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    render(){
        var data = [];
        for (var i = 0; i < 16; i++) {
            data.push({key: i, title: i + ''});
        }
        return(
            <View style={{flex:1}}>
                <UltimateListView
                    ref={(ref) => this.listView = ref}
                    key={this.state.layout} //this is important to distinguish different FlatList, default is numColumns
                    onFetch={this._onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`}  //this is required when you are using FlatList
                    refreshableMode="basic" //basic or advanced
                    item={this.renderItem}  //this takes three params (item, index, separator)
                    numColumns={this.state.layout === 'list' ? 1 : 3} //to use grid layout, simply set gridColumn > 1
                    //----Extra Config----
                    displayDate
                    header={this.renderHeader}
                    paginationFetchingView={this.renderPaginationFetchingView}
                    //sectionHeaderView={this.renderSectionHeaderView}   //not supported on FlatList
                    //paginationFetchingView={this.renderPaginationFetchingView}
                    //paginationAllLoadedView={this.renderPaginationAllLoadedView}
                    //paginationWaitingView={this.renderPaginationWaitingView}
                    //emptyView={this.renderEmptyView}
                    //separator={this.renderSeparatorView}
                    //new props on v3.2.0
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    dateStyle={{color: 'lightgray'}}
                    refreshViewStyle={Platform.OS === 'ios' ? {height: 80, top: -80} : {height: 80}}
                    refreshViewHeight={80}
                />
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