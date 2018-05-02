<!--分专业大类学生数-->
<template>
  <div id="majorSettingNumDiv">
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
        <BarCharts :x-data="xData" :y-data="yData" echart-id="majorStudentNumEcharts"
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
        titleName: {name: "分专业大类学生数"},
        titleName1: {name: ""},
        headerData: {name: "分专业大类学生数"},
        totalNum: '',
        xData: [],
        yData: [],
        tableList: {
          thead: ["专业代码", "专业名称", "专业学生数"],
          tbody: []
        },
        tableData: [],
      };
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_majorDetailStudentNum',
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
          //返回的数据是小类专业学生人数，需要组合成大类
          let {xData, yData, zData} = this.getXyData(data.workTableDate, 'TREPORTDATA29_VALUE4', 'TREPORTDATA29_VALUE5', 'TREPORTDATA29_VALUE10');
          let xxData = [];
          let yyData = [];
          for (var i = 0; i < defaultValue.majorLarge.length; i++) {
            xxData.push(defaultValue.majorLarge[i].name);
            let tableData1 = {};
            tableData1.name = defaultValue.majorLarge[i].name;
            let tableDataList = [];
            let num = 0;
            let code = defaultValue.majorLarge[i].code;
            for (var j = 0; j < xData.length; j++) {
              if (xData[j].substr(0, 2) == code) {
                num += parseInt(zData[j]);
                tableDataList.push({"name": xData[j], "statistical": yData[j], "value": parseInt(zData[j])})
              }
            }
            yyData.push(num);
            tableData1.list = tableDataList;
            this.tableData.push(tableData1);
          }
          this.xData = xxData;
          this.yData = yyData;
          this.totalNum = this.yData.reduce((acc, value) => parseInt(acc) + parseInt(value), 0);
          this.getGridInfo(this.xData[0]);
        }.bind(this)
      })
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
            if (x.columnName === xColumnName)
              xData.push(x.value);
            if (x.columnName === yColumnName)
              yData.push(x.value)
            if (x.columnName === zColumnName)
              zData.push(x.value)
          })
        })
        return {xData, yData, zData}
      },
      getGridInfo: function (majorName) {
        this.titleName1.name = majorName;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name == majorName) {
            this.tableList.tbody = this.tableData[i].list;
            break;
          }
        }
      },

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
  #majorSettingNumDiv {
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

