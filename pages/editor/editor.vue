<template>
  <div id="app">
  <Editor />
  </div>
  </template>
  
  <script>
  import Editor from '../../component/secondEditor.vue';
  
  export default {
  name: 'App',
  components: {
  Editor,
  },
  onShow() {
    // 保存当前标签页状态到本地存储
    if (typeof uni !== 'undefined') {
      uni.setStorageSync('lastTabPage', 'pages/editor/editor')
    }
  }
  };
  </script>
  
  <style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
  </style>