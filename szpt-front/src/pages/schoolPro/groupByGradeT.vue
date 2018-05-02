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
    barChartOption.xAxis.data = ['国家示范级','省级示范级','国家级重点中专','省级重点中专','其他']
    barChartOption.opinionData = [
        {name:'国家示范级', value: 0},
        {name:'省级示范级', value: 0},
        {name:'国家级重点中专', value: 0},
        {name:'省级重点中专', value: 0},
        {name:'其他', value: 0}
    ]
    return {
      titleName: { name: "按学校等级分的中职学校总数" },
      gridTitle: { name: this.global.localCityName },
      paramName: '',
      page: this.pageUtils.getPage(),
      chartTitle: '学校分布情况',
      barChart: barChartOption,
      chartStyle: {
        height: ""
      },
      tableList: {
        thead: ["所在区域", "学校名称", "学校代码", "示范类别"],
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
      this._defaultQuery('/schoolPro_groupByExemplarGrageT_echart', {limit:"100"}, (data)=>{
        let exemplarArray = this.japUtils.getMapIntValue(data.workTableDate, ['国家级','省市级','其他']);
        this._defaultQuery('/schoolPro_groupByImportantGrageT_echart', {limit:"100"}, (data2)=>{
            let importantArray = this.japUtils.getMapIntValue(data2.workTableDate, ['国家级','省市级','其他']);
            let option = this._getQueryOptionByParamName('其他', this.page);
            this._defaultQuery('/schoolPro_getSchoolByGrage', option, (data3)=>{
              // 查询示范级其他和重点级其他
              let otherCount = parseInt(JSON.parse(data3.pageInfo)[0][0].value);
              [...this.barChart.opinionData] = [exemplarArray[0],exemplarArray[1],importantArray[0],importantArray[1],otherCount];
              this.paramName = this.barChart.xAxis.data[0];
              this.initTable(this.paramName);
            });
        });
      });
    },
    initTable(paramName, page = {pageNo:1,limit:this.page.pageSize}){
      let option = this._getQueryOptionByParamName(paramName, page);
      this._defaultQuery('/schoolPro_getSchoolByGrage', option, (data)=>{
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
    _getQueryOptionByParamName(name, page){
        let option = {limit: page.limit}
        switch (name) {
            case '国家示范级':
                option.filters = [{
                  tableColumn: "TREPORTDATA1_VALUE10",
                  listFilter: '国家级',
                  tableType: "1", inOrNot: "0"
                }]
                break;
            case '省级示范级':
                option.filters = [{
                  tableColumn: "TREPORTDATA1_VALUE10",
                  listFilter: '省市级',
                  tableType: "1", inOrNot: "0"
                }]
                break;
            case '国家级重点中专':
                option.filters = [{
                  tableColumn: "TREPORTDATA1_VALUE13",
                  listFilter: '国家级',
                  tableType: "1", inOrNot: "0"
                }]
                break;
            case '省级重点中专':
                option.filters = [{
                  tableColumn: "TREPORTDATA1_VALUE13",
                  listFilter: '省市级',
                  tableType: "1", inOrNot: "0"
                }]
                break;
            default:
                option.filters = [{
                  tableColumn: "TREPORTDATA1_VALUE10",
                  listFilter: '其他',
                  tableType: "1", inOrNot: "0",
                  or: [{
                    tableColumn: "TREPORTDATA1_VALUE13",
                    listFilter: '其他',
                    tableType: "1", inOrNot: "0",
                  }]
                }]
                break;
        }
        return option;
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