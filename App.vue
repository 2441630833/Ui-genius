<script>
import initPermission from './common/permission.js'
import { saveCurrentTab, restoreLastTab, isTabPage } from './common/tabStorage.js'

  export default {
    onLaunch: function() {
      console.log('App Launch')
      initPermission()
      
      // 强制设置默认语言为英语
      try {
        uni.setLocale('en')
        console.log('Default locale set to English')
      } catch (error) {
        console.error('Failed to set default locale:', error)
      }
      
      // 恢复上次访问的标签页
      restoreLastTab()
    },
    onShow: function() {
      console.log('App Show')
      
      // 每次应用显示时也尝试恢复标签页状态
      restoreLastTab()
    },
    onHide: function() {
      console.log('App Hide')
      
      // 应用隐藏时保存当前标签页状态
      this.saveCurrentTabPage()
    },
    methods: {
      // 保存当前标签页到本地存储
      saveCurrentTabPage() {
        try {
          // 获取当前页面路径
          const pages = getCurrentPages()
          if (pages && pages.length > 0) {
            const currentPage = pages[pages.length - 1]
            const currentRoute = currentPage.route
            
            // 使用工具函数保存标签页状态
            saveCurrentTab(currentRoute)
          }
        } catch (error) {
          console.error('保存标签页状态失败:', error)
        }
      }
    },
    
    // 监听标签页切换事件
    onTabItemTap(item) {
      // 当用户点击标签页时，保存新的标签页状态
      if (item && item.pagePath && isTabPage(item.pagePath)) {
        saveCurrentTab(item.pagePath)
        console.log('标签页切换，已保存状态:', item.pagePath)
      }
    }
  }
</script>

<style>
  .container {
    padding: 15px;
  }

  button {
    margin-bottom: 15px;
  }
  
  /* Custom TabBar Styles */
  /* .uni-tabbar {
    border-radius: 24px !important;
    margin: 0 15px 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: none !important;
    height: 60px !important;
  }
  
  .uni-tabbar::before {
    display: none !important;
  }
  
  .uni-tabbar__item {
    height: 60px !important;
    position: relative;
  }
  
  .uni-tabbar__item--selected {
    background-color: rgba(229, 57, 53, 0.08);
  }
  
  .uni-tabbar__item--selected::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 3px;
    background-color: #e53935;
    border-radius: 3px;
  }
  
  .uni-tabbar__item--selected .uni-tabbar__label {
    color: #e53935 !important;
    font-weight: 500;
  }
  
  .uni-tabbar__bd {
    padding: 5px 0;
  }
  
  .uni-tabbar__icon {
    margin-bottom: 4px;
  } */
</style>
