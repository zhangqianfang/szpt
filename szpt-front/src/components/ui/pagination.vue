<template>
  <div align="center" class="pages">
    <el-pagination v-show="page.show" @current-change="handleCurrentChange"
        :current-page="page.pageNo" :page-size="page.pageSize"
        layout="total, prev, pager, next,jumper" :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      default(){
        return {
          pageNo: 1, pageSize: 10,
          total: 0, show: true
        }
      }
    }
  },
  methods: {
    // 页码变更
    handleCurrentChange: function(val) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
  .pages {
    margin-top: 20px;
  }
</style>
