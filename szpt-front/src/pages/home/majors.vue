<template>
  <div id="Majors">
   <div class="majors_title">
      <div class="title">
          中等职业学校专业设置情况
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
   </div>
   <div class="maors_bar">
      <span class="left"></span>
      <span class="right"></span>
      <span class="left_bottom"></span>
      <span class="right_bottom"></span>
      <div id="majorBarChart"></div>
   </div>
  </div>
</template>
<script>
import MajorCodeMap from "../../utils/js/home/majorCodeMap";
export default {
  mounted() {
    this.initData();
  },
  data() {
    return {
      cityName: this.global.localCityName,
      mountList: [
        { title: "开设专业总数", text: "0个" },
        { title: "开设专业点总数", text: "0个" }
      ],
      // 哪些代码进行绘图统计
      drawCodes: [
        "01", "02", "03", "04", "05",
        "06", "07", "08", "09", "10",
        "11", "12", "13", "14", "15",
        "16", "17", "18"
      ],
      allMajorCodes: [] // 所有专业代码
    };
  },
  methods: {
    initData() {
      this.initCount();
      this.initChart();
    },
    // 专业总数+专业点总数
    initCount() {
      this._defaultQuery("/home_majors_count", { limit: "100" }, data => {
        let mountList = this.mountList;
        let array = this.japUtils.getManyIntSum(data, [1, 2]);
        mountList[0].text = array[1] + "个";
        mountList[1].text = array[0] + "个";
        //console.log(array);
        this.$set(this.mountList, mountList);
      });
    },
    initChart() {
      this._defaultQuery("/home_majors_allCodes", { limit: "10000" }, data => {
        this.allMajorCodes = this.japUtils.getManyValue(data).sort();
        //console.log(this.allMajorCodes);
        $("#majorBarChart").css("height", $(window).height() - 400);
        this.drawBarChart();
      });
    },
    // 绘制柱状图
    drawBarChart() {
      let barChart = this.$echarts.init(
        document.getElementById("majorBarChart")
      );
      barChart.setOption({
        legend: {
          top:30,
          textStyle: { fontSize: 16, color: "#FFF" },
          data: [
            { name: "分专业大类专业总数", icon: "circle" },
            { name: "分专业大类专业点总数", icon: "circle" }
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}个"
        },
        grid: {
          x: 60,
          x2: 50,
          y: 100,
          y2: 100,
          height: 400
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              rotate: 20, // 20度角倾斜显示
              textStyle: { color: "#fff", fontSize: 13 }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(42, 95, 207, 1)",
                width: 1
              }
            },
            data: this.getXData()
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: { color: "#fff", fontSize: 16 }
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
          }
        ],
        series: [
          {
            type: "bar",
            name: "分专业大类专业总数",
            barWidth: 15,
            data: this.getCountData(),
            itemStyle: {
              normal: {
                color: "#1289C4",
                barBorderRadius: [100, 100, 0, 0]
              }
            },
            label: {
              normal: {
                show: true,
                position: "top", // 标签的位置
                textStyle: {
                  fontSize: 16 // 文字的字体大小
                },
                formatter: "{c}"
              }
            }
          },
          {
            type: "bar",
            name: "分专业大类专业点总数",
            barWidth: 15,
            data: this.getCountDistinctData(),
            itemStyle: {
              normal: {
                color: "#91239E",
                barBorderRadius: [100, 100, 0, 0]
              }
            },
            label: {
              normal: {
                show: true,
                position: "top", // 标签的位置
                textStyle: {
                  fontSize: 16 // 文字的字体大小
                },
                formatter: "{c}"
              }
            }
          }
        ]
      });
    },
    // 柱状图_X轴数据
    getXData() {
      let xData = [];
      this.drawCodes.forEach(item => {
        xData.push(MajorCodeMap[item]);
      });
      xData.push("其它");
      return xData;
    },
    // 柱状图_分专业大类专业数据
    getCountData() {
      let countData = new Array(this.drawCodes.length + 1);
      this.allMajorCodes.forEach(item => {
        let index = this.drawCodes.indexOf(item.substr(0, 2));
        if (index == -1) {
          index = countData.length - 1;
        }
        countData[index] == undefined
          ? (countData[index] = 1)
          : (countData[index] += 1);
      });
      return countData;
    },
    // 柱状图_分专业大类专业点数据
    getCountDistinctData() {
      let distinctCodeArray = Array.from(new Set(this.allMajorCodes));
      let distinctData = new Array(this.drawCodes.length + 1);
      distinctCodeArray.forEach(item => {
        let index = this.drawCodes.indexOf(item.substr(0, 2));
        if (index == -1) {
          index = distinctData.length - 1;
        }
        distinctData[index] == undefined
          ? (distinctData[index] = 1)
          : (distinctData[index] += 1);
      });
      return distinctData;
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
@import "../../commen/css/home/majors";
</style>


