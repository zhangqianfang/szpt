<template>
  <div id="schoolFunding">
    <div class="title_total">
          中等职业学校办学经费情况
        </div>
    <div class="basic_top">
      
      <div class="basic_left">
        
        <div class="left_title">
          <Title :title-name="titleName"></Title>
        </div>
        <div class="left_pie">
            <PieChart ref="leftPie" :chartId="'leftPie'" :showLegend="false"
                :opinionData="leftPie.opinionData" :echartStyle="pieStyle" ></PieChart>
        </div>
      </div>
      <div class="basic_right">
        <div class="right_title">
          <Title :title-name="titleName1"></Title>
        </div>
        <div class="right_pie">
          <PieChart ref="rightPie" :chartId="'rightPie'" :showLegend="false"
                :opinionData="rightPie.opinionData" :echartStyle="pieStyle" ></PieChart>
        </div>
      </div>
    </div>

    <div class="basic_bottom">
      <ul>
        <li v-for="(item,index) in liArray" :key="index" :class="classMap[index]">
          <span class="title">{{item.title}}</span>
          <span class="left"></span>
          <span class="right"></span>
           {{item.text}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Title from "../../components/title";
import PieChart from "../../components/echarts/pieChart.vue";
export default {
  components: {
    Title,
    PieChart
  },
  mounted() {
    this.initTableList();
  },
  data() {
    return {
      leftPie: {
        opinionData: [
          { name: "学费收入总额", value: 0 },
          { name: "中央地方财政专项投入", value: 0 },
          { name: "财政经常性补助", value: 0 },
          { name: "社会捐赠", value: 0 },
          { name: "其它收入", value: 0 }
        ]
      },
      rightPie: {
        opinionData: [
          { name: "经费支出总额", value: 0 },
          { name: "基础设施建设", value: 0 },
          { name: "日常教学经费", value: 0 },
          { name: "师资队伍建设", value: 0 },
          { name: "其它支出", value: 0 }
        ]
      },
      pieStyle: {
        height: ""
      },
      cityName: this.global.localCityName,
      titleName: { name: "全省学校各项收入比" },
      titleName1: { name: "全省学校各项支出比" },
      liArray: [
        { title: "学校总收入", text: "0万" },
        { title: "学费收入总额", text: "0万" },
        { title: "中央地方财政专项投入", text: "0万" },
        { title: "财政经常性补助", text: "0万" },
        { title: "社会捐赠", text: "0万" },
        { title: "其它收入", text: "0万" },
        { title: "学校总支出", text: "0万" },
        { title: "经费支出总额", text: "0万" },
        { title: "基础设施建设", text: "0万" },
        { title: "日常教学经费", text: "0万" },
        { title: "师资队伍建设", text: "0万" },
        { title: "其它支出", text: "0万" }
      ],
      classMap: [
        "li_color1",
        "li_color2",
        "li_color3",
        "li_color4",
        "li_color5",
        "li_color6",
        "li_color7",
        "li_color8",
        "li_color9",
        "li_color10",
        "li_color11",
        "li_color12"
      ]
    };
  },
  created() {
    // 获取屏幕高度
    this.pieStyle.height = "440px";
  },
  methods: {
    initTableList() {
      this.initIncome(); // 收入情况
      this.initPay(); // 支出情况
    },
    // 收入情况
    initIncome() {
      this._defaultQuery('/home_schoolFunding_income', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        let array = this.japUtils.getManyFloatSum(data, [1, 2, 3, 4, 5, 6]);
        //console.log(array);
        liArray[0].text = array[0] + "万";
        liArray[1].text = array[1] + "万";
        liArray[2].text = array[2] + "万";
        liArray[3].text = array[3] + "万";
        liArray[4].text = array[4] + "万";
        liArray[5].text = array[5] + "万";
        this.$set(this.liArray, liArray);
        // 为饼图赋值
        this.leftPie.opinionData[0].value = array[1];
        this.leftPie.opinionData[1].value = array[2];
        this.leftPie.opinionData[2].value = array[3];
        this.leftPie.opinionData[3].value = array[4];
        this.leftPie.opinionData[4].value = array[5];
        this.$set(this.leftPie.opinionData);
      });
    },
    // 支出情况
    initPay() {
      this._defaultQuery('/home_schoolFunding_pay', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
          let array = this.japUtils.getManyFloatSum(data, [1, 2, 3, 4, 5]);
          //console.log(array);
          // 为饼图赋值
          this.rightPie.opinionData[0].value = (array[0]-array[1]-array[2]-array[3]-array[4]).toFixed(3);
          this.rightPie.opinionData[1].value = array[1];
          this.rightPie.opinionData[2].value = array[2];
          this.rightPie.opinionData[3].value = array[3];
          this.rightPie.opinionData[4].value = array[4];
          this.$set(this.rightPie.opinionData);
          liArray[6].text = array[0] + "万";
          liArray[7].text = (array[0]-array[1]-array[2]-array[3]-array[4]).toFixed(3) + "万";
          liArray[8].text = array[1] + "万";
          liArray[9].text = array[2] + "万";
          liArray[10].text = array[3] + "万";
          liArray[11].text = array[4] + "万";
          this.$set(this.liArray, liArray);
      });
    },
    _defaultQuery(moduleUrl, postOption = {limit:"100"}, callback){
      let url = this.global.japApiPath + moduleUrl;
      //console.log(this.cityName);
      var postData = this.getPostData(postOption);
      //console.log(postData);
      this.$http.post(url, postData).then((response) => {
        // 响应成功回调
        //console.log(response.data);
        let jsonData = response.data;
        if (jsonData == undefined || jsonData == null || jsonData.success != true) {
            return;
        }
        callback(jsonData.data.workTableDate);
      }, (response) => {
        // 响应错误回调
        console.error(response);
        alert('请求失败');
      });
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
  @import '../../commen/css/home/schoolFunding';
</style>
