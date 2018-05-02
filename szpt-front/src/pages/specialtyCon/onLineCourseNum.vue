<!--上网课程总数-->
<template>
  <div id="onLineCourseNumDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="onLineCourseNumEcharts"
                   @chartsClick="chartsClick"></BarCharts>
      </div>
    </div>
    <div class="receipts_right">
      <Title :title-name="titleName1"></Title>
      <DataCollTableity :table-list="tableList"></DataCollTableity>
    </div>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import Title from "../../components/title";
  import DataCollTableity from "../../components/dataCollTable";
  import {HTTP_ROOT} from '../../utils/value-consts';
  import {getXyData, getNeedGridInfo} from '../../utils/common';
  import BarCharts from '../../components/barCharts';
  import http from '../../http';
  import defaultValue from '../constant.js'

  export default {
    data() {
      return {
        titleName: {name: "上网课程总数"},
        titleName1: {name: ""},
        headerData: {name: "上网课程总数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校代码", "学校名称", "上网课程数"],
          tbody: []
        },
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_onLineCourseNum_city',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          let {xData, yData} = getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'TREPORTDATA12_VALUE6');
          this.xData = xData;
          for (var i = 0; i < yData.length; i++) {
            yData[i] = parseInt(yData[i]);
          }
          this.yData = yData;
          this.getGridInfo(xData[0]);
        }.bind(this)
      })
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_onLineCourseNum_province',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          let {xData, yData} = getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'TREPORTDATA12_VALUE6');
          this.totalNum = parseInt(yData[0]);
        }.bind(this)
      })
    },
    methods: {
      chartsClick: function (name) {
        this.getGridInfo(name);
      },
      getParams: function (tableColumn, listFilter, limit = 10000,) {
        return {
          "limit": limit,
          "filters": [
            {
              "tableName": "",
              "tableColumn": tableColumn,
              "listFilter": listFilter,
              "tableType": "1",
              "inOrNot": "0"
            }
          ]
        }
      },
      getGridInfo: function (cityName) {
        this.titleName1.name = cityName;
        http.api({
          url: HTTP_ROOT + '/api/jap/majorCon_onLineCourseNum_school',
          params: {
            "limit": 0,
            "filters": [
              {
                "tableName": "",
                "tableColumn": "T_SCHOOL_CITY",
                "listFilter": cityName,
                "tableType": "1",
                "inOrNot": "0"
              }, {
                "tableName": "",
                "tableColumn": "T_SCHOOL_PROVINCE",
                "listFilter": defaultValue.provinceName,
                "tableType": "1",
                "inOrNot": "0"
              }
            ]
          },
          successCallback: function (data) {
            var array = getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "TREPORTDATA12_VALUE6")
            for (var i = 0; i < array.length; i++) {
              array[i].value = parseInt(array[i].value);
            }
            this.tableList.tbody = array;
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
  }
</script>
<style lang="scss" scoped>
  #onLineCourseNumDiv {
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
        .echarts {
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


