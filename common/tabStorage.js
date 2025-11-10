/**
 * Tab storage management utility
 * Used to save and restore the last visited tab page
 */
/* global uni, __uniConfig, __uniRoutes */

// Default tab page list (fallback when runtime config is unavailable)
const DEFAULT_TAB_PAGES = [
  'pages/intro/intro',
  'pages/dashboard/dashboard',
  'pages/design/design',
  'pages/editor/editor'
]

// Local storage key name
const STORAGE_KEY = 'lastTabPage'

// Flag to prevent multiple simultaneous restoration attempts
let isRestoring = false

/**
 * Normalize page path
 * @param {string} pagePath
 * @returns {string}
 */
function normalizePagePath(pagePath) {
  if (typeof pagePath !== 'string') {
    return ''
  }

  return pagePath.replace(/^\//, '').trim()
}

/**
 * Collect tab pages from runtime configuration
 * @returns {string[]}
 */
function collectTabPagesFromRuntime() {
  if (typeof __uniConfig === 'undefined' || !__uniConfig || !__uniConfig.tabBar) {
    return []
  }

  const list = __uniConfig.tabBar.list
  if (!Array.isArray(list)) {
    return []
  }

  return list
    .map(item => normalizePagePath(item && item.pagePath))
    .filter(Boolean)
}

/**
 * Get current tab page list
 * @returns {string[]}
 */
function getTabPages() {
  const runtimeTabPages = collectTabPagesFromRuntime()

  if (runtimeTabPages.length > 0) {
    return runtimeTabPages
  }

  return DEFAULT_TAB_PAGES.slice()
}

/**
 * Collect all restorable pages from runtime configuration
 * @returns {string[]}
 */
function getRestorablePages() {
  const pagesSet = new Set()

  getTabPages().forEach(page => pagesSet.add(page))

  if (typeof __uniRoutes !== 'undefined' && Array.isArray(__uniRoutes)) {
    __uniRoutes.forEach(route => {
      const path = normalizePagePath(route && (route.path || route.aliasPath))
      if (path) {
        pagesSet.add(path)
      }
    })
  }

  if (typeof __uniConfig !== 'undefined' && Array.isArray(__uniConfig.pages)) {
    __uniConfig.pages.forEach(item => {
      const path = normalizePagePath(
        typeof item === 'string' ? item : item && (item.path || item.route)
      )

      if (path) {
        pagesSet.add(path)
      }
    })
  }

  if (pagesSet.size === 0) {
    DEFAULT_TAB_PAGES.forEach(page => pagesSet.add(page))
  }

  return Array.from(pagesSet)
}

/**
 * Determine whether page exists in runtime configuration
 * @param {string} pagePath
 * @returns {boolean}
 */
function isKnownPage(pagePath) {
  const normalized = normalizePagePath(pagePath)

  if (!normalized) {
    return false
  }

  return getRestorablePages().includes(normalized)
}

/**
 * Save current tab state
 * @param {string} pagePath - Page path
 */
export function saveCurrentTab(pagePath) {
  const normalizedPath = normalizePagePath(pagePath)

  if (!normalizedPath) {
    return
  }

  try {
    if (isKnownPage(normalizedPath)) {
      uni.setStorageSync(STORAGE_KEY, normalizedPath)
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
    const lastTab = normalizePagePath(uni.getStorageSync(STORAGE_KEY))
    return isKnownPage(lastTab) ? lastTab : null
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
  
  // Prevent multiple simultaneous restoration attempts
  if (isRestoring) {
    return
  }
  
  if (lastTab) {
    isRestoring = true
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
      let currentRoute = null

      if (pages && pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        currentRoute = normalizePagePath(currentPage && currentPage.route)
      }

      // Only skip if we're already on the target page AND it's a tab page
      // This ensures we don't skip restoration when the app starts on a default page
      if (currentRoute === lastTab && isTabPage(currentRoute)) {
        isRestoring = false
        return
      }

      if (isTabPage(lastTab)) {
        uni.switchTab({
          url: '/' + lastTab,
          success: () => {
            isRestoring = false
          },
          fail: () => {
            isRestoring = false
          }
        })
      } else {
        const targetUrl = '/' + lastTab

        try {
          if (typeof uni.reLaunch === 'function') {
            uni.reLaunch({ 
              url: targetUrl,
              success: () => {
                isRestoring = false
              },
              fail: () => {
                isRestoring = false
              }
            })
          } else if (typeof uni.redirectTo === 'function') {
            uni.redirectTo({ 
              url: targetUrl,
              success: () => {
                isRestoring = false
              },
              fail: () => {
                isRestoring = false
              }
            })
          } else if (typeof uni.navigateTo === 'function') {
            uni.navigateTo({ 
              url: targetUrl,
              success: () => {
                isRestoring = false
              },
              fail: () => {
                isRestoring = false
              }
            })
          }
        } catch (navigateError) {
          isRestoring = false
        }
      }
    }, delay)
  } else {
    isRestoring = false
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
  const normalizedPath = normalizePagePath(pagePath)

  if (!normalizedPath) {
    return false
  }

  return getTabPages().includes(normalizedPath)
}

export default {
  saveCurrentTab,
  getLastTab,
  restoreLastTab,
  clearTabState,
  isTabPage,
  getTabPages,
  getRestorablePages
} 