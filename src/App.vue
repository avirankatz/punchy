<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div><h1>Punch Card</h1></div>    
    <el-row>
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
      <el-col :xs="24" :sm="6"><el-input placeholder="Your Name" v-model="name"></el-input></el-col>
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row>
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
      <el-col :xs="24" :sm="6"><el-input placeholder="Project" v-model="project"></el-input></el-col>
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
      <el-col :xs="24" :sm="3" class="punch-btn-container"><el-button :size="large" round>Punch In</el-button></el-col>
      <el-col :xs="24" :sm="3" class="punch-btn-container"><el-button :size="large" round>Punch Out</el-button></el-col>
      <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
    </el-row>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  props: ["name", "project"],
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
body {
  background-color: #f5f6f7;
}
.punch-btn-container {
  margin-bottom: 20px;
}
.el-button {
  width: 100%;
}
h1 {
  font-size: 28px;
  font-weight: normal;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
