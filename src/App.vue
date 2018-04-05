<template>
  <div class="app" id="app">
    <h1>{{title}}</h1>
    <header><tools></tools></header>
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
  width: 100%;
  height: 50px;
}
section {
  height: 100%;
}
.full-height {
  height: 100%;
}
</style>
