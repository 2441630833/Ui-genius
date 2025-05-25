<template>
  <view>
    <!-- 编辑器容器 -->
    <div ref="editorContainer" id="studio-editor"></div>
  </view>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
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
    const projectJSONFromServer = ref({
      "pages": [
        {
          "name": "Bank App",
          "component": "<div class=\"bank-app\" style=\"max-width: 400px; margin: 0 auto; background: white; font-family: Arial, sans-serif; padding: 20px;\">\n  <!-- 顶部导航 -->\n  <div class=\"header\" style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #000; padding-bottom: 10px;\">\n    <h1 style=\"font-size: 24px; margin: 0;\">MinimalBank</h1>\n    <div class=\"user-icon\" style=\"width: 30px; height: 30px; border: 2px solid #000; border-radius: 50%; position: relative;\">\n      <div style=\"position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 15px; height: 15px; border: 2px solid #000; border-radius: 3px;\"></div>\n    </div>\n  </div>\n\n  <!-- 余额显示 -->\n  <div class=\"balance-section\" style=\"margin-bottom: 30px;\">\n    <div style=\"font-size: 14px; margin-bottom: 5px;\">Current Balance</div>\n    <div style=\"font-size: 32px; font-weight: bold;\">$12,345.67</div>\n  </div>\n\n  <!-- 交易记录 -->\n  <div class=\"transactions\">\n    <div class=\"transaction-item\" style=\"margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 15px;\">\n      <div style=\"display: flex; justify-content: space-between;\">\n        <div>\n          <div style=\"font-weight: bold;\">Amazon Purchase</div>\n          <div style=\"font-size: 12px; color: #666;\">March 21, 2023</div>\n        </div>\n        <div style=\"color: #ff4444;\">- $120.00</div>\n      </div>\n    </div>\n\n    <div class=\"transaction-item\" style=\"margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 15px;\">\n      <div style=\"display: flex; justify-content: space-between;\">\n        <div>\n          <div style=\"font-weight: bold;\">Starbucks Coffee</div>\n          <div style=\"font-size: 12px; color: #666;\">March 20, 20,203</div>\n        </div>\n        <div style=\"color: #ff4444;\">- $5.50</div>\n      </div>\n    </div>\n\n    <div class=\"transaction-item\" style=\"margin-bottom: 20px;\">\n      <div style=\"display: flex; justify-content: space-between;\">\n        <div>\n          <div style=\"font-weight: bold;\">Salary Deposit</div>\n          <div style=\"font-size: 12px; color: #666;\">March 15, 20,23</div>\n        </div>\n        <div style=\"color: #00c853;\">+ $5,000.00</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- 底部导航 -->\n  <div class=\"bottom-nav\" style=\"position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 15px 20px; display: flex; justify-content: space-around; border-top: 2px solid #000;\">\n    <svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\">\n      <path d=\"M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z\" fill=\"none\" stroke=\"#000\" stroke-width=\"2\"/>\n    </svg>\n    <svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\">\n      <path d=\"M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z\" fill=\"none\" stroke=\"#000\" stroke-width=\"2\"/>\n    </svg>\n    <svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\">\n      <path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\" fill=\"#000\"/>\n    </svg>\n  </div>\n</div>"
        }
      ]
    });

    
    // 初始化编辑器
    const initEditor = async () => {
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
        // licenseKey wait to test if necessary
        licenseKey: '9a64fa1035cf4c80b9caeb2bb58d9de2d03fe0ea4d594504a4cdeab362b4b295',

        storage: {
          type: 'self',
          autosaveChanges: 5, // save after every 5 changes
          
          onSave: async ({ project }) => {
            // await saveToSessionStorage('UIGENIUS_PROJECT_ID', project);
            // console.log('Project saved', { project });
          },
          
          onLoad: async () => {
            const latest_generated_page = JSON.parse(uni.getStorageSync('latest_generated_page'));
            const project = JSON.parse(latest_generated_page);
            // console.log(project)
            // console.log('Project loaded', { project });
            
            // If the project doesn't exist (eg. first load), use projectJSONFromServer
            return {
              project: project || projectJSONFromServer.value
            };
          },
        },
      })
    }
    // Helper functions for session storage
    const saveToSessionStorage = async (key, data) => {
      try {
        if (typeof uni !== 'undefined') {
          uni.setStorageSync(key, JSON.stringify(data));
        } else {
          sessionStorage.setItem(key, JSON.stringify(data));
        }
        return true;
      } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
      }
    };

    const loadFromSessionStorage = async (key) => {
      try {
        let data;
        if (typeof uni !== 'undefined') {
          data = uni.getStorageSync(key);
        } else {
          data = sessionStorage.getItem(key);
        }
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error loading from storage:', error);
        return null;
      }
    };

    // 组件挂载时初始化
    onMounted(async () => {
      initEditor()
    })

    // 组件卸载前销毁编辑器
    onBeforeUnmount(() => {
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