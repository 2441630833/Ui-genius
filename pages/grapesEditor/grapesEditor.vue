<template>
  <div id="app">
  <GrapesEditor />
  </div>
  </template>
  
  <script>
  import GrapesEditor from '../../component/grapesEditor.vue';
  
  export default {
  name: 'App',
  components: {
  GrapesEditor,
  },
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