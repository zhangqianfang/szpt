<template>
  <div id="appReceipts">
    <Headers :header-data="titleName"></Headers>
      <div class="receipts_left">
        <Title :title-name="titleName"></Title>
        <div class="work_ranking">
          <span class="style1"></span>
          <span class="style2">{{ totalCount }}</span>
          <span class="style3">人天</span>
        </div>
        <div class="work_map">
          <span class="left"></span>
          <span class="right"></span>
          <span class="left_bottom"></span>
          <span class="right_bottom"></span>
          <div class="title">{{ chartTitle }}</div>
          <div class="receipts">
            <BarChart ref="barChart" :title="barChart.title" :showLegend="false"
                  :xAxis="barChart.xAxis" :yAxis="barChart.yAxis" :label="barChart.label"
                  :opinionData="barChart.opinionData" :echartStyle="chartStyle"
                  @currentEchartData="getDetailByCity"></BarChart>
          </div>
        </div>
      </div>
      <div class="receipts_right">
        <Title :title-name="gridTitle"></Title>
        <div id="data_coll_table">
          <span class="left"></span>
          <span class="right"></span>
          <span class="left_bottom"></span>
          <span class="right_bottom"></span>
          <DataGrid :table-list="tableList"></DataGrid>
          <Page @changePage="changePage" :page="page"></Page>
        </div>
     </div>
  </div>
</template>
<script>
import Headers from "../../components/header";
import Title from "../../components/title";
import DataGrid from "../../components/ui/dataGrid";
import Page from "../../components/ui/pagination";
import BarChart from "../../components/echarts/barChart";
import BarChartOption from "../../utils/js/echarts/option/barChartOption"
export default {
  components: {
    Headers, Title,
    DataGrid, Page,
    BarChart
  },
  data() {
    let barChartOption = BarChartOption;
    barChartOption.title.text = '总数（单位：人天）';
    return {
      titleName: { name: "学校为企业年培训员工数" },
      gridTitle: { name: this.global.localCityName },
      cityName: this.global.localCityName,
      page: this.pageUtils.getPage(),
      totalCount: 0,
      chartTitle: '培训员工数情况',
      barChart: barChartOption,
      chartStyle: {
        height: ""
      },
      tableList: {
        thead: ["所在区域", "学校名称", "学校代码", "培训总数"],
        tbody: []
      }
    };
  },
  created() {
    // 获取屏幕高度
    this.chartStyle.height = "400px";
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.initTotalCount();
      this.initChart();
    },
    initTotalCount(){
      this._defaultQuery('/socialWork_areaDataCollect_table3', {limit:"100"}, (data)=>{
        this.totalCount = this.japUtils.getOneIntSum(data.workTableDate);
      });
    },
    initChart(){
      this._defaultQuery('/socialWork_trainingStaffFBY_echart', {limit:"100"}, (data)=>{
        [this.barChart.xAxis.data, this.barChart.opinionData] = this.japUtils.getEchartValue(data.workTableDate);
        this.cityName = this.barChart.xAxis.data[0];
        this.initTable(this.cityName);
      });
    },
    initTable(cityName, page = {pageNo:1,limit:this.page.pageSize}){
      let option = {
        limit: page.limit,
        filters: [{
          tableColumn: "T_SCHOOL_CITY", listFilter: cityName,
          tableType: "1", inOrNot: "0"
        }]
      }
      this._defaultQuery('/socialWork_trainingStaffFBY_detail', option, (data)=>{
        this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value);
        this.tableList.tbody = this.japUtils.getTableValue(data.workTableDate, [0,1,2,3], ['v1','v2','v3','v4']);
      });
    },
    getDetailByCity(name){
        this.cityName = name;
        this.gridTitle.name = name;
        this.page.pageNo = 1;
        this.initTable(this.cityName);
    },
    changePage(pageInfo){
        this.initTable(this.cityName, pageInfo);
    },
    _defaultQuery(moduleUrl, postOption = {limit:"100"}, callback){
      let url = this.global.japApiPath + moduleUrl;
      //console.log(this.cityName);
      var postData = this.getPostData(postOption);
      //console.log(postData);
      this.$http.post(url, postData).then((response) => {
        // 响应成功回调
        //console.log(response.data);
        let jsonData = response.data;
        if (jsonData == undefined || jsonData == null || jsonData.success != true) {
            return;
        }
        callback(jsonData.data);
      }, (response) => {
        // 响应错误回调
        console.error(response);
        alert('请求失败');
      });
    },
    getPostData(option) {
      let _default = {
        limit: "100",
        filters: [
          {
            tableColumn: "T_SCHOOL_PROVINCE",
            listFilter: this.cityName,
            tableType: "1",
            inOrNot: "0"
          }
        ]
      };
      return $.extend(_default, option);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../commen/css/socialWork/appReceipts';
  @import '../../commen/css/common/dataCollTable';
</style>