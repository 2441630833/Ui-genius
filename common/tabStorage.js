/**
 * Tab storage management utility
 * Used to save and restore the last visited tab page
 */

// Tab page list
const TAB_PAGES = [
  'pages/intro/intro',
  'pages/dashboard/dashboard', 
  'pages/design/design',
  'pages/editor/editor'
]

// Local storage key name
const STORAGE_KEY = 'lastTabPage'

/**
 * Save current tab state
 * @param {string} pagePath - Page path
 */
export function saveCurrentTab(pagePath) {
  try {
    if (TAB_PAGES.includes(pagePath)) {
      uni.setStorageSync(STORAGE_KEY, pagePath)
    }
  } catch (error) {
    // Silent error handling
  }
}

/**
 * Get last visited tab
 * @returns {string|null} Page path or null
 */
export function getLastTab() {
  try {
    const lastTab = uni.getStorageSync(STORAGE_KEY)
    return TAB_PAGES.includes(lastTab) ? lastTab : null
  } catch (error) {
    return null
  }
}

/**
 * Restore to last visited tab
 * @param {number} delay - Delay time in milliseconds
 */
export function restoreLastTab(delay = 500) {
  const lastTab = getLastTab()
  
  if (lastTab) {
    setTimeout(() => {
      // Runtime check for special URL parameters (e.g., pid parameter from share links)
      // Support for H5 platform
      if (typeof window !== 'undefined' && window.location) {
        try {
          const hash = window.location.hash || ''
          const search = window.location.search || ''
          
          // Check query parameters in hash (uni-app H5 mode)
          const hashQueryIndex = hash.indexOf('?')
          if (hashQueryIndex !== -1) {
            const query = hash.substring(hashQueryIndex + 1)
            const params = new URLSearchParams(query)
            const pid = params.get('pid')
            if (pid) {
              // Share link detected, skip auto restore
              return
            }
          }
          
          // Also check standard search parameters
          if (search) {
            const params = new URLSearchParams(search)
            const pid = params.get('pid')
            if (pid) {
              // Share link detected, skip auto restore
              return
            }
          }
        } catch (e) {
          // Silent error handling
        }
      }
      
      // Check if current page is already the target page
      const pages = getCurrentPages()
      if (pages && pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        const currentRoute = currentPage.route
        
        // Switch tab if current page is not the last visited tab
        if (currentRoute !== lastTab) {
          uni.switchTab({
            url: '/' + lastTab
          })
        }
      }
    }, delay)
  }
}

/**
 * Clear tab state
 */
export function clearTabState() {
  try {
    uni.removeStorageSync(STORAGE_KEY)
  } catch (error) {
    // Silent error handling
  }
}

/**
 * Check if it's a tab page
 * @param {string} pagePath - Page path
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