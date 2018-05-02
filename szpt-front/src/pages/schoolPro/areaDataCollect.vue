<template>
  <div id="dataCollection">
    <Headers :header-data="headerData"></Headers>
    <City ref="city" @query="query"></City>
    <div id="data_coll_table">
      <span class="left"></span>
      <span class="right"></span>
      <span class="left_bottom"></span>
      <span class="right_bottom"></span>
      <DataGrid :table-list="tableList"></DataGrid>
    </div>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import City from "../../components/CitySelect";
  import DataGrid from "../../components/ui/dataGrid";

  export default {
    components: {
      Headers,
      City,
      DataGrid
    },
    data() {
      return {
        headerData: { name: "区域数据汇总" },
        tableList: {
          showIndex: true,
          thead: ["数据项", "数值"],
          tbody: [
            { name: "中等职业学校总数", value: "0所" },
            { name: "已上报的中等职业学校总数", value: "0所" }
          ]
        },
        cityName: this.global.localCityName,
      };
    },
    mounted(){
      this.initTableList();
    },
    methods: {
      query(cityName){
        console.log(cityName);
        this.cityName = cityName;
        this.initTableList();
      },
      initTableList(){
        this.initRow1();  // 中等职业学校总数
        this.initRow2();  // 已上报的中等职业学校总数
      },
      // 中等职业学校总数
      initRow1(){
        this._defaultQuery('/school_count_by_p_and_c', {limit:"100"}, (data)=>{
          this.tableList.tbody[0].value = this.japUtils.getOneIntSum(data)+"所";
        });
      },
      // 已上报的中等职业学校总数
      initRow2(){
        let filters = [];
        filters.push({
          "tableColumn": "t_reported_data_record_report_state",
          "listFilter": '0,3',
          "tableType": "1",
          "inOrNot": "0"
        });
        let tableColumn = "T_SCHOOL_PROVINCE";
        if( this.cityName == null || this.cityName == ''){
          this.cityName = this.global.localCityName;
        }else if( this.cityName != this.global.localCityName){
          tableColumn = "T_SCHOOL_CITY";
        }
        filters.push({
          tableColumn: tableColumn,
          listFilter: this.cityName,
          tableType: "1",
          inOrNot: "0"
        });
        this._defaultQuery('/home_basicSituation', {filters:filters}, (data)=>{
          this.tableList.tbody[1].value = this.japUtils.getOneIntSum(data)+"所";
        });
      },
      getCityName(){
        return this.$refs.city.getValue();
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
        let filters;
        let tableColumn = "T_SCHOOL_PROVINCE";
        if( this.cityName == null || this.cityName == ''){
          this.cityName = this.global.localCityName;
        }else if( this.cityName != this.global.localCityName){
          tableColumn = "T_SCHOOL_CITY";
        }
        filters = [{
          tableColumn: tableColumn,
          listFilter: this.cityName,
          tableType: "1",
          inOrNot: "0"
        }];
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
  @import '../../commen/css/common/dataCollTable';
</style>


