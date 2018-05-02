<template>
  <div id="coopDataCollection">
    <Headers :header-data="headerData"></Headers>
    <City @query="queryCity"></City>
    <DataCollTableity :table-list="tableList"></DataCollTableity>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import City from "../../components/CitySelect";
  import DataCollTableity from "../../components/dataCollTable";
  import http from '../../http';
  import { HTTP_ROOT} from '../../utils/value-consts';
  import {getCommonParams} from '../../utils/common';

  export default {
    components: {
      Headers,
      City,
      DataCollTableity
    },
    data() {
      return {
        headerData: { name: "区域数据汇总" },
        tableList: {
          thead: ["序号", "数据项", "数值"],
          tbody: [
            { statistical: "全日制中职学历教育在校生总数", value: "150000.73万元" },
            { statistical: "按学校等级分的在校分布情况", value: "150000.73万元" },
            { statistical: "内地中职班学生数", value: "5.2% " },
            { statistical: "新型职业农民人数", value: "5372.33 元/生" },
            { statistical: "流失率", value: "159338.74万元" },
            { statistical: "学生获奖情况", value: "7587.56万元" },
            { statistical: "当年实际招生数", value: "14.78元/生" },
            { statistical: "应届毕业生人数", value: "503.11元/生"}
          ]
        }
      };
    },
    methods: {
      queryCity: function (city) {
        console.log(city);
        this.getGridInfoByCity(city);
      },
      getParams: function (city) {
        let param = {
          "tableName": "",
          "tableColumn": 'T_SCHOOL_CITY',
          "listFilter": city,
          "tableType": "1",
          "inOrNot": "0"
        };
       let params= getCommonParams();
       params.filters.push(param);
       return params;
      },
      getGridInfoByCity: function (city) {
        http.api({
          url: HTTP_ROOT + '/api/jap/SchComCoorpCollection_Province',
          params: this.getParams(city),
          successCallback: function (data) {
            let gridList = this.getGridInfo(data.workTableDate,'TREPORTDATA35');
            this.tableList.tbody = gridList;
          }.bind(this)
        })
      },
      getGridInfo: function (data,beginString) {
        let dataObject =JSON.parse(data);
        let gridList =[];
        dataObject.forEach(p=>{
          let [statistical,value] =['',''];
          p.forEach(x=>{
            if (x.columnName.includes(beginString)){
              statistical = x.columnNameCn;
              value = x.value;
              gridList.push({statistical,value})
            }
          })
        })
        return gridList;
      }
    },
    mounted: function () {
      http.api({
        url: HTTP_ROOT + '/api/jap/SchComCoorpCollection_Province',
        params: getCommonParams(),
        successCallback: function (data) {
          let gridList = this.getGridInfo(data.workTableDate,'TREPORTDATA35');
          this.tableList.tbody = gridList;
        }.bind(this)
      })
    },
  };
</script>
<style lang="scss" scoped>
  #coopDataCollection {
  }
</style>


