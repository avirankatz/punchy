<template>
  <div id="summary">
    <div class="block">
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="Filter by month">
      </el-date-picker>
    </div>
    <el-table
    border
    @row-click="rowClicked"
    show-summary
    stripe
    :header-cell-style="{'background-color':'#E4E7ED'}"
    :data="aggregatedData"
    style="width: 100%">
    <el-table-column
      min-width="150px"
      prop="in"
      label="In">
    </el-table-column>
    <el-table-column
      min-width="150px"
      prop="out"
      label="Out">
    </el-table-column>
    <el-table-column
      min-width="150px"
      :filters="filters.name"
      :filter-method="filterHandler"
      prop="name"
      label="Name">
    </el-table-column>
    <el-table-column
      min-width="150px"
      :filters="filters.project"
      :filter-method="filterHandler"
      prop="project"
      label="Project">
    </el-table-column>
    <el-table-column
      min-width="150px"
      prop="duration"
      label="Duration">
    </el-table-column>
  </el-table>
  <el-dialog
    title="Edit Session"
    :visible.sync="dialogVisible"
    width="300px"
    >
    <el-select v-model="rowUnderEdit.name">
      <el-option v-for="item in users" :label="item" :key="item" :value="item"></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import requester from "../mixins/requester";

export default {
  name: "Summary",
  data() {
    return {
      aggregatedData: [],
      dialogVisible: false,
      filters: {
        name: [],
        project: []
      },
      month: "",
      rawData: [],
      users: {},
      rowUnderEdit: {},
    };
  },
  mounted() {
    this.getUsers().then(res => {
      res.data.forEach(item => {
        this.users[item.username] = item.fname;
      });
      this.getSessions().then(res => {
        this.rawData = res.data;
        this.aggregateData();
      });
    });
  },
  mixins: [requester],
  methods: {
    aggregateData(month) {
      this.aggregatedData = [];
      this.rawData.forEach(session => {
        if (month && new Date(session.in).getMonth() != month.getMonth())
          return;
        let aggregatedItem = this.aggregatedData.find(
          i => i.name == session.username && i.project == session.project
        );
        if (aggregatedItem == null) {
          aggregatedItem = {
            name: this.users[session.username],
            username: session.username,
            project: session.project,
            in: new Date(session.in).toLocaleString("he-IL", {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }),
            out: new Date(session.out).toLocaleString("he-IL", {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }),
            duration: 0
          };
          this.aggregatedData.push(aggregatedItem);
        }
        aggregatedItem.duration += this.calculateElapsedTime(
          session.in,
          session.out
        );
        if (
          !this.filters.name.find(i => i.text == this.users[session.username])
        )
          this.filters.name.push({
            text: this.users[session.username],
            value: this.users[session.username]
          });
        if (!this.filters.project.find(i => i.text == session.project))
          this.filters.project.push({
            text: session.project,
            value: session.project
          });
      });
      this.aggregatedData.forEach(i => (i.duration = i.duration.toFixed(2)));
    },

    formatDate(row, column, jsonDate) {
      return new Date(jsonDate).toLocaleString();
    },

    formatElapsedTime(row, col, cell, index) {
      return this.calculateElapsedTime(
        this.rawData[index].in,
        this.rawData[index].out
      ).toFixed(2);
    },

    calculateElapsedTime(start, end) {
      let startDate = new Date(start);
      let endDate = new Date(end);
      let duration = new Date(endDate - startDate);
      return duration.getTime() / (1000 * 60 * 60);
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    rowClicked(row) {
      this.dialogVisible = true;
      this.rowUnderEdit = row;
    }
  },
  watch: {
    month: function(val) {
      this.aggregateData(val);
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
.block {
  text-align: center;
  margin-bottom: 30px;
}
</style>
