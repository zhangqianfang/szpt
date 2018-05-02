<template>
  <div class="bar">
      <div :id="echartId" style="width: 100%;height:500px;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  import {color1,color2,color3,color4} from '../utils/color'
  export default {
    data () {
      return {
        myEcharts: {},
        echartsOption:{
          tooltip: {},

          xAxis: {
            //data: this.xData,
            data: [1,2,3,4,5,6],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(42, 95, 207, 1)',
                width: 1
              }
            }
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(42, 95, 207, 1)',
                width: 1
              }
            },
            splitLine: {
              show: true,
              lineStyle:
                {
                  color: ['#24378e'],
                  width: 1,
                  type: 'solid'
                }
            }
          },
          series: [{
            name: '',
            type: 'bar',
            barWidth: '40',
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                     color1, color2, color3, color4
                  ];
                  return colorList[params.dataIndex%4]
                }
              }
            },
            data: [1,2,3,4,5,6]
          }]
        },
      };
    },
    props: {
      xData: {
        required: true
      },
      yData: {
        required: true
      },
      echartId: {
        type: String,
        required: true
      }
    },
    methods: {
      rePrintChart () {
        this.echartsOption.series[0].data = this.yData;
        this.echartsOption.xAxis.data= this.xData;
        this.myEcharts.setOption(this.echartsOption,true);
      }
    },
    mounted: function() {
      let div_ = document.getElementById(this.echartId);
      this.myEcharts=echarts.init(div_);
      this.myEcharts.on('click', function (params) {
        console.log(params)
        if (params.componentType === 'series') {
              console.log(params.name);
             this.$emit('chartsClick', params.name);
            }
        }.bind(this));
    },
    watch: {
      yData: function (val, oldVal) {
        console.log('change.....'+ oldVal);
        this.rePrintChart();
      }
    }
  };
</script>
<style scoped>

</style>
