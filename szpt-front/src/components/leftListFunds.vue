<template>
  <div id="LeftList">
    <div class="left">
      <div  v-for="(item,index) in leftList" :key=index>
        <router-link tag="div" @mouseover.native="dataDetails(index)" @mouseleave.native="hiddenDetail(index)" 
          @click.native="visit(index)"  :to="item.src" active-class="visit" exact 
          :class="[{hover:index===listNum&&index!==clickNum},{visit:index===clickNum}]"
          >{{item.name}}
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      hovers: false,
      clickNum: "",
      listNum: " ",
      leftList: [
        { src: "/fundsInput/regeionDataSum", name: "区域数据汇总" },
        { src: "/fundsInput/incomeTotal", name: "经费收入总额" },
        { src: "/fundsInput/incomeTotalAvg", name: "平均经费收入总额" },
        { src: "/fundsInput/schoolIncomePer", name: "学校经费收入比例" },
        { src: "/fundsInput/tuitionIncomePer", name: "学费收入在总收入中占比" },
        { src: "/fundsInput/studentIncomeAvg", name: "生均经费数" },
        { src: "/fundsInput/expendTotal", name: "经费支出总额" },
        { src: "/fundsInput/expendTotalAvg", name: "平均经费支出总额" },
        { src: "/fundsInput/schoolExpendPer", name: "学校经费支出比例" },
        { src: "/fundsInput/teachExpendPer", name: "教学经费在总支出占比" },
        { src: "/fundsInput/enjorScholarship", name: "享受奖助学金金额" }
      ]
    };
  },
  methods: {
    dataDetails(index) {
      // console.log(index)
      this.listNum = index;
    },
    hiddenDetail(index) {
      this.listNum = false;
    },
    visit(index) {
      console.log(index);
      this.clickNum = index;
    }
  }
};
</script>
<style lang="scss" scoped>
#LeftList {
  height: 100%;
  font-size: 0;
  .left {
    width: 12%;
    display: inline-block;
    background: #0c1248;
    color: #fff;
    height: 100%;
    font-size: 14px;
    div {
      div {
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #16124b;
        background: #00276f;
        cursor: pointer;
      }
      .visit {
        background: linear-gradient(#1bc8f3, #0c42bc);
      }
      .hover {
        background: #0938a2;
      }
    }
  }
  .content {
    height: 100%;
    width: 88%;
    background: url(../assets/bg.png)no-repeat left top;
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
  }
}
</style>


