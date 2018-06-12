import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    Button,
    TouchableOpacity,
    FlatList,
    BackHandler,
    Image,
    Alert,
    ActivityIndicator,
    DeviceEventEmitter,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
import * as types from '../redux-action/ActionTypes';
import {loginInit} from '../redux-action/LoginAction'
import PullFlatList from '../selfmodules/flatlist_pull/PullFlatList';
import TopControlBar from './TopControlBar';
import ListItem from './list_item';
import Util from '../util/Util';
import Menu  from 'react-native-menu';
import {displayAllCase,displayApproveCase,displayNotCase} from '../redux-action/ListAction';
let { MenuContext, MenuOptions, MenuOption, MenuTrigger } = Menu;
const ITEM_HEIGHT = 160;
const ITEM_SEPARATOR = 1;
const renderTouchable = () => <TouchableOpacity/>;

let pageNo = 1;//当前第几页
let totalPage=5;//总的页数
class ApproveList extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:[],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            selectedMenu:0,
        };
        //通过reactNavigation直接引用的页面
        this.propNavigate = this.props.navigation;
        pageNo = 1;
        this.onEndReachedFirst = true;
    }


    goToDetailItem = (yewuID,yewuName,stepid)=>{
        this.propNavigate.navigate('DetailItem',{yewuID:yewuID,yewuName:yewuName,stepid:stepid});
    };

    _flatList;

    _renderItem = (item) => {
        // var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        // var bgColor = item.index % 2 == 0 ? 'white' : '#dfe5f2';
        //return <Text style={[{flex:1,height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
        item.height = ITEM_HEIGHT;
        item.goToDetailItem = this.goToDetailItem;
        return <ListItem itemData = {item}/>
    };

    _onPullRelease = (resolve) => {
        this.getWebData('下拉刷新数据',1,resolve);
    };

    _header = () => {
        return null;
    };

    _footer = () => {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
               null
            );
        }
    };

    _separator = () => {
        return <View style={{height:ITEM_SEPARATOR,backgroundColor:'gray'}}/>;
    };

    _keyExtractor = (item, index) => index;

    _getItemLayout = (data, index) => {
        return {
            length: ITEM_HEIGHT,
            offset: (ITEM_HEIGHT+ITEM_SEPARATOR) * index,
            index: index
        }
    };

    _createEmptyView = () => {
        return (
            <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有数据哦！</Text>
        );
    };

    _onEndReached= () => {
        if(this.onEndReachedFirst == true ){
            this.onEndReachedFirst = false;
            return;
        }

        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((pageNo!=1) && (pageNo>=totalPage)){
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({
            showFoot:2
        });
        //获取数据
        this.getWebData('上拉刷新数据',pageNo)

    }

    render() {
        return (
            <MenuContext style={{flex:1}}>
                    <View style={styles.headerBar}>
                        <TopControlBar/>
                        <Text style={{ fontSize: 30,color:'white' }}>审批一览</Text>
                        {this.renderMenu()}
                    </View>
                    <PullFlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onPullRelease={this._onPullRelease}
                        //refreshing={this.state.refreshing}
                        //onRefresh={this._onRefresh}
                        ListEmptyComponent={this._createEmptyView}
                        keyExtractor={this._keyExtractor}
                        horizontal={false}
                        legacyImplementation={false}
                        getItemLayout={this._getItemLayout}
                        //numColumns={3}  //9宫格
                        //onPushing = {this._onPushing}
                        initialNumToRender={10}
                        onEndReached={this._onEndReached} //初期化时会被触发
                        onEndReachedThreshold={0.05}
                        extraData={this.state}
                        // flatlist的刷新值根据data，如果有data以为的数据决定刷新的话
                        // extraData = {this.state}
                        //如果有除data以外的数据用在列表中（不论是用在renderItem还是Header或者Footer中），
                        // 请在此属性中指定。
                        // 同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的Object或者数组中），
                        // 然后再修改其值，否则界面很可能不会刷新。
                        data={this.state.data}>
                    </PullFlatList>
                    {this.state.loading ? Util.loading : null}
            </MenuContext>
        )
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.status == types.DISPLAY_LIST_ALLCASE){
            pageNo=1;
            this.getWebData('_allcase',1);
        }else if (nextProps.status == types.DISPLAY_LIST_APPROVECASE){
            pageNo=1;
            this.getWebData('_approvecase',1);
        }else if (nextProps.status == types.DISPLAY_LIST_NOTCASE){
            pageNo=1;
            this.getWebData('_notdocase',1);
        }
    }

    componentWillMount(){
        //对应安卓的返回键返回初始页
        this.props.dispatch(loginInit());
        this.getWebData('_allcase');
    }
    renderMenu = () => {
        let data = ['全部业务','申请中业务','待处理业务'];
        return (
            <Menu onSelect={this.clickMenu}>
                <MenuTrigger renderTouchable={renderTouchable}>
                    <Text style={{ fontSize: 35,color:'white' }}>  ⋮  </Text>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: 20,position: 'absolute',
                                 left: (Util.windowSize.width - 240), elevation: 20 }}  >
                    {
                        data.map((val,i)=>{
                            if (this.state.selectedMenu === i){
                                return (
                                    <MenuOption key = {i} renderTouchable={renderTouchable} value={i}>
                                        <Text style={{fontWeight: 'bold',color:'#1DBAF1' }}>{val}</Text>
                                    </MenuOption>
                                )
                            }else{
                                return (
                                    <MenuOption key = {i}  renderTouchable={renderTouchable} value={i}>
                                        <Text>{val}</Text>
                                    </MenuOption>
                                )
                            }
                        })
                    }
                </MenuOptions>
            </Menu>
        )
    };
    clickMenu=(selected)=>{
        switch (selected) {
            case 0:
                this.props.dispatch(displayAllCase());
                break;
            case 1:
                this.props.dispatch(displayApproveCase());
                break;
            case 2:
                this.props.dispatch(displayNotCase());
                break;
            default:
                ;
        }
        this.setState({
            selectedMenu:selected
        })
    };

    getWebData(key,pageNo = 1,res){
        let pageNotemp = pageNo;
        var getDatePromise = ()=>{
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    var data = [];
                    for (var i = (pageNotemp-1)*10 ; i < (pageNotemp-1)*10+10; i++) {
                        data.push(
                            {
                                key: i + key,
                                title: i + key +" : " + this.props.user.username,
                                bumen:i%2==0?'人事处':'财务处',
                                ziyewu:i%2==0?'预算申报':'采购执行',
                                dangqianbuzhou:i%2==0?'主管领导审核预算申报数':'采购执行',
                                querenren:i%2==0?'张三三':'李思思',
                            }
                        );
                    }
                    resolve(data);
                }, 1500);
            });
        };

        this.setState({
            loading:true,
        },()=>{
            getDatePromise().then(data=>{
                let foot = 0;
                if(pageNotemp>=totalPage){
                    foot = 1;//listView底部显示没有更多数据了
                }
                this.setState({
                    loading:false,
                    data:pageNotemp===1?data:this.state.data.concat(data),
                    showFoot:foot,
                });
                if (res){
                    res();
                }
            }).catch(err=>{
                //错误处理
                this.setState({
                    error: true,
                    errorInfo: error
                })
            });
        });

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
        color: 'black',
        fontSize: 30,
    },
    footer:{
        flexDirection:'row',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    headerBar:{
        height:55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#1DBAF1'
    },
});

function select(store)
{
    return {
        user: store.LoginReducer.user,
        status: store.ListReducer.status,
    }
}

export default connect(select)(ApproveList);