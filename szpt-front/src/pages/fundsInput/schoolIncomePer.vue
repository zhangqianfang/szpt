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
          <!-- <BarCharts :x-data="xData" :y-data="yData" echart-id="barChart"></BarCharts> -->
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
  import BarCharts from '../../components/barCharts';
  export default {
    components: {
      Headers,
      Title,
      DataCollTableity,
      // BarCharts
    },
    data() {
      return {
        titleName: { name: "学校经费收入比例" },
        titleName1: { name: "" },
        headerData: { name: "学校经费收入比例" },
       // totalMoney: '',
        serData: [],
        barChart: {},
        xData: [],
        yData: [],
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
            "中央、地方财政专项投入<br/>(万元)",
            "财政经常性补助收入<br/>(万元)",
            "学费收入<br/>(万元)",
            "社会捐赠<br/>(万元)",
            "其他收入<br/>(万元)"
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
        url: HTTP_ROOT + '/api/jap/SchoolIncomePer_Pie',
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
          url: HTTP_ROOT + '/api/jap/SchoolIncomePer_Bar',
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
          url: HTTP_ROOT + '/api/jap/SchoolIncomePer_Grid',
          params: getGridParams('T_SCHOOL_CITY',clickValue,page.currentPage),
          successCallback: function (data) {
            this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value)
            this.tableList.tbody = getNeedGridInfo7(data.workTableDate,'TREPORTDATA1_VALUE1','TREPORTDATA1_VALUE2','TREPORTDATA17_VALUE5','TREPORTDATA17_VALUE10','TREPORTDATA17_VALUE15','TREPORTDATA17_VALUE16','TREPORTDATA17_VALUE17');
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
    },
    components: {
      Headers,
      // Title,
      DataCollTableity,
      BarCharts
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../commen/css/pieBarGridCommon';
</style>


