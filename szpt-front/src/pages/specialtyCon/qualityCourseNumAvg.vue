<!--精品课程平均数-->
<template>
  <div id="selfMadeBookNumDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="selfMadeBookNumEcharts"
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
        titleName: {name: "精品课程平均数"},
        titleName1: {name: ""},
        headerData: {name: "精品课程平均数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校代码", "学校名称", "精品课程数"],
          tbody: []
        },
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_qualityCourseNumAvg_province_schoolNum',
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
          var schoolData = getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'TREPORTDATA31_SCHOOL_ID');
          var schoolNum = schoolData.yData[0];
          http.api({
            url: HTTP_ROOT + '/api/jap/majorCon_qualityCourseNum_province',
            params: {
              "limit": 0,
              "filters": [
                {
                  "tableName": "",
                  "tableColumn": "T_SCHOOL_PROVINCE",
                  "listFilter": defaultValue.provinceName,
                  "tableType": "1",
                  "inOrNot": "0"
                }, {
                  "tableName": "",
                  "tableColumn": "TREPORTDATA31_VALUE15",
                  "listFilter": defaultValue.stateKey,
                  "tableType": "1",
                  "inOrNot": "0"
                },
              ]
            },
            successCallback: function (data) {
              var data1 = getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'COUNT1');
              var nationalValue = data1.yData[0];
              http.api({
                url: HTTP_ROOT + '/api/jap/majorCon_qualityCourseNum_province',
                params: {
                  "limit": 0,
                  "filters": [
                    {
                      "tableName": "",
                      "tableColumn": "T_SCHOOL_PROVINCE",
                      "listFilter": defaultValue.provinceName,
                      "tableType": "1",
                      "inOrNot": "0"
                    }, {
                      "tableName": "",
                      "tableColumn": "TREPORTDATA31_VALUE15",
                      "listFilter": defaultValue.provincePoint,
                      "tableType": "1",
                      "inOrNot": "0"
                    },
                  ]
                },
                successCallback: function (data) {
                  var data2 = getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'COUNT1');
                  var provinceValue = data2.yData[0];
                  http.api({
                    url: HTTP_ROOT + '/api/jap/majorCon_qualityCourseNum_province',
                    params: {
                      "limit": 0,
                      "filters": [
                        {
                          "tableName": "",
                          "tableColumn": "T_SCHOOL_PROVINCE",
                          "listFilter": defaultValue.provinceName,
                          "tableType": "1",
                          "inOrNot": "0"
                        }, {
                          "tableName": "",
                          "tableColumn": "TREPORTDATA31_VALUE15",
                          "listFilter": defaultValue.cityPonit,
                          "tableType": "1",
                          "inOrNot": "0"
                        },
                      ]
                    },
                    successCallback: function (data) {
                      var data3 = getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'COUNT1');
                      var cityValue = data3.yData[0];
                      this.xData = [defaultValue.stateKey, defaultValue.provincePoint, defaultValue.cityPonit];
                      this.yData = [(nationalValue / schoolNum).toFixed(2), (provinceValue / schoolNum).toFixed(2), (cityValue / schoolNum).toFixed(2)];
                      this.getGridInfo(this.xData[0]);
                      this.totalNum = this.yData.reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
                    }.bind(this)
                  })
                }.bind(this)
              })
            }.bind(this)
          })

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
          url: HTTP_ROOT + '/api/jap/majorCon_qualityCourseNum_school',
          params: {
            "limit": 0,
            "filters": [
              {
                "tableName": "",
                "tableColumn": "TREPORTDATA31_VALUE15",
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
            var array = getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "COUNT1")
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
  #selfMadeBookNumDiv {
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




