<template>
  <div id="qysjhzDiv">
    <Headers :header-data="headerData"></Headers>
    <City></City>
    <DataCollTableity :table-list="tableList"></DataCollTableity>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import City from "../../components/CitySelect";
  import DataCollTableity from "../../components/dataCollTable";
  import http from '../../http';
  import defaultValue from '../constant.js'
  import {HTTP_ROOT} from '../../utils/value-consts';

  export default {
    components: {
      Headers,
      City,
      DataCollTableity
    },
    data() {
      return {
        headerData: {name: "区域数据汇总"},
        tableList: {
          thead: ["序号", "数据项", "数值"],
          tbody: []
        }
      };
    },
    methods: {
      getParams: function (tableColumn, listFilter, limit = 0,) {
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
      getXyData: function (data, xColumnName, yColumnName) {
        let allInfo = JSON.parse(data);
        let xData = [], yData = []
        allInfo.forEach(p => {
          p.forEach(x => {
            if (x.columnName === xColumnName)
              xData.push(x.value);
            if (x.columnName === yColumnName)
              yData.push(x.value)
          })
        })
        return {xData, yData}
      },

      getXyData2: function (data, xColumnName, yColumnName, zColumnName) {
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

    }
    ,
    mounted: function () {

      var bodyData = [];
      var majorSettingNum, localKeyMajorNum;
      //专业设置总数
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_majorSettingNum_province',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          let {xData, yData} = this.getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'TREPORTDATA29_VALUE4');
          let obj = {};
          obj.sort = 1;
          obj.statistical = "专业设置总数";
          obj.value = yData[0];
          majorSettingNum = yData[0];
          bodyData.splice(0, 0, obj);
          //当前招生专业数占比
          http.api({
            url: HTTP_ROOT + '/api/jap/majorCon_majorSettingNum_province',
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
                  "tableColumn": "TREPORTDATA29_VALUE3",
                  "listFilter": "否",
                  "tableType": "1",
                  "inOrNot": "1"
                }
              ]
            },
            successCallback: function (data) {
              let {xData, yData} = this.getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'TREPORTDATA29_VALUE4');
              let obj = {};
              obj.sort = 2;
              obj.statistical = "当前招生专业数占比";
              obj.value = ((yData[0] / majorSettingNum) * 100).toFixed(1) + "%";
              bodyData.push(obj);
              bodyData.sort((o1, o2) =>o1.sort - o2.sort)
            }.bind(this)
          })
        }.bind(this)
      })


      //学校专业开设平均数
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
          let {xData, yData, zData} = this.getXyData2(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1', 'T_SCHOOL_SCHOOL_CODE');
          let obj = {};
          obj.sort = 3;
          obj.statistical = "学校专业开设平均数";
          obj.value = (yData[0] / zData[0]).toFixed(2);
          bodyData.push(obj);
          bodyData.sort((o1, o2) =>o1.sort - o2.sort)
        }.bind(this)
      })

      //本地重点建设专业总数
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNum_province',
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
          let {xData, yData} = this.getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
          let obj = {};
          obj.sort = 4;
          obj.statistical = "本地重点建设专业总数";
          localKeyMajorNum = yData[0];
          obj.value = yData[0];
          bodyData.push(obj);

          //本地重点建设专业平均数
          http.api({
            url: HTTP_ROOT + '/api/jap/majorCon_localKeyMajorNumAvg_schoolNum',
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
              let yyData = [];
              let object2 = this.getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'T_SCHOOL_ID');
              let obj = {};
              obj.sort = 5;
              obj.statistical = "本地重点建设专业平均数";
              obj.value = (localKeyMajorNum / object2.yData.reduce((acc, value) => parseInt(acc) + parseInt(value), 0)).toFixed(2);
              bodyData.push(obj);
              bodyData.sort((o1, o2) =>o1.sort - o2.sort)
            }.bind(this)
          })
        }.bind(this)
      })


      //分专业大类学生数
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
          let {xData, yData, zData} = this.getXyData2(data.workTableDate, 'TREPORTDATA29_VALUE4', 'TREPORTDATA29_VALUE5', 'TREPORTDATA29_VALUE10');

          let yyData = [];
          for (var i = 0; i < defaultValue.majorLarge.length; i++) {
            let num = 0;
            let code = defaultValue.majorLarge[i].code;
            for (var j = 0; j < xData.length; j++) {
              if (xData[j].substr(0, 2) == code) {
                num += parseInt(zData[j]);
              }
            }
            yyData.push(num);
          }
          let totalNum = yyData.reduce((acc, value) => parseInt(acc) + parseInt(value), 0);
          let obj = {};
          obj.sort = 6;
          obj.statistical = "分专业大类学生数";
          obj.value = totalNum;
          bodyData.push(obj);
          bodyData.sort((o1, o2) =>o1.sort - o2.sort)
        }.bind(this)
      })

      //本地专业平均学生数
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_localMajorStudentNumAvg_province',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          let {xData, yData} = this.getXyData(data.workTableDate, 'T_SCHOOL_PROVINCE', 'TREPORTDATA29_VALUE10');
          let obj = {};
          obj.sort = 7;
          obj.statistical = "本地专业平均学生数";
          obj.value = parseFloat(yData[0]).toFixed(2);
          bodyData.push(obj);
          bodyData.sort((o1, o2) =>o1.sort - o2.sort)
        }.bind(this)
      })

      //校本（自编）教材总数
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_selfMadeBookNum_city',
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
          let {xData, yData} = this.getXyData(data.workTableDate, 'T_SCHOOL_CITY', 'COUNT1');
          let totalNum = yData.reduce((acc, value) => parseInt(acc) + parseInt(value), 0);
          let obj = {};
          obj.sort = 8;
          obj.statistical = "校本（自编）教材总数";
          obj.value = totalNum;
          bodyData.push(obj);
          bodyData.sort((o1, o2) =>o1.sort - o2.sort)
        }.bind(this)
      })
      this.tableList.tbody = bodyData;

    }
  };
</script>
<style lang="scss" scoped>
  #qysjhzDiv {
  }
</style>


