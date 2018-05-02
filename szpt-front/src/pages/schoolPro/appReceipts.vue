<template>
  <div id="appReceipts">
     <Headers :header-data="headerData"></Headers>
     <div class="receipts_left">
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
          <div class="receipts">
              <div id="receiptsChart" style="width:900px; height:450px"></div>
          </div>
          <!-- <img src="../../assets/map.png" alt=""> -->
          
          <!-- <div>
            
          </div> -->
       </div>
     </div>
     <div class="receipts_right">
       <Title :title-name="titleName1"></Title>
       <DataCollTableity :table-list="tableList"></DataCollTableity>
     </div>
  </div>
</template>
<script>
import Headers from "../../components/header";
import Title from "../../components/title";
import DataCollTableity from "../../components/dataCollTable";
import echarts from 'echarts'
import "echarts/lib/chart/bar";
import option from "../../commen/bar_option.js";

export default {
  components: {
    Headers,
    Title,
    DataCollTableity
  },
  data() {
    return {
      titleName: { name: "经费收入总额" },
      titleName1: { name: "福建省" },
      headerData: { name: "经费收入总额" },
      tableList: {
        thead: ["学校名称", "学校代码", "经费收入总额"],
        tbody: [
          { statistical: "经费收入总额", value: "150000.73万元" },
          { statistical: "平均经费收入总额", value: "150000.73万元" },
          { statistical: "学费收入在总收入中占比", value: "5.2% " },
          { statistical: "生均经费数", value: "5372.33 元/生" },
          { statistical: "经费支出总额", value: "159338.74万元" },
          { statistical: "平均经费支出总额", value: "7587.56万元" },
          { statistical: "学校经费支出比例", value: "14.78元/生" },
          {
            statistical: "教学、实习仪器设备及日常教学经费在总支出占比",
            value: "503.11元/生"
          }
        ]
      }
    };
  },
  mounted() {
    this.drawReceipts();
  },
  methods: {
    drawReceipts() {
      let receiptsChart = this.$echarts.init(document.getElementById("receiptsChart"));
      // 绘制图表
      receiptsChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#appReceipts {
  #myChart {
    z-index: 100;
    position: absolute !important;
    top: 0;
    left: 0;
  }
  .receipts_left {
    display: inline-block;
    width: 60%;
    padding-left: 50px;
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
      margin: 10px 0px;
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
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        font-size: 48px;
        color: #0066cc;
        height: 60px;
        line-height: 66px;
        border-bottom: 1px solid #0066cc;
      }
      .style3 {
        color: #fcf042;
        font-size: 14px;
      }
    }
    .work_map {
      border: 1px solid #24378e;
      // margin-top: 30px;
      width: 98%;
      box-sizing: border-box;
      padding: 20px 20px 60px;
      position: relative;
      text-align: center;
      height: 464px;
      box-sizing: border-box;
      .receipts{
        width:800px;
        height:500px;
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
  .receipts_right {
    display: inline-block;
    width: 40%;
    vertical-align: top;
  }
}
</style>

