<template>
  <div id="app">
    <h1>{{title}}</h1>
    <tools></tools>
    <router-view/>
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
.pointer {
  cursor: pointer;
}
</style>
