<template>
  <div class="container">
    <div v-for="row in ['true', 'false']" :key="row" class="row">
        <span class="col-container" :span="12" v-for="col in ['true', 'false']" :key="col"
          @dragover="cancelDefault($event)"
          @drop="e => handleDrop(e, { important: row, emergency: col })">

            <span class="tag-container"
              v-if="!el.endTime && el.important == row && el.emergency == col"
              v-for="(el, i) in taskList" :key="i"
              draggable="true"
              @dragstart="e => handleDragStart(e, el)">

              <el-tag size="medium" :type="getTypeFrom(el.priority)">
                {{ el.name }}
              </el-tag>
            </span>

            <div class="title">{{ getTitleFrom(row, col) }}</div>
        </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapState(['taskList', 'taskListUpdateTime']),
  },

  methods: {
    ...mapActions(['fetchTaskList', 'updateTask']),

    getTypeFrom(priority) {
      let arr = ['', 'danger', 'warning', 'info'];
      return arr[priority];
    },

    getTitleFrom(important, emergency) {
      let title = '不重要不紧急';
      if (important === 'true' && emergency === 'true') {
        title = '重要紧急';
      } else if (important === 'true' && emergency === 'false') {
        title = '重要不紧急';
      } else if (important === 'false' && emergency === 'true') {
        title = '不重要紧急';
      }
      return title;
    },

    cancelDefault(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },

    handleDragStart(e, item) {
      let { id, important, emergency } = item;
      e.dataTransfer.setData('text/plain', JSON.stringify({ id, important, emergency }));
    },

    handleDrop(e, options) {
      this.cancelDefault(e);
      let item = JSON.parse(e.dataTransfer.getData('text/plain'));

      // 如果目标区域未发生变化
      if (item.important === options.important && item.emergency === options.emergency) {
        return;
      }

      options.id = item.id;
      this.updateTask(options);
    },
  },

  created() {
    this.fetchTaskList();
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
.row {
  height: 50%;
}
.col-container {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.row:nth-child(1) .col-container:nth-child(1) {
  border: 1px solid rgba(255, 0, 0, .5);
  padding-bottom: 30px;
}
.row:nth-child(1) .col-container:nth-child(2) {
  border: 1px solid rgba(0, 255, 0, .5);
  padding-bottom: 30px;
}
.row:nth-child(2) .col-container:nth-child(1) {
  border: 1px solid rgba(0, 0, 255, .5);
  padding-top: 30px;
}
.row:nth-child(2) .col-container:nth-child(2) {
  border: 1px solid rgba(255, 255, 0, .5);
  padding-top: 30px;
}

.title {
  position: absolute;
}
.row:nth-child(1) .col-container:nth-child(1) > .title {
  right: 0;
  bottom: 0;
}
.row:nth-child(1) .col-container:nth-child(2) > .title {
  bottom: 0;
  left: 0;
}
.row:nth-child(2) .col-container:nth-child(1) > .title {
  top: 0;
  right: 0;
}
.row:nth-child(2) .col-container:nth-child(2) > .title {
  top: 0;
  left: 0;
}
.tag-container {
  display: inline-block;
}
</style>
