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
          { statistical: "经费收入总额", value: "150000.73万元" },
          { statistical: "平均经费收入总额", value: "7142.89万元" },
          { statistical: "学费收入在总收入中占比", value: "5.2% " },
          { statistical: "生均经费数", value: "5372.33 元/生" },
          { statistical: "经费支出总额", value: "159338.74万元" },
          { statistical: "平均经费支出总额", value: "7587.56万元" },
          { statistical: "学校经费支出比例", value: "14.78元/生" },
          {
            statistical: "教学、实习仪器设备及日常教学经费在总支出占比",
            value: "503.11元/生"
          }
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


