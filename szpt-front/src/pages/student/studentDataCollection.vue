<template>
  <div id="dataCollection">
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
    }
  };
</script>
<style lang="scss" scoped>
  #dataCollection {
  }
</style>


