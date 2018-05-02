<!--本地重点建设专业总数-->
<template>
  <div id="localKeyMajorNumDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="localKeyMajorNumEcharts"
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
  import {getXyData2, getNeedGridInfo} from '../../utils/common';
  import BarCharts from '../../components/barCharts';
  import http from '../../http';
  import defaultValue from '../constant.js'

  export default {
    data() {
      return {
        titleName: {name: "本地重点建设专业总数"},
        titleName1: {name: ""},
        headerData: {name: "本地重点建设专业总数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["学校代码", "学校名称", "国家级", "省级"],
          tbody: []
        },
      };
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
      getNeedGridInfo: function (data, columnName1, columnName2, columnName3) {
        var allInfo = JSON.parse(data);
        var needGridList = []
        var schoolData = []
        allInfo.forEach(p => {
          var needGridInfo = {};
          p.forEach(x => {
            if (x.columnName === columnName1) {
              needGridInfo.name = x.value;
              schoolData.push(x.value);
            }

            if (x.columnName === columnName2) {
              needGridInfo.statistical = x.value;
            }

            if (x.columnName === columnName3)
              needGridInfo.value = x.value;
          })
          needGridList.push(needGridInfo);
        })
        return {needGridList, schoolData};
      },
      getGridInfo: function (cityName) {
        this.titleName1.name = cityName;
        //先获取省级和国家级的数据和，然后分别获取省级和国家级数据
        http.api({
          url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNum_infoList',
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
              }, {
                "tableName": "",
                "tableColumn": "TREPORTDATA29_VALUE19",
                "listFilter": defaultValue.noneKey,
                "tableType": "1",
                "inOrNot": "1"
              },
            ]
          },
          successCallback: function (data) {
            var {needGridList, schoolData} = this.getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "COUNT1")
            let codes = "";
            for (var i = 0; i < schoolData.length; i++) {
              codes += schoolData[i] + ",";
            }
            codes = codes.substring(0, codes.length - 1);
            //获取国家级数据
            http.api({
              url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNum_infoList',
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
                  }, {
                    "tableName": "",
                    "tableColumn": "TREPORTDATA29_VALUE19",
                    "listFilter": defaultValue.stateKey,
                    "tableType": "1",
                    "inOrNot": "0"
                  }, {
                    "tableName": "",
                    "tableColumn": "T_SCHOOL_SCHOOL_CODE",
                    "listFilter": codes,
                    "tableType": "1",
                    "inOrNot": "0"
                  },
                ]
              },
              successCallback: function (data) {
                var object = this.getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "COUNT1")
                var needGridList2 = object.needGridList;
                for (var i = 0; i < needGridList.length; i++) {
                  needGridList[i].value = 0;
                  if (needGridList2 != null) {
                    for (var j = 0; j < needGridList2.length; j++) {
                      if (needGridList[i].statistical == needGridList2[j].statistical) {
                        needGridList[i].value = needGridList2[j].value;
                        break;
                      }
                    }
                  }
                }

                //获取省级数据
                http.api({
                  url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNum_infoList',
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
                      }, {
                        "tableName": "",
                        "tableColumn": "TREPORTDATA29_VALUE19",
                        "listFilter": defaultValue.provincePoint,
                        "tableType": "1",
                        "inOrNot": "0"
                      }, {
                        "tableName": "",
                        "tableColumn": "T_SCHOOL_SCHOOL_CODE",
                        "listFilter": codes,
                        "tableType": "1",
                        "inOrNot": "0"
                      },
                    ]
                  },
                  successCallback: function (data) {
                    var object2 = this.getNeedGridInfo(data.workTableDate, "T_SCHOOL_SCHOOL_CODE", "T_SCHOOL_SCHOOL_NAME", "COUNT1")
                    var needGridList3 = object2.needGridList;
                    for (var i = 0; i < needGridList.length; i++) {
                      needGridList[i].value2 = 0;
                      if (needGridList3 != null) {
                        for (var j = 0; j < needGridList3.length; j++) {
                          if (needGridList[i].statistical == needGridList3[j].statistical) {
                            needGridList[i].value2 = needGridList3[j].value;
                            break;
                          }
                        }
                      }
                    }
                    //获取省级数据
                    this.tableList.tbody = needGridList;
                  }.bind(this)
                })

              }.bind(this)
            })
          }.bind(this)
        })
      }
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNum_city',
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
              "tableColumn": "TREPORTDATA29_VALUE19",
              "listFilter": defaultValue.noneKey,
              "tableType": "1",
              "inOrNot": "1"
            }
          ]
        },
        successCallback: function (data) {
          let {xData, yData} = getXyData2(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
          this.xData = xData;
          this.yData = yData;
          this.totalNum = yData.reduce((acc, value) => parseInt(acc) + parseInt(value), 0);
          this.getGridInfo(xData[0]);
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
  #localKeyMajorNumDiv {
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

