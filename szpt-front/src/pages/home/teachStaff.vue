<template>
  <div id="teachStaff">
    <div class="title">
          中等职业学校师资队伍情况
        </div>
    <div class="basic_bottom">
      <ul>
        <li v-for="(item,index) in liArray" :key="index" :class="classMap[index]">
          <span class="title1">{{item.title}}</span>
          <span class="left"></span>
          <span class="right"></span>
           {{item.text}}
        </li>
      </ul>
    </div>
   <div class="basic_top">
      <div class="basic_left">
        
        <div class="left_title">
          <Title :title-name="titleName"></Title>
        </div>
        <div class="left_pie">
            <PieChart ref="leftPie" :chartId="'leftPie'" :legend="leftPie.legend" :radius="['50%','70%']"
                :opinionData="leftPie.opinionData" :echartStyle="pieStyle" ></PieChart>
        </div>
      </div>
      <div class="basic_right">
        <div class="right_title">
          <Title :title-name="titleName1"></Title>
        </div>
        <div class="right_pie">
          <PieChart ref="rightPie" :chartId="'rightPie'" :legend="rightPie.legend" :radius="['50%','70%']"
                :opinionData="rightPie.opinionData" :echartStyle="pieStyle" ></PieChart>
        </div>
      </div>
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
    this.initData();
  },
  data() {
    return {
      leftPie: {
        legend: {
          textStyle: { fontSize: 16, color: '#FFF' },
          orient: 'vertical', x: 'left', top: 20,
          itemGap: 15, itemWidth: 30, itemHeight: 17,
          data: ['博士研究生','硕士研究生','本科','专科','其它']
        },
        opinionData: [
          { name: "博士研究生", value: 0, },
          { name: "硕士研究生", value: 0, },
          { name: "本科", value: 0, },
          { name: "专科", value: 0, },
          { name: "其它", value: 0, }
        ]
      },
      rightPie: {
        legend: {
          textStyle: { fontSize: 16, color: '#FFF' },
          orient: 'vertical', x: 'left', top: 20,
          itemGap: 15, itemWidth: 30, itemHeight: 17,
          data: ['正高级','副高级','中级','初级','无']
        },
        opinionData: [
          { name: "正高级", value: 0 },
          { name: "副高级", value: 0 },
          { name: "中级", value: 0 },
          { name: "初级", value: 0 },
          { name: "无", value: 0 }
        ]
      },
      pieStyle: {
        height: ""
      },
      cityName: this.global.localCityName,
      titleName: { name: "校内专任教师学历分布情况" },
      titleName1: { name: "校内专任教师专业技术职务分布情况" },
      totalNum: "",
      liArray: [
        { title: "校内专任教师总数", text: "0" },
        { title: "师生比", text: "0:0.0" },
        { title: "校内兼课教师总数", text: "0" },
        { title: "校外兼课教师总数", text: "0" },
        { title: "校外兼职教师总数", text: "0" },
        { title: "校内专任教师中“双师型”教师总数", text: "0" },
        { title: "校内专任教师中“双师型”教师占专业教师比率", text: "0.0%" }
      ],
      classMap: [
        "li_color1",
        "li_color2",
        "li_color3",
        "li_color4",
        "li_color5",
        "li_color6",
        "li_color7",
        "li_color8"
      ]
    };
  },
  created() {
    // 获取屏幕高度
    this.pieStyle.height = "440px";
  },
  methods: {
    initData() {
      this.initTableData(); // 初始化表格数据
      this.initLeftPie();
      this.initRightPie();
    },
    initTableData(){
      this.initTable1();
      setTimeout(()=>{
        this.initTable2();
      },100); // 延迟100毫秒
      this.initTable3();
      this.initTable4();
      this.initTable5();
      this.initTable6();
      setTimeout(()=>{
        this.initTable7();
      },100); // 延迟100毫秒
    },
    // 校内专任教师总数
    initTable1(){
      this._defaultQuery('/home_basicSituation_table5', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        liArray[0].text = this.japUtils.getOneIntSum(data);
        this.$set(this.liArray, liArray);
      });
    },
    // 师生比
    initTable2(){
      this._defaultQuery('/at_school_students_count', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        let studentCount = this.japUtils.getOneIntSum(data);
        liArray[1].text = "1:"+ (studentCount/Number.parseFloat(liArray[0].text)).toFixed(1);
        this.$set(this.liArray, liArray);
      });
    },
    // 校内兼课教师总数
    initTable3(){
      this._defaultQuery('/home_teachStaff_table3', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        liArray[2].text = this.japUtils.getOneIntSum(data);
        this.$set(this.liArray, liArray);
      });
    },
    // 校外兼课教师总数
    initTable4(){
      this._defaultQuery('/home_teachStaff_table4', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        liArray[3].text = this.japUtils.getOneIntSum(data);
        this.$set(this.liArray, liArray);
      });
    },
    // 校外兼职教师总数**
    initTable5(){
      this._defaultQuery('/home_teachStaff_table5', {limit:"100"}, (data)=>{
        let liArray = this.liArray;
        liArray[4].text = this.japUtils.getOneIntSum(data);
        this.$set(this.liArray, liArray);
      });
    },
    // 校内专任教师中“双师型”教师总数
    initTable6(){
      let postOption = {
        limit: "100",
        filters: [
          {
            tableColumn: "T_SCHOOL_PROVINCE",
            listFilter: this.cityName,
            tableType: "1",
            inOrNot: "0"
          },
          {
            tableColumn: "TREPORTDATA19_VALUE23",
            listFilter: '是',
            tableType: "1",
            inOrNot: "0"
          }
        ]
      }
      this._defaultQuery('/home_teachStaff_treportdata19', postOption, (data)=>{
        let liArray = this.liArray;
        liArray[5].text = this.japUtils.getOneIntSum(data);
        this.$set(this.liArray, liArray);
      });
    },
    // 校内专任教师中“双师型”教师占专业教师比率
    initTable7(){
      let postOption = {
        limit: "100",
        filters: [
          {
            tableColumn: "T_SCHOOL_PROVINCE",
            listFilter: this.cityName,
            tableType: "1",
            inOrNot: "0"
          },
          {
            tableColumn: "TREPORTDATA19_VALUE21",
            listFilter: '是',
            tableType: "1",
            inOrNot: "0"
          }
        ]
      }
      this._defaultQuery('/home_teachStaff_treportdata19', postOption, (data)=>{
        let liArray = this.liArray;
        let count = this.japUtils.getOneIntSum(data);
        liArray[6].text = (Number.parseInt(liArray[5].text)*100/count).toFixed(2)+'%';
        this.$set(this.liArray, liArray);
      });
    },
    initLeftPie(){
      this._defaultQuery('/home_teachStaff_leftChartData', {limit:"100"}, (data)=>{
        let leftChartData = this.japUtils.getMapValue(data, ['博士研究生','硕士研究生','本科','专科','专科以下']);
        // 为饼图赋值
        this.leftPie.opinionData[0].value = leftChartData[0];
        this.leftPie.opinionData[1].value = leftChartData[1];
        this.leftPie.opinionData[2].value = leftChartData[2];
        this.leftPie.opinionData[3].value = leftChartData[3];
        this.leftPie.opinionData[4].value = leftChartData[4];
        this.$set(this.leftPie.opinionData);
      });
    },
    initRightPie(){
      this._defaultQuery('/home_teachStaff_rightChartData', {limit:"100"}, (data)=>{
        let rightChartData = this.japUtils.getMapValue(data, ['正高级','副高级','中级','初级','无']);
        // 为饼图赋值
        this.rightPie.opinionData[0].value = rightChartData[0];
        this.rightPie.opinionData[1].value = rightChartData[1];
        this.rightPie.opinionData[2].value = rightChartData[2];
        this.rightPie.opinionData[3].value = rightChartData[3];
        this.rightPie.opinionData[4].value = rightChartData[4];
        this.$set(this.rightPie.opinionData);
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
  @import '../../commen/css/home/teachStaff';
</style>


