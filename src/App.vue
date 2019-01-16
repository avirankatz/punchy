<template>
  <div id="app">
    <el-container>
      <el-aside>
        <el-menu :collapse="true"  background-color="transparent" :router="true">
          <el-menu-item index="0" route="/">
            <i class="el-icon-time"></i>
            <span slot="title">Punchy</span>
          </el-menu-item>
          <el-menu-item index="1" route="/summary">
            <i class="el-icon-document"></i>
            <span slot="title">Summary</span>
          </el-menu-item>
          <el-menu-item index="2" route="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">Settings</span>
          </el-menu-item>
        </el-menu>
      </el-aside>    
      <el-main>
        <el-button class="mobile-menu-button" type="text" @click="toggleMenu()"><i class=el-icon-menu></i></el-button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {
    toggleMenu() {
      document.querySelector(".el-aside").classList.toggle("no-margin");
    }
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo {
  width: 100%;
  height: auto;
  object-fit: cover;
}
body {
  background-color: #f5f6f7;
  margin: 0;
}
.punch-btn-container {
  margin-bottom: 20px;
}
.el-button.punch {
  width: 100%;
}
h1 {
  font-size: 28px;
  font-weight: normal;
}
.el-row.buttom-margin {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.datepicker {
  width: 252px !important;
}
.el-menu {
  min-height: 100%;
  height: 100vh;
  z-index: 1;
}
.el-aside {
  width: auto !important;
}
.mobile-menu-button {
  visibility: hidden;
}
.no-margin {
  margin-left: 0px !important;
}
@media screen and (max-width: 480px) {
  .el-aside {
    margin-left: -65px;
    transition: margin 0.5s;
  }
  .el-main {
    padding-top: 0 !important;
  }
  .mobile-menu-button {
    visibility: visible;
  }
  .el-message {
    min-width: 300px!important;
  }
}
</style>
