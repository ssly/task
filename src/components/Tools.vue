<template>
  <div>
    <el-col :span="2">
      <el-button icon="el-icon-refresh" circle @click="fetchTaskList"></el-button>
    </el-col>
    <el-col :span="22">
      <el-input ref="createInput" v-if="creating" v-model="name"
        @blur="handleBlur" @keydown.enter.native="handleSave"></el-input>
      <el-button v-if="!creating" icon="el-icon-plus" circle @click="handleCreate"></el-button>
    </el-col>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      creating: false,
      saving: false
    };
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
    }
  }
}
</script>
