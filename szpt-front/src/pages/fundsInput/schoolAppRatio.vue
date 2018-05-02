<template>
  <div id="schoolAppRatio">
    <Headers :header-data="headerData"></Headers>
    <div class="ratio_left">
       <Title :title-name="titleName"></Title>
       <div class="work_ranking">
         <span class="style1">全国</span>
         <span class="style2">150000.73</span>
         <span class="style3">万元</span>
       </div>
       <div class="work_map">
          <span class="left"></span>
          <span class="right"></span>
          <span class="left_bottom"></span>
          <span class="right_bottom"></span>
          <!-- <img src="../../assets/rectangle.png" alt=""> -->
          <div class="ratio_pie">
            <div id="pieChart" style="width:700px; height:400px"></div>
          </div> 
       </div>
     </div>
     <div class="ratio_right">
       <Title :title-name="titleName1"></Title>
       <div class="work_ranking">
         <!-- <span class="style1">全国</span> -->
         <span class="style2">150000.73</span>
         <span class="style3">万元</span>
       </div>
       <div class="work_map">
          <span class="left"></span>
          <span class="right"></span>
          <span class="left_bottom"></span>
          <span class="right_bottom"></span>
          <div class="ratio_bar">
             <div id="barChart" style="width:880px; height:400px"></div>
          </div>
          <!-- <img src="../../assets/rectangle.png" alt=""> -->
         
       </div>
     </div>
     <div class="ratio_bottom">
       <DataCollTableity :table-list="tableList"></DataCollTableity>
     </div>
  </div>
</template>
<script>
import Headers from "../../components/header";
import Title from "../../components/title";
import DataCollTableity from "../../components/dataCollTable7";
import echarts from "echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import pieOption from "../../commen/pie_option.js";
import options from "../../commen/bar_option.js";
export default {
  components: {
    Headers,
    Title,
    DataCollTableity
  },
  data() {
    return {
      titleName: { name: "学校经费支出比例" },
      titleName1: { name: "其他支出总额" },
      headerData: { name: "学校经费支出比例" },
      tableList: {
        thead: [
          "学校代码",
          "学校名称",
          "基础设施建设<br/>(万元)",
          "设备采购<br/>(万元)",
          "日常教学经费<br/>(万元)",
          "师资队伍建设<br/>(万元)",
          "教学改革及研究<br/>(万元)"
        ],
        tbody: [
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          },
          {
            schoolCode: "3644000053",
            schollName: "广州市交通运输职业学校",
            basicBuilt: "294",
            equipment: "2",
            dayTeach: "1111",
            teachTeam: "22",
            teachReform: "2"
          }
        ]
      }
    };
  },
  mounted() {
    this.drawSchool();
    this.draw1();
  },
  methods: {
    draw1() {
      let myChart1 = this.$echarts.init(document.getElementById("pieChart"));
      // 绘制图表
      myChart1.setOption(pieOption);
    },
    drawSchool() {
      let schoolChart = this.$echarts.init(document.getElementById("barChart"));
      // 绘制图表
      schoolChart.setOption(options);
    }
  }
};
</script>
<style lang="scss" scoped>
#schoolAppRatio {
  .ratio_left,
  .ratio_right {
    display: inline-block;
    width: 45%;
    padding-left: 20px;
    box-sizing: border-box;
    .work_ranking {
      background: linear-gradient(
        180deg,
        rgba(23, 76, 145, 1) 0%,
        rgba(23, 76, 145, 1) 0%,
        rgba(6, 14, 62, 1) 53%,
        rgba(23, 76, 145, 1) 100%,
        rgba(23, 76, 145, 1) 100%
      );
      height: 60px;
      width: 400px;
      display: inline-block;
      margin: 20px 0px;
      padding: 0 30px;
      box-sizing: border-box;
      span {
        padding: 0 8px;
      }
      .style1 {
        color: #fff;
        font-size: 18px;
        display: inline-block;
        /* vertical-align: middle; */
        line-height: 60px;
        height: 60px;
        vertical-align: top;
      }
      .style2 {
        font-size: 14px;
        font-weight: 700;
        font-size: 48px;
        color: #fcf042;
        height: 60px;
        line-height: 66px;
      }
      .style3 {
        color: #fcf042;
        font-size: 14px;
      }
    }
    .work_map {
      border: 1px solid #24378e;
      margin-top: 30px;
      width: 100%;
      box-sizing: border-box;
      // padding: 20px 20px 60px;
      height: 409px;
      position: relative;
      text-align: center;
      .ratio_pie {
        width: 700px;
        height: 400px;
      }
      .ratio_bar {
        width: 900px;
        height: 400px;
      }
      span {
        position: absolute;
        display: block;
        width: 33px;
        height: 33px;
      }
      .left {
        border-top: 3px solid #2789e4;
        left: -2px;
        border-left: 3px solid #2789e4;
        top: -2px;
      }
      .right {
        border-top: 3px solid #2789e4;
        right: -2px;
        border-right: 3px solid #2789e4;
        top: -2px;
      }
      .left_bottom {
        border-bottom: 3px solid #2789e4;
        left: -2px;
        border-left: 3px solid #2789e4;
        bottom: -2px;
      }
      .right_bottom {
        border-bottom: 3px solid #2789e4;
        right: -2px;
        border-right: 3px solid #2789e4;
        bottom: -2px;
      }
      table {
        width: 100%;
        text-align: center;
        thead {
          line-height: 45px;
          td {
            font-size: 22px;
            color: #76fcff;
          }
        }
        tbody {
          border-top: 1px solid #2a5fd9;
          border-left: 1px solid #2a5fd9;
          tr {
            line-height: 50px;
          }
          td {
            border-right: 1px solid #2a5fd9;
            border-bottom: 1px solid #2a5fd9;
          }
        }
      }
    }
  }
  .ratio_right {
    display: inline-block;
    width: 54%;
    vertical-align: top;
  }
}
</style>


