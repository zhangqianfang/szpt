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
            { name: "面向社面向社会开展职业技能鉴定的情况会开展", value: "0人天" },
            { name: "面向社会开展技术培训的情况", value: "0人天" },
            { name: "学校为企业年培训员工数", value: "0人天" },
            { name: "校内专任教师获技术专利（技术发明）情况", value: "0个" }
          ]
        },
        cityName: this.global.localCityName
      };
    },
    mounted(){
      this.initTableList();
    },
    methods: {
      query(cityName){
        this.cityName = cityName;
        this.initTableList();
      },
      initTableList(){
        this.initRow1();
        this.initRow2();
        this.initRow3();
        this.initRow4();
      },
      // 面向社会开展职业技能鉴定的情况
      initRow1(){
        this._defaultQuery('/socialWork_areaDataCollect_table1', {limit:"100"}, (data)=>{
          let array = this.japUtils.getManyIntSum(data, [1,2]);
          this.tableList.tbody[0].value = (array[0]+array[1]) +"人天";
        });
      },
      // 面向社会开展技术培训的情况
      initRow2(){
        this._defaultQuery('/socialWork_areaDataCollect_table2', {limit:"100"}, (data)=>{
          this.tableList.tbody[1].value = this.japUtils.getOneIntSum(data)+"人天";
        });
      },
      // 学校为企业年培训员工数
      initRow3(){
        this._defaultQuery('/socialWork_areaDataCollect_table3', {limit:"100"}, (data)=>{
          this.tableList.tbody[2].value = this.japUtils.getOneIntSum(data)+"人天";
        });
      },
      // 校内专任教师获技术专利（技术发明）情况
      initRow4(){
        this._defaultQuery('/socialWork_areaDataCollect_table4', {limit:"100"}, (data)=>{
          this.tableList.tbody[3].value = this.japUtils.getOneIntSum(data)+"个";
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


