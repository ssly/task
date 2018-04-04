<template>
  <div>
    <el-button icon="el-icon-refresh" circle @click="fetchTaskList"></el-button>
    <el-input ref="createInput" v-if="creating" v-model="name"
      @blur="handleBlur" @keydown.enter.native="handleSave"></el-input>
    <el-button v-if="!creating" icon="el-icon-plus" circle @click="handleCreate"></el-button>
    <el-button v-if="curPanel === 'Main'" @click="switchPanel('Axis')">坐标面板</el-button>
    <el-button v-if="curPanel === 'Axis'" @click="switchPanel('Main')">表格面板</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      creating: false,
      saving: false,
    };
  },

  computed: {
    curPanel() {
      return this.$route.name;
    }
  },

  methods: {
    ...mapActions([
      'fetchTaskList',
      'createTaskList'
    ]),

    handleCreate() {
      this.creating = true;
      this.$nextTick(() => {
        this.$refs.createInput.focus();
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
      console.log(toPanel);
      console.log(this.$router.push);
      this.$router.push({ name: toPanel });
    }
  },
}
</script>
