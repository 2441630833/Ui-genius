<template>
  <div class="grapes-editor-container">
    <div id="gjs"></div>
  </div>
</template>

<script>
import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/style';

export default {
  name: 'GrapesEditor',
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      createStudioEditor({
        container: '#gjs',
        project: {
          type: 'web',
          default: {
            pages: [
              { name: 'Home', component: '<h1>Home page</h1>' },
              { name: 'About', component: '<h1>About page</h1>' },
              { name: 'Contact', component: '<h1>Contact page</h1>' },
            ]
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.grapes-editor-container {
  width: 100%;
  height: 100%;
}

#gjs {
  height: 100%;
  border: none;
}
</style> 