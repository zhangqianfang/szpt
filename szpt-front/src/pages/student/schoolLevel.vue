<template>
  <div id="allDaySchool">
    <Headers :header-data="headerData"></Headers>
    <div class="receipts_left">
      <Title :title-name="titleName"></Title>
      <div class="work_ranking">
        <div>
          <span class="style2">{{totalNum}}</span>
          <span class="style3">个</span>
        </div>
      </div>
      <div class="work_map">
        <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <BarCharts :x-data="xData" :y-data="yData" echart-id="alldaySchool" @chartsClick="chartsClick"></BarCharts>
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
  import { HTTP_ROOT, PAGE_SIZE} from '../../utils/value-consts';
  import {getGridParams, getNeedGridInfo, getCommonParams} from '../../utils/common';
  import BarCharts from '../../components/barCharts';
  export default {
    data() {
      return {
        titleName: { name: '按学校等级分的在校生分布情况' },
        titleName1: { name: '' },
        headerData: { name: '按学校等级分的在校生分布情况' },
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校名称","学校代码","学生数"],
          tbody: []
        },
        paginationShow: true,
        page: {
          'total': 10,
          'currentPage': 1,
          'pageSize': PAGE_SIZE
        },
        cityName: ''
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/SchoolGradeNum_Demon',
        params: getCommonParams(),
        successCallback: function (data) {
          let xyData=this.getYdataByAdd(data.workTableDate,'TREPORTDATA1_VALUE10','TREPORTDATA5_VALUE2','TREPORTDATA5_VALUE16','示范学校');
          http.api({
            url: HTTP_ROOT + '/api/jap/SchoolGradeNum_Important',
            params: getCommonParams(),
            successCallback: function (data) {
              let {xData,yData} =this.getYdataByAdd(data.workTableDate,'TREPORTDATA1_VALUE13','TREPORTDATA5_VALUE2','TREPORTDATA5_VALUE16','重点中专');
              this.xData = xyData.xData.concat(xData);
              this.yData = xyData.yData.concat(yData);
              this.totalNum = this.yData.reduce((acc,value) => parseInt(acc)+parseInt(value),0);
              this.getGridInfo(this.xData[0]);
            }.bind(this)
          })
        }.bind(this)
      })
    },
    methods: {
      handlePageChange: function (currentPage) {
        console.log(currentPage);
        //this.page.currentPage = currentPage;
        this.getGridInfo(this.cityName,{currentPage: currentPage});
      },
      chartsClick: function (name) {
        this.cityName = name;
        this.page.currentPage = 1;
        this.paginationShow = false;
        this.getGridInfo(name);
      },
      getYdataByAdd: function (data,xcolumnName,addColumn,addedColumn,name) {
        let allInfo =JSON.parse(data);
        let xData=[],yData = [];
        allInfo.forEach(p => {
          let addNum = 0,addedNum = 0;
          p.forEach(x => {
            if (x.columnName === xcolumnName)
              xData.push(x.value+name);

            if (x.columnNameCn === addColumn)
              addNum = x.value;
            if (x.columnName === addedColumn)
              addedNum = x.value;
          })
          yData.push(parseInt(addNum)+parseInt(addedNum));
        })
        return {xData,yData}
      },
      getParams: function (tableColumn,listFilter,limit=10000,) {
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
      getNeedGridByAdd: function (data,columnName1,columnName2,columnName3,columnName4) {
        let allInfo = JSON.parse(data);
        let needGridList = []
        allInfo.forEach(p => {
          let needGridInfo = {};
          let addNum= 0,addedNum = 0;
          p.forEach(x=>{
            if (x.columnName === columnName1)
              needGridInfo.name = x.value;

            if (x.columnName === columnName2)
              needGridInfo.statistical = x.value;

            if (x.columnName === columnName3)
              addNum = x.value;

            if (x.columnName === columnName4)
              addedNum = x.value;
          })
          needGridInfo.value = parseInt(addedNum)+parseInt(addNum);
          needGridList.push(needGridInfo);
        })
        return needGridList;
      },
      getGridInfo: function (cityName,page={currentPage: 1}) {
        this.titleName1.name = cityName;
        let params;
        if (cityName.endsWith('示范学校')){
          params = getGridParams('TREPORTDATA1_VALUE10',cityName.substr(0,cityName.indexOf('示范学校')),page.currentPage);
        } else if (cityName.endsWith('重点中专')) {
          params = getGridParams('TREPORTDATA1_VALUE13',cityName.substr(0,cityName.indexOf('重点中专')),page.currentPage);
        }
        http.api({
          url: HTTP_ROOT + '/api/jap/SchoolGradeNumGrid',
          params,
          successCallback: function (data) {
            this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value)
            this.tableList.tbody = this.getNeedGridByAdd(data.workTableDate,"TREPORTDATA1_VALUE2","TREPORTDATA1_VALUE1","TREPORTDATA5_VALUE2",'TREPORTDATA5_VALUE16')
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
  #allDaySchool {
    .receipts_left {
      display: inline-block;
      width: 60%;
      padding-left: 50px;
      box-sizing: border-box;
      .work_ranking {
        background: linear-gradient(
            180deg,
            rgba(23, 76, 145, 1) 0%,
            rgba(23, 76, 145, 1) 0%,
            rgba(6, 14, 62, 1) 53%,
            rgba(23, 76, 145, 1) 100%,
            rgba(23, 76, 145, 1) 100%
        );
        display: flex;
        justify-content: center;
        height: 60px;
        width: 300px;
        margin: 20px 0px;
        padding: 0 30px;
        box-sizing: border-box;
        span {
          padding: 0 8px;
        }
        .style1 {
          color: #fff;
          font-size: 18px;
          display: inline-block;
          /* vertical-align: middle; */
          line-height: 60px;
          height: 60px;
          vertical-align: top;
        }
        .style2 {
          color: #fff;
          font-weight: 700;
          font-size: 48px;
          color: #fcf042;
          height: 60px;
          line-height: 66px;
          border-bottom: 1px solid #0066cc;
        }
        .style3 {
          color: #fcf042;
          font-size: 14px;
        }
      }
      .work_map {
        border: 1px solid #24378e;
        margin-top: 30px;
        width: 95%;
        box-sizing: border-box;
        padding: 20px 20px 60px;
        position: relative;
        text-align: center;
        span {
          position: absolute;
          display: block;
          width: 33px;
          height: 33px;
        }
        .left {
          border-top: 3px solid #2789e4;
          left: -2px;
          border-left: 3px solid #2789e4;
          top: -2px;
        }
        .right {
          border-top: 3px solid #2789e4;
          right: -2px;
          border-right: 3px solid #2789e4;
          top: -2px;
        }
        .left_bottom {
          border-bottom: 3px solid #2789e4;
          left: -2px;
          border-left: 3px solid #2789e4;
          bottom: -2px;
        }
        .right_bottom {
          border-bottom: 3px solid #2789e4;
          right: -2px;
          border-right: 3px solid #2789e4;
          bottom: -2px;
        }
        .echarts{
          z-index: 1000;
        }
        table {
          width: 100%;
          text-align: center;
          thead {
            line-height: 45px;
            td {
              font-size: 22px;
              color: #76fcff;
            }
          }
          tbody {
            border-top: 1px solid #2a5fd9;
            border-left: 1px solid #2a5fd9;
            tr {
              line-height: 50px;
            }
            td {
              border-right: 1px solid #2a5fd9;
              border-bottom: 1px solid #2a5fd9;
            }
          }
        }
      }
    }
    .receipts_right {
      display: inline-block;
      width: 40%;
      vertical-align: top;
    }
  }
</style>

