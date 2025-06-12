<template>
  <view class="editor-wrapper">
    <!-- 编辑器容器 -->
    <view ref="editorContainer" id="studio-editor" class="editor-container"></view>
  </view>
</template>

<script>
import '@grapesjs/studio-sdk/style'
import createStudioEditor from '@grapesjs/studio-sdk'
import { layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { flexComponent } from "@grapesjs/studio-sdk-plugins";
import { rteProseMirror } from '@grapesjs/studio-sdk-plugins';
import { canvasGridMode } from '@grapesjs/studio-sdk-plugins';
import { lightGalleryComponent } from "@grapesjs/studio-sdk-plugins";
import { swiperComponent } from '@grapesjs/studio-sdk-plugins';
import { dialogComponent } from "@grapesjs/studio-sdk-plugins";

export default {
  //
  data() {
    return {
      editor: null,
      projectJSONFromServer: {
        "pages": [
          {
            "name": "Enchanted Hearts",
            "component": "<div style=\"font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #FF9A8B, #FFD1DC); color: #2D3748; line-height: 1.6; min-height: 100vh; display: flex; flex-direction: column;\">\n  <header style=\"padding: 1rem 0; background: linear-gradient(135deg, #FF9A8B, #FFD1DC); text-align: center; position: relative; overflow: hidden;\">\n    <h1 style=\"font-size: clamp(2rem, 5vw, 2.8rem); color: #F8FAFC; letter-spacing: 0.05em; margin: 1rem 0; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); opacity: 1;\">Enchanted Hearts</h1>\n  </header>\n\n  <main style=\"width: 90%; max-width: 1200px; margin: 0 auto; padding: 1rem 0; flex: 1;\">\n    <section class=\"main-icons\" aria-label=\"Magical features\" style=\"display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin: 2rem 0;\">\n      <div class=\"icon\" aria-hidden=\"true\" style=\"width: 6rem; height: 6rem; background-color: rgba(255, 255, 255, 0.85); border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease-in-out; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); animation: bounceIcon 2s infinite alternate ease-in-out;\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" style=\"width: 3rem; height: 3rem; fill: #A78BFA;\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z\" />\n        </svg>\n        <span class=\"sr-only\" style=\"position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;\">Phone</span>\n      </div>\n\n      <div class=\"icon\" aria-hidden=\"true\" style=\"width: 6rem; height: 6rem; background-color: rgba(255, 255, 255, 0.85); border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease-in-out; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); animation: bounceIcon 2s infinite alternate ease-in-out; animation-delay: 0.2s;\">\n        <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" style=\"width: 3rem; height: 3rem; fill: #A78BFA;\">\n          <path d=\"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z\" />\n        </svg>\n        <span class=\"sr-only\" style=\"position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;\">Shooting Stars</span>\n      </div>\n\n      <div class=\"icon\" aria-hidden=\"true\" style=\"width: 6rem; height: 6rem; background-color: rgba(255, 255, 255, 0.85); border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease-in-out; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); animation: bounceIcon 2s infinite alternate ease-in-out; animation-delay: 0.4s;\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" style=\"width: 3rem; height: 3rem; fill: #A78BFA;\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z\" />\n        </svg>\n        <span class=\"sr-only\" style=\"position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;\">Crescent Moon</span>\n      </div>\n    </section>\n\n    <section class=\"cta-area\" style=\"background-color: rgba(255, 255, 255, 0.85); border-radius: 12px; padding: 2rem; margin: 2rem 0; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 800px; margin-left: auto; margin-right: auto;\">\n      <h2 style=\"color: #A78BFA; margin-bottom: 1rem; font-size: 1.5rem;\">Your magic awaits <span aria-hidden=\"true\">🌈✨</span></h2>\n      <p style=\"margin-bottom: 1.5rem; color: #2D3748;\">Connect with those who share your powers, find friends and lovers along the path of enchantment.</p>\n      <button class=\"cta\" onclick=\"alert('Joining Enchanted Hearts...')\" style=\"background-color: #A78BFA; color: #F8FAFC; border: none; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s ease-in-out; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\">Get Started</button>\n    </section>\n  </main>\n\n  <footer style=\"text-align: center; color: #F8FAFC; padding: 1rem 0; font-size: 0.9rem; margin-top: auto;\">\n    <p>&copy; 2024 Enchanted Hearts. All rights reserved <span aria-hidden=\"true\">✨⚡️</span></p>\n  </footer>\n\n  <style>\n    @keyframes bounceIcon {\n      from { transform: scale(1); }\n      to { transform: scale(1.1); }\n    }\n    @media (max-width: 768px) {\n      .main-icons { gap: 0.5rem; }\n      .icon { width: 4.5rem; height: 4.5rem; }\n      .icon svg { width: 2.5rem; height: 2.5rem; }\n      .cta-area { padding: 1rem; }\n    }\n    @media (max-width: 480px) {\n      .main-icons { flex-direction: column; align-items: center; }\n      .icon { width: 5rem; height: 5rem; margin-bottom: 0.5rem; }\n    }\n  </style>\n</div>"
          }
        ]
      }
    }
  },
  methods: {
    // 初始化编辑器
    initEditor() {
      // Wait for DOM to be ready
      setTimeout(() => {
        const editorElement = document.getElementById('studio-editor');
        if (!editorElement) {
          console.error('Editor element not found! Make sure the element exists in the DOM.');
          return;
        }

        this.editor = createStudioEditor({
          root: editorElement,
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
          onReady: editor => {
            editor.setDevice('Desktop');
          },
          // gjsOptions: {
          //   deviceManager: { default: 'mobilePortrait' }
          // },
          // licenseKey wait to test if necessary
          licenseKey: '9a64fa1035cf4c80b9caeb2bb58d9de2d03fe0ea4d594504a4cdeab362b4b295',

          storage: {
            type: 'self',
            autosaveChanges: 5, // save after every 5 changes

            onSave: async ({ project }) => {
              // await this.saveToSessionStorage('UIGENIUS_PROJECT_ID', project);
              // console.log('Project saved', { project });
            },

            onLoad: async () => {
              try {
                const latest_generated_page = uni.getStorageSync('latest_7_overall_page');
                let project = null;

                if (latest_generated_page) {
                  try {
                    // Try to parse the JSON, handling potential issues
                    if (typeof latest_generated_page === 'string') {
                      // Clean the string before parsing
                      let cleanJson = latest_generated_page.trim();

                      // Check if it starts with a backtick or code block marker
                      if (cleanJson.startsWith('```json')) {
                        cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/```\s*$/, '');
                      } else if (cleanJson.startsWith('```')) {
                        cleanJson = cleanJson.replace(/^```\s*/, '').replace(/```\s*$/, '');
                      }

                      project = JSON.parse(cleanJson);
                    } else if (typeof latest_generated_page === 'object') {
                      // If it's already an object, use it directly
                      project = latest_generated_page;
                    }
                  } catch (parseError) {
                    console.error('Error parsing latest_generated_page:', parseError);
                    console.log('Raw data:', latest_generated_page);
                  }
                }

                // If the project doesn't exist (eg. first load), use projectJSONFromServer
                return {
                  project: project || this.projectJSONFromServer
                };
              } catch (error) {
                console.error('Error in onLoad:', error);
                return {
                  project: this.projectJSONFromServer
                };
              }
            },
          },
        });
      }, 500); // Wait 500ms for the DOM to be ready
    },
    // Helper functions for session storage
    async saveToSessionStorage(key, data) {
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
    },
    async loadFromSessionStorage(key) {
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
    }
  },
  // 组件挂载时初始化
  mounted() {
    this.initEditor();
  },
  // 组件卸载前销毁编辑器
  beforeDestroy() {
    // 在Vue2中使用beforeDestroy替代onBeforeUnmount
  }
}
</script>

<style scoped>
/* 确保容器有合适的高度 */
.editor-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
}

.editor-container {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#studio-editor {
  height: 100vh;
  width: 100%;
}
</style>