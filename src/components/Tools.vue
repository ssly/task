<template>
  <div class="container">
    <el-button icon="el-icon-refresh" circle @click="fetchTaskList"></el-button>
    <el-input ref="createInput" v-if="creating" v-model="name"
      @blur="handleBlur" @keydown.enter.native="handleSave"></el-input>
    <el-button v-if="!creating" icon="el-icon-plus" circle @click="handleCreate"></el-button>
    <el-button v-if="curRouteName === 'Main'" type="danger" icon="el-icon-delete" circle @click="deleteMany"></el-button>
    <el-button v-if="curRouteName === 'Main'" @click="switchPanel('Axis')">坐标面板</el-button>
    <el-button v-if="curRouteName === 'Axis'" @click="switchPanel('Main')">表格面板</el-button>
    <el-button @click="signout">注销</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import event from '../assets/js/event';

export default {
  data() {
    return {
      name: '',
      creating: false,
      saving: false,
    };
  },

  computed: {
    ...mapState(['taskOptions']),

    curRouteName() {
      return this.$route.name;
    }
  },

  methods: {
    ...mapActions([
      'fetchTaskList',
      'createTaskList',
      'deleteTaskList'
    ]),

    signout() {
      event.emit('signout');
    },

    handleCreate() {
      this.creating = true;
      this.$nextTick(() => {
        this.$refs.createInput.focus();
      });
    },

    deleteMany() {
      let selectIDList = this.taskOptions.selectList.map(item => item.id);
      let selectLength = selectIDList.length;
      if (selectLength === 0) {
        this.$message({
          type: 'warning',
          message: '请选择你要操作的项'
        });
        return;
      }

      this.$confirm(`确定要删除选定的 ${selectLength} 项吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTaskList(selectIDList);
      });
    },

    handleBlur() {
      if (!this.name) {
        this.creating = false;
        return;
      }
      this.handleSave();
    },

    handleSave() {
      if (!this.name || this.saving) {
        return;
      }

      this.saving = true;
      this.createTaskList({ name: this.name }).then(() => {
        this.creating = false;
        this.saving = false;
        this.name = '';
      });
    },

    switchPanel(toPanel) {
      this.$router.push({ name: toPanel });
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
