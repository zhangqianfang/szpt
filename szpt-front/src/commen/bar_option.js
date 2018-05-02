let dataAxis = ['福建省', '上海市', '广东省', '四川省', '天津市', '浙江省', '湖北省', '河北省', '山东省'];
let data = [130000.7, 205000.7, 185000.7, 185000.7, 185000.7, 185000.7, 185000.7, 185000.7, 165700.3];
let yMax = 500;
let dataShadow = [];
import echarts from 'echarts'
import { color1, color2, color3, color4 } from '../utils/color'
export default {
    tooltip: {},
    title: {
        text: '',
        subtext: ''
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#2A5FD9'
            }
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#2A5FD9'
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: '#2A5FD9'
            }
        },
        axisLabel: {
            formatter: function(value) {
                var values = value
                return values

                // var values = value / 1000
                // return values + 'k'
            },
            textStyle: {
                color: '#fff',
                fontSize: '16px'
            }
        }
    },
    grid: {
        x: 50,
        y: 50,
        x2: 50,
        y2: 50
    },
    series: [{
        type: 'bar',
        itemStyle: {
            normal: {
                label: { show: true, position: 'top', color: '#fff' },
                color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                        color1, color2, color3, color4
                    ];
                    return colorList[params.dataIndex % 4]
                }
            },
            // normal: {
            //     label: { show: true, position: 'top', color: '#fff' },
            //     color: new echarts.graphic.LinearGradient(
            //         0, 0, 0, 1,
            //         [
            //             { offset: 0, color: '#83bff6' },
            //             { offset: 0.5, color: '#188df0' },
            //             { offset: 1, color: '#188df0' }
            //         ]
            //     )
            // },
            emphasis: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ]
                )
            }
        },
        data: data
    }]
}