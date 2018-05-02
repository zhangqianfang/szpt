<!--各专业学生数-->
<template>
  <div id="qysjhzDiv">
    <Headers :header-data="headerData"></Headers>
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
        headerData: {name: "各专业学生数"},
        tableList: {
          thead: ["序号", "专业代码", "专业名称", "学生数"],
          tbody: [],
        }
      };
    },
    methods: {
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
        let allInfo = JSON.parse(data);
        let needGridList = []
        allInfo.forEach(p => {
          let needGridInfo = {};
          p.forEach(x => {
            if (x.columnName === columnName1)
              needGridInfo.statistical = x.value;

            if (x.columnName === columnName2)
              needGridInfo.value = x.value;

            if (x.columnName === columnName3)
              needGridInfo.value2 = x.value;
          })
          needGridList.push(needGridInfo);
        })
        return needGridList;
      }
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/majorCon_majorDetailStudentNum',
        params: this.getParams("T_SCHOOL_PROVINCE", defaultValue.provinceName),
        successCallback: function (data) {
          var array = this.getNeedGridInfo(data.workTableDate, "TREPORTDATA29_VALUE4", "TREPORTDATA29_VALUE5", "TREPORTDATA29_VALUE10");
          this.tableList.tbody = array.reduce(function (acc, value) {
            value.value2 = parseInt(value.value2);
            acc.push(value);
            return acc;
          }, []);
        }.bind(this)
      })
    }
  }
  ;
</script>
<style lang="scss" scoped>
  #qysjhzDiv {
  }
</style>
