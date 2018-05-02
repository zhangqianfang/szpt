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
          {src: "/teacher/areaDataCollect", name: "区域数据汇总"},
          {src: "/teacher/teacherNum", name: "教职工总数"},
          {src: "/teacher/fullTimeTeacherNum", name: "校内专任教师总数"},
          {src: "/teacher/professionalTeacherNum", name: "校内专业教师总数"},
          {src: "/teacher/professionalTeacherRate", name: "专业教师占专任教师比例"},
          {src: "/teacher/doubleTeacherRate", name: '"双师型"教师占专业教师比例'},
          {src: "/teacher/occupationFullTimeTeacherNum", name: "按专业技术职务分布的专任教师总数"},
          {src: "/teacher/seniorTitleFullTimeTeacherRate", name: "高级职称教师占专任教师比例"},
          {src: "/teacher/educationFullTimeTeacherNum", name: "按学历分布的专任教师总数"},
          {src: "/teacher/educationFullTimeTeacherRate", name: "研究生学历或硕士以上学位教师占专任教师比例"},
          {src: "/teacher/studentTeacherRate", name: "平均生师比"},
          {src: "/teacher/partTimeTeacherNum", name: "兼职(课)教师总数"},
          {src: "/teacher/partTimeTeacherRate", name: "兼职(课)教师与专任教师比值"},
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


