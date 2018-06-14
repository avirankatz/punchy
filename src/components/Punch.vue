<template>
  <div id="punch">
    <el-row class="buttom-margin">
          <el-col :xs="{span:18,offset:3}" :span="6" :offset="9" ><img class="logo" src="../assets/id.png"></el-col>
        </el-row>
        <el-row class="buttom-margin">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6">
            <el-select v-model="selectedUser" placeholder="Your Name">
            <el-option v-for="item in users" :label="item.fname" :key="item._id" :value="item.username"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row class="buttom-margin">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6">
            <el-select v-model="selectedProject" placeholder="Project">
            <el-option v-for="item in projects" :label="item.name" :key="item._id" :value="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row class="buttom-margin" v-if="customTime">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6">
            <el-date-picker class="datepicker"
              v-model="customTime"
              type="datetime"
              format="dd/MM/yyyy HH:mm"
              placeholder="Select date and time">
            </el-date-picker>
          </el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="3" class="punch-btn-container"><el-button class="punch" round @click="punchIn()">Punch In</el-button></el-col>
          <el-col :xs="24" :sm="3" class="punch-btn-container"><el-button class="punch" round @click="punchOut()">Punch Out</el-button></el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row v-if="!customTime">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6"><el-button type="text" @click="setCustomTime()">Set custom time</el-button></el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
  </div>
</template>

<script>
import requester from "../mixins/requester";

export default {
  name: "Punch",
  data() {
    return {
      users: [],
      projects: [],
      customTime: null,
      selectedProject: "",
      selectedUser: ""
    };
  },
  mounted() {
    this.getUsersAndProjects().then(res => {
      this.users = res.data.users;
      this.projects = res.data.projects;
    });
  },
  mixins: [requester],
  methods: {
    setCustomTime() {
      this.customTime = new Date();
    },
    punchIn() {
      this.postPunchIn(
        this.selectedUser,
        this.selectedProject,
        this.customTime ? this.customTime.toJSON() : new Date().toJSON()
      )
        .then(res => {
          if (res.status == 200)
            this.openPunchNotification(
              "Punched in!",
              "Project: " + this.selectedProject
            );
        })
        .catch(() => console.log("bad"));
    },
    punchOut() {
      this.postPunchOut(
        this.selectedUser,
        this.selectedProject,
        this.customTime ? this.customTime.toJSON() : new Date().toJSON()
      )
        .then(res => {
          if (res.status == 200)
            this.openPunchNotification(
              "Punched out!",
              "Project: " + this.selectedProject
            );
        })
        .catch(() => console.log("bad"));
    },

    openPunchNotification(ttl, msg) {
      this.$message.success({
        
        message: msg,
        
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#punch {
  text-align: center;
}
.el-main {
  padding-top: 60px;
  position: absolute;
  width: 100vw;
}
</style>
