<template>
  <div id="header">
      <img src="../assets/titleline.png" alt="">
      <div>
        <span>{{headerData.name}}</span>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    headerData: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
#header {
  position: relative;
  height: 100px;
  img {
    z-index: -1;
    width: 100%;
    height:100%;
  }
  div {
    font-size: 22px;
    color: #fff;
    position: absolute;
    top: 15%;
    // left: 40%;
    text-align: center;
    width:100%;
  }
}
</style>

