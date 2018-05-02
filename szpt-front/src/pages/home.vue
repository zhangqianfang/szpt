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
        { src: "/home/basicSituation", name: "基本情况" },
        { src: "/home/schoolFunding", name: "办学经费" },
        { src: "/home/majors", name: "专业设置" },
        { src: "/home/teachStaff", name: "师资队伍" },
        { src: "/home/studentInf", name: "学生情况" },
        { src: "/home/teachDevice", name: "教学设备情况" }
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


