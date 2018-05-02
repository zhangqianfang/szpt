<template>
  <div id="allDaySchool">
    <Headers :header-data="headerData"></Headers>
    <div class="receipts_left">
      <Title :title-name="titleName"></Title>
      <div class="work_ranking">
        <div>
          <span class="style2">{{totalNum}}</span>
          <span class="style3">个</span>
        </div>
      </div>
      <div class="work_map">
        <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <div id="companySatisfy" style="width:100%; height:400px"></div>
      </div>
    </div>
    <div class="receipts_right">
      <Title :title-name="titleName1"></Title>
      <DataCollTableity :table-list="tableList" @handlePageChange="handlePageChange" :page="page" :pagination-show="paginationShow"></DataCollTableity>
    </div>
  </div>
</template>
<script>
  import Headers from "../../components/header";
  import Title from "../../components/title";
  import DataCollTableity from "../../components/dataCollTablePage";
  import http from '../../http';
  import pieOption from "../../commen/pie_option_company";
  import { PROVINCE, TASK_ID,HTTP_ROOT,PAGE_SIZE} from '../../utils/value-consts';
  import {getXyData, getNeedGridInfo, getCommonParams, getGridParams} from '../../utils/common';
  export default {
    data() {
      return {
        titleName: { name: "毕业生用人单位满意情况" },
        titleName1: { name: "" },
        headerData: { name: "毕业生用人单位满意情况" },
        totalNum: '',
        xData: [],
        yData: [],
        paginationShow: true,
        page: {
          'total': 10,
          'currentPage': 1,
          'pageSize': PAGE_SIZE
        },
        reset: false,
        cityName: '',
        tableList: {
          thead: ["学校名称","学校代码","人数"],
          tbody: []
        },
      };
    },
    mounted: function () {
      let myChart1 = this.$echarts.init(document.getElementById("companySatisfy"));
      // 绘制图表
      http.api({
        url: HTTP_ROOT + '/api/jap/CompanySatisfySituation_Bar',
        params: getCommonParams(),
        successCallback: function (data) {
          let pieData = this.getPieData(data.workTableDate,['TREPORTDATA38_VALUE12', 'TREPORTDATA38_VALUE14', 'TREPORTDATA38_VALUE16']);
          pieOption.series[0].data =pieData;
          myChart1.setOption(pieOption);
          this.cityName = pieData[0].name;
          this.getGridInfo(pieData[0].name);
          myChart1.on('click', function (params) {
            console.log(params)
            if (params.componentType === 'series') {
              console.log(params.name);
              this.chartsClick(params.name);
            }
          }.bind(this));
         // this.totalNum = yData.reduce((acc,value)=>parseInt(acc)+parseInt(value),0);
         // this.cityName = xData[0]
        }.bind(this)
      })
    },
    methods: {
      getPieData: function (workTable,columnArr) {
        let data = JSON.parse(workTable);
        let pieData=[];
        data.forEach(p=>{
          p.forEach(x=>{
            let pieObject = {};
            if (columnArr.indexOf(x.columnName)!=-1) {
              pieObject.value = x.value;
              pieObject.name = x.columnNameCn;
              pieData.push(pieObject);
            }
          })
        })
        return pieData;

      },
      chartsClick: function (name) {
        this.cityName = name;
        this.page.currentPage = 1;
        this.paginationShow = false;
        this.getGridInfo(name);
      },
      handlePageChange: function (currentPage) {
        console.log(currentPage);
        //this.page.currentPage = currentPage;
        this.getGridInfo(this.cityName,{currentPage: currentPage});
      },
      getParams: function (tableColumn,listFilter,limit = 100000) {
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
      getGridParams: function (currentPage =1) {
        let startIndex = (currentPage-1) * PAGE_SIZE;
        return {
          "limit":`${PAGE_SIZE} offset ${startIndex}`,
          "filters":[
            {
              "tableName": "",
              "tableColumn":'T_SCHOOL_PROVINCE',
              "listFilter":PROVINCE,
              "tableType":"1",
              "inOrNot":"0"
            },
            {
              "tableName": "",
              "tableColumn":'T_TASK_ID',
              "listFilter": TASK_ID,
              "tableType":"1",
              "inOrNot":"0"
            }
          ]
        }
      },
      getGridInfo: function (cityName,page={currentPage: 1}) {
        this.titleName1.name = cityName;
        http.api({
          url: HTTP_ROOT + '/api/jap/CompanySatisfySituation_Grid',
          params: this.getGridParams(page.currentPage),
          successCallback: function (data) {
            this.page.total = parseInt(JSON.parse(data.pageInfo)[0][0].value);
            let columnName = cityName === '满意或基本满意人数' ? 'TREPORTDATA38_VALUE12': cityName === '一般满意人数'? 'TREPORTDATA38_VALUE14': 'TREPORTDATA38_VALUE16';
            this.tableList.tbody = getNeedGridInfo(data.workTableDate,"TREPORTDATA1_VALUE2","TREPORTDATA1_VALUE1",columnName,1,false);
            this.$nextTick(function () {
              this.paginationShow = true
            })
          }.bind(this)
        })
      }
    },
    components: {
      Headers,
      Title,
      DataCollTableity
    }
  };
</script>
<style lang="scss" scoped>
  #allDaySchool {
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
        display: flex;
        justify-content: center;
        height: 60px;
        width: 300px;
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
          color: #fff;
          font-weight: 700;
          font-size: 48px;
          color: #fcf042;
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
        margin-top: 30px;
        width: 95%;
        box-sizing: border-box;
        padding: 20px 20px 60px;
        position: relative;
        text-align: center;
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
        .echarts{
          z-index: 1000;
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

