<!--学校专业开设平均数-->
<template>
  <div id="schoolMajorNumAvgDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="schoolMajorNumAvgEcharts"
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
        titleName: {name: "学校专业开设平均数"},
        titleName1: {name: ""},
        headerData: {name: "学校专业开设平均数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校代码", "学校名称", "专业数量"],
          tbody: []
        },
      };
    },
    methods: {
      chartsClick: function (name) {
        this.getGridInfo(name);
      },
      getXyData: function (data, xColumnName, yColumnName, zColumnName) {
        let allInfo = JSON.parse(data);
        let xData = [], yData = [], zData = []
        allInfo.forEach(p => {
          p.forEach(x => {
            let sumData = 0;
            let countData = 0;
            if (x.columnName === xColumnName)
              xData.push(x.value);
            if (x.columnName === yColumnName)
              yData.push(x.value);
            if (x.columnName === zColumnName)
              zData.push(x.value);
          })
        })
        return {xData, yData, zData}
      },
      getGridInfo: function (cityName) {
        this.titleName1.name = cityName;
        http.api({
          url: HTTP_ROOT + '/api/jap/majorCon_schoolMajorNumAvg_infoList',
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
              },
            ]
          },
          successCallback: function (data) {
            this.tableList.tbody = getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "COUNT1")
          }.bind(this)
        })
      }
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_schoolMajorNumAvg_city',
        params: {
          "limit": 0,
          "filters": [
            {
              "tableName": "",
              "tableColumn": "T_SCHOOL_PROVINCE",
              "listFilter": defaultValue.provinceName,
              "tableType": "1",
              "inOrNot": "0"
            },
          ]
        },
        successCallback: function (data) {
          let {xData, yData, zData} = this.getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1', 'T_SCHOOL_SCHOOL_CODE');
          let ySeries = [];
          for (var i = 0; i < yData.length; i++) {
            ySeries.push((yData[i] / zData[i]).toFixed(2));
          }
          this.xData = xData;
          this.yData = ySeries;
          this.getGridInfo(xData[0]);
        }.bind(this)
      })

      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_schoolMajorNumAvg_province',
        params: {
          "limit": 0,
          "filters": [
            {
              "tableName": "",
              "tableColumn": "T_SCHOOL_PROVINCE",
              "listFilter": defaultValue.provinceName,
              "tableType": "1",
              "inOrNot": "0"
            }
          ]
        },
        successCallback: function (data) {
          let {xData, yData, zData} = this.getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1', 'T_SCHOOL_SCHOOL_CODE');
          this.totalNum = (yData[0] / zData[0]).toFixed(2);
        }.bind(this)
      })
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
  #schoolMajorNumAvgDiv {
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


