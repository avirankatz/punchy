<template>
  <div id="summary">
    <el-table
    border
    stripe
    :header-cell-style="{'background-color':'#E4E7ED'}"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="in"
      :formatter="formatDate"
      label="In">
    </el-table-column>
    <el-table-column
      prop="out"
      :formatter="formatDate"
      label="Out">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="project"
      label="Project">
    </el-table-column>
    <el-table-column
      :formatter="calculateElapsedTime"
      label="Duration">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import requester from "../mixins/requester";

export default {
  name: "Summary",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getSessions().then(res => this.tableData = res.data);
  },
  mixins: [requester],
  methods: {
    formatDate(row, column, jsonDate) {
      return new Date(jsonDate).toLocaleString();
    },

    calculateElapsedTime(row, col, cell, index) {
      let start = new Date(this.tableData[index].in);
      let end = new Date(this.tableData[index].out);
      let duration = new Date(end-start);
      return duration.getTime() / (1000 * 60 * 60);
      
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
</style>
