<template>
  <div id="Home">
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
        { src: "/schoolPro/areaDataCollect", name: "区域数据汇总" },
        { src: "/schoolPro/total", name: "中等职业学校总数" },
        { src: "/schoolPro/reportedTotal", name: "已上报的中等职业学校总数" },
        { src: "/schoolPro/groupByCategoryT", name: "按学校类别分的中职学校总数" },
        { src: "/schoolPro/groupByGradeT", name: "按学校等级分的中职学校总数" },
        { src: "/schoolPro/groupByOrganizersT", name: "按学校举办者分的中职学校总数" },
        { src: "/schoolPro/groupBySchoolTypeT", name: "按办学类型分的中职学校总数" },
        { src: "/schoolPro/groupByRectifyConcT", name: "按诊改结论分的中职学校总数" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#Home {
  position: absolute;
  top: 130px;
  bottom: 0;
  width: 100%;
}
</style>


