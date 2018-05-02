<!--兼职(课)教师总数-->
<template>
  <div id="partTimeTeacherNumDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="partTimeTeacherNumEcharts"
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
  import BarCharts from '../../components/barCharts';
  import http from '../../http';
  import defaultValue from '../constant.js'
  import {getXyData2, getNeedGridInfo2} from '../../utils/common';

  export default {
    data() {
      return {
        titleName: {name: "兼职(课)教师总数"},
        titleName1: {name: ""},
        headerData: {name: "兼职(课)教师总数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校代码", "学校名称", "兼职(课)教师总数"],
          tbody: []
        },
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/teacher_inSchoolPartTimeTeacherNum_city',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          var data1 = getXyData2(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
          http.api({
            url: HTTP_ROOT + '/api/jap/teacher_outSchoolPartTimeTeacherNum_city',
            params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
            successCallback: function (data) {
              var data2 = getXyData2(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
              http.api({
                url: HTTP_ROOT + '/api/jap/teacher_outSchoolTeacherNum_city',
                params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
                successCallback: function (data) {
                  var data3 = getXyData2(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
                  var index = -1;
                  for (var i = 0; i < data1.xData.length; i++) {
                    if ((index = data2.xData.indexOf(data1.xData[i])) > -1) {
                      data1.yData[i] = parseInt(data1.yData[i]) + parseInt(data2.yData[index]);
                      data2.xData.splice(index, 1);
                      data2.yData.splice(index, 1);
                    }
                  }
                  for (var i = 0; i < data2.xData.length; j++) {
                    data1.xData.push(data2.xData[i]);
                    data1.yData.push(data2.yData[i]);
                  }

                  for (var i = 0; i < data1.xData.length; i++) {
                    if ((index = data3.xData.indexOf(data1.xData[i])) > -1) {
                      data1.yData[i] = parseInt(data1.yData[i]) + parseInt(data3.yData[index]);
                      data3.xData.splice(index, 1);
                      data3.yData.splice(index, 1);
                    }
                  }
                  for (var i = 0; i < data3.xData.length; j++) {
                    data1.xData.push(data3.xData[i]);
                    data1.yData.push(data3.yData[i]);
                  }

                  this.xData = data1.xData;
                  this.yData = data1.yData;

                  this.getGridInfo(this.xData[0]);
                  this.totalNum = this.yData.reduce((acc, value) => acc + parseInt(value), 0);
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
          url: HTTP_ROOT + '/api/jap/teacher_outSchoolPartTimeTeacherNum_school',
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
            var array1 = getNeedGridInfo2(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", 'COUNT1')
            http.api({
              url: HTTP_ROOT + '/api/jap/teacher_inSchoolPartTimeTeacherNum_school',
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
                var array2 = getNeedGridInfo2(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", 'COUNT1')

                http.api({
                  url: HTTP_ROOT + '/api/jap/teacher_outSchoolTeacherNum_school',
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
                    var array3 = getNeedGridInfo2(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", 'COUNT1')

                    array2.reduce(function (acc, value) {
                      for (var i = 0; i < acc.length; i++) {
                        if (value.name == acc[i].name && value.statistical == acc[i].statistical) {
                          acc[i].value = parseInt(acc[i].value) + parseInt(value.value);
                          return acc;
                        }
                      }
                      acc.push(value);
                      return acc;
                    }, array1);

                    array3.reduce(function (acc, value) {
                      for (var i = 0; i < acc.length; i++) {
                        if (value.name == acc[i].name && value.statistical == acc[i].statistical) {
                          acc[i].value = parseInt(acc[i].value) + parseInt(value.value);
                          return acc;
                        }
                      }
                      acc.push(value);
                      return acc;
                    }, array1);

                    this.tableList.tbody = array1;
                  }.bind(this)
                })


              }.bind(this)
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
  }
</script>
<style lang="scss" scoped>
  #partTimeTeacherNumDiv {
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
