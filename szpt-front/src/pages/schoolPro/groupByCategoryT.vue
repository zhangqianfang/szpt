<template>
  <div id="appReceipts">
     <Headers :header-data="titleName"></Headers>
     <div class="receipts_left">
       <Title :title-name="titleName"></Title>
       <div class="work_map" style="margin-top:40px;">
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
    barChartOption.xAxis.data = ['普通中等职业学校','职业高中','技工学校','成人中等专业学校','其他']
    barChartOption.opinionData = [
        {name:'普通中等职业学校', value: 0},
        {name:'职业高中', value: 0},
        {name:'技工学校', value: 0},
        {name:'成人中等专业学校', value: 0},
        {name:'其他', value: 0}
    ]
    return {
      titleName: { name: "按学校类别分的中职学校总数" },
      gridTitle: { name: this.global.localCityName },
      paramName: '',
      page: this.pageUtils.getPage(),
      chartTitle: '学校分布情况',
      barChart: barChartOption,
      chartStyle: {
        height: ""
      },
      tableList: {
        thead: ["所在区域", "学校名称", "学校代码", "类别"],
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
        this.initChart();
    },
    initChart(){
      this._defaultQuery('/schoolPro_groupByCategoryT_echart', {limit:"100"}, (data)=>{
        let array = this.japUtils.getMapIntValue(data.workTableDate, ['普通中等职业学校','职业高中','技工学校','成人中等专业学校','其他']);
        [...this.barChart.opinionData] = [...array];
        this.paramName = this.barChart.xAxis.data[0];
        this.initTable(this.paramName);
      });
    },
    initTable(paramName, page = {pageNo:1,limit:this.page.pageSize}){
      let option = {
        limit: page.limit,
        filters: [{
          tableColumn: "TREPORTDATA1_VALUE9",
          listFilter: paramName,
          tableType: "1", inOrNot: "0"
        }]
      }
      this._defaultQuery('/schoolPro_getSchoolByCategoryOrOrganizer', option, (data)=>{
        this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value);
        this.tableList.tbody = this.japUtils.getTableValue(data.workTableDate, [0,1,2,3], ['name','statistical','value','value2']);
      });
    },
    getDetailByCity(name){
        this.paramName = name;
        this.page.pageNo = 1;
        this.initTable(this.paramName);
    },
    changePage(pageInfo){
        this.initTable(this.paramName, pageInfo);
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
  @import '../../commen/css/schoolPro/appReceipts';
  @import '../../commen/css/common/dataCollTable';
</style>