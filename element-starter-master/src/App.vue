<template>
  <div id="app">
    <div class="top">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="2"> 首 页 </el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank"> 合作伙伴 </a></el-menu-item>
        <el-submenu index="3">
        <template slot="title"> 管理平台 </template>
            <el-menu-item index="3-1">个人管理平台</el-menu-item>
        </el-submenu>
        <el-menu-item index="5"> 帮助中心 </el-menu-item>
        <el-menu-item index="6"> 注 册 </el-menu-item>
        <el-menu-item index="7"><el-button type="text" @click="open">登录</el-button> </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '2'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }

    }

}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.top{
  margin-left: 50px;
}
</style>
