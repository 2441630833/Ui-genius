<template>
  <div>
    <!-- 编辑器容器 -->
    <div ref="editorContainer" id="studio-editor"></div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import createStudioEditor from '@grapesjs/studio-sdk'
import '@grapesjs/studio-sdk/style'
import { layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { flexComponent } from "@grapesjs/studio-sdk-plugins";
import { rteProseMirror } from '@grapesjs/studio-sdk-plugins';
import { canvasGridMode } from '@grapesjs/studio-sdk-plugins';
import { lightGalleryComponent } from "@grapesjs/studio-sdk-plugins";
import { swiperComponent } from '@grapesjs/studio-sdk-plugins';
import { dialogComponent } from "@grapesjs/studio-sdk-plugins";

export default {
  setup() {
    const editorContainer = ref(null)
    let editor = null

    // 初始化编辑器
    const initEditor = () => {
      editor = createStudioEditor({
        root: '#studio-editor',
        theme: 'light',
        customTheme: {
          default: {
            colors: {
              global: {
                background1: '#f4f4f4',
                background2: '#fdfdfd',
                background3: '#ffffff',
                backgroundHover: '#f4f4f4',
                text: '#181818',
                border: '#d2d2d2',
                focus: '#c62828',
                placeholder: '#a3a3a3'
              },
              primary: {
                background1: '#c62828',
                background2: '#d84242',
                background3: '#e66565',
                backgroundHover: '#b52323',
                text: '#ffffff'
              },
              component: {
                background1: '#c62828',
                background2: '#d84242',
                background3: '#f2d7d7',
                backgroundHover: '#b52323',
                text: '#ffffff'
              },
              selector: {
                background1: '#c62828',
                background2: '#d84242',
                background3: '#f8e6e6',
                backgroundHover: '#b52323',
                text: '#ffffff'
              },
              symbol: {
                background1: '#c62828',
                background2: '#d84242',
                background3: '#f8e6e6',
                backgroundHover: '#b52323',
                text: '#ffffff'
              }
            }
          }
        },
        plugins: [
          layoutSidebarButtons,
          iconifyComponent,
          flexComponent,
          rteProseMirror,
          canvasGridMode?.init({
            styleableGrid: true,
          }),
          lightGalleryComponent,
          swiperComponent,
          dialogComponent
        ],
        licenseKey: '9a64fa1035cf4c80b9caeb2bb58d9de2d03fe0ea4d594504a4cdeab362b4b295',
        project: {
          type: 'web',
          id: 'UNIQUE_PROJECT_ID' // 替换为实际项目ID
        },
        identity: {
          id: 'UNIQUE_END_USER_ID' // 替换为实际用户ID
        },
        assets: {
          storageType: 'cloud'
        },
        storage: {
          type: 'cloud',
          autosaveChanges: 100,
          autosaveIntervalMs: 10000
        }
      })
    }

    // 组件挂载时初始化
    onMounted(() => {
      initEditor()
    })

    // 组件卸载前销毁编辑器
    onBeforeUnmount(() => {
      if (editor) {
        editor.destroy()
      }
    })

    return {
      editorContainer
    }
  }
}
</script>

<style scoped>
/* 确保容器有合适的高度 */
#studio-editor {
  height: 100vh;
  width: 100%;
}
</style>