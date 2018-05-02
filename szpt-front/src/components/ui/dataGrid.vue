<template>
  <table>
    <thead>
      <td v-if="tableList.showIndex">序号</td>
      <td v-for="(item,index) in tableList.thead" :key="index">{{ item }}</td>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tableList.tbody" :key="index">
        <td v-if="tableList.showIndex">{{ index+1 }}</td>
        <td v-for="(val, key, i) in item" :key="i">{{ val }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    tableList: {
      type: Object,
      default: function() {
        return { messge: "e" };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
