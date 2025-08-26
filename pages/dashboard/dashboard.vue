<template>
  <view class="dashboard-container">
    <!-- Sidebar -->
    <view class="sidebar">
      <view class="logo-container">
        <view class="logo">
          <image class="sidebar-icon"
            src="../../static/logo.png"></image>
          <text class="logo-text">UiGenius</text>
        </view>
      </view>

      <view class="nav-links">
        <view class="nav-item" :class="{ active: activeNavItem === 'plus' }" @click="openCreateProjectDialog">
          <image class="sidebar-icon"
            :src="activeNavItem === 'plus' ? '../../static/plus_white.png' : '../../static/plus.png'"></image>
          <text class="nav-text">Create Project</text>
        </view>
        <view class="nav-item" :class="{ active: activeNavItem === 'dashboard' }"
          @click="setActiveNavItem('dashboard')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'dashboard' ? '../../static/dashboard_white.png' : '../../static/dashboard.png'">
          </image>
          <text class="nav-text">Dashboard</text>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'account' }" @click="setActiveNavItem('account')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'account' ? '../../static/account_white.png' : '../../static/account.png'"></image>
          <text class="nav-text">Account</text>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'settings' }" @click="setActiveNavItem('settings')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'settings' ? '../../static/settings_white.png' : '../../static/settings.png'">
          </image>
          <text class="nav-text">Settings</text>
        </view>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Dashboard Content -->
      <view v-if="activeNavItem === 'dashboard'">
        <view class="header">
          <text class="title">Dashboard</text>
          <view class="user-actions">
            <!-- <button class="refresh-btn" @click="refreshProjects">Refresh Projects</button> -->
            <image class="bell-icon" src="../../static/bell.png"></image>
            <image class="avatar" :src="userInfo.picture || userInfo.avatar || '../../static/avatar1.png'"></image>
          </view>
        </view>

        <!-- Smart Step Guide Test Elements -->
        <view class="guide-test-section">
          <view class="guide-step1">第一步引导的目标 - 创建项目按钮</view>
          <view class="guide-step2">第二步引导的目标 - 项目卡片</view>
        </view>

        <view class="projects-grid">
          <!-- User Projects -->
          <template v-if="Array.isArray(userProjects) && userProjects.length > 0">
            <x-skeleton v-for="(project, index) in userProjects" :key="'user-project-' + index" type="banner"
              :loading="false">
              <view class="project-card" @click="jumpToDesign(project)">
                <image class="project-image"
                  src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png"
                  mode="aspectFill">
                </image>
                <view class="project-content">
                  <text class="project-title">{{ project.projectTitle }}</text>
                  <text class="project-description">{{ project.projectDescription }}</text>
                </view>
              </view>
            </x-skeleton>
          </template>

          <!-- Project Alpha -->
          <x-skeleton type="banner" :loading="projectLoadingStates.alpha">
            <view class="project-card" @click="jumpToDesign()">
              <image class="project-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                mode="aspectFill">
              </image>
              <view class="project-content">
                <text class="project-title">Project Alpha</text>
                <text class="project-description">An innovative project using the latest design tools to create
                  user-friendly interfaces.</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Project Beta -->
          <x-skeleton type="banner" :loading="projectLoadingStates.beta">
            <view class="project-card" @click="jumpToDesign()">
              <image class="project-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(2).png"
                mode="aspectFill">
              </image>
              <view class="project-content">
                <text class="project-title">Project Beta</text>
                <text class="project-description">Focusing on enhancing user experience through refined design
                  methodologies.</text>
              </view>
            </view>
          </x-skeleton>

          <!-- Project Gamma -->
          <x-skeleton type="banner" :loading="projectLoadingStates.gamma">
            <view class="project-card" @click="jumpToDesign()">
              <image class="project-image"
                src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png"
                mode="aspectFill">
              </image>
              <view class="project-content">
                <text class="project-title">Project Gamma</text>
                <text class="project-description">Exploring new design paradigms to create futuristic and engaging
                  interfaces.</text>
              </view>
            </view>
          </x-skeleton>
        </view>
      </view>

      <!-- Account Settings Content -->
      <view v-if="activeNavItem === 'account'" class="account-settings">
        <view class="header">
          <text class="title">User Settings</text>
        </view>

        <!-- Profile Section -->
        <view class="settings-section">
          <text class="section-title">Profile</text>
          <text class="section-description">You can change your profile information below</text>

          <view class="form-row">
            <view class="form-group">
              <text class="form-label">First name</text>
              <input class="form-input" type="text" v-model="accountSettings.firstName" placeholder="First name" />
            </view>

            <view class="form-group">
              <text class="form-label">Last name</text>
              <input class="form-input" type="text" v-model="accountSettings.lastName" placeholder="Last name" />
            </view>
          </view>

          <view class="form-group">
            <text class="form-label">Profile photo</text>
            <view class="profile-photo-container">
              <view class="profile-photo" @click="chooseProfilePhoto">
                <image v-if="accountSettings.photoUrl" class="profile-photo-image" :src="accountSettings.photoUrl"></image>
                <image v-else class="upload-icon" src="../../static/account.png"></image>
              </view>
              <text class="photo-hint">Click to upload a photo</text>
            </view>
          </view>

          <button class="save-btn" @click="saveProfileChanges">Save changes</button>
        </view>

        <!-- Email Section -->
        <view class="settings-section">
          <text class="section-title">Email</text>
          <text class="section-description">You can change your email below</text>

          <view class="form-group">
            <text class="form-label">Email</text>
            <input class="form-input" type="email" v-model="accountSettings.email" placeholder="New email address" />
          </view>

          <button class="save-btn" @click="changeEmail">Change email</button>
        </view>

        <!-- Password Section -->
        <view class="settings-section">
          <text class="section-title">Password</text>
          <text class="section-description">You can change your password below</text>

          <view class="form-group">
            <text class="form-label">New password</text>
            <input class="form-input" type="password" v-model="accountSettings.newPassword"
              placeholder="New password" />
          </view>

          <view class="form-group">
            <text class="form-label">Repeat new password</text>
            <input class="form-input" type="password" v-model="accountSettings.confirmPassword"
              placeholder="********" />
          </view>

          <view class="password-strength" v-if="accountSettings.newPassword">
            <view class="strength-bar">
              <view class="strength-indicator" :style="{ width: passwordStrength + '%' }"></view>
            </view>
            <text class="strength-text">Password is {{ passwordStrengthText }}</text>
          </view>

          <button class="save-btn" @click="changePassword">Change password</button>
        </view>

        <!-- Logout Section -->
        <view class="settings-section">
          <text class="section-title">Logout</text>
          <text class="section-description">You can logout from your account below</text>

          <button class="logout-btn" @click="logout">Logout</button>
        </view>
      </view>

      <!-- Settings Content (placeholder for future implementation) -->
      <view v-if="activeNavItem === 'settings'" class="settings-content">
        <view class="header">
          <text class="title">Settings</text>
        </view>
        <text>Settings page content will be implemented here.</text>
      </view>
    </view>

    <!-- Create Project Dialog -->
    <view class="dialog-overlay" v-if="showCreateProjectDialog" @click="closeCreateProjectDialog">
      <view class="dialog-container" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">Which device are you designing for?</text>

          <!-- Error notification -->
          <view class="error-notification" v-if="errorMessage">
            <text>{{ errorMessage }}</text>
          </view>

          <view class="device-options">
            <view class="device-option" :class="{ 'selected': selectedDevice === 'mobile' }"
              @click="selectDevice('mobile')">
              <image class="device-icon" src="../../static/mobile.png"></image>
              <text>Mobile</text>
            </view>

            <view class="device-option" :class="{ 'selected': selectedDevice === 'desktop' }"
              @click="selectDevice('desktop')">
              <image class="device-icon" src="../../static/desktop.png"></image>
              <text>Desktop</text>
            </view>
          </view>

          <!-- Model Selection -->
          <view class="model-selection-container">
            <text class="model-selection-label">Select AI Model</text>
            <view class="model-selector">
              <view class="custom-dropdown" @click="toggleModelDropdown">
                <view class="dropdown-display">
                  <text class="dropdown-text">{{ getSelectedModelText() }}</text>
                  <view class="dropdown-arrow" :class="{ 'rotated': showModelDropdown }">▼</view>
                </view>
                <view class="dropdown-options" v-if="showModelDropdown">
                  <view 
                    v-for="option in modelOptions" 
                    :key="option.value"
                    class="dropdown-option"
                    :class="{ 'selected': selectedModel === option.value }"
                    @click.stop="selectModel(option.value)"
                  >
                    <view class="option-content">
                      <text class="option-text">{{ option.text }}</text>
                      <view v-if="option.isPro" class="pro-badge">PRO</view>
                      <view v-else class="free-badge">FREE</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="try-example-container">
            <text class="description-label">Describe your project in plain English</text>
            <button class="try-example-btn" @click="tryExample">Try example</button>
          </view>
          <view class="description-container">
            <textarea class="project-description-input" placeholder="Enter your project description"
              v-model="projectDescription" maxlength="700"></textarea>
            <text class="char-count">{{ projectDescription.length }}/700</text>
          </view>

          <!-- Number of Pages Selector -->
          <!-- <view class="pages-selector-container">
            <text class="pages-selector-label">Number of Pages: {{ numPages }}</text>
            <slider class="pages-selector" min="1" max="7" step="1" show-value 
              :value="numPages" @change="onNumPagesChange" />
          </view> -->

          <button class="continue-btn" @click="createProject">Continue</button>
        </view>
      </view>
    </view>

    <!-- Network Error Toast Overlay -->
    <view class="toast-overlay" v-if="networkErrorVisible" @click="networkErrorVisible = false">
      <!-- Network Error Toast -->
      <view class="network-error-toast" @click.stop>
        <text class="toast-icon">⚠️</text>
        <text class="toast-message">{{ networkErrorMessage }}</text>
        <view class="toast-actions">
          <text class="toast-retry" @click="retryCreateProject">Retry</text>
          <text class="toast-close" @click="networkErrorVisible = false">×</text>
        </view>
      </view>
    </view>

    <!-- Smart Step Guide Component -->
    <smart-step-guide
      ref="guide"
      :steps="guideSteps"
      :theme="guideTheme"
      :skip-enabled="true"
      @complete="onGuideComplete"
      @skip="onGuideSkip"
    />
  </view>
</template>

<script>
import { API_BASE_URL } from '../../env.js';

export default {
  name: 'Dashboard',
  data() {
    return {
      activeNavItem: 'dashboard',
      showCreateProjectDialog: false,
      selectedDevice: '',
      projectDescription: '',
      numPages: 1,
      exampleDescription: 'Sign up page for a dating app',
      errorMessage: '',
      projectLoadingStates: {
        alpha: true,
        beta: true,
        gamma: true
      },
      networkErrorVisible: false,
      networkErrorMessage: '',
      userProjects: [],
      userInfo: uni.getStorageSync('googleUserInfo'),
      accountSettings: {
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        photoUrl: ''
      },
      passwordStrength: 0,
      passwordStrengthText: '',
      // Model selection
      modelOptions: [
        { value: 'gimini2.5', text: 'gimini2.5 (recommended 1 minute)', isPro: true },
        { value: 'uigenius5:latest', text: 'uigenius5:latest (recommended 3 minutes, most powerful model)', isPro: true },
        { value: 'uigenius3:basic', text: 'uigenius3:basic (free basic model, 3 minutes)', isPro: false},
      ],
      selectedModel: 'gimini2.5',
      showModelDropdown: false,
      // Smart Step Guide
      guideTheme: 'light',
      guideSteps: [
        {
          target: '.guide-step1',
          title: '第一步',
          content: '这是第一步的引导说明 - 点击这里创建新项目',
          position: 'bottom'
        },
        {
          target: '.guide-step2',
          title: '第二步',
          content: '这是第二步的引导说明 - 查看您的项目',
          position: 'right'
        }
      ]
    }
  },
  watch: {
    'accountSettings.newPassword': function (newVal) {
      this.updatePasswordStrength();
    }
  },
  mounted() {
    // Staggered loading for projects
    setTimeout(() => {
      this.projectLoadingStates.alpha = false;
    }, 800);

    setTimeout(() => {
      this.projectLoadingStates.beta = false;
    }, 1300);

    setTimeout(() => {
      this.projectLoadingStates.gamma = false;
    }, 1800);

    // Load user projects from cloud
    this.loadProjectsByUid();

    // Initialize account settings from user info
    this.initializeAccountSettings();
    
    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
    
    // Start guide after page loads
    setTimeout(() => {
      this.startGuide();
    }, 1000);
  },
  
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    // Initialize account settings from stored user info
    initializeAccountSettings() {
      const userInfo = uni.getStorageSync('googleUserInfo') || {};
      this.accountSettings.firstName = userInfo.given_name || '';
      this.accountSettings.lastName = userInfo.family_name || '';
      this.accountSettings.email = userInfo.email || '';
      this.accountSettings.photoUrl = userInfo.picture || userInfo.avatar || '';
    },
    refreshProjects() {
      // Reset all project loading states
      this.projectLoadingStates.alpha = true;
      this.projectLoadingStates.beta = true;
      this.projectLoadingStates.gamma = true;

      // Reload user projects from cloud
      this.loadProjectsByUid();

      // Staggered loading for default projects
      setTimeout(() => {
        this.projectLoadingStates.alpha = false;
      }, 800);

      setTimeout(() => {
        this.projectLoadingStates.beta = false;
      }, 1300);

      setTimeout(() => {
        this.projectLoadingStates.gamma = false;
      }, 1800);
    },
    setActiveNavItem(item) {
      this.activeNavItem = item;

      // Refresh projects when switching to dashboard
      if (item === 'dashboard') {
        // this.refreshProjects();
      }
    },
    jumpToDesign(project) {
      // If no project is provided (for default projects), just navigate to design page
      if (!project) {
        uni.switchTab({
          url: '/pages/design/design'
        });
        return;
      }
      
      // Get the project id
      const projectId = project._id;
      
      if (!projectId) {
        uni.showToast({
          title: 'Invalid project',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({
        title: 'Loading project data...'
      });
      
      // Call the generated-overall-pages cloud function to get the project data
      uniCloud.callFunction({
        name: 'generated-overall-pages',
        data: {
          action: 'read',
          id: projectId
        }
      }).then(res => {
        uni.hideLoading();
        
        if (res.result && res.result.success && res.result.data) {
          // Store the project data in local storage
          uni.setStorageSync('latest_7_overall_page', res.result.data);
          uni.setStorageSync('currentProjectId', projectId);
          
          // Navigate to design page
          uni.switchTab({
            url: '/pages/design/design'
          });
        } else {
          uni.showToast({
            title: 'Failed to load project data',
            icon: 'none'
          });
        }
      }).catch(err => {
        uni.hideLoading();
        uni.showToast({
          title: 'Error loading project data',
          icon: 'none'
        });
        console.error('Cloud function error:', err);
      });
    },
    openCreateProjectDialog() {
      this.setActiveNavItem('dashboard');
      this.showCreateProjectDialog = true;
      this.errorMessage = '';
    },
    closeCreateProjectDialog() {
      this.showCreateProjectDialog = false;
      this.errorMessage = '';
    },
    selectDevice(device) {
      this.selectedDevice = device;
      this.errorMessage = '';
    },
    tryExample() {
      this.projectDescription = this.exampleDescription;
    },
    async createProject() {
      // temporary return and show toast the back end is constructing within 1 week, please wait
      // this.showCreateProjectDialog = false;
      // uni.showToast({
      //   title: 'This feature is under construction, will be available within 1 week, please wait',
      //   icon: 'none',
      //   duration: 2000
      // });
      // return;
      // Hide any previous network error toast
      this.networkErrorVisible = false;

      if (!this.selectedDevice) {
        // Show error or notification that device must be selected
        this.errorMessage = 'Please select a device type first';
        return;
      }
      if (!this.projectDescription) {
        // Show error or notification that description is required
        this.errorMessage = 'Please enter a project description';
        return;
      }

      // Clear error message when validation passes
      this.errorMessage = '';

      // Start API connection check with a race between fetch and timeout
      const checkApiConnection = async () => {
        try {
          // Race between fetch and timeout for faster response
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 1000)
          );

          const fetchPromise = fetch(`https://aiback.uigenius.top`, {
            method: 'HEAD',
            cache: 'no-cache'
          });

          // Use Promise.race to take the first resolved promise
          const response = await Promise.race([fetchPromise, timeoutPromise]);

          if (!response.ok) {
            console.error('API health check failed:', response.status, response.statusText);
            throw new Error(`API server error: ${response.status} ${response.statusText}`);
          }

          return true;
        } catch (error) {
          if (error.message === 'Timeout') {
            this.showNetworkErrorToast('Connection timeout. API server is not responding.');
          } else if (error.name === 'TypeError') {
            this.showNetworkErrorToast('Cannot connect to API server. Please check your network connection.');
          } else {
            this.showNetworkErrorToast('API server error. Please try again later.');
          }
          console.error('Network error:', error);
          return false;
        }
      };

      // Check connection and proceed if successful
      const isConnected = await checkApiConnection();
      if (!isConnected) return;

      // If we reach here, connection is good

      await uni.removeStorageSync('latest_7_overall_page');
      await uni.removeStorageSync('projectDescription');
      await uni.removeStorageSync('selectedDevice');
      await uni.removeStorageSync('selectedModel');
      await uni.removeStorageSync('shouldGenerateUI');
      await uni.removeStorageSync('uigenius_image_dashboard');
      await uni.removeStorageSync('uigenius_image_generated');
      await uni.removeStorageSync('uigenius_image_home');
      await uni.removeStorageSync('uigenius_image_signup');
      await uni.removeStorageSync('uigenius_image_settings');
      await uni.removeStorageSync('uigenius_image_profile');
      await uni.removeStorageSync('uigenius_image_notification');


      await uni.setStorageSync('projectDescription', this.projectDescription);
      await uni.setStorageSync('selectedDevice', this.selectedDevice);
      await uni.setStorageSync('selectedModel', this.selectedModel);
      await uni.setStorageSync('numPages', this.numPages);
      // Set flag to indicate we should generate UI when design page loads
      await uni.setStorageSync('shouldGenerateUI', 'true');
      this.closeCreateProjectDialog();
      uni.switchTab({
        url: '/pages/design/design'
      });
    },

    // Custom toast for network errors
    showNetworkErrorToast(message = 'Network error. Please check your connection to the API server.') {
      // Set the error message
      this.networkErrorMessage = message;

      // Create a custom toast using uni-app's component - show immediately
      this.$nextTick(() => {
        this.networkErrorVisible = true;
      });

      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.networkErrorVisible = false;
      }, 5000);
    },
    retryCreateProject() {
      // Hide the toast immediately
      this.networkErrorVisible = false;

      // Wait a moment before retrying to give visual feedback
      setTimeout(() => {
        this.createProject();
      }, 100);
    },
    loadProjectsByUid() {
      // Check if user is logged in
      if (!this.checkUserLogin()) {
        return;
      }

      const userId = uni.getStorageSync('uid');

      if (!userId) {
        console.log('No user ID found');
        // uni.showToast({
        //   title: 'User ID not found',
        //   icon: 'none',
        //   duration: 2000
        // });
        return;
      }

      console.log('Loading projects for user ID:', userId);

      uni.showLoading({
        title: 'Loading your projects...'
      });
      // test mode no login,just return 
      if (userId == '123bcbfeqqaeabfaf5a') {
        uni.hideLoading();
        return
      }

      // Pass uid directly as a parameter
      uniCloud.callFunction({
        name: 'user-project',
        data: {
          action: 'read',
          id: userId
        }
      }).then(res => {
        uni.hideLoading();
        if (res.result && res.result.success) {
          console.log(res.result)
          // Ensure userProjects is always an array
          this.userProjects = Array.isArray(res.result.data) ? res.result.data : [];
          console.log(`Loaded ${this.userProjects.length} projects for user ID ${userId}`);

          // Update the project grid with user projects
          this.updateProjectGrid();
        } else {
          uni.showToast({
            title: 'Failed to load projects',
            icon: 'none'
          });
          console.error('Cloud function error:', res.result);
        }
      }).catch(err => {
        uni.hideLoading();
        uni.showToast({
          title: 'Error loading projects',
          icon: 'none'
        });
        console.error('Cloud function error:', err);
      });
    },

    checkUserLogin() {
      // Check for user ID
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        console.log('No user ID found');
        uni.showToast({
          title: 'User ID not found',
          icon: 'none',
          duration: 2000
        });
        return false;
      }

      return true;
    },

    updateProjectGrid() {
      this.projectLoadingStates.alpha = false;
      this.projectLoadingStates.beta = false;
      this.projectLoadingStates.gamma = false;
      this.userProjects.forEach((project, index) => {
        this.projectLoadingStates[`user-project-${index}`] = false;
      });




      // Only update if we have user projects
      // if (!Array.isArray(this.userProjects) || this.userProjects.length === 0) {
      //   // If no user projects, show default projects with staggered loading
      //   setTimeout(() => {
      //     this.projectLoadingStates.alpha = false;
      //   }, 800);

      //   setTimeout(() => {
      //     this.projectLoadingStates.beta = false;
      //   }, 1300);

      //   setTimeout(() => {
      //     this.projectLoadingStates.gamma = false;
      //   }, 1800);
      //   return;
      // }

      // // If we have user projects, update the loading states for them
      // this.projectLoadingStates = {};

      // // Create loading states for user projects with staggered timing
      // this.userProjects.slice(0, 3).forEach((project, index) => {
      //   const key = `user-project-${index}`;
      //   this.projectLoadingStates[key] = true;

      //   setTimeout(() => {
      //     this.projectLoadingStates[key] = false;
      //   }, 800 + (index * 500));
      // });
    },

    // loadProjectById(id) {
    //   // Check if user is logged in
    //   if (!this.checkUserLogin()) {
    //     return;
    //   }

    //   if (!id) {
    //     console.log('No project ID provided');
    //     return;
    //   }

    //   uni.showLoading({
    //     title: 'Loading project...'
    //   });

    //   uniCloud.callFunction({
    //     name: 'user-project',
    //     data: {
    //       action: 'read',
    //       id: id
    //     }
    //   }).then(res => {
    //     uni.hideLoading();
    //     if (res.result && res.result.success && res.result.data) {
    //       // Load the project data
    //       const projectData = res.result.data;
    //       if (projectData.generated_overall_pages) {
    //         // Store the loaded project data
    //         uni.setStorageSync('latest_7_overall_page', JSON.stringify(projectData.generated_overall_pages));

    //         uni.showToast({
    //           title: 'Project loaded, redirecting...',
    //           icon: 'success'
    //         });

    //         // Navigate to design page
    //         setTimeout(() => {
    //           uni.switchTab({
    //             url: '/pages/design/design'
    //           });
    //         }, 1000);
    //       } else {
    //         uni.showToast({
    //           title: 'Invalid project data',
    //           icon: 'none'
    //         });
    //       }
    //     } else {
    //       uni.showToast({
    //         title: 'Failed to load project',
    //         icon: 'none'
    //       });
    //       console.error('Cloud function error:', res.result);
    //     }
    //   }).catch(err => {
    //     uni.hideLoading();
    //     uni.showToast({
    //       title: 'Error loading project',
    //       icon: 'none'
    //     });
    //     console.error('Cloud function error:', err);
    //   });
    // },
    getProjectImage(index) {
      // Array of default project images
      const defaultImages = [
        'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(4).png',
        'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(5).png',
        'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(6).png'
      ];

      // Return the image at the corresponding index, or the first image if index is out of bounds
      return defaultImages[index % defaultImages.length];
    },
    saveProfileChanges() {
      // Validate inputs
      if (!this.accountSettings.firstName || !this.accountSettings.lastName) {
        uni.showToast({
          title: 'Please fill in all required fields',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Show loading indicator
      uni.showLoading({
        title: 'Saving changes...'
      });

      // Get user ID from storage
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        uni.hideLoading();
        uni.showToast({
          title: 'User not logged in',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // Check if in test mode
      if (userId === '123bcbfeqqaeabfaf5a') {
        uni.hideLoading();
        uni.showToast({
          title: 'You are in test mode, profile update skipped',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Call cloud function to update profile
      uniCloud.callFunction({
        name: 'updateUserInfo',
        data: {
          action: 'updateProfile',
          userId: userId,
          data: {
            firstName: this.accountSettings.firstName,
            lastName: this.accountSettings.lastName
          }
        }
      }).then(res => {
        uni.hideLoading();
        
        if (res.result && res.result.success) {
          // Update local storage with new values
          const userInfo = uni.getStorageSync('googleUserInfo') || {};
          userInfo.given_name = this.accountSettings.firstName;
          userInfo.family_name = this.accountSettings.lastName;
          uni.setStorageSync('googleUserInfo', userInfo);

          // Update the current userInfo object
          this.userInfo = userInfo;

          uni.showToast({
            title: 'Profile updated successfully',
            icon: 'success',
            duration: 2000
          });
        } else {
          uni.showToast({
            title: res.result.message || 'Failed to update profile',
            icon: 'none',
            duration: 2000
          });
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('Error updating profile:', err);
        uni.showToast({
          title: 'Error updating profile',
          icon: 'none',
          duration: 2000
        });
      });
    },
    changeEmail() {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.accountSettings.email || !emailRegex.test(this.accountSettings.email)) {
        uni.showToast({
          title: 'Please enter a valid email address',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Show loading indicator
      uni.showLoading({
        title: 'Updating email...'
      });

      // Get user ID from storage
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        uni.hideLoading();
        uni.showToast({
          title: 'User not logged in',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // Check if in test mode
      if (userId === '123bcbfeqqaeabfaf5a') {
        uni.hideLoading();
        uni.showToast({
          title: 'You are in test mode, email update skipped',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Call cloud function to update email
      uniCloud.callFunction({
        name: 'updateUserInfo',
        data: {
          action: 'updateEmail',
          userId: userId,
          data: {
            email: this.accountSettings.email
          }
        }
      }).then(res => {
        uni.hideLoading();
        
        if (res.result && res.result.success) {
          // Update local storage with new email
          const userInfo = uni.getStorageSync('googleUserInfo') || {};
          userInfo.email = this.accountSettings.email;
          uni.setStorageSync('googleUserInfo', userInfo);

          // Update the current userInfo object
          this.userInfo = userInfo;

          uni.showToast({
            title: 'Email updated successfully',
            icon: 'success',
            duration: 2000
          });
        } else {
          uni.showToast({
            title: res.result.message || 'Failed to update email',
            icon: 'none',
            duration: 2000
          });
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('Error updating email:', err);
        uni.showToast({
          title: 'Error updating email',
          icon: 'none',
          duration: 2000
        });
      });
    },
    changePassword() {
      // Validate password
      if (!this.accountSettings.newPassword || this.accountSettings.newPassword.length < 8) {
        uni.showToast({
          title: 'Password must be at least 8 characters',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Check if passwords match
      if (this.accountSettings.newPassword !== this.accountSettings.confirmPassword) {
        uni.showToast({
          title: 'Passwords do not match',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Show loading indicator
      uni.showLoading({
        title: 'Updating password...'
      });

      // Get user ID from storage
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        uni.hideLoading();
        uni.showToast({
          title: 'User not logged in',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // Check if in test mode
      if (userId === '123bcbfeqqaeabfaf5a') {
        uni.hideLoading();
        // Clear password fields
        this.accountSettings.newPassword = '';
        this.accountSettings.confirmPassword = '';
        this.passwordStrength = 0;
        this.passwordStrengthText = '';
        
        uni.showToast({
          title: 'You are in test mode, password update skipped',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Call cloud function to update password
      uniCloud.callFunction({
        name: 'updateUserInfo',
        data: {
          action: 'updatePassword',
          userId: userId,
          data: {
            password: this.accountSettings.newPassword
          }
        }
      }).then(res => {
        uni.hideLoading();
        
        if (res.result && res.result.success) {
          // Clear password fields
          this.accountSettings.newPassword = '';
          this.accountSettings.confirmPassword = '';
          this.passwordStrength = 0;
          this.passwordStrengthText = '';

          uni.showToast({
            title: 'Password updated successfully',
            icon: 'success',
            duration: 2000
          });
        } else {
          uni.showToast({
            title: res.result.message || 'Failed to update password',
            icon: 'none',
            duration: 2000
          });
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('Error updating password:', err);
        uni.showToast({
          title: 'Error updating password',
          icon: 'none',
          duration: 2000
        });
      });
    },
    // Watch for password changes to calculate strength
    updatePasswordStrength() {
      const password = this.accountSettings.newPassword;

      if (!password) {
        this.passwordStrength = 0;
        this.passwordStrengthText = '';
        return;
      }

      // Simple password strength calculation
      let strength = 0;

      // Length check
      if (password.length >= 8) strength += 25;

      // Contains lowercase
      if (/[a-z]/.test(password)) strength += 25;

      // Contains uppercase
      if (/[A-Z]/.test(password)) strength += 25;

      // Contains number or special char
      if (/[0-9!@#$%^&*]/.test(password)) strength += 25;

      this.passwordStrength = strength;

      // Set text based on strength
      if (strength < 50) {
        this.passwordStrengthText = 'weak';
      } else if (strength < 75) {
        this.passwordStrengthText = 'medium';
      } else {
        this.passwordStrengthText = 'strong';
      }
    },
    logout() {
      // Show loading indicator
      uni.showLoading({
        title: 'Logging out...'
      });

      // Simulate API call with timeout
      setTimeout(() => {
        // Clear user data from storage
        uni.removeStorageSync('googleUserInfo');
        uni.removeStorageSync('uid');
        uni.removeStorageSync('token');
        uni.removeStorageSync('tokenExpiration');

        uni.removeStorageSync('googleToken');
        uni.removeStorageSync('googleTokenExpiration');
        uni.removeStorageSync('googleUid');

        uni.removeStorageSync('latest_7_overall_page');
        uni.removeStorageSync('currentProjectId');

        // Hide loading and show success message
        uni.hideLoading();
        uni.showToast({
          title: 'Logged out successfully',
          icon: 'success',
          duration: 2000
        });

        // Redirect to login page after a short delay
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          });
        }, 1500);
      }, 1000);
    },
    onNumPagesChange(e) {
      this.numPages = e.detail.value;
      uni.setStorageSync('numPages', this.numPages);
    },
    chooseProfilePhoto() {
      // Open the file picker to select an image
      uni.chooseImage({
        count: 1, // Allow only one image to be selected
        sizeType: ['compressed'], // Compressed images
        sourceType: ['album', 'camera'], // Allow selection from album or camera
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          
          // Show loading indicator
          uni.showLoading({
            title: 'Uploading photo...'
          });
          
          // Get user ID from storage
          const userId = uni.getStorageSync('uid');
          if (!userId) {
            uni.hideLoading();
            uni.showToast({
              title: 'User not logged in',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          
          // Check if in test mode
          if (userId === '123bcbfeqqaeabfaf5a') {
            uni.hideLoading();
            // Update local state only for test mode
            this.accountSettings.photoUrl = tempFilePath;
            
            // Update local storage with new values
            const userInfo = uni.getStorageSync('googleUserInfo') || {};
            userInfo.picture = tempFilePath;
            uni.setStorageSync('googleUserInfo', userInfo);
            
            // Update the current userInfo object
            this.userInfo = userInfo;
            
            uni.showToast({
              title: 'You are in test mode, photo update is local only',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          
          // Upload the image to cloud storage
          uniCloud.uploadFile({
            filePath: tempFilePath,
            cloudPath: `profile-photos/${userId}-${Date.now()}.jpg`,
            onUploadProgress: (progressEvent) => {
              console.log('Upload progress:', progressEvent);
            },
            success: (uploadRes) => {
              console.log('Upload success:', uploadRes);
              
              // Get the file URL from the upload response
              const fileURL = uploadRes.fileID;
              
              // Update the user's profile photo URL in the database
              uniCloud.callFunction({
                name: 'updateUserInfo',
                data: {
                  action: 'updateProfilePhoto',
                  userId: userId,
                  data: {
                    photoUrl: fileURL
                  }
                }
              }).then(res => {
                uni.hideLoading();
                
                if (res.result && res.result.success) {
                  // Update local state and storage
                  this.accountSettings.photoUrl = fileURL;
                  
                  // Update local storage with new values
                  const userInfo = uni.getStorageSync('googleUserInfo') || {};
                  userInfo.picture = fileURL;
                  uni.setStorageSync('googleUserInfo', userInfo);
                  
                  // Update the current userInfo object
                  this.userInfo = userInfo;
                  
                  uni.showToast({
                    title: 'Profile photo updated',
                    icon: 'success',
                    duration: 2000
                  });
                } else {
                  uni.showToast({
                    title: res.result.message || 'Failed to update profile photo',
                    icon: 'none',
                    duration: 2000
                  });
                }
              }).catch(err => {
                uni.hideLoading();
                console.error('Error updating profile photo:', err);
                uni.showToast({
                  title: 'Error updating profile photo',
                  icon: 'none',
                  duration: 2000
                });
              });
            },
            fail: (err) => {
              uni.hideLoading();
              console.error('Upload failed:', err);
              uni.showToast({
                title: 'Failed to upload photo',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      });
    },
    // Handle model selection change
    onModelChange(e) {
      this.selectedModel = e;
      console.log('Selected model:', this.selectedModel);
    },
    
    // Custom dropdown methods
    toggleModelDropdown() {
      this.showModelDropdown = !this.showModelDropdown;
    },
    
    selectModel(value) {
      this.selectedModel = value;
      this.showModelDropdown = false;
      console.log('Selected model:', this.selectedModel);
    },
    
    getSelectedModelText() {
      const selectedOption = this.modelOptions.find(option => option.value === this.selectedModel);
      return selectedOption ? selectedOption.text : 'please select your AI model';
    },
    
    handleClickOutside(event) {
      // Close dropdown if clicking outside
      if (this.showModelDropdown) {
        const dropdown = event.target.closest('.custom-dropdown');
        if (!dropdown) {
          this.showModelDropdown = false;
        }
      }
    },
    
    // Smart Step Guide methods
    startGuide() {
      const guide = this.$refs.guide;
      if (guide) {
        guide.start();
      }
    },

    onGuideComplete() {
      uni.showToast({
        title: '引导完成！',
        icon: 'success'
      });
    },

    onGuideSkip() {
      uni.showToast({
        title: '已跳过引导',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

/* Sidebar styles */
.sidebar {
  width: 200px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}

.logo-container {
  padding: 0 15px 20px;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  color: #767676;
}

.bell-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  color: #767676;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #e53935;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 10px;
  transition: background-color 0.2s;
  gap: 7px;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e53935;

    .nav-text,
    .sidebar-icon {
      color: white;
    }
  }
}

.nav-icon {
  margin-right: 10px;
  font-size: 18px;
}

.nav-text {
  color: #767676;
  font-size: 14px;
}

/* Main content styles */
.main-content {
  flex: 1;
  padding: 25px 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .title {
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }

  .user-actions {
    display: flex;
    align-items: center;
    gap: 20px;

    .notification-icon {
      font-size: 20px;
      color: #666;
      cursor: pointer;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      object-fit: cover;
    }

    .refresh-btn {
      background-color: #e53935;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #c62828;
      }
    }
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  .project-card {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }

    .project-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .project-content {
      padding: 20px;

      .project-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #333;
        display: block;
      }

      .project-description {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        display: block;
      }
    }
  }
}

@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 15px 0;
  }

  .nav-links {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-item {
    padding: 10px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Dialog styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.dialog-content {
  padding: 30px;
}

.dialog-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: left;
  display: block;
}

.device-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.device-option {
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    border-color: #e53935;
    background-color: rgba(229, 57, 53, 0.1);
  }

  text {
    color: #333;
    font-size: 16px;
  }
}

.device-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.description-label {
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  display: block;
}

.description-container {
  position: relative;
  margin-right: 30px;
  margin-bottom: 30px;
}

.try-example-container {
  display: flex;
  justify-content: space-between;
}

.try-example-btn {
  background-color: #e53935;
  color: #fff;
  margin-right: 0px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #d32f2f;
  }
}

.project-description-input {
  width: 100%;
  height: 120px;
  padding: 15px;
  background-color: #f8f8f8;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  color: #333;
  font-size: 16px;
  resize: none;

  &::placeholder {
    color: #888;
  }
}

.char-count {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #888;
  font-size: 14px;
}

.continue-btn {
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 500;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
  }
}

.error-notification {
  background-color: #ffd7d7;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;

  text {
    color: #e53935;
    font-size: 14px;
  }
}

/* Toast Overlay */
.toast-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
  /* Allow clicks to pass through except on the toast itself */
}

/* Network Error Toast styles */
.network-error-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  animation: toast-in 0.15s ease-out forwards; // Faster animation
  pointer-events: auto;
  /* Ensure the toast itself captures clicks */
  will-change: transform, opacity;
  /* Optimize for animations */

  @keyframes toast-in {
    0% {
      opacity: 0;
      transform: translate(-50%, 20px);
    }

    100% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  .toast-icon {
    font-size: 20px;
    color: #fff;
  }

  .toast-message {
    color: #fff;
    font-size: 14px;
    flex: 1;
  }

  .toast-actions {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .toast-retry {
    color: #e53935;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px;

    &:hover {
      text-decoration: underline;
    }
  }

  .toast-close {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    padding: 0 5px;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 480px) {
    width: 80%;
    max-width: 300px;

    .toast-message {
      font-size: 13px;
    }
  }
}

/* Account Settings styles */
.account-settings {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.section-description {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 96.5%;
  padding: 12px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #e53935;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
}

.profile-photo-container {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f8f8f8;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
    border-color: #e53935;
    transform: scale(1.05);
  }
}

.profile-photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-hint {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}

.upload-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  opacity: 0.7;
}

.save-btn {
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;

  &:hover {
    background-color: #d32f2f;
  }
}

.password-strength {
  margin-top: 10px;
  margin-bottom: 20px;
}

.strength-bar {
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-indicator {
  height: 100%;
  background-color: #e53935;
  transition: width 0.3s;
}

.strength-text {
  font-size: 12px;
  color: #666;
}

/* Settings Content styles */
.settings-content {
  padding: 20px;
}

/* Logout button styles */
.logout-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;

  &:hover {
    background-color: #d32f2f;
  }
}

/* Pages Selector styles */
.pages-selector-container {
  margin-top: 15px;
  margin-bottom: 25px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.pages-selector-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.pages-selector {
  width: 100%;
}

/* Model Selection styles */
.model-selection-container {
  margin-bottom: 20px;
}

.model-selection-label {
  color: #333;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  display: block;
}

.model-selector {
  width: 100%;
}

/* Custom Dropdown styles */
.custom-dropdown {
  position: relative;
  width: 100%;
  cursor: pointer;
}

.dropdown-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background-color: #f8f8f8;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  min-height: 15px;
  transition: border-color 0.2s;
}

.dropdown-display:hover {
  border-color: #e53935;
}

.dropdown-text {
  color: #333;
  font-size: 15px;
  flex: 1;
}

.dropdown-arrow {
  font-size: 12px;
  color: #666;
  transition: transform 0.2s;
  margin-left: 10px;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 2px;
}

.dropdown-option {
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-option:last-child {
  border-bottom: none;
}

.dropdown-option:hover {
  background-color: #f8f8f8;
}

.dropdown-option.selected {
  background-color: rgba(229, 57, 53, 0.1);
  color: #e53935;
}

.option-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.option-text {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.pro-badge {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
  animation: pro-glow 2s ease-in-out infinite alternate;
}

@keyframes pro-glow {
  0% {
    box-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
  }
  100% {
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.6);
  }
}

.free-badge {
  background: linear-gradient(135deg, #9e9e9e, #757575);
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(158, 158, 158, 0.3);
}

/* Override uni-data-select styles */
:deep(.uni-data-select) {
  width: 100%;
}

::v-deep(.uni-data-select .uni-select__input-box) {
  height: 90px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
}

::v-deep .uni-select__input-text {
  font-size: 16px !important;
}

/* Guide Test Section styles */
.guide-test-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
}

.guide-step1 {
  padding: 15px;
  background-color: #e53935;
  color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.guide-step1:hover {
  background-color: #d32f2f;
}

.guide-step2 {
  padding: 15px;
  background-color: #2196f3;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.guide-step2:hover {
  background-color: #1976d2;
}
</style>
