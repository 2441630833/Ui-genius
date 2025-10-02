/**
 * 标签页状态管理工具
 * 用于保存和恢复用户最后访问的标签页
 */

// 标签页列表
const TAB_PAGES = [
  'pages/intro/intro',
  'pages/dashboard/dashboard', 
  'pages/design/design',
  'pages/editor/editor'
]

// 本地存储键名
const STORAGE_KEY = 'lastTabPage'

/**
 * 保存当前标签页状态
 * @param {string} pagePath - 页面路径
 */
export function saveCurrentTab(pagePath) {
  try {
    if (TAB_PAGES.includes(pagePath)) {
      uni.setStorageSync(STORAGE_KEY, pagePath)
      console.log('已保存标签页状态:', pagePath)
    }
  } catch (error) {
    console.error('保存标签页状态失败:', error)
  }
}

/**
 * 获取上次访问的标签页
 * @returns {string|null} 页面路径或null
 */
export function getLastTab() {
  try {
    const lastTab = uni.getStorageSync(STORAGE_KEY)
    return TAB_PAGES.includes(lastTab) ? lastTab : null
  } catch (error) {
    console.error('获取标签页状态失败:', error)
    return null
  }
}

/**
 * 恢复到上次访问的标签页
 * @param {number} delay - 延迟时间（毫秒）
 */
export function restoreLastTab(delay = 500) {
  const lastTab = getLastTab()
  
  if (lastTab) {
    setTimeout(() => {
      // 检查当前页面是否已经是目标页面
      const pages = getCurrentPages()
      if (pages && pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        const currentRoute = currentPage.route
        
        // 如果当前页面不是上次访问的标签页，则切换
        if (currentRoute !== lastTab) {
          uni.switchTab({
            url: '/' + lastTab,
            success: () => {
              console.log('已恢复到上次访问的标签页:', lastTab)
            },
            fail: (error) => {
              console.error('恢复标签页失败:', error)
            }
          })
        }
      }
    }, delay)
  }
}

/**
 * 清除标签页状态
 */
export function clearTabState() {
  try {
    uni.removeStorageSync(STORAGE_KEY)
    console.log('已清除标签页状态')
  } catch (error) {
    console.error('清除标签页状态失败:', error)
  }
}

/**
 * 检查是否为标签页
 * @param {string} pagePath - 页面路径
 * @returns {boolean}
 */
export function isTabPage(pagePath) {
  return TAB_PAGES.includes(pagePath)
}

export default {
  saveCurrentTab,
  getLastTab,
  restoreLastTab,
  clearTabState,
  isTabPage,
  TAB_PAGES
} 