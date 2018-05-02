<!-- 自定义 echart 组件 -->
<template>
  <div>
    <!-- echart表格 -->
    <div :id="chartId" :style="echartStyle" class="barChart"></div>
  </div>
</template>
 
<script>
import LinearGradient from '../../utils/js/echarts/color/linearGradient';
export default {
  props: {
    chartId: {
      type: String,
      default: 'barChart'
    },
    // 样式
    echartStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标题文本
    title: {
      type: Object,
      default() {
        return {}
      }
    },
    // 提示框键名
    tooltipFormatter: {
      type: String,
      default: ''
    },
    // 提示框标题
    seriesName: {
      type: String,
      default: ''
    },
    // 显示图例组件
    showLegend: {
      type: Boolean,
      default: true
    },
    // 图例组件
    legend: {
      type: Object,
      default(){
        return {}
      }
    },
    // 图形上的文本标签
    label: {
      type: Object,
      default(){
        return {}
      }
    },
    // X轴区域，必填
    xAxis: {
      type: Object,
      default(){
        return {}
      }
    },
    // y轴区域，选填
    yAxis: {
      type: Object,
      default(){
        return {}
      }
    },
    // 图表的位置
    grid:{
      type: Object,
      default(){
        return {}
      }
    },
    // 区域数据
    opinionData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {}
  },
  mounted(){
    this.$nextTick(function() {
      this.drawBar();
    })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
      // 向父组件传值
      this.$emit("currentEchartData", param.name);
    },
    // 绘制饼状图
    drawBar(){
      this.charts = this.$echarts.init(document.getElementById(this.chartId));
      this.charts.on("click", this.eConsole);
      let option = this.getOption();
      this.charts.setOption(option);
    },
    getOption(){
      let option = {};
      if(JSON.stringify(this.title) !== "{}"){
        option.title = this.title;
      }
      if(this.tooltipFormatter != ''){
        option.tooltip = {
          trigger: 'item',
          formatter: this.tooltipFormatter
        }
      }else{
        option.tooltip = {
          trigger: 'item',
          formatter: "{b}: {c}"
        }
      }
      if(!this.showLegend){
        option.legend = {
          show: false
        }
      }else{
        option.legend = this.legend;
      }
      option.xAxis = this.xAxis;
      if(JSON.stringify(this.yAxis) == "{}"){
        option.yAxis = {
          type: 'value'
        }
      }else{
        option.yAxis = this.yAxis;
      }
      option.series = [
        {
          name: this.seriesName,  // 提示框标题
          type: 'bar', // 类型 bar表示柱状图
          data: this.opinionData, // 区域数据
          label: this.label, // 图形上的文本标签
          barWidth: 40,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = LinearGradient.colorArray;
                return colorList[params.dataIndex%4];
              }
            }
          }
        }
      ]
      option.grid=this.grid
      return option;
    }
  },
  watch: {
    opinionData: function (val, oldVal) {
      // console.log(val);
      this.$nextTick(function() {
        this.drawBar();
      });
    }
  }
}
</script>
 
<style lang="scss" scoped>
  .barChart{
    width: 100%;
    z-index: 99999999;
  }
</style>