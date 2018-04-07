<template>
  <div id="main">
    <el-table border :data="taskList" @selection-change="val => { setTaskOptions({ selectList: val }) }">
      <el-table-column type="selection" width="50" align="center"></el-table-column>

      <el-table-column label="名称" min-width="300">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="300"
            v-model="scope.row.namePopover">

            <el-input :value="scope.row.name"
              @blur="updateName(scope.row, $event.target)"
              @keydown.enter.native="updateName(scope.row, $event.target)"></el-input>

            <span slot="reference">{{ scope.row.name }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="重要性" align="center">
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom"
            @command="c => handleCommand(scope.row.id, 'important', c)">
            <span class="el-dropdown-link">
              <el-tag class="pointer" slot="reference"
                :type="scope.row.important === 'true' ? 'danger' : 'info'">
                {{ scope.row.important === 'true' ? '重要' : '不重要' }}
              </el-tag>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.important === 'true'" command="false">不重要</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.important === 'false'" command="true">重要</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

      <el-table-column label="紧急性" align="center">
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom"
            @command="c => handleCommand(scope.row.id, 'emergency', c)">
            <span class="el-dropdown-link">
              <el-tag class="pointer" :type="scope.row.emergency === 'true' ? 'danger' : 'success'">
                {{ scope.row.emergency === 'true' ? '紧急' : '不急' }}
              </el-tag>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.emergency === 'true'" command="false">不急</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.emergency === 'false'" command="true">紧急</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="优先级" align="center">
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom"
            @command="c => handleCommand(scope.row.id, 'priority', c)">
            <span class="el-dropdown-link">
              <el-tag class="pointer"
                :type="scope.row.priority === '1' ? 'danger' : scope.row.priority === '2' ? 'success' : 'info'">
                {{ scope.row.priority === '1' ? '高' : scope.row.priority === '2' ? '中' : '低'}}
              </el-tag>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.priority !== '1'" command="1">高</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.priority !== '2'" command="2">中</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.priority !== '3'" command="3">低</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

      <el-table-column prop="deadline" label="预计耗时" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime ? '完成' : scope.row.startTime ? '进行中' : '-' }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-popover placement="bottom"
            v-model="scope.row.statusPopover">

            <el-button :disabled="!!scope.row.startTime"
              size="mini" @click="handleStatus(scope.row, '1')">开始</el-button>
            <el-button :disabled="!scope.row.startTime || !!scope.row.endTime"
              size="mini" @click="handleStatus(scope.row, '2')">结束</el-button>
            <el-button size="mini" @click="handleStatus(scope.row, '0')">恢复</el-button>

            <el-button size="mini" slot="reference">状态</el-button>
          </el-popover>

          <el-button size="mini">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情弹窗 -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HelloWorld',

  computed: {
    ...mapState(['taskList'])
  },

  data() {
    return {
      detailModalVisible: false,
      selectList: [],
    }
  },

  methods: {
    ...mapActions([
      'fetchTaskList',
      'updateTask',
      'updateTaskStatus',
      'deleteTaskList',
      'setTaskOptions',
    ]),

    toMsgBoard() {
      this.$router.push({ name: 'Msg' });
    },

    handleCommand(id, type, c) {
      let options = { id, [type]: c };
      this.updateTask(options);
    },

    goLogin() {
      this.$router.push({ name: 'Login' });
    },

    updateName(item, elem) {
      if (!elem.value) {
        return;
      }
      let options = { id: item.id, name: elem.value };
      this.updateTask(options);

      // 关闭当前的名称 popover
      item.namePopover = false;
    },

    handleStatus(item, status) {
      let id = item.id;
      this.updateTaskStatus({ id, status });
      item.statusPopover = false;
    }
  },

  created() {
    this.fetchTaskList();
  },

  // router 实例
  beforeRouteLeave(to, from, next) {
    this.setTaskOptions({ selectList: [] });
    next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
