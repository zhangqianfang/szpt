<template>
  <div id="mainDiv">
    <Headers :header-data="headerData"></Headers>
    <div class="receipts_left">
      <Title :title-name="titleName"></Title>
      <div class="work_ranking">
        <div>
          <span class="style2">{{totalNum}}</span>
          <span class="style3">万㎡</span>
        </div>
      </div>
      <div class="work_map">
        <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <BarCharts :x-data="xData" :y-data="yData" echart-id="barChart" @chartsClick="chartsClick"></BarCharts>
      </div>
    </div>
    <div class="receipts_right">
      <Title :title-name="titleName1"></Title>
      <DataCollTableity :table-list="tableList" @handlePageChange="handlePageChange" :page="page" :pagination-show="paginationShow"></DataCollTableity>
    </div>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import Title from "../../components/title";
  import DataCollTableity from "../../components/dataCollTablePage";
  import http from '../../http';
  import { HTTP_ROOT,PAGE_SIZE} from '../../utils/value-consts';
  import {getXyData, getNeedGridInfo, getCommonParams, getGridParams} from '../../utils/common';
  import BarCharts from '../../components/barCharts';
  export default {
    data() {
      return {
        titleName: { name: "教学行政用房总面积" },
        titleName1: { name: "" },
        headerData: { name: "教学行政用房总面积" },
        totalNum: '',
        xData: [],
        yData: [],
        paginationShow: true,
        page: {
          'total': 10,
          'currentPage': 1,
          'pageSize': PAGE_SIZE
        },
        cityName: '',
        tableList: {
          thead: ["学校代码","学校名称","行政用房总面积(万㎡)"],
          tbody: []
        },
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/BuildAdminArea_Bar',
        params: getCommonParams(),
        successCallback: function (data) {
          let {xData, yData} = this.getYdataByAdd(data.workTableDate,'T_SCHOOL_CITY','TREPORTDATA9_VALUE5','TREPORTDATA9_VALUE11');
          this.getGridInfo(xData[0]);
          this.xData = xData;
          this.yData = yData;
          this.totalNum = ((yData.reduce((acc,value)=>parseInt(acc)+parseInt(value),0))).toFixed(2);
          this.cityName = xData[0]
        }.bind(this)
      })
    },
    methods: {
      chartsClick: function (name) {
        this.cityName = name;
        this.page.currentPage = 1;
        this.paginationShow = false;
        this.getGridInfo(name);
      },
      handlePageChange: function (currentPage) {
        console.log(currentPage);
        //this.page.currentPage = currentPage;
        this.getGridInfo(this.cityName,{currentPage: currentPage});
      },
      getParams: function (tableColumn,listFilter,limit = 100000) {
        return {
          "limit":limit,
          "filters":[
            {
              "tableName": "",
              "tableColumn":tableColumn,
              "listFilter":listFilter,
              "tableType":"1",
              "inOrNot":"0"
            }
          ]
        }
      },
      getYdataByAdd: function (data,xcolumnName,addColumn,addedColumn) {
        let allInfo =JSON.parse(data);
        let xData=[],yData = [];
        allInfo.forEach(p => {
          let addNum = 0,addedNum = 0, divideNum = 0;
          p.forEach(x => {
            if (x.columnName === xcolumnName)
              xData.push(x.value);

            if (x.columnName === addColumn)
              addNum = x.value;

            if (x.columnName === addedColumn)
              addedNum = x.value;
          })
          yData.push(((parseInt(addNum)+parseInt(addedNum))/10000).toFixed(2));
        })
        return {xData,yData}
      },
      getNeedGridInfoByAdd: function (data,columnName1,columnName2,addColumn,addedColumn) {
        let allInfo = JSON.parse(data);
        let needGridList = []
        allInfo.forEach(p => {
          let needGridInfo = {};
          let addNum =0,addedNum = 0,dividend =1;
          p.forEach(x=>{
            if (x.columnName === columnName1)
              needGridInfo.name = x.value;

            if (x.columnName === columnName2)
              needGridInfo.statistical = x.value;

            if (x.columnName === addColumn)
              addNum = parseFloat(x.value);

            if (x.columnName === addedNum)
              addedNum = parseFloat(x.value);
          })
          needGridInfo.value = ((addNum+addedNum)/10000).toFixed(2);
          needGridList.push(needGridInfo);
        })
        return needGridList;
      },
      getGridInfo: function (cityName,page={currentPage: 1}) {
        this.titleName1.name = cityName;
        http.api({
          url: HTTP_ROOT + '/api/jap/BuildAdminArea_Grid',
          params: getGridParams("T_SCHOOL_CITY",cityName,page.currentPage),
          successCallback: function (data) {
            this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value)
            this.tableList.tbody = this.getNeedGridInfoByAdd(data.workTableDate,"TREPORTDATA1_VALUE1","TREPORTDATA1_VALUE2","TREPORTDATA9_VALUE5",'TREPORTDATA9_VALUE11')
            this.$nextTick(function () {
              this.paginationShow = true
            })
          }.bind(this)
        })
      }
    },
    components: {
      Headers,
      Title,
      DataCollTableity,
      BarCharts
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../commen/css/barGridCommon';
</style>

