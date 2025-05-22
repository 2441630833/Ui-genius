<template>
  <view class="dashboard-container">
    <!-- Sidebar -->
    <view class="sidebar">
      <view class="logo-container">
        <view class="logo">
          <image class="sidebar-icon" src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png"></image>
          <text class="logo-text">UiGenius</text>
        </view>
      </view>
      
      <view class="nav-links">
        <view class="nav-item" :class="{ active: activeNavItem === 'plus' }" @click="openCreateProjectDialog">
          <image class="sidebar-icon" :src="activeNavItem === 'plus' ? '../../static/plus_white.png' : '../../static/plus.png'"></image>
          <text class="nav-text">Create Project</text>
        </view>
        <view class="nav-item" :class="{ active: activeNavItem === 'dashboard' }" @click="setActiveNavItem('dashboard')">
          <image class="sidebar-icon" :src="activeNavItem === 'dashboard' ? '../../static/dashboard_white.png' : '../../static/dashboard.png'"></image>
          <text class="nav-text">Dashboard</text>
        </view>
        
        <view class="nav-item" :class="{ active: activeNavItem === 'settings' }" @click="setActiveNavItem('settings')">
          <image class="sidebar-icon" :src="activeNavItem === 'settings' ? '../../static/settings_white.png' : '../../static/settings.png'"></image>
          <text class="nav-text">Settings</text>
        </view>
        
        <view class="nav-item" :class="{ active: activeNavItem === 'account' }" @click="setActiveNavItem('account')">
          <image class="sidebar-icon" :src="activeNavItem === 'account' ? '../../static/account_white.png' : '../../static/account.png'"></image>
          <text class="nav-text">Account</text>
        </view>
      </view>
    </view>
    
    <!-- Main Content -->
    <view class="main-content">
      <view class="header">
        <text class="title">Dashboard</text>
        <view class="user-actions">
          <image class="bell-icon" src="../../static/bell.png"></image>
          <image class="avatar" src="../../static/avatar1.png"></image>
        </view>
      </view>
      
      <view class="projects-grid">
        <!-- Project Alpha -->
        <view class="project-card">
          <image class="project-image" src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png" mode="aspectFill"></image>
          <view class="project-content">
            <text class="project-title">Project Alpha</text>
            <text class="project-description">An innovative project using the latest design tools to create user-friendly interfaces.</text>
          </view>
        </view>
        
        <!-- Project Beta -->
        <view class="project-card">
          <image class="project-image" src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(2).png" mode="aspectFill"></image>
          <view class="project-content">
            <text class="project-title">Project Beta</text>
            <text class="project-description">Focusing on enhancing user experience through refined design methodologies.</text>
          </view>
        </view>
        
        <!-- Project Gamma -->
        <view class="project-card">
          <image class="project-image" src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png" mode="aspectFill"></image>
          <view class="project-content">
            <text class="project-title">Project Gamma</text>
            <text class="project-description">Exploring new design paradigms to create futuristic and engaging interfaces.</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- Create Project Dialog -->
    <view class="dialog-overlay" v-if="showCreateProjectDialog" @click="closeCreateProjectDialog">
      <view class="dialog-container" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">Which device are you designing for?</text>
          
          <view class="device-options">
            <view class="device-option" :class="{ 'selected': selectedDevice === 'mobile' }" @click="selectDevice('mobile')">
              <image class="device-icon" src="../../static/plus.png"></image>
              <text>Mobile</text>
            </view>
            
            <view class="device-option" :class="{ 'selected': selectedDevice === 'desktop' }" @click="selectDevice('desktop')">
              <image class="device-icon" src="../../static/plus.png"></image>
              <text>Desktop</text>
            </view>
          </view>
          
          <text class="description-label">Describe your project in plain English</text>
          
          <view class="description-container">
            <!-- <view class="try-example-container">
              <button class="try-example-btn" @click="tryExample">Try example</button>
            </view> -->
            <textarea 
              class="project-description-input" 
              placeholder="Enter your project description" 
              v-model="projectDescription"
              maxlength="300"
            ></textarea>
            <text class="char-count">{{ projectDescription.length }}/300</text>
          </view>
          
          <button class="continue-btn" @click="createProject">Continue</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      activeNavItem: 'dashboard',
      showCreateProjectDialog: false,
      selectedDevice: '',
      projectDescription: '',
      exampleDescription: 'Dating app for people with magical powers'
    }
  },
  methods: {
    setActiveNavItem(item) {
      this.activeNavItem = item;
    },
    openCreateProjectDialog() {
      this.setActiveNavItem('plus');
      this.showCreateProjectDialog = true;
    },
    closeCreateProjectDialog() {
      this.showCreateProjectDialog = false;
    },
    selectDevice(device) {
      this.selectedDevice = device;
    },
    tryExample() {
      this.projectDescription = this.exampleDescription;
    },
    createProject() {
      if (!this.selectedDevice) {
        // Show error or notification that device must be selected
        return;
      }
      if (!this.projectDescription) {
        // Show error or notification that description is required
        return;
      }
      
      // Handle project creation logic here
      console.log('Creating project for', this.selectedDevice);
      console.log('Description:', this.projectDescription);
      
      // Close dialog after creating project
      this.closeCreateProjectDialog();
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
.bell-icon{
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
    
    .nav-text, .sidebar-icon {
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

// .try-example-container {
//   position: absolute;
//   top: 0;
//   right: 0;
//   z-index: 2;
//   margin-top: 5px;
// }

// .try-example-btn {
//   background: none;
//   border: 1px solid #e53935;
//   color: #e53935;
//   cursor: pointer;
//   font-size: 16px;
//   border-radius: 5px;
  
//   &:hover {
//     background-color: rgba(253, 215, 215, 0.861);
//   }
// }

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
</style>
