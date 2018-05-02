<template>
  <div id="LeftList">
    <div class="left">
 <!-- @click.native="visit(index)" active-class="visit" exact  -->
      <div  v-for="(item,index) in leftList" :key=index>
        <router-link tag="div" @mouseover.native="dataDetails(index)" @mouseleave.native="hiddenDetail(index)" 
           :to="item.src" :class="[{hover:index===listNum&&item.src !== $route.path}]">{{item.name}}
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
      listNum: " "
    };
  },
  props: ["leftList"],
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
.left::-webkit-scrollbar {
  width: 3px;
}
.left::-webkit-scrollbar-track {
  background-color: #bee1eb;
}
.left::-webkit-scrollbar-thumb {
  background-color: #00aff0;
}
.left::-webkit-scrollbar-thumb:hover {
  background-color: #9c3;
}
.left::-webkit-scrollbar-thumb:active {
  background-color: #00aff0;
}
#LeftList {
  height: 100%;
  font-size: 0;
  position: relative;
  .left {
    width: 300px;
    display: inline-block;
    background: #0c1248;
    color: #fff;
    height: 100%;
    font-size: 16px;
    overflow: auto;
    div {
      div {
        height: 60px;
        text-align: left;
        border-bottom: 1px solid #16124b;
        background: #00276f;
        cursor: pointer;
        padding-left: 30px;
        vertical-align: middle;
        display: table-cell;
        width: 300px;
      }
      .active {
        background: linear-gradient(#1bc8f3, #0c42bc);
      }
      .hover {
        background: #0938a2;
      }
    }
  }
  .content {
    height: 100%;
    // width: 88%;
    position: absolute;
    background: url(../assets/bg.png)no-repeat left top;
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
    background-size: cover;
    right: 0;
    left: 300px;
    bottom: 0;
  }
}
</style>


