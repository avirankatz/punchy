<template>
  <div id="punch">
    <el-row class="buttom-margin">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6"><img class="logo" src="../assets/id.png"></el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <div><h1>Punch Card</h1></div>    
        <el-row class="buttom-margin">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6">
            <el-select v-model="name" placeholder="Your Name">
            <el-option v-for="item in names" :label="item" :key="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row class="buttom-margin">
          <el-col :xs="0" :sm="9"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="6">
            <el-select v-model="project" placeholder="Project">
            <el-option v-for="item in projects" :label="item" :key="item" :value="item"></el-option>
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
      names: ["Aviran", "Roy", "Debora", "Noa", "Lee", "Ilona"],
      projects: [
        "ImageInUs",
        "Pathways",
        "Climb for Justice",
        "Tevel",
        "Kulna",
        "Democrasee"
      ],
      customTime: null,
      project: "",
      name: ""
    };
  },
  mixins: [requester],
  methods: {
    setCustomTime() {
      this.customTime = new Date();
    },
    punchIn() {
      this.postPunchIn(
        this.name,
        this.project,
        this.customTime ? this.customTime.toJSON() : new Date().toJSON()
      )
        .then(res => {
          if (res.status == 200)
            this.openPunchNotification(
              "Punched in!",
              "Project: " + this.project
            );
        })
        .catch(() => console.log("bad"));
    },
    punchOut() {
      this.postPunchOut(
        this.name,
        this.project,
        this.customTime ? this.customTime.toJSON() : new Date().toJSON()
      )
        .then(res => {
          if (res.status == 200)
            this.openPunchNotification(
              "Punched out!",
              "Project: " + this.project
            );
        })
        .catch(() => console.log("bad"));
    },

    openPunchNotification(ttl, msg) {
      this.$notify.success({
        title: ttl,
        message: msg,
        showClose: false
      });
      this.$http;
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
