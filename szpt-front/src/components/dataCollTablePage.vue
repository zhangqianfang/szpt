<template>
	 <div id="data_coll_table">
      <span class="left"></span>
        <span class="right"></span>
        <span class="left_bottom"></span>
        <span class="right_bottom"></span>
        <div>
          <table>
            <thead>
              <td v-for="(item,index) in tableList.thead" :key="index">{{item}}</td>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableList.tbody" :key="index">
                <td>{{item.name ? item.name:index+1}}</td>
                <td>{{item.statistical}}</td>
                <td>{{item.value}}</td>
                <td v-if="item.value2">{{item.value2}}</td>
                <td v-if="item.value3">{{item.value3}}</td>
                <td v-if="item.value4">{{item.value4}}</td>
                <td v-if="item.value5">{{item.value5}}</td>
                <td v-if="item.value6">{{item.value6}}</td>
                <td v-if="item.value7">{{item.value7}}</td>
              </tr>
            </tbody>
          </table>
          <div align="center" class="pages">
              <el-pagination v-show="page.show || paginationShow" @current-change="handleCurrentChange"
                   :current-page="page.pageNo" :page-size="page.pageSize"
                   layout="total, prev, pager, next,jumper" :total="page.total">
              </el-pagination>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    tableList: {
      type: Object,
      default: function() {
        return { messge: "e" };
      }
    },
    page: {
      type: Object,
      default(){
        return {
          pageNo: 1,
          currentPage: 1,
          pageSize: 10,
          total: 0,
          show: true
        }
      }
    },
    paginationShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 页码变更
    handleCurrentChange: function(val) {
      //console.log('page change....');
      this.page.currentPage = val;
      this.$emit('handlePageChange', val);
      this.page.pageNo = val;
      let pageInfo = {
        pageNo: val,
        limit: this.getPageLimit(val)
      }
      this.$emit('changePage', pageInfo);
    },
    getPageLimit (pageNo = 1) {
      let start = (pageNo - 1) * this.page.pageSize
      return `${this.page.pageSize} offset ${start}`
    }
  },
  watch: {
    "page.pageNo": function(newVal, oldVal){
      this.page.pageNo = newVal;
    },
    "page.currentPage": function(newVal, oldVal){
      this.page.pageNo = newVal;
    },
    paginationShow: function(newVal, oldVal){
      this.page.show = newVal;
    }
  }
};
</script>
<style lang="scss" scoped>
#data_coll_table {
  border: 1px solid #24378e;
  margin-top: 10px;
  width: 95%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  font-size: 16px;
  color: #fff;
  //  margin: 40px auto;
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
  .pages {
    margin-top: 20px;
  }
}
</style>
