<template>
  <div id="mainDiv">
    <Headers :header-data="headerData"></Headers>
    <div class="ratio_left">
      <Title :title-name="titleName"></Title>
      <div class="work_ranking">
        <span class="style1">浙江省</span>
        <span class="style2">{{totalMoney}}</span>
        <span class="style3">万元</span>
      </div>
      <div class="work_map">
        <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <div class="ratio_pie">
          <div id="pieChart" style="width:700px; height:400px"></div>
        </div>
      </div>
    </div>
    <div class="ratio_right">
      <Title :title-name="titleName1"></Title>
      <div class="work_ranking">
        <!-- <span class="style1">全国</span> -->
        <span class="style2">{{signalTotalMoney}}</span>
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
      <DataCollTableity :table-list="tableList" @handlePageChange="handlePageChange" :page="page" :pagination-show="paginationShow"></DataCollTableity>
    </div>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import Title from "../../components/title";
  import DataCollTableity from "../../components/dataCollTable7";
  import http from '../../http';
  import {getPieInfo, getBarInfoByPie, getNeedGridInfo7, getCommonParams, getGridParams} from '../../utils/common';
  import { HTTP_ROOT,PAGE_SIZE} from '../../utils/value-consts';
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
        titleName1: { name: "" },
        headerData: { name: "学校经费支出比例" },
       // totalMoney: '',
        serData: [],
        barChart: {},
        signalTotalMoney: '',
        paginationShow: true,
        page: {
          'total': 10,
          'currentPage': 1,
          'pageSize': PAGE_SIZE
        },
        cityName: '',
        tableList: {
          thead: [
            "学校代码",
            "学校名称",
            "基础设施建设<br/>(万元)",
            "设备采购<br/>(万元)",
            "日常教学经费<br/>(万元)",
            "师资队伍建设费<br/>(万元)",
            "教学改革及研究费<br/>(万元)",
            "其他支出总额<br/>(万元)"
          ],
          tbody: [
            
          ]
        }
      };
    },
    mounted() {
      let myChart1 = this.$echarts.init(document.getElementById("pieChart"));
      this.barChart = this.$echarts.init(document.getElementById("barChart"));
      http.api({
        url: HTTP_ROOT + '/api/jap/SchoolExpendPer_Pie',
        successCallback: function (data) {
          let {legendData, serData} = getPieInfo(data.workTableDate);
          pieOption.legend.data =legendData;
          pieOption.series[0].data =serData;
          this.serData =serData;
          myChart1.setOption(pieOption);
          this.drawBarByPie(legendData[0]);
          myChart1.on('click', function (params) {
            console.log(params)
            if (params.componentType === 'series') {
              console.log(params.name);
              this.drawBarByPie(params.name);
            }
          }.bind(this));
        }.bind(this)
      })
      //this.drawSchool();
    },
    methods: {
      drawBarByPie(clickValue){
        this.titleName1.name = clickValue;
          http.api({
          url: HTTP_ROOT + '/api/jap/SchoolExpendPer_Bar',
          successCallback: function (data) {
            let {xData, yData} = getBarInfoByPie(data.workTableDate,clickValue,'T_SCHOOL_CITY');
            this.getGridInfo(xData[0])
            options.xAxis.data =xData;
            options.series[0].data = yData;
            this.barChart.setOption(options);
            this.cityName = xData[0]
            this.barChart.on('click', function (params) {
              console.log(params)
              if (params.componentType === 'series') {
                console.log(params.name);
                this.cityName = params.name;
                this.page.currentPage = 1;
                this.paginationShow = false;
                this.getGridInfo(params.name);
              }
            }.bind(this));
            this.signalTotalMoney = yData.reduce((acc,value) => parseFloat(acc) + parseFloat(value),0).toFixed(2);
          }.bind(this)
        })
      },
      handlePageChange: function (currentPage) {
        console.log(currentPage);
        //this.page.currentPage = currentPage;
        this.getGridInfo(this.cityName,{currentPage: currentPage});
      },
      getParams: function (tableColumn,listFilter,limit=10000,) {
        return {
          "limit":limit,
          "filters":[
            {
              "tableName": "",
              "tableColumn":tableColumn,
              "listFilter":listFilter,
              "tableType":"1",
              "inOrNot":"0"
            }
          ]
        }
      },
      getGridInfo(clickValue,page={currentPage: 1}){
        http.api({
          url: HTTP_ROOT + '/api/jap/SchoolExpendPer_Grid',
          params: getGridParams('T_SCHOOL_CITY',clickValue,page.currentPage),
          successCallback: function (data) {
            this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value)
            this.tableList.tbody = getNeedGridInfo7(data.workTableDate,'TREPORTDATA1_VALUE1','TREPORTDATA1_VALUE2','TREPORTDATA18_VALUE2','TREPORTDATA18_VALUE3','TREPORTDATA18_VALUE5','TREPORTDATA18_VALUE11','TREPORTDATA18_VALUE12','TREPORTDATA18_VALUE13');
            this.$nextTick(function () {
              this.paginationShow = true
            })
          }.bind(this)
        })
      }
    },
    computed: {
      totalMoney: function () {
        let total=0;
        this.serData.forEach(p => {
          total += parseFloat(p.value);
        })
        return total.toFixed(2);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../commen/css/pieBarGridCommon';
</style>

