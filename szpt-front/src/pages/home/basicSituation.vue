<template>
  <div id="BasicSituation">
    <div class="basic_left">
      <div class="title" @click="resetMap">
        中等职业教育基本情况
      </div>
      <div class="map">
        <ChinaMap ref="chinaMap" @change="changeCity"></ChinaMap>
      </div>
    </div>
    <div class="basic_right">
      <div class="title">{{ cityName }}</div>
      <div class="right_table">
        <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <DataGrid :table-list="tableList"></DataGrid>
      </div>
    </div>
  </div>
</template>
<script>
import ChinaMap from '../../components/echarts/map/chinaMap.vue'
import DataGrid from "../../components/ui/dataGrid";
export default {
  components: {
    ChinaMap,
    DataGrid
  },
  mounted() {
    this.initTableList();
  },
  data() {
    return {
      cityName: '中国',
      tableList: {
        showIndex: true,
        thead: ["统计项", "数值"],
        tbody: [
          { desc: "中等职业学校总数", value: '0' },
          { desc: "已上报数据学校数及上报率", value: '0 / 0.00%' },
          { desc: "招生总数", value: "0" },
          { desc: "在校生总数", value: "0" },
          { desc: "专任教师总数", value: "0" },
          { desc: "学校占地面积及生均值（万m2 / m2）", value: "0.00 / 0" },
          { desc: "校建筑面积及生均值（万m2 / m2）", value: "0.00 / 0" },
          { desc: "学校教学、实习仪器设备资产值及生均值（万元 / 元）", value: "0.00 / 0" }
        ]
      }
    };
  },
  methods: {
    initTableList(){
      this.initRow1();  // 中等职业学校总数
      setTimeout(()=>{
        this.initRow2();  // 已上报数据学校数及上报率
      },200); // 延迟100毫秒
      this.initRow3();  // 招生总数
      this.initRow4();  // 在校生总数
      setTimeout(()=>{
        this.initRow6();  // 学校占地面积及生均值（万m2 / m2）
        this.initRow7();  // 校建筑面积及生均值（万m2 / m2）
        this.initRow8();  // 学校教学、实习仪器设备资产值及生均值（万元 / 元）
      },100); // 延迟100毫秒
      this.initRow5();  // 专任教师总数
    },
    // 中等职业学校总数
    initRow1(){
      this._defaultQuery('/school_count_by_p_and_c', {limit:"100"}, (data)=>{
        this.tableList.tbody[0].value = this.japUtils.getOneIntSum(data);
      });
    },
    // 已上报数据学校数及上报率
    initRow2(){
      let filters = [];
      filters.push({
        "tableColumn": "t_reported_data_record_report_state",
        "listFilter": '0,3',
        "tableType": "1",
        "inOrNot": "0"
      });
      if( this.cityName != '中国'){
        filters.push({
          tableColumn: "T_SCHOOL_PROVINCE",
          listFilter: this.cityName,
          tableType: "1",
          inOrNot: "0"
        });
      }
      this._defaultQuery('/home_basicSituation', {filters:filters}, (data)=>{
        let count = this.japUtils.getOneIntSum(data);
        let percent = count/Number.parseInt(this.tableList.tbody[0].value);
        this.tableList.tbody[1].value = count + "/" + (Number(percent*100).toFixed(2))+"%";
      });
    },
    // 招生总数
    initRow3(){
      this._defaultQuery('/recruit_students_count', {}, (data)=>{
        this.tableList.tbody[2].value = this.japUtils.getOneIntSum(data);
      });
    },
    // 在校生总数
    initRow4(){
      this._defaultQuery('/at_school_students_count', {}, (data)=>{
        this.tableList.tbody[3].value = this.japUtils.getOneIntSum(data);
      });
    },
    // 专任教师总数
    initRow5(){
      this._defaultQuery('/home_basicSituation_table5', {}, (data)=>{
        this.tableList.tbody[4].value = this.japUtils.getOneIntSum(data);
      });
    },
    // 学校占地面积及生均值（万m2 / m2）
    initRow6(){
      this._defaultQuery('/home_basicSituation_table6_7', {}, (data)=>{
        let count = this.japUtils.getOneFloatSum(data, 1);
        let average  = count/Number.parseInt(this.tableList.tbody[3].value);
        this.tableList.tbody[5].value = (count/10000).toFixed(2) + "/" + Number.parseInt(average);
      });
    },
    // 校建筑面积及生均值（万m2 / m2）
    initRow7(){
      this._defaultQuery('/home_basicSituation_table6_7', {}, (data)=>{
        let count = this.japUtils.getOneFloatSum(data, 2);
        let average  = count/Number.parseInt(this.tableList.tbody[3].value);
        this.tableList.tbody[6].value = (count/10000).toFixed(2) + "/" + Number.parseInt(average);
      });
    },
    // 学校教学、实习仪器设备资产值及生均值（万元 / 元）
    initRow8(){
      this._defaultQuery('/home_basicSituation_table8', {}, (data)=>{
        let count = this.japUtils.getOneFloatSum(data);
        let average  = count/Number.parseInt(this.tableList.tbody[3].value);
        this.tableList.tbody[7].value = (count/10000).toFixed(2) + "/" + Number.parseInt(average);
      });
    },
    resetMap(){
      this.$refs.chinaMap.resetMap();
    },
    changeCity(cityName){
      this.cityName = cityName;
      /* this.cityName = this.$refs.chinaMap.getCityName(); */
      this.initTableList();
    },
    getCityName() {
      return this.cityName;
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
        callback(jsonData.data.workTableDate);
      }, (response) => {
        // 响应错误回调
        console.error(response);
        alert('请求失败');
      });
    },
    getPostData(option) {
      let filters = [];
      if( this.cityName != '中国'){
        filters.push({
          tableColumn: "T_SCHOOL_PROVINCE",
          listFilter: this.cityName,
          tableType: "1",
          inOrNot: "0"
        });
      }
      let _default = {
        limit: "1",
        filters: filters
      };
      return $.extend(_default, option);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../commen/css/home/basicSituation';
</style>


