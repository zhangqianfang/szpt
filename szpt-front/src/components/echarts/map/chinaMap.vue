<template>
  <div id="chinaMap" style="height:521px;"></div>
</template>
<script>
import option from '../../../utils/js/echarts/map/map-option'  // 引入配置项
import cityMap from '../../../utils/js/echarts/map/cityMap'

export default {
  mounted() {
    this.drawMap('china');  // 初始化中国地图
  },
  methods:{
    drawMap(city) {
      //console.log(city);
      this.city = city;
      let url = `./static/json/echarts/map/${city}.json`;
      this.$http.get(url).then((response) => {
        // 响应成功回调
        //console.log(response.data);
        let json = response.data;
        if (json == undefined || json == NaN || json == null) {
            return;
        }
        // 加载地图数据
        let mapChart = this.$echarts.init(document.getElementById('chinaMap'));
        this.bindMapEvent(mapChart);
        this.$echarts.registerMap(this.city, json);
        option.series[0].map = city;
        //console.log(option);
        mapChart.setOption(option);
        window.onresize = function () {
            mapChart.resize();
        };
      }, (response) => {
        // 响应错误回调
        alert('加载全国地图失败');
      });
    },
    resetMap(){
      this.drawMap('china');  // 初始化中国地图
    },
    bindMapEvent(myChart){
      // 地图省份绑定单击事件
      //myChart.off('click');
      myChart.on('click', params => {
          //console.log(params.name);
          if(cityMap[params.name]){
            this.cityName = params.name;
            this.drawMap(cityMap[params.name].pinyin);
            this.$emit('change', cityMap[params.name].desc);
          }
        //   setTimeout(() => {
        //       this.resetMap();
        //   }, 2000);
      });
    },
    getCity(){
        return this.city;
    },
    getCityName(){
        return this.cityName;
    }
  },
  data(){
      return {
          "city": "china",
          "cityName": "中国"
      }
  }
}
</script>

<style scoped>
  #chinaMap {
    z-index: 99999999;
  }
</style>
