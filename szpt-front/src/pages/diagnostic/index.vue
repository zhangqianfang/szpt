<template>
  <div id="diagnosticIndex">
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
          {src: "/diagnostic/specialtySelectView", name: "专业选择机制可视化分析"},
          {src: "/diagnostic/specialtySelectView2", name: "课程资源质量分析"},
          {src: "/diagnostic/specialtySelectView3", name: "专业发展竞争力分析"}
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  #diagnosticIndex {
    position: absolute;
    top: 130px;
    bottom: 0;
    width: 100%;
  }
</style>


