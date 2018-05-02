<template>
  <div id="studentIndex">
    <LeftList :left-list="leftList"></LeftList>
  </div>
</template>
<script>
  import LeftList from "../../components/leftList";

  export default {
    components: {
      LeftList
    },
    data() {
      return {
        leftList: [
          { src: "/student/dataCollection", name: "区域数据汇总" },
          { src: "/student/allDaySchool", name: "全日制中职学历教育在校生总数" },
          { src: "/student/notAllDaySchool", name: "非全日制中职学历教育在校生总数" },
          { src: "/student/schoolLevel", name: "按学校等级分的在校生分布情况" },
          { src: "/student/localVocational", name: "内地中职班学生数" },
          { src: "/student/newMigrantWorker", name: "新型职业农民人数" },
          { src: "/student/lossRatio", name: "流失率" },
          { src: "/student/studentAward", name: "学生获奖情况" },
          { src: "/student/enrollNum", name: "当年实际招生数" },
          { src: "/student/graduateNum", name: "应届毕业生人数" },
          { src: "/student/employmentRate", name: "应届毕业生就业率" },
          { src: "/student/counterpartRate", name: "应届毕业生对口就业率" },
          { src: "/student/startingSalary", name: "平均起薪线" },
          { src: "/student/companySatisfy", name: "毕业生用人单位满意情况" },
          { src: "/student/companySatisfy", name: "学生分布情况" },
          { src: "/student/enjorScholarship", name: "享受奖助学金金额" },
          { src: "/student/enjorScholarshipNum", name: "享受奖助学金人数" },
          { src: "/student/postInternshipStuNum", name: "顶岗实习学生总数" },
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  #studentIndex {
    position: absolute;
    top: 130px;
    bottom: 0;
    width: 100%;
  }
</style>


