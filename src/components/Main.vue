<template>
  <div id="main">
    <el-table border :data="taskList">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="重要缓急">
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
      <el-table-column prop="type" label="优先级">
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
      <el-table-column prop="deadline" label="预计耗时"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover v-model="scope.row.deleteTipsVisible" placement="top">

            确定要删除吗？
            <el-button size="mini" @click="deleteTask([scope.row.id])">确定</el-button>

            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popover>
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
      detailModalVisible: false
    }
  },

  methods: {
    ...mapActions([
      'fetchTaskList',
      'updateTask',
      'deleteTask'
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
    }
  },

  created() {
    this.fetchTaskList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
