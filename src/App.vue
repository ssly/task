<template>
  <div class="app" id="app">
    <header v-if="curRouteName !== 'Signin'">
      <tools></tools>
    </header>
    <section><router-view/></section>
  </div>
</template>

<script>
import Tools from './components/Tools';

export default {
  name: 'App',
  components: { Tools },
  data () {
    return {
      title: '任务管理器'
    }
  },

  computed: {
    curRouteName() {
      return this.$route.name;
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.pointer {
  cursor: pointer;
}
.app {
  width: 100%;
  height: 100%;
}
header {
  position: relative;
  margin-bottom: -50px;
  width: 100%;
  height: 50px;
}
section {
  box-sizing: border-box;
  height: 100%;
  padding-top: 50px;
}
.full-height {
  height: 100%;
}
</style>
