<template>
  <div id="fundsInput">
    <LeftList :left-list="leftList"></LeftList>
  </div>
</template>
<script>
import LeftList from "../components/leftList";

export default {
  components: {
    LeftList
  },
  data() {
    return {
      leftList: [
        { src: "/fundsInput/regeionDataSum", name: "区域数据汇总" },
        { src: "/fundsInput/incomeTotal", name: "经费收入总额" },
        { src: "/fundsInput/incomeTotalAvg", name: "平均经费收入总额" },
        { src: "/fundsInput/schoolIncomePer", name: "学校经费收入比例" },
        { src: "/fundsInput/tuitionIncomePer", name: "学费收入在总收入中占比" },
        { src: "/fundsInput/studentIncomeAvg", name: "生均经费数" },
        { src: "/fundsInput/expendTotal", name: "经费支出总额" },
        { src: "/fundsInput/expendTotalAvg", name: "平均经费支出总额" },
        { src: "/fundsInput/schoolExpendPer", name: "学校经费支出比例" },
        { src: "/fundsInput/teachExpendPer", name: "教学经费在总支出占比" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#fundsInput {
  position: absolute;
  top: 130px;
  bottom: 0;
  width: 100%;
}
</style>


