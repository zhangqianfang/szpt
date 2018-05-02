<!--区域数据汇总-->
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


    }
  };
</script>
<style lang="scss" scoped>
  #qysjhzDiv {
  }
</style>


