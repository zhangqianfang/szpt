<template>
   <div id="title">
        <div v-if="titleName">{{titleName.name}}</div>
    </div>
</template>
<script>
export default {
  props: {
    titleName: {
      type: Object,
      default: {}
    }
  }
};
</script>
<style lang="scss" scoped>
#title {
  background: url(../assets/bianqian.png)no-repeat left top;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  font-size: 18px;
  color: #fff;
}
</style>

