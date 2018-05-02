<template>
  <div id="shoolCooperation">
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
        { src: "/schoolCooperation/dataCollection", name: "区域数据汇总" },
        { src: "/schoolCooperation/coopeCompany", name: "合作企业总数" },
        { src: "/schoolCooperation/schoolCoope", name: "学校平均合作企业数" },
        { src: "/schoolCooperation/orderTrain", name: "订单培养学生人数" },
        { src: "/schoolCooperation/togetherWork", name: "共同开发课程数" },
        { src: "/schoolCooperation/shoolCoursesNum", name: "学校平均共同开发课程数" },
        { src: "/schoolCooperation/togetherTextbookNum", name: "共同开发教材数" },
        { src: "/schoolCooperation/schoolTextbookNum", name: "学校平均共同开发教材数" },
        { src: "/schoolCooperation/coopeTeacherNum", name: "合作企业接受教师企业实践人数" },
        { src: "/schoolCooperation/coopePracticeNum", name: "合作企业接受顶岗实习学生数" },
        { src: "/schoolCooperation/coopeGrad", name: "合作企业接受毕业生就业数" },
        { src: "/schoolCooperation/coopeCompanySet", name: "合作企业对学校捐赠设备总值" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#shoolCooperation {
  position: absolute;
  top: 130px;
  bottom: 0;
  width: 100%;
}
</style>


