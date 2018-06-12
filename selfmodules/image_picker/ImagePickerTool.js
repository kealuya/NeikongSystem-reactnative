import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import Util from '../../util/Util';
import ImagePicker from 'react-native-image-crop-picker';

const MARGINROW = 6;

export default class ImagePickerTool extends Component {

    constructor(props){
        super(props);
        this.state = {
            images:[]
        };
        this.imagesPath = [];
    }
    render(){
        let width = Util.windowSize.width/3 - MARGINROW;
        let height = width;
        return (
            <View style={styles.container}  >
            {
                this.state.images.map((val,i)=>{
                    this.imagesPath.push(val.path);
                    return(
                        <View key={i} style={[styles.imageView,{width:width,height:height}]}>
                            <Image key={i} source={{uri:val.path}}
                               style = {[styles.image]} />
                        </View>
                    )
                })


            }
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'请选择'}
                options={[ '取消', '相机', '图库']}
                cancelButtonIndex={0}
                onPress={this.select}
            />
            </View>
        )
    }

    getImagesPath = ()=>this.imagesPath;

    showSheet=()=>{
        this.ActionSheet.show();
    };

    clearImages=()=>{
        this.setState({
            images:[]
        });
        this.imagesPath = [];
    }

    select=(i)=>{
        //根据actionSheet的选择
        if (i == 1){
            ImagePicker.openCamera({
                cropping: true
            }).then(images => {
                this.setState({
                    images: images
                });
            });
        }else if(i==2){
            ImagePicker.openPicker({
                multiple: true,
                compressImageQuality:0.5  //图片压缩比例
            }).then(images => {
                this.setState({
                    images: images
                });
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'wrap',
        width: Util.windowSize.width,
    },
    imageView: {
        margin:3,
        borderColor:'#bdf0f0',
        borderWidth:1,
        borderRadius:13
    },
    image: {
        flex: 1,
        resizeMode:'cover',//stretch,cover,contain,center
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:14
    }
});