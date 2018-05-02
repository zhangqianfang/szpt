<template>
  <div id="schoolCondition">
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
        { src: "/schoolCondition/schoolConditionSum", name: "区域数据汇总" },
        { src: "/schoolCondition/coverTotalArea", name: "占地总面积" },
        { src: "/schoolCondition/coverTotalAreaAvgSch", name: "学校平均占地总面积" },
        { src: "/schoolCondition/coverTotalAreaAvgStu", name: "生均占地面积" },
        { src: "/schoolCondition/buildTotalArea", name: "建筑总面积" },
        { src: "/schoolCondition/buildTotalAreaAvgSch", name: "学校平均建筑面积" },
        { src: "/schoolCondition/teachAdminTotalArea", name: "教学行政用房总面积" },
        { src: "/schoolCondition/rightBuildAreaAvgStu", name: "生均产权校舍建筑面积" },
        { src: "/schoolCondition/dormitoryAreaAvgStu", name: "生均宿舍面积" },
        { src: "/schoolCondition/bookNumAvgSch", name: "学校平均图书总册数" },
        { src: "/schoolCondition/bookNumAvgStu", name: "生均图书册数" },  
        { src: "/schoolCondition/yearBookEntryAvgStu", name: "生均年进书量" },              
        { src: "/schoolCondition/mediaRoomNumAvgSch", name: "校均多媒体教室数" },
        { src: "/schoolCondition/computerNumAvgStu", name: "百名学生配教学计算机数" },
        { src: "/schoolCondition/teachEquipAvgSch", name: "学校平均教学、实习仪器设备总产值" },
        { src: "/schoolCondition/teachEquipAvgStu", name: "生均教学、实习仪器设备值" },
        { src: "/schoolCondition/inschTrainBaseAvgSch", name: "学校平均校内实验实训基地个数" },
        { src: "/schoolCondition/outschTrainBaseAvgSch", name: "学校平均校外实验实训基地个数" },
        { src: "/schoolCondition/inschTrainStationAvgSch", name: "学校平均校内实验实训工位总数" },
        { src: "/schoolCondition/inschBaseAreaAvgSch", name: "校均校内基地占地面积" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#schoolCondition {
  position: absolute;
  top: 130px;
  bottom: 0;
  width: 100%;
}
</style>


