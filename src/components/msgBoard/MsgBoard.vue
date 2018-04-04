<template>
  <div>
    <el-card>
      <div slot="header">计划任务</div>
      <div v-for="(el, i) in list" :key="el.id">
        {{ el.name }}
        {{ listCountDown[i] }}
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listTimer: null,
      list: [],
      listCountDown: []
    };
  },

  methods: {
    countDown() {
      this.listCountDown = this.list.map(item => {
        let now = new Date().getTime();
        let remain = parseInt((item.planStartTime - now) / 1000, 10);

        if (remain < 120) {
          if (!item.notice) {
            item.notice = true;

            if (confirm(item.name + '任务应该开始做了，请注意')) {
              console.log('已经确定开始了');
            } else {
              console.log('放弃，不店家开始');
            }
          }
        }
        return remain;
      });
    }
  },

  mounted() {
    this.list = [];
    console.log(this.list);

    this.countDown();
    this.listTimer = window.setInterval(this.countDown, 1000);
    console.log(this.listTimer);
  }
}
</script>
