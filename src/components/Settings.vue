<template>
  <div id="settings">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <h1>Projects</h1>
        <el-button type="text" @click="dialogAddProjectVisible = true">+ Add New</el-button>
        <el-button type="text" class="remove-button" @click="dialogRemoveProjectVisible = true">- Remove</el-button>
        <el-table
          border
          stripe
          :data="projects"
          :header-cell-style="{'background-color':'#E4E7ED'}">
          <el-table-column
            prop="name"
            label="Project">
          </el-table-column>
          <el-table-column
            prop="hourlyFee"
            label="Hourly Fee">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" :xs="24">
        <h1>Users</h1>
        <el-button type="text" @click="dialogUserVisible = true">+ Add New</el-button>
        <el-table
          border
          stripe
          :data="users"
          :header-cell-style="{'background-color':'#E4E7ED'}">
          <el-table-column
            prop="username"
            label="Username">
          </el-table-column>
          <el-table-column
            label="First Name"
            prop="fname">
          </el-table-column>
          <el-table-column
            label="Last Name"
            prop="lname">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="Add New User" :visible.sync="dialogUserVisible" width="400px">
      <el-form :model="newUser" label-width="100px">
        <el-form-item label="Username">
          <el-input v-model="newUser.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="First Name">
          <el-input v-model="newUser.fname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="newUser.lname" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUser">Confirm</el-button>
      </span>
    </el-dialog>
     <el-dialog title="Add New Project" :visible.sync="dialogAddProjectVisible" width="400px">
      <el-form :model="newProject" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="newProject.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Hourly Fee">
          <el-input v-model="newProject.hourlyFee" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddProjectVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addProject">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Remove Project" :visible.sync="dialogRemoveProjectVisible" width="400px">
      <el-select v-model="projectToRemove" placeholder="Select Project">
        <el-option
          v-for="item in projects"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRemoveProjectVisible = false">Cancel</el-button>
        <el-button type="primary" @click="removeProject">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import requester from "../mixins/requester";
export default {
  name: "Settings",
  data() {
    return {
      newUser: {},
      newProject: {},
      projectToRemove: "",
      projects: [],
      users: [],
      dialogAddProjectVisible: false,
      dialogRemoveProjectVisible: false,
      dialogUserVisible: false
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
    addUser() {
      this.postUser(this.newUser).then(() =>
        this.$message({
          message: "User added successfully.",
          type: "success"
        })
      );
      this.dialogUserVisible = false;
    },
    addProject() {
      this.postProject(this.newProject).then(() => {
        this.$message({
          message: "Project added successfully.",
          type: "success"
        });
        this.projects.push(this.newProject);
      });
      this.dialogAddProjectVisible = false;
    },
    removeProject() {
      this.postRemoveProject(this.projectToRemove).then(() =>
        this.$message({
          message: "Project removed successfully.",
          type: "success"
        })
      );
      this.dialogRemoveProjectVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table,
.el-table tr,
.el-table th {
  background: transparent !important;
}
.remove-button {
  color: #f56c6c;
  float: right;
}
</style>
