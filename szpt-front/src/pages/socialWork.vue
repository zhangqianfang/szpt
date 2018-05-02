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
        { src: "/socialWork/areaDataCollect", name: "区域数据汇总" },
        { src: "/socialWork/shortTechnicalSkillsTraining", name: "短期技术技能培训情况" },
        { src: "/socialWork/developProfSkillsIdentification", name: "面向社会开展职业技能鉴定的情况" },
        { src: "/socialWork/developTechnicalTraining", name: "面向社会开展技术培训的情况" },
        { src: "/socialWork/trainingStaffForBusinessYear", name: "学校为企业年培训员工数" },
        { src: "/socialWork/technicalMonopolyForFulltimeTeachers", name: "校内专任教师获技术专利（技术发明）情况" }
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