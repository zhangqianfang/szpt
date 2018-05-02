<template>
  <div id="IndexPage">
    <div class="header">
      <span class="title">中等职业学校教学工作状态数据采集与管理平台</span>
      <div class="headerMessage">
        <div class="header_login"><span>admin</span><span>,欢迎您登录本系统!</span></div>
        <div class="revise_passwork"><img src="../assets/mima.png" alt=""><span>修改密码</span></div>
        <div class="out_login"><img src="../assets/tuichu.png" alt=""><span>退出登录</span></div>
      </div>
    </div>
    <nav>
      <ul>
<!-- :class="{active:listNum==index}"    active-class="active" exact -->
        <router-link
          :to="item.src" tag="li"
          v-for="(item,index) in navList" :key=index>{{item.name}}
        </router-link>
      </ul>
    </nav>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      listNum: "",
      navList: [
        { src: "/home", name: "首页" },
        { src: "/schoolPro", name: "学校概况" },
        { src: "/fundsInput", name: "经费投入" },
        { src: "/schoolCondition", name: "办学条件" },
        { src: "/specialtyCon", name: "专业建设" },
        { src: "/teacher", name: "教师情况" },
        { src: "/student", name: "学生情况" },
        { src: "/schoolCooperation", name: "校企合作" },
        { src: "/socialWork", name: "社会服务" },
        { src: "/diagnostic", name: "专业诊断" },
        { src: "/backManage", name: "后台管理" }
      ]
    };
  },
  methods: {
    visit(index) {
      this.listNum = index;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../commen/css/IndexPage';
</style>
