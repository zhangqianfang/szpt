<template>
  <div id="zyjsIndex">
    <LeftList :left-list="leftList"></LeftList>
  </div>
</template>
<script>
  import LeftList from "../../components/leftList"

  export default {
    components: {
      LeftList
    },
    data() {
      return {
        leftList: [
          {src: "/specialtyCon/areaDataCollect", name: "区域数据汇总"},
          {src: "/specialtyCon/majorSettingNum", name: "专业设置总数"},
          {src: "/specialtyCon/enrolStuMajorNum", name: "当前招生专业数"},
          {src: "/specialtyCon/schoolMajorNumAvg", name: "学校专业开设平均数"},
          {src: "/specialtyCon/localKeyMajorNum", name: "本地重点建设专业数"},
          {src: "/specialtyCon/localKeyMajorNumAvg", name: "本地重点建设专业平均数"},
          {src: "/specialtyCon/majorStudnetNum", name: "分专业大类学生数"},
          {src: "/specialtyCon/localMajorStudentNumAvg", name: "本地专业平均学生数"},
          {src: "/specialtyCon/selfMadeBookNum", name: "校本(自编)教材总数"},
          {src: "/specialtyCon/qualityCourseNum", name: "精品课程总数"},
          {src: "/specialtyCon/qualityCourseNumAvg", name: "精品课程平均数"},
          {src: "/specialtyCon/onLineCourseNum", name: "上网课程总数"},
          {src: "/specialtyCon/stateControlMajorNum", name: "国控专业数"},
          {src: "/specialtyCon/stateControlMajorStudentNum", name: "国控专业在校生数"},
          {src: "/specialtyCon/outDirectoryMajorNum", name: "目录外专业数"},
          {src: "/specialtyCon/outDirectoryMajorStudentNum", name: "目录外专业在校生数"},
          {src: "/specialtyCon/agricultureRelatedMajorNum", name: "涉农专业数"},
          {src: "/specialtyCon/agricultureRelatedMajorStudentNum", name: "涉农专业在校生数"},
          {src: "/specialtyCon/majorDetailStudentNum", name: "各专业学生数"}
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  #zyjsIndex {
    position: absolute;
    top: 130px;
    bottom: 0;
    width: 100%;
  }
</style>


