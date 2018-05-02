<template>
  <div id="studentInf">
    <div class="majors_title">
      <div class="title">
          中等职业学校学生情况
      </div>
      <div class="majors_count">
        <div class="mounts" v-for="(item,index) in mountList" :key="index">
          <span class="title1">{{item.title}}</span>
          <div class="count">
            <span class="left"></span>
            <span class="right"></span>
            <span class="text">{{item.text}}</span>
          </div>
        </div>
      </div>
      <div class="student_photos">
        <div class="content">
          <div class="student_left">
            <span class="left"></span>
            <span class="right"></span>
            <span class="left_bottom"></span>
            <span class="right_bottom"></span>
            <div class="title">
                应届毕业生获证情况
            </div>
            <div style="width:100%;height:300px">
              <PieChart ref="pieChart" :legend="pieChart.legend"
                  :opinionData="pieChart.opinionData" :echartStyle="chartStyle" ></PieChart>
            </div>
          </div>
          <div class="student_right">
            <span class="left"></span>
            <span class="right"></span>
            <span class="left_bottom"></span>
            <span class="right_bottom"></span>
            <div class="title">
                当年在校生按年级分情况
            </div>
            <div style="width:100%;height:300px">
              <BarChart ref="barChart" :showLegend="false"
                  :xAxis="barChart.xAxis" :yAxis="barChart.yAxis" :grid="barChart.grid"
                  :opinionData="barChart.opinionData" :echartStyle="chartStyle" ></BarChart>
            </div>
          </div>
        </div>
        <div class="student_bottom">
          <span class="left"></span>
            <span class="right"></span>
            <span class="left_bottom"></span>
            <span class="right_bottom"></span>
             <div class="title">
                应届毕业生就业情况
            </div>
            <div id="studen_pie">
              <ul>
                <li v-for="(item,index) in progressList" :key="index">
                  <span>{{item.name}}</span>
                  <span class="text">{{item.text}}</span>
                  <el-progress color="item.colors" :percentage="item.percentage" :stroke-width="15"></el-progress>
                </li>
              </ul>
            </div>
        </div>
      </div>
   </div>
  </div>
</template>
<script>
import PieChart from "../../components/echarts/pieChart.vue";
import BarChart from "../../components/echarts/barChart.vue";
export default {
  components: {
    PieChart,
    BarChart
  },
  mounted() {
    this.initData();
  },
  data() {
    return {
      pieChart: {
        legend: {
          textStyle: { fontSize: 16, color: "#FFF" },
          orient: "vertical",
          x: "left",
          top: 20,
          itemGap: 15,
          itemWidth: 30,
          itemHeight: 17,
          data: ["高级", "中级", "初级", "无"]
        },
        opinionData: [
          { name: "高级", value: 0 },
          { name: "中级", value: 0 },
          { name: "初级", value: 0 },
          { name: "无", value: 0 }
        ]
      },
      barChart: {
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: { color: "#fff", fontSize: 14 }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(42, 95, 207, 1)",
              width: 1
            }
          },
          data: ["一年级", "二年级", "三年级", "四年级"]
        },
        grid: {
          x: 70,
          x2: 0,
          y: 20,
          y2: 20
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: { color: "#fff", fontSize: 15 }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(42, 95, 207, 1)",
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#24378e"],
              width: 1,
              type: "solid"
            }
          }
        },
        opinionData: [
          { name: "一年级", value: 0 },
          { name: "二年级", value: 0 },
          { name: "三年级", value: 0 },
          { name: "四年级", value: 0 }
        ]
      },
      chartStyle: {
        height: ""
      },
      cityName: this.global.localCityName,
      mountList: [
        { title: "当年招生总数", text: "0" },
        { title: "当年在校生总数", text: "0" },
        { title: "当年在校生巩固率", text: "0%" }
      ],
      progressList: [
        { name: "今年毕业生数", text: "", percentage: 70, colors: "#2494E8" },
        { name: "今年就业率", text: "", percentage: 70, colors: "#2494E8" },
        { name: "今年对口就业率", text: "", percentage: 70, colors: "#2494E8" },
        { name: "上届毕业生数", text: "", percentage: 70, colors: "#A928E7" },
        { name: "上届就业率", text: "", percentage: 70, colors: "#A928E7" },
        { name: "上届对口就业率", text: "", percentage: 70, colors: "#A928E7" }
      ]
    };
  },
  created() {
    // 获取屏幕高度
    this.chartStyle.height = "300px";
  },
  methods: {
    initData() {
      this.initTableData();
      this.initPieChart();
      this.initBarChart();
      this.initProgressData();
    },
    // 初始化表格数据
    initTableData() {
      this.initData1();
      this.initData2();
      this.initData3();
    },
    initData1() {
      this._defaultQuery("/recruit_students_count", { limit: "100" }, data => {
        let mountList = this.mountList;
        mountList[0].text = this.japUtils.getOneIntSum(data);
        this.$set(this.mountList, mountList);
      });
    },
    initData2() {
      this._defaultQuery(
        "/at_school_students_count",
        { limit: "100" },
        data => {
          let mountList = this.mountList;
          mountList[1].text = this.japUtils.getOneIntSum(data);
          this.$set(this.mountList, mountList);
        }
      );
    },
    initData3() {
      this._defaultQuery(
        "/home_studentInf_studentConsolidationRate",
        { limit: "100" },
        data => {
          let mountList = this.mountList;
          let array = this.japUtils.getManyIntSum(data, [1, 2]);
          let percent = ((array[0] - array[1]) * 100 / array[0]).toFixed(2);
          mountList[2].text = percent + "%";
          this.$set(this.mountList, mountList);
        }
      );
    },
    // 加载饼图（应届毕业生获证情况）
    initPieChart() {
      this._defaultQuery(
        "/home_studentInf_graduateCert",
        { limit: "100" },
        data => {
          let mountList = this.mountList;
          let array = this.japUtils.getManyIntSum(data, [1, 2, 3, 4]);
          this.pieChart.opinionData[0].value = array[0];
          this.pieChart.opinionData[1].value = array[1];
          this.pieChart.opinionData[2].value = array[2];
          this.pieChart.opinionData[3].value = array[3];
          this.$set(this.pieChart.opinionData);
        }
      );
    },
    // 加载柱状图（当年在校生按年级分情况）
    initBarChart() {
      this._defaultQuery(
        "/home_studentInf_studentsByGrade",
        { limit: "100" },
        data => {
          let mountList = this.mountList;
          let array = this.japUtils.getManyIntSum(data, [1, 2, 3, 4]);
          [...this.barChart.opinionData] = [...array];
        }
      );
    },
    // 应届毕业生就业情况
    initProgressData() {
      let localCount;
      this._defaultQuery(
        "/home_studentInf_graduateInfo",
        { limit: "100" },
        data => {
          let array = this.japUtils.getManyIntSum(data, [1, 2, 3]);
          localCount = array[0]; // 今年毕业生数
          this.progressList[0].text = localCount + "人";
          this.progressList[1].percentage = Number(
            (array[1] * 100 / localCount).toFixed(2)
          );
          this.progressList[1].text = this.progressList[1].percentage + "%";
          this.progressList[2].percentage = Number(
            (array[2] * 100 / localCount).toFixed(2)
          );
          this.progressList[2].text = this.progressList[2].percentage + "%";
        }
      );
      this._defaultQuery(
        "/home_studentInf_lastGraduateInfo",
        { limit: "100" },
        data => {
          let array = this.japUtils.getManyIntSum(data, [1, 2, 3]);
          let count = array[0]; // 上届毕业生数
          this.progressList[0].percentage = (localCount*100/(count+localCount)).toFixed(2);
          this.progressList[3].text = count + "人";
          this.progressList[3].percentage = (count*100/(count+localCount)).toFixed(2);
          this.progressList[4].percentage = Number(
            (array[1] * 100 / count).toFixed(2)
          );
          this.progressList[4].text = this.progressList[4].percentage + "%";
          this.progressList[5].percentage = Number(
            (array[2] * 100 / count).toFixed(2)
          );
          this.progressList[5].text = this.progressList[5].percentage + "%";
        }
      );
    },
    _defaultQuery(moduleUrl, postOption = { limit: "100" }, callback) {
      let url = this.global.japApiPath + moduleUrl;
      //console.log(this.cityName);
      var postData = this.getPostData(postOption);
      //console.log(postData);
      this.$http.post(url, postData).then(
        response => {
          // 响应成功回调
          //console.log(response.data);
          let jsonData = response.data;
          if (
            jsonData == undefined ||
            jsonData == null ||
            jsonData.success != true
          ) {
            return;
          }
          callback(jsonData.data.workTableDate);
        },
        response => {
          // 响应错误回调
          console.error(response);
          alert("请求失败");
        }
      );
    },
    getPostData(option) {
      let _default = {
        limit: "1",
        filters: [
          {
            tableColumn: "T_SCHOOL_PROVINCE",
            listFilter: this.cityName,
            tableType: "1",
            inOrNot: "0"
          }
        ]
      };
      return $.extend(_default, option);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../commen/css/home/studentInf";
</style>


