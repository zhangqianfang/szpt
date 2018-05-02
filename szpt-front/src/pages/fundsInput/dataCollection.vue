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
        thead: ["学校代码", "学校名称", "基础设施建设(万元)"],
        tbody: [
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
          },
          {
            statistical: "3644000053",
            value: "广州市交通运输职业学校"
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


