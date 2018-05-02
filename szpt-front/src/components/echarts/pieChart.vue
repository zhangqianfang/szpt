<!-- 自定义 echart 组件 -->
<template>
  <div>
    <!-- echart表格 -->
    <div :id="chartId" :style="echartStyle" class="pieChart"></div>
  </div>
</template>
 
<script>
import PieChart from '../../utils/js/echarts/color/pieCharts.js';
export default {
  props: {
    chartId: {
      type: String,
      default: 'pieChart'
    },
    // 样式
    echartStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标题文本
    titleText: {
      type: String,
      default: ''
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
    // 饼图半径(第一项内半径，第二项外半径)
    radius: {
      type: Array,
      default() {
        return ['0%', '65%']
      }
    },
    // 设置饼的圆心坐标,不设置就会默认在中心的位置
    center: {
      type: Array,
      default() {
        return ['50%', '50%']
      }
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
    // 扇形区域数据
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
      this.drawPie();
    })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
      // 向父组件传值
      this.$emit("currentEchartData", param.name);
    },
    // 绘制饼状图
    drawPie(){
      this.charts = this.$echarts.init(document.getElementById(this.chartId));
      this.charts.on("click", this.eConsole);
      let pieOption = this.getPieOption();
      this.charts.setOption(pieOption);
    },
    getPieOption(){
      let pieOption = {};
      if(this.titleText != ''){
        pieOption.title = {
          text: this.titleText, // 标题文本
          left: 'center'
        }
      }
      if(this.tooltipFormatter != ''){
        pieOption.tooltip = {
          trigger: 'item',
          formatter: this.tooltipFormatter
        }
      }else{
        pieOption.tooltip = {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        }
      }
      if(!this.showLegend){
        pieOption.legend = {
          show: false
        }
      }else{
        pieOption.legend = this.legend;
      }
      pieOption.series = [
        {
          name: this.seriesName,  // 提示框标题
          type: 'pie', // 类型 pie表示饼图
          radius : this.radius, // 饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是饼,不是环形
          center: this.center, // 设置饼的圆心坐标,不设置就会默认在中心的位置
          selectedMode: 'single',
          data: this.opinionData, // 扇形区域数据
          label: { // 饼图图形上的文本标签
              normal: {
                  show: true,
                  position: 'outer', // 标签的位置
                  textStyle: {
                      fontWeight: 500 ,
                      fontSize: 16 // 文字的字体大小
                  },
                  formatter: '{b} \n{d}%'
              }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = PieChart.colorArray;
                return colorList[params.dataIndex%5];
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      return pieOption;
    }
  },
  watch: {
    opinionData: function (val, oldVal) {
      this.drawPie();
    }
  }
}
</script>
 
<style lang="scss" scoped>
  .pieChart{
    width: 100%;
    z-index: 99999999;
  }
</style>