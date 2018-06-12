import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Platform,
    Text,
    View,
    Alert,
    processColor,
    TouchableOpacity,
    Linking,
} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

let myMsg = '';


export default class NeikongStructure extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            //下角的标识
            legend: {
                //下角的标识是否显示
                enabled: true,
                textColor: processColor('blue'),
                textSize: 12,
                /*RIGHT_OF_CHART,
                RIGHT_OF_CHART_CENTER,
                RIGHT_OF_CHART_INSIDE,
                BELOW_CHART_LEFT,
                BELOW_CHART_RIGHT,
                BELOW_CHART_CENTER ,
                PIECHART_CENTER
                */
                position: 'BELOW_CHART_CENTER',
                /*
                 SQUARE, CIRCLE or LINE
                */
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                //标识是否可以换行
                wordWrapEnabled: false,
                /*
                * supported only for BelowChartLeft, BelowChartRight, BelowChartCenter.
                * 最大size百分比（决定多长就换行）
                * */
                maxSizePercent: 0.5,
                custom: {
                    colors: [processColor('red'), processColor('blue'), processColor('green')],
                    labels: ['Company X', 'Company Y', 'Company Dashed']
                }
            },
            marker: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('teal'),
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
            }
        };
    }

    componentDidMount() {
        this.setState(
            update(this.state, {
                data: {
                    $set: {
                        dataSets: [{
                            values: [{y: 0.88}, {y: 0.77}, {y: 105}, {y: 115},{y: 85}, {y: 15}],
                            label: 'Com12312312 X',
                            config: {
                                //线的宽度
                                lineWidth: 2,
                                //每个节点是否为圆点显示
                                drawCircles: false,
                                //点击后，高亮（十字交叉）显示时，十字线的颜色
                                highlightColor: processColor('black'),
                                //线的颜色（processColor支持原声色值）
                                color: processColor('red'),
                                //是否填充线内的区域
                                drawFilled: true,
                                //填充线内的区域的颜色
                                fillColor: processColor('red'),
                                //填充线内的区域的颜色的透明度
                                fillAlpha:20,
                                //节点字体大小
                                valueTextSize: 15,
                                //节点字体格式化
                                valueFormatter: "##.000",
                                //是否是断线形式
                                dashedLine: {
                                    //断线中线的长度
                                    lineLength: 20,
                                    //断线中断的长度
                                    spaceLength: 20
                                }
                            }
                        }, {
                            values: [{y: 90}, {y: 130}, {y: 100}, {y: 105}],
                            label: 'Company Y',
                            config: {
                                lineWidth: 1,
                                drawCubicIntensity: 0.4,
                                circleRadius: 5,
                                drawHighlightIndicators: false,
                                color: processColor('blue'),
                                drawFilled: true,
                                fillColor: processColor('blue'),
                                fillAlpha: 45,
                                circleColor: processColor('blue')
                            }
                        }, {
                            values: [{y: 110}, {y: 105}, {y: 115}, {y: 110}],
                            label: 'Company Dashed',
                            config: {
                                color: processColor('green'),
                                drawFilled: true,
                                fillColor: processColor('green'),
                                fillAlpha: 50
                            }
                        }],
                    }
                },
                xAxis: {
                    $set: {
                        valueFormatter: ['1月', '2月', '3月', '4月','5月', '6月', '7月']
                    }
                }
            })
        );
    }
    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <Text style={styles.welcome}>
                    内控建设查询（包括人员信息查询，流程构建查询）
                </Text>
                <View style={{height:80}}>
                    <Text> selected entry</Text>
                    <Text> {this.state.selectedEntry}</Text>
                </View>

                <View style={styles.container}>
                    <LineChart
                        style={styles.chart}
                        data={this.state.data}
                        chartDescription={{text: ''}}
                        legend={this.state.legend}
                        marker={this.state.marker}
                        xAxis={this.state.xAxis}
                        drawGridBackground={false}
                        borderColor={processColor('teal')}
                        borderWidth={1}
                        drawBorders={true}

                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={true}
                        scaleXEnabled={true}
                        scaleYEnabled={true}
                        pinchZoom={true}
                        doubleTapToZoomEnabled={true}

                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}

                        keepPositionOnRotation={false}
                        onSelect={this.handleSelect.bind(this)}
                    />
                </View>

            </View>
        );
    }


    checkUpdate = ()=> {
        alert(myMsg);
    };
    checkClose = ()=> {
        console.log(myMsg);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    chart: {
        flex: 1
    }


});
