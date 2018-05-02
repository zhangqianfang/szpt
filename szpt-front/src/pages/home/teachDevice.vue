<template>
  <div id="teachDevice">
    <div class="title">
          中等职业学校教学设备情况
    </div>
    <div class="content">
      <dl v-for="(item,index) in deviceList" :key="index">
        <dt><img :src="item.src" alt=""></dt>
        <dd class="device_text">{{item.text}}</dd>
        <dd class="device_logo"><img :src="item.logo" alt=""><span class="price1">{{item.price1}}</span><span class="price2">{{item.price2}}</span></dd>
      </dl>

    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initData();
  },
  data() {
    return {
      deviceList: [
        {
          src: "" + require(`../../assets/index1.png`) + "",
          text: "生均教学实习仪器",
          logo: "" + require(`../../assets/ind1.png`) + "",
          price1: "资产值0.00万元",
          price2: "生均值0.00元"
        },
        {
          src: "" + require(`../../assets/index2.png`) + "",
          text: "全省教学用计算机",
          logo: "" + require(`../../assets/ind2.png`) + "",
          price1: "总数为0台",
          price2: "生均值0.00台"
        },
        {
          src: "" + require(`../../assets/index3.png`) + "",
          text: "全省印刷图书",
          logo: "" + require(`../../assets/ind3.png`) + "",
          price1: "总数0.0万册",
          price2: "生均值0.00册"
        },
        {
          src: "" + require(`../../assets/index4.png`) + "",
          text: "音视频总量",
          logo: "" + require(`../../assets/ind4.png`) + "",
          price1: "总数为0.00小时",
          price2: "生均值为0.00小时"
        },
        {
          src: "" + require(`../../assets/index5.png`) + "",
          text: "电子图书",
          logo: "" + require(`../../assets/ind5.png`) + "",
          price1: "总数0万册",
          price2: "生均值0.00册"
        },
        {
          src: "" + require(`../../assets/index6.png`) + "",
          text: "全省学校",
          logo: "" + require(`../../assets/ind6.png`) + "",
          price1: "总占地0.00万㎡",
          price2: "生均用地0.00㎡"
        }
      ]
    };
  },
  methods: {
    initData() {
      this.initAtSchoolStudents();
      setTimeout(() => {
        this.initData1();
        this.initData2();
        this.initData3();
        this.initData4_5();
        this.initData6();
      }, 500);
    },
    // 在校生总数
    initAtSchoolStudents(){
      this._defaultQuery('/at_school_students_count', {limit:"100"}, (data)=>{
        this.atSchoolStudents = this.japUtils.getOneIntSum(data);
      });
    },
    // 生均教学实习仪器
    initData1(){
      this._defaultQuery('/home_teachDevice_data1', {limit:"100"}, (data)=>{
        let deviceList = this.deviceList;
        let count = this.japUtils.getOneIntSum(data);
        deviceList[0].price1 = '资产值' + count + '万元';
        deviceList[0].price2 = '生均值' + (count*10000/this.atSchoolStudents).toFixed(2) + '元';
        this.$set(this.deviceList, deviceList);
      });
    },
    // 全省教学用计算机
    initData2(){
      this._defaultQuery('/home_teachDevice_data2', {limit:"100"}, (data)=>{
        let deviceList = this.deviceList;
        let count = this.japUtils.getOneIntSum(data);
        deviceList[1].price1 = '总数为' + count + '台';
        deviceList[1].price2 = '生均值' + (count/this.atSchoolStudents).toFixed(2) + '台';
        this.$set(this.deviceList, deviceList);
      });
    },
    // 全省印刷图书
    initData3(){
      this._defaultQuery('/home_teachDevice_data3', {limit:"100"}, (data)=>{
        let deviceList = this.deviceList;
        let count = this.japUtils.getOneIntSum(data);
        deviceList[2].price1 = '总数为' + count + '万册';
        deviceList[2].price2 = '生均值' + (count*10000/this.atSchoolStudents).toFixed(2) + '册';
        this.$set(this.deviceList, deviceList);
      });
    },
    // 音视频总量&电子图书
    initData4_5(){
      this._defaultQuery('/home_teachDevice_data4_5', {limit:"100"}, (data)=>{
        let array = this.japUtils.getManyIntSum(data, [1, 2]);
        let deviceList = this.deviceList;
        deviceList[3].price1 = '总数为' + array[0] + '小时';
        deviceList[4].price1 = '总数为' + (array[1]/10000).toFixed(2) + '万册';
        deviceList[3].price2 = '生均值' + (array[0]/this.atSchoolStudents).toFixed(2) + '小时';
        deviceList[4].price2 = '生均值' + (array[1]/this.atSchoolStudents).toFixed(2) + '册';
        this.$set(this.deviceList, deviceList);
      });
    },
    // 全省学校
    initData6(){
      this._defaultQuery('/home_teachDevice_data6', {limit:"100"}, (data)=>{
        let deviceList = this.deviceList;
        let count = this.japUtils.getOneIntSum(data);
        deviceList[5].price1 = '总占地' + count + '万㎡';
        deviceList[5].price2 = '生均用地' + (count*10000/this.atSchoolStudents).toFixed(2) + '㎡';
        this.$set(this.deviceList, deviceList);
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
 @import '../../commen/css/home/teachDevice';
</style>

