<template>
  <view class="design-container">
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
              <image class="template-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="template-label">
                <text class="template-name">Signup</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Home Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.home">
            <view class="template-item" @click="selectTemplate('home')">
              <image class="template-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="template-label">
                <text class="template-name">Home</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Notifications Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.notifications">
            <view class="template-item" @click="selectTemplate('notifications')">
              <image class="template-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="template-label">
                <text class="template-name">Notifications</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Profile Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.profile">
            <view class="template-item" @click="selectTemplate('profile')">
              <image class="template-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="template-label">
                <text class="template-name">Profile</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Settings Template -->
          <x-skeleton type="banner" :loading="templateLoadingStates.settings">
            <view class="template-item" @click="selectTemplate('settings')">
              <image class="template-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
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
              <image class="proposal-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="proposal-label">
                <text class="proposal-name">Login Screen</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Dashboard Screen -->
          <x-skeleton type="banner" :loading="proposalLoadingStates.dashboard">
            <view class="proposal-item" @click="selectProposal('dashboard')">
              <image class="proposal-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
              <view class="proposal-label">
                <text class="proposal-name">Dashboard Screen</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Settings Screen -->
          <x-skeleton type="banner" :loading="proposalLoadingStates.settings">
            <view class="proposal-item" @click="selectProposal('settings-alt')">
              <image class="proposal-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill"></image>
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
export default {
  name: 'Design',
  data() {
    return {
      activeNavItem: 'home',
      selectedTemplate: null,
      selectedProposal: null,
      projectDescription: '',
      project_id: '',
      templatesLoading: true,
      proposalsLoading: true,
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
    
    displayUI() {
      this.project_id = uni.getStorageSync('request_project_id');
      if (this.project_id) {
        console.log(this.project_id);
      }
      else {
        this.projectDescription = uni.getStorageSync('projectDescription');
        uni.request({
          url: 'http://localhost:8000/api/generate-ui',
          method: 'POST',
          data: {
            prompt: this.projectDescription
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            // Hide loading indicator
            uni.hideLoading();

            // Store the response in local storage
            try {
              uni.setStorageSync('latest_generated_page', JSON.stringify(res.data));
              console.log(res.data);
              console.log('Page generation successful!');
            } catch (e) {
              console.error('Error storing generated page data:', e);
              this.errorMessage = 'Failed to save generated page data';
            }
          },
          fail: (err) => {
            // Hide loading indicator
            uni.hideLoading();

            console.error('API call failed:', err);
            this.errorMessage = 'Failed to generate page. Please try again.';
          }
        });
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
</style>
