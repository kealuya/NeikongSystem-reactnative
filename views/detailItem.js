import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Animated,
    Easing,
    Button,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView,
    View
} from 'react-native';

import {connect} from 'react-redux';
import Util from '../util/Util';
import ZCZK_APIS from '../util/URL';
import * as types from '../redux-action/ActionTypes';
import DatePickerTool from '../util/DatePickerTool';
import ImagePickerTool from '../selfmodules/image_picker/ImagePickerTool';
import PullSectionList from '../selfmodules/flatlist_pull/PullSectionList';


class DetailItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            titleText:'',
            detailData:[],
            stepid:'',
            waiting:false,
        };
        this.checkDoubleClick=true;
        this.params = this.props.params;
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.stepid !== this.state.stepid 
        && nextProps.status == types.DISPLAY_STEP_DETAIL){
            this.setState({
                stepid:nextProps.stepid
            });
            //数据重新获取,其他状态清空
            if (this.imagePickerTool)this.imagePickerTool.clearImages();
            let dd = [];
            for (let i=0;i<5;i++){
                dd.push('业务ID：'+this.params.ywid + '  详细内容：' + i);
            }
            setTimeout(()=>{
                this.setState({
                    detailData:dd,
                    stepid:nextProps.stepid
                })
            },500);
        }
    };
    componentWillMount(){
        let dd = [];
        for (let i=0;i<5;i++){
            dd.push('业务ID：'+this.params.ywid + '  详细内容：' + i);
        }
        setTimeout(()=>{
            this.setState({
                detailData:dd,
                stepid:4
            })
        },500);
    }

    render(){
        var sections = [
            { key: "申请业务详情",
                data: [{ title: "申请业务详情" }] ,
                renderItem:this._renderItem1},
            { key: "业务表单",
                data: [{ title: "业务表单" }] ,
                renderItem:this._renderItem2},
            { key: "业务审批记录",
                data: [{ title: "业务审批记录" }] ,
                renderItem:this._renderItem3},
        ];
        return (
             <View style={{ flex: 1 }}>
                 <PullSectionList
                     renderSectionHeader={this._renderSectionHeader}
                     showsVerticalScrollIndicator = {false}
                     sections={sections}
                     keyExtractor = {this._extraUniqueKey}
                     stickySectionHeadersEnabled = {true}
                     ItemSeparatorComponent={() => <View><Text></Text></View>}
                 >
                 </PullSectionList>
             </View>
        )
    }
    _renderItem1 = (info) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>业务编号：{this.params.yewuID}</Text>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>业务名称：{this.params.yewuName}</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>业务所属流程：校级会议预算编制申报</Text>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>业务所属部门：财务处</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>业务分类：会议管理</Text>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>子业务分类：校级会议预算</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>当前状态：处理中</Text>
                </View>
                <View style={{margin:8,justifyContent: 'center',flexDirection:'row',}}>
                    <View style={{width:Util.windowSize.width, height:2,backgroundColor:'#e8eef0'}}>
                    </View>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>业务内容：校级会议申请阶段1</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>当前步骤：主管领导审核会议预算申报</Text>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>申请人姓名：张三三</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>申请日期：2017-12-01 15:21:39</Text>
                </View>
                <View style={[styles.item1,{backgroundColor:'#e9f5ee'}]}>
                    <Text style={styles.item1Text}>当前确认期限：2017-12-21</Text>
                </View>
            </View>
        )
    }
    _renderItem2 = (info) => {
        return (
            <View style={{margin:5,padding:5,borderWidth:1,borderRadius:10, flex: 1 }}>
                <View style={styles.item2Title}>
                    <Text style={[styles.item1Text,{fontSize:25}]}>校级会议申请表单</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent: 'center',}}>
                    <View style={{width:Util.windowSize.width*0.95, height:2,backgroundColor:'#e8eef0'}}>
                    </View>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>会议编号：20171221</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>部门代码及项目号：244381</Text>
                </View>

                <View style={styles.item1}>
                    <Text style={styles.item1Text}>会议类型：校级会议</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>申请人：李思思</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>会议名称：关于内控研讨会议</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>会议时间：2017-12-15</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>编报单位：财务处</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>预算金额：2万元</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>决算金额：2万元</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>会议审核履历：以下</Text>
                </View>
            </View>
        )
    }

    _renderItem3 = (info) => {
        let textinput;
        let attachment;
        if (this.state.stepid !== 4){
            textinput =
                <View>
                    <View style={styles.item1}>
                        <Text style={styles.item1Text}>确认时间:2017-12-15 23:12:55</Text>
                    </View>
                    <View style={styles.item1}>
                        <Text style={styles.item1Text}>审批意见：</Text>
                    </View>
                    <View style={styles.textInputView}>
                        <Text style={[styles.item1Text,{  width:Util.windowSize.width-30}]}>
                            经组织决定，下发会议预算通知，希望各部门积极准备会议预算申报{'\n'}{'\n'}
                            批准通过
                        </Text>
                    </View>
                    <View style={styles.item1}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text style={styles.itemFujian}>查看附件</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        }else{
            textinput =
                <View>
                    <View style={styles.item1}>
                        <Text style={styles.item1Text}>确认期限:</Text>
                        <DatePickerTool ref="datePickerTool" />
                    </View>
                    <View style={styles.item1}>
                        <Text style={styles.item1Text}>审批意见：</Text>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput multiline={true}
                                   numberOfLines = {10}
                                   underlineColorAndroid='transparent'
                                   style={styles.textInput}>
                        </TextInput>
                    </View>
                    <ImagePickerTool ref={o=>this.imagePickerTool = o}/>
                    <View style={styles.item1}>
                        <TouchableOpacity onPress={this.actionSheet}>
                            <Text style={styles.itemFujian}>照片附件</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        }


        return (
            <View style={{ flex: 1 }}>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>当前步骤({this.state.stepid})：会议预算下发预选编制通知</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>提出人：李思思</Text>
                </View>
                <View style={styles.item1}>
                    <Text style={styles.item1Text}>执行人：张三三</Text>
                </View>
                {textinput}
                <View style={{margin:8,justifyContent: 'center',flexDirection:'row',}}>
                    <View style={{width:Util.windowSize.width, height:2,backgroundColor:'#e8eef0'}}>
                    </View>
                </View>
            </View>
        )
    }
    _renderSectionHeader = (info) => {
        var txt = info.section.key;
        return (
                <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', }}>
                <Text
                    style={{ color:'black',height: 50, textAlign: 'left',paddingLeft:10,
                  backgroundColor: '#c7e3ed',fontSize: 25 }}>{txt}</Text>

                </View>
            )
    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    actionSheet=()=>{
        this.imagePickerTool.showSheet();
    }

    getdate=()=>{
        this.setState({
            titleText:this.refs.datePickerTool.getDateStr()
        });
    }
    uploadImage=()=> {
            let imgAry = this.imagePickerTool.getImagesPath();
            if (imgAry.length == 0){
                alert('no image submit');
                return;
            }
            //common start
            if (this.checkDoubleClick){
                this.checkDoubleClick = false;
            }else{
                return;
            }

            this.setState({
                waiting:true,
            })
            //common end

            let formData = new FormData();
            //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中

            for(var i = 0;i<imgAry.length;i++){
                let file = {
                        uri: imgAry[i],
                        type:'multipart/form-data',
                        name: this.props.ywid + 'image.png'
                            };
                //这里的key(uri和type和name)不能改变,
                formData.append("photos",file);   //这里的photos就是后台需要的key
                //formData.append("keyDate",Math.random());
            }
            fetch(ZCZK_APIS.uploadRequest,
            {
                    method:'POST',
                    headers:{
                        'Content-Type':'multipart/form-data',
                    },
                    body:formData,
            })
            .then((response) => response.text() )
            .then((responseData)=>{
                if (responseData !== 'success'){
                    alert('not success \n' + responseData);
                }else{
                    alert('success!  \n' + responseData);
                }
                this.setState({
                    waiting:false,
                })
                this.checkDoubleClick = true;
                this.imagePickerTool.clearImages();
            })
            .catch((error)=>{
                alert('error!!!!!!!!!!!  \n' + error);
                this.setState({
                    waiting:false,
                })
                this.checkDoubleClick = true;
                this.imagePickerTool.clearImages();
            });
    }
}

const styles = StyleSheet.create({
    container: {
        //flex:1,
        justifyContent: 'space-between',
        flexDirection:'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonView: {
        justifyContent: 'center',
        flexDirection:'row',
    },
    imageView: {
        flexDirection:'column',
    },
    button: {
        backgroundColor: '#1DBAF1',
        width:100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        flex: 1,
        resizeMode:'contain',//stretch,cover,contain,center
        margin:8
    },
    item1: {
        flex: 1,
        height:45,
        marginLeft:5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item1Text: {
        fontSize: 20,
        color:'black'
    },
    itemFujian: {
        fontSize: 20,
        color:'blue',
        fontWeight:'bold',
    },
    item2Title: {
        flex: 1,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputView: {
        flex: 1,
        margin:5,
        padding:5,
        borderWidth:1,
        borderRadius:10,
        height:145,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textInput: {
        fontSize: 20,
        color:'black',
        height:140,
        textAlignVertical:'top',
        marginTop:-10,
        width:Util.windowSize.width-30,
    },
});

function select(store)
{
    return {
        status: store.DetailReducer.status,
        stepid: store.DetailReducer.stepid,
        user: store.LoginReducer.user,
    }
}

export default connect(select)(DetailItem);