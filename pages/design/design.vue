<template>
  <view class="design-container">
    <!-- Progress Bar Overlay -->
    <view v-if="isGenerating" class="progress-overlay">
      <view class="progress-container">
        <text class="progress-title">Generating UI Design</text>
        <view class="progress-bar-container">
          <view class="progress-bar" :style="{ width: generationProgress + '%' }"></view>
        </view>
        <text class="progress-percentage">{{ Math.floor(generationProgress) }}%</text>
        <text class="progress-message">Please wait, this may take a moment...</text>
      </view>
    </view>

    <!-- Hidden Template Previews for html2canvas -->
    <view class="hidden-templates">
      <!-- Signup Template Preview -->
      <view id="template-signup" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Signup</text>
        </view>
        <view class="preview-form">
          <view class="preview-input"></view>
          <view class="preview-input"></view>
          <view class="preview-button"></view>
        </view>
      </view>

      <!-- Home Template Preview -->
      <view id="template-home" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Home</text>
        </view>
        <view class="preview-content">
          <view class="preview-card"></view>
          <view class="preview-card"></view>
          <view class="preview-card"></view>
        </view>
      </view>

      <!-- Notifications Template Preview -->
      <view id="template-notifications" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Notifications</text>
        </view>
        <view class="preview-list">
          <view class="preview-list-item"></view>
          <view class="preview-list-item"></view>
          <view class="preview-list-item"></view>
        </view>
      </view>

      <!-- Profile Template Preview -->
      <view id="template-profile" class="template-preview-content">
        <view class="preview-avatar"></view>
        <view class="preview-header">
          <text class="preview-title">Profile</text>
        </view>
        <view class="preview-info">
          <view class="preview-info-item"></view>
          <view class="preview-info-item"></view>
        </view>
      </view>

      <!-- Settings Template Preview -->
      <view id="template-settings" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Settings</text>
        </view>
        <view class="preview-settings">
          <view class="preview-settings-item"></view>
          <view class="preview-settings-item"></view>
          <view class="preview-settings-item"></view>
        </view>
      </view>

      <!-- Login Proposal Preview -->
      <view id="proposal-login" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Login</text>
        </view>
        <view class="preview-form">
          <view class="preview-input"></view>
          <view class="preview-input"></view>
          <view class="preview-button"></view>
        </view>
      </view>

      <!-- Dashboard Proposal Preview -->
      <view id="proposal-dashboard" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Dashboard</text>
        </view>
        <view class="preview-dashboard">
          <view class="preview-chart"></view>
          <view class="preview-stats">
            <view class="preview-stat-item"></view>
            <view class="preview-stat-item"></view>
          </view>
        </view>
      </view>

      <!-- Settings Alt Proposal Preview -->
      <view id="proposal-settings" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Settings Alt</text>
        </view>
        <view class="preview-settings-alt">
          <view class="preview-toggle"></view>
          <view class="preview-toggle"></view>
          <view class="preview-toggle"></view>
        </view>
      </view>
    </view>

    <!-- Design Toolbar -->
    <view class="design-toolbar">
      <view class="logo-container">
        <image class="logo-icon"
          src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png"></image>
      </view>

      <view class="nav-links">
        <view class="nav-item" :class="{ active: activeNavItem === 'plus' }" @click="navigateTo('plus')">
          <image class="nav-icon" :src="activeNavItem === 'plus' ? '/static/plus_white.png' : '/static/plus.png'">
          </image>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'magic' }" @click="navigateTo('magic')">
          <image class="nav-icon" :src="activeNavItem === 'magic' ? '/static/magic_white.png' : '/static/magic.png'">
          </image>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'color' }" @click="navigateTo('color')">
          <image class="nav-icon" :src="activeNavItem === 'color' ? '/static/color_white.png' : '/static/color.png'">
          </image>
        </view>


        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'profile' }" @click="navigateTo('profile')">
          <image class="nav-icon" :src="activeNavItem === 'profile' ? '/static/profile_white.png' : '/static/profile.png'"></image>
        </view>
        
        <view class="nav-item" :class="{ active: activeNavItem === 'settings' }" @click="navigateTo('settings')">
          <image class="nav-icon" :src="activeNavItem === 'settings' ? '/static/settings_white.png' : '/static/settings.png'"></image>
        </view> -->
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <view class="header">
        <!-- <view class="left-controls">
          <view class="device-preview">
            <image class="icon" src="/static/desktop.png"></image>
            <image class="icon" src="/static/mobile.png"></image>
          </view>
          
          <view class="navigation-controls">
            <image class="icon" src="/static/back.png"></image>
            <image class="icon" src="/static/forward.png"></image>
          </view>
        </view> -->

        <view class="zoom-controls">
          <!-- <image class="icon" src="/static/minus.png"></image>
          <text class="zoom-text">15%</text>
          <image class="icon" src="/static/plus.png"></image> -->
        </view>

        <view class="right-controls">
          <!-- <view class="action-button play-button">
            <image class="icon" src="/static/play.png"></image>
          </view>
          <view class="action-button code-button">
            <image class="icon" src="/static/code.png"></image>
          </view> -->

          <view class="separator"></view>

          <!-- <view class="tool-button">
            <text class="button-text">Comments</text>
          </view> -->
          <view class="tool-button">
            <text class="button-text">Share</text>
          </view>
          <view class="tool-button">
            <text class="button-text">Export</text>
          </view>

          <view class="preview-button">
            <image class="icon" src="/static/play_white.png"></image>
            <text class="preview-text">Preview</text>
          </view>
        </view>
      </view>

      <!-- Templates Grid -->
      <view class="section">
        <text class="section-title">Interactive Prototype</text>
        <view class="templates-grid">
          <!-- Signup Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.signup">
            <view class="template-item" @click="navigateToGrapesEditor()">
              <view class="template-preview" id="template-signup">
                <image class="template-image"
                  :src="capturedImages.signup || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="template-label">
                <text class="template-name">Signup</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Home Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.home">
            <view class="template-item" @click="selectTemplate('home')">
              <view class="template-preview" id="template-home">
                <image class="template-image"
                  :src="capturedImages.home || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="template-label">
                <text class="template-name">Home</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Notifications Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.notifications">
            <view class="template-item" @click="selectTemplate('notifications')">
              <view class="template-preview" id="template-notifications">
                <image class="template-image"
                  :src="capturedImages.notifications || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="template-label">
                <text class="template-name">Notifications</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Profile Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.profile">
            <view class="template-item" @click="selectTemplate('profile')">
              <view class="template-preview" id="template-profile">
                <image class="template-image"
                  :src="capturedImages.profile || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="template-label">
                <text class="template-name">Profile</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Settings Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.settings">
            <view class="template-item" @click="selectTemplate('settings')">
              <view class="template-preview" id="template-settings">
                <image class="template-image"
                  :src="capturedImages.settings || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="template-label">
                <text class="template-name">Settings</text>
              </view>
            </view>
          </x-skeleton>
        </view>
      </view>

      <!-- Additional Design Proposals -->
      <view class="section">
        <text class="section-title">Additional Design Proposals</text>
        <view class="proposals-grid">
          <!-- Login Screen -->
          <x-skeleton type="banner" :loading="proposalLoadingStates.login">
            <view class="proposal-item" @click="selectProposal('login')">
              <view class="proposal-preview" id="proposal-login">
                <image class="proposal-image"
                  :src="capturedImages.login || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="proposal-label">
                <text class="proposal-name">Login Screen</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Dashboard Screen -->
          <x-skeleton type="banner" :loading="proposalLoadingStates.dashboard">
            <view class="proposal-item" @click="selectProposal('dashboard')">
              <view class="proposal-preview" id="proposal-dashboard">
                <image class="proposal-image"
                  :src="capturedImages.dashboard || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="proposal-label">
                <text class="proposal-name">Dashboard Screen</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Settings Screen -->
          <x-skeleton type="banner" :loading="proposalLoadingStates.settings">
            <view class="proposal-item" @click="selectProposal('settings-alt')">
              <view class="proposal-preview" id="proposal-settings">
                <image class="proposal-image"
                  :src="capturedImages.settingsAlt || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png'"
                  mode="aspectFill"></image>
              </view>
              <view class="proposal-label">
                <text class="proposal-name">Settings</text>
              </view>
            </view>
          </x-skeleton>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'Design',
  data() {
    return {
      capturedImages: {},
      activeNavItem: 'home',
      selectedTemplate: null,
      selectedProposal: null,
      projectDescription: '',
      project_id: '',
      templatesLoading: true,
      proposalsLoading: true,
      isGenerating: false,
      generationProgress: 0,
      progressInterval: null,
      templateLoadingStates: {
        signup: true,
        home: true,
        notifications: true,
        profile: true,
        settings: true
      },
      proposalLoadingStates: {
        login: true,
        dashboard: true,
        settings: true
      }
    }
  },

  mounted() {
    // Staggered loading for templates
    setTimeout(() => {
      this.templateLoadingStates.signup = false;
    }, 800);
    
    setTimeout(() => {
      this.templateLoadingStates.home = false;
    }, 1100);
    
    setTimeout(() => {
      this.templateLoadingStates.notifications = false;
    }, 1400);
    
    setTimeout(() => {
      this.templateLoadingStates.profile = false;
    }, 1700);
    
    setTimeout(() => {
      this.templateLoadingStates.settings = false;
      this.templatesLoading = false;
      
      // Generate preview images after templates are loaded
      setTimeout(() => {
        this.generatePreviewImages();
      }, 1000);
    }, 2000);
    
    // Staggered loading for proposals
    setTimeout(() => {
      this.proposalLoadingStates.login = false;
    }, 1500);
    
    setTimeout(() => {
      this.proposalLoadingStates.dashboard = false;
    }, 1900);
    
    setTimeout(() => {
      this.proposalLoadingStates.settings = false;
      this.proposalsLoading = false;
    }, 2300);

    // Listen for image capture events from renderjs
    uni.$on('image-captured', this.receiveImageData);
    uni.$on('capture-error', (data) => {
      this._errAlert(`Error capturing image: ${data.error}`);
    });
  },
  
  onShow(){
    // Only generate UI if we haven't already and we have a project description
    if (!uni.getStorageSync('latest_7_overall_page') && 
        uni.getStorageSync('projectDescription')) {
      this.generateUI();
    }
  },

  beforeDestroy() {
    // Clean up event listeners
    uni.$off('image-captured', this.receiveImageData);
    uni.$off('capture-error');
  },

  methods: {
    refreshData() {
      // Reset all loading states
      this.templatesLoading = true;
      this.proposalsLoading = true;
      
      // Reset template loading states
      this.templateLoadingStates.signup = true;
      this.templateLoadingStates.home = true;
      this.templateLoadingStates.notifications = true;
      this.templateLoadingStates.profile = true;
      this.templateLoadingStates.settings = true;
      
      // Reset proposal loading states
      this.proposalLoadingStates.login = true;
      this.proposalLoadingStates.dashboard = true;
      this.proposalLoadingStates.settings = true;
      
      // Staggered loading for templates
      setTimeout(() => {
        this.templateLoadingStates.signup = false;
      }, 800);
      
      setTimeout(() => {
        this.templateLoadingStates.home = false;
      }, 1100);
      
      setTimeout(() => {
        this.templateLoadingStates.notifications = false;
      }, 1400);
      
      setTimeout(() => {
        this.templateLoadingStates.profile = false;
      }, 1700);
      
      setTimeout(() => {
        this.templateLoadingStates.settings = false;
        this.templatesLoading = false;
      }, 2000);
      
      // Staggered loading for proposals
      setTimeout(() => {
        this.proposalLoadingStates.login = false;
      }, 1500);
      
      setTimeout(() => {
        this.proposalLoadingStates.dashboard = false;
      }, 1900);
      
      setTimeout(() => {
        this.proposalLoadingStates.settings = false;
        this.proposalsLoading = false;
      }, 2300);
    },
    
    // Methods to handle HTML2Canvas
    _showLoading(message) {
      uni.showLoading({
        title: message || 'Loading...',
        mask: true
      });
    },
    
    _errAlert(message) {
      uni.hideLoading();
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 3000
      });
    },
    
    receiveImageData(data) {
      uni.hideLoading();
      console.log(`Received image data for ${data.element}`);
      
      // Map element IDs to data properties
      const elementMap = {
        'template-signup': 'signup',
        'template-home': 'home',
        'template-notifications': 'notifications',
        'template-profile': 'profile',
        'template-settings': 'settings',
        'proposal-login': 'login',
        'proposal-dashboard': 'dashboard',
        'proposal-settings': 'settingsAlt'
      };
      
      // Update the captured images
      if (elementMap[data.element]) {
        // Use Vue.set to ensure reactivity
        this.$set(this.capturedImages, elementMap[data.element], data.imageData);
      }
    },
    
    generatePreviewImages() {
      const templateIds = [
        'template-signup', 
        'template-home', 
        'template-notifications',
        'template-profile',
        'template-settings',
        'proposal-login',
        'proposal-dashboard',
        'proposal-settings'
      ];
      
      templateIds.forEach((id, index) => {
        setTimeout(() => {
          this._showLoading('Generating preview image...');
          uni.$emit('capture-element', { elementId: id });
        }, index * 500); // Stagger the captures
      });
    },
    
    generateUI() {
      // Prevent multiple simultaneous API calls
      if (this.isGenerating) {
        console.log('Generation already in progress, skipping duplicate call');
        return;
      }
      
      this.project_id = uni.getStorageSync('request_project_id');
      if (this.project_id) {
        console.log(this.project_id);
      } else {
        this.projectDescription = uni.getStorageSync('projectDescription');
        if (this.projectDescription) {
          // Start progress bar
          this.isGenerating = true;
          this.generationProgress = 5;
          
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:8000/api/generate-ui', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.timeout = 300000; // 5 minutes timeout
          
          let receivedContent = '';
          
          // Handle progress updates
          xhr.onprogress = (event) => {
            if (event.currentTarget.responseText) {
              const lines = event.currentTarget.responseText.split('\n').filter(line => line.trim());
              
              // Process only the latest line to avoid reprocessing
              if (lines.length > 0) {
                try {
                  const latestLine = lines[lines.length - 1];
                  const data = JSON.parse(latestLine);
                  
                  // Update progress based on status
                  if (data.status === 'started' || data.status === 'generating') {
                    this.generationProgress = data.progress;
                    
                    // Accumulate content if available
                    if (data.chunk) {
                      receivedContent += data.chunk;
                    }
                  } else if (data.status === 'completed') {
                    // Complete progress bar
                    this.generationProgress = 100;
                    
                    // Use the complete content
                    const fullContent = data.content || receivedContent;
                    
                    // Store the response in local storage
                    try {
                      // Try to parse the content to ensure it's valid JSON
                      let jsonContent = fullContent;
                      
                      // If it's a string, try to parse it first to validate
                      if (typeof fullContent === 'string') {
                        // Clean the content if needed
                        let cleanContent = fullContent.trim();
                        
                        // Remove code block markers if present
                        if (cleanContent.startsWith('```json')) {
                          cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/```\s*$/, '');
                        } else if (cleanContent.startsWith('```')) {
                          cleanContent = cleanContent.replace(/^```\s*/, '').replace(/```\s*$/, '');
                        }
                        
                        // Parse and stringify to ensure valid JSON
                        const parsedContent = JSON.parse(cleanContent);
                        jsonContent = JSON.stringify(parsedContent);
                      }
                      
                      uni.setStorageSync('latest_7_overall_page', jsonContent);
                      uni.removeStorageSync('projectDescription');
                      console.log('Page generation successful!');
                    } catch (e) {
                      console.error('Error processing generated page data:', e);
                      console.log('Raw content:', fullContent);
                      this.errorMessage = 'Failed to save generated page data';
                    }
                    
                    // Hide progress bar after a short delay
                    setTimeout(() => {
                      this.isGenerating = false;
                    }, 500);
                  }
                } catch (e) {
                  console.error('Error processing stream chunk:', e);
                }
              }
            }
          };
          
          // Handle completion
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log('Stream complete');
            } else {
              console.error('Request failed with status:', xhr.status);
              this.isGenerating = false;
            }
          };
          
          // Handle errors
          xhr.onerror = (err) => {
            this.isGenerating = false;
            uni.hideLoading();
            console.error('API call failed:', err);
            this.errorMessage = 'Failed to generate page. Please try again.';
          };
          
          // Handle timeout
          xhr.ontimeout = () => {
            this.isGenerating = false;
            uni.hideLoading();
            console.error('API call timed out');
            this.errorMessage = 'Generation timed out. Please try again.';
          };
          
          // Send the request
          xhr.send('prompt=' + encodeURIComponent(this.projectDescription));
        } else {
          console.log(uni.getStorageSync('latest_7_overall_page'));
        }
      }
    },
    navigateTo(item) {
      this.activeNavItem = item;
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      uni.showToast({
        title: `Selected ${template} template`,
        icon: 'none'
      });
    },
    selectProposal(proposal) {
      this.selectedProposal = proposal;
      uni.showToast({
        title: `Selected ${proposal} proposal`,
        icon: 'none'
      });
    },
    navigateToGrapesEditor() {
      this.activeNavItem = 'grapes';
      uni.switchTab({
        url: '/pages/grapesEditor/grapesEditor'
      });
    }
  }
}
</script>

<script module="renderjs" lang="renderjs">
import html2canvas from 'html2canvas';

export default {
  mounted() {
    // Listen for capture-element events
    uni.$on('capture-element', this.captureElement);
  },
  
  beforeDestroy() {
    // Clean up event listener
    uni.$off('capture-element', this.captureElement);
  },
  
  methods: {
    captureElement(data) {
      const { elementId } = data;
      setTimeout(() => {
        const dom = document.getElementById(elementId);
        if (!dom) {
          console.error(`Element not found: ${elementId}`);
          uni.$emit('capture-error', { element: elementId, error: 'Element not found' });
          return;
        }
        
        console.log(`Capturing element: ${elementId}`);
        
        html2canvas(dom, {
          width: dom.clientWidth,
          height: dom.clientHeight,
          scrollY: 0,
          scrollX: 0,
          useCORS: true,
          scale: 2 // Higher quality
        }).then((canvas) => {
          const imageData = canvas.toDataURL('image/png');
          // Send the image data back to the Vue component
          uni.$emit('image-captured', { element: elementId, imageData });
        }).catch(err => {
          console.error(`Failed to generate image for ${elementId}:`, err);
          uni.$emit('capture-error', { element: elementId, error: err.toString() });
        });
      }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
.design-container {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

/* Design Toolbar styles */
.design-toolbar {
  width: 60px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e53935;
  }
}

.grapes-nav-item {
  flex-direction: column;
  height: auto;
  padding: 8px 5px;
}

.nav-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.nav-text {
  font-size: 10px;
  color: #333;
  margin-top: 4px;
  text-align: center;

  .active & {
    color: #fff;
  }
}

/* Main content styles */
.main-content {
  flex: 1;
  padding: 25px 30px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
  margin-bottom: 20px;

  .left-controls,
  .right-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .device-preview,
  .navigation-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
  }

  .navigation-controls {
    margin-left: 12px;
  }

  .zoom-controls {
    display: flex;
    align-items: center;
    gap: 8px;

    .zoom-text {
      font-size: 14px;
      color: #333;
      min-width: 36px;
      text-align: center;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    cursor: pointer;
  }

  .separator {
    width: 1px;
    height: 24px;
    background-color: #eaeaea;
    margin: 0 4px;
  }

  .tool-button {
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    .button-text {
      font-size: 14px;
      color: #333;
    }
  }

  .preview-button {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: #e53935;
    padding: 7px 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #c62828;
    }

    .icon {
      width: 16px;
      height: 16px;
    }

    .preview-text {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
    }
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  display: block;
}

/* Templates Grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.template-item {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }

  .template-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-bottom: 1px solid #f0f0f0;
  }

  .template-label {
    padding: 10px 12px;

    .template-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
  }
}

/* Proposals Grid */
.proposals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.proposal-item {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }

  .proposal-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-bottom: 1px solid #f0f0f0;
  }

  .proposal-label {
    padding: 12px 15px;

    .proposal-name {
      font-size: 15px;
      font-weight: 500;
      color: #333;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .templates-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
  .design-container {
    flex-direction: column;
  }

  .design-toolbar {
    width: 100%;
    height: 60px;
    flex-direction: row;
    padding: 0 20px;
  }

  .logo-container {
    margin-bottom: 0;
    margin-right: 20px;
  }

  .nav-links {
    flex-direction: row;
    justify-content: flex-start;
  }

  .templates-grid,
  .proposals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {

  .templates-grid,
  .proposals-grid {
    grid-template-columns: 1fr;
  }
}

/* Progress Bar Styles */
.progress-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.progress-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.progress-bar-container {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 15px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #e53935;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-percentage {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.progress-message {
  font-size: 14px;
  color: #666;
}

/* Hidden Templates Styles */
.hidden-templates {
  position: fixed;
  top: -9999px;
  left: -9999px;
  z-index: -1;
  opacity: 0;
}

.template-preview-content {
  width: 300px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.preview-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-input {
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-button {
  height: 40px;
  background-color: #e53935;
  border-radius: 4px;
  margin-top: 8px;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-card {
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-list-item {
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-avatar {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #e0e0e0;
  margin: 0 auto 16px;
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-info-item {
  height: 24px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-settings-item {
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-chart {
  height: 80px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-stats {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.preview-stat-item {
  flex: 1;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.preview-settings-alt {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-toggle {
  height: 32px;
  background-color: #f5f5f5;
  border-radius: 16px;
  position: relative;
}

.preview-toggle::after {
  content: '';
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #e53935;
}
</style>
