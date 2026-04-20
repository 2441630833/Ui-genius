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
        <view class="nav-item create-project-btn" :class="{ active: activeNavItem === 'plus' }" @click="openCreateProjectDialog">
          <image class="sidebar-icon"
            :src="activeNavItem === 'plus' ? '../../static/plus_white.png' : '../../static/plus.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.createProject')}}</text>
        </view>
        <view class="nav-item import-project-btn" :class="{ active: activeNavItem === 'import' }" @click="openImportDialog">
          <image class="sidebar-icon"
            :src="activeNavItem === 'import' ? '../../static/import_white.png' : '../../static/import.png'"></image>
          <text class="nav-text">{{$t('common.import')}}</text>
        </view>
        <view class="nav-item" :class="{ active: activeNavItem === 'dashboard' }"
          @click="setActiveNavItem('dashboard')">
          <image class="sidebar-icon dashboard-icon"
            :src="activeNavItem === 'dashboard' ? '../../static/dashboard_white.png' : '../../static/dashboard.png'">
          </image>
          <text class="nav-text">{{$t('dashboard.nav.dashboard')}}</text>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'publicShare' }"
          @click="setActiveNavItem('publicShare')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'publicShare' ? '../../static/public_shared_project_white.png' : '../../static/public_shared_project.png'">
          </image>
          <text class="nav-text">{{$t('dashboard.nav.publicShare')}}</text>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'account' }" @click="setActiveNavItem('account')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'account' ? '../../static/account_white.png' : '../../static/account.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.account')}}</text>
        </view>
        <!-- Membership nav item -->
        <view class="nav-item" :class="{ active: activeNavItem === 'membership' }" @click="setActiveNavItem('membership')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'membership' ? '../../static/membership_white.png' : '../../static/membership.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.membership')}}</text>
        </view>
        <!-- Invitecode nav item -->
        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'inviteCode' }" @click="setActiveNavItem('inviteCode')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'inviteCode' ? '../../static/inviteCode_white.png' : '../../static/inviteCode.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.inviteCode')}}</text>
        </view> -->
        <!-- Settings nav item -->
        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'settings' }" @click="setActiveNavItem('settings')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'settings' ? '../../static/settings_white.png' : '../../static/settings.png'">
          </image>
          <text class="nav-text">Settings</text>
        </view> -->
        <!-- Newly added Guide nav item -->
        <view class="nav-item" :class="{ active: activeNavItem === 'guide' }" @click="startGuide()">
          <image class="sidebar-icon"
            :src="activeNavItem === 'guide' ? '../../static/guide_white.png' : '../../static/guide.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.guide')}}</text>
        </view>
        <!-- Delete Projects nav item -->
        <view class="nav-item" :class="{ active: activeNavItem === 'delete' }" @click="setActiveNavItem('delete')">
          <image class="sidebar-icon delete-icon"
            :src="activeNavItem === 'delete' ? '../../static/delete_white.png' : '../../static/delete.png'"></image>
          <text class="nav-text">{{$t('dashboard.nav.deleteProjects')}}</text>
        </view>
        <!-- Newly added Share nav item -->
        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'share' }" @click="setActiveNavItem('share')">
          <image class="sidebar-icon"
            :src="activeNavItem === 'share' ? '../../static/import_white.png' : '../../static/import.png'"></image>
          <text class="nav-text">Share</text>
        </view> -->
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Dashboard Content -->
      <view v-if="activeNavItem === 'dashboard'">
        <view class="header">
          <text class="title">{{$t('dashboard.header.title')}}</text>
          <view class="user-actions">
            <!-- <button class="refresh-btn" @click="refreshProjects">Refresh Projects</button> -->
            <image v-if="activeNavItem === 'dashboard'" class="refresh-icon" src="../../static/refresh.png" @click="refreshProjects"></image>
            <!-- <image class="bell-icon" src="../../static/bell.png"></image> -->
            <image class="avatar" :src="userInfo.picture || userInfo.avatar || '../../static/avatar1.png'" @click="setActiveNavItem('account')"></image>
          </view>
        </view>

        <view class="projects-grid">
          <!-- User Projects -->
          <template v-if="Array.isArray(userProjects) && userProjects.length > 0">
            <x-skeleton v-for="(project, index) in userProjects" :key="'user-project-' + index" type="banner"
              :loading="userProjectsLoading">
              <view class="project-card" @click="jumpToDesign(project)">
                <image class="project-image"
                  :src="project.projectPreviewImage || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png'"
                  mode="aspectFill">
                </image>
                <view class="project-content">
                  <text class="project-title">{{ project.projectTitle }}</text>
                  <text class="project-description">{{ project.projectDescription }}</text>
                </view>
              </view>
            </x-skeleton>
          </template>

          <!-- Example Projects (only show when no user projects exist) -->
          <template v-if="!Array.isArray(userProjects) || userProjects.length === 0">
            <!-- Project Alpha -->
            <x-skeleton type="banner" :loading="projectLoadingStates.alpha">
              <view class="project-card" @click="jumpToDesign()">
                <image class="project-image"
                  src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(1).png"
                  mode="aspectFill">
                </image>
                <view class="project-content">
                  <text class="project-title">{{$t('dashboard.projects.alpha.title')}}</text>
                  <text class="project-description">{{$t('dashboard.projects.alpha.description')}}</text>
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
                  <text class="project-title">{{$t('dashboard.projects.beta.title')}}</text>
                  <text class="project-description">{{$t('dashboard.projects.beta.description')}}</text>
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
                  <text class="project-title">{{$t('dashboard.projects.gamma.title')}}</text>
                  <text class="project-description">{{$t('dashboard.projects.gamma.description')}}</text>
                </view>
              </view>
            </x-skeleton>
          </template>
        </view>
      </view>

      <!-- Account Settings Content -->
      <view v-if="activeNavItem === 'account'" class="account-settings">
        <view class="header">
          <text class="title">{{$t('dashboard.account.title')}}</text>
        </view>

        <!-- Profile Section -->
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.account.profile.title')}}</text>
          <text class="section-description">{{$t('dashboard.account.profile.description')}}</text>

          <view class="form-row">
            <view class="form-group">
              <text class="form-label">{{$t('dashboard.account.profile.firstName')}}</text>
              <input class="form-input" type="text" v-model="accountSettings.firstName" :placeholder="$t('dashboard.account.profile.firstName')" />
            </view>

            <view class="form-group">
              <text class="form-label">{{$t('dashboard.account.profile.lastName')}}</text>
              <input class="form-input" type="text" v-model="accountSettings.lastName" :placeholder="$t('dashboard.account.profile.lastName')" />
            </view>
          </view>

          <view class="form-group">
            <text class="form-label">{{$t('dashboard.account.profile.photo')}}</text>
            <view class="profile-photo-container">
              <view class="profile-photo" @click="chooseProfilePhoto">
                <image v-if="accountSettings.photoUrl" class="profile-photo-image" :src="accountSettings.photoUrl"></image>
                <image v-else class="upload-icon" src="../../static/account.png"></image>
              </view>
              <text class="photo-hint">{{$t('dashboard.account.profile.photoHint')}}</text>
            </view>
          </view>

          <button class="save-btn" @click="saveProfileChanges">{{$t('dashboard.account.profile.saveChanges')}}</button>
        </view>

        <!-- Email Section -->
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.account.email.title')}}</text>
          <text class="section-description">{{$t('dashboard.account.email.description')}}</text>

          <view class="form-group">
            <text class="form-label">{{$t('dashboard.account.email.current')}}</text>
            <text class="current-email">{{ currentEmail }}</text>
          </view>

          <view class="form-group">
            <text class="form-label">{{$t('dashboard.account.email.new')}}</text>
            <input class="form-input" type="email" v-model="accountSettings.email" :placeholder="$t('dashboard.account.email.new')" />
          </view>

          <button class="save-btn" @click="changeEmail">{{$t('dashboard.account.email.change')}}</button>
        </view>

        <!-- Password Section -->
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.account.password.title')}}</text>
          <text class="section-description">{{$t('dashboard.account.password.description')}}</text>

          <view class="form-group">
            <text class="form-label">{{$t('dashboard.account.password.new')}}</text>
            <input class="form-input" type="password" v-model="accountSettings.newPassword"
              :placeholder="$t('dashboard.account.password.new')" />
          </view>

          <view class="form-group">
            <text class="form-label">{{$t('dashboard.account.password.repeat')}}</text>
            <input class="form-input" type="password" v-model="accountSettings.confirmPassword"
              placeholder="********" />
          </view>

          <view class="password-strength" v-if="accountSettings.newPassword">
            <view class="strength-bar">
              <view class="strength-indicator" :style="{ width: passwordStrength + '%' }"></view>
            </view>
            <text class="strength-text">{{$t('dashboard.account.password.strengthLabel')}} {{ passwordStrengthText }}</text>
          </view>

          <button class="save-btn" @click="changePassword">{{$t('dashboard.account.password.change')}}</button>
        </view>

        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.account.changeAccount.title')}}</text>
          <text class="section-description">{{$t('dashboard.account.changeAccount.description')}}</text>
          <button class="logout-btn" @click="changeAccount">{{$t('dashboard.account.changeAccount.button')}}</button>
        </view>
        <!-- Logout Section -->
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.account.logout.title')}}</text>
          <text class="section-description">{{$t('dashboard.account.logout.description')}}</text>
          <button class="logout-btn" @click="logout">{{$t('dashboard.account.logout.button')}}</button>
        </view>
      </view>

      <!-- Settings Content (placeholder for future implementation) -->
      <view v-if="activeNavItem === 'settings'" class="settings-content">
        <view class="header">
          <text class="title">{{$t('dashboard.settings.title')}}</text>
        </view>
        <text>{{$t('dashboard.settings.placeholder')}}</text>
      </view>

      <!-- Delete Projects Content -->
      <view v-if="activeNavItem === 'delete'" class="settings-content">
        <view class="header">
          <text class="title">{{$t('dashboard.delete.title')}}</text>
          <view class="header-actions" v-if="userProjects && userProjects.length > 0">
            <button class="select-all-btn" @click="toggleSelectAll">
              {{ selectedProjects.length === userProjects.length ? $t('dashboard.delete.deselectAll') : $t('dashboard.delete.selectAll') }}
            </button>
            <button 
              class="delete-selected-btn" 
              :disabled="selectedProjects.length === 0"
              @click="confirmDeleteSelectedProjects"
            >
              {{$t('dashboard.delete.deleteSelected')}} ({{ selectedProjects.length }})
            </button>
          </view>
        </view>
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.delete.sectionTitle')}}</text>
          <text class="section-description">{{$t('dashboard.delete.sectionDescription')}}</text>

          <!-- Loading state -->
          <view v-if="deleteProjectsLoading" class="loading-container">
            <text class="loading-text">{{$t('dashboard.delete.loading')}}</text>
          </view>

          <!-- No projects state -->
          <view v-else-if="!userProjects || userProjects.length === 0" class="no-projects-container">
            <text class="no-projects-text">{{$t('dashboard.delete.noProjects')}}</text>
          </view>

          <!-- Projects list -->
          <view v-else class="delete-projects-list">
            <view 
              v-for="(project, index) in userProjects" 
              :key="project._id" 
              class="delete-project-item"
              :class="{ 'selected': isProjectSelected(project._id) }"
              @click="toggleProjectSelection(project._id)"
            >
              <view class="project-checkbox">
                <view class="checkbox" :class="{ 'checked': isProjectSelected(project._id) }">
                  <text v-if="isProjectSelected(project._id)" class="checkbox-icon">✓</text>
                </view>
              </view>
              <view class="project-info">
                <text class="project-name">{{ project.projectTitle }}</text>
                <text class="project-desc">{{ project.projectDescription }}</text>
              </view>
              <button class="delete-project-btn" @click.stop="confirmDeleteProject(project)">{{$t('dashboard.delete.deleteBtn')}}</button>
            </view>
          </view>
        </view>
      </view>

      <!-- Public Share Content -->
      <view v-if="activeNavItem === 'publicShare'" class="settings-content">
        <view class="header">
          <text class="title">{{$t('dashboard.publicShare.title')}}</text>
          <view class="user-actions">
            <image class="refresh-icon" src="../../static/refresh.png" @click="loadSharedProjects"></image>
          </view>
        </view>

        <view class="projects-grid">
          <!-- Loading state -->
          <view v-if="sharedProjectsLoading" class="loading-container">
            <text class="loading-text">{{$t('dashboard.publicShare.loading')}}</text>
          </view>

          <!-- No shared projects state -->
          <view v-else-if="!sharedProjects || sharedProjects.length === 0" class="no-projects-container">
            <text class="no-projects-text">{{$t('dashboard.publicShare.noProjects')}}</text>
          </view>

          <!-- Shared Projects -->
          <template v-else>
            <x-skeleton v-for="(project, index) in sharedProjects" :key="'shared-project-' + index" type="banner"
              :loading="sharedProjectsLoading">
              <view class="project-card" @click="jumpToDesign(project)">
                <image class="project-image"
                  :src="project.projectPreviewImage || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png'"
                  mode="aspectFill">
                </image>
                <view class="project-content">
                  <text class="project-title">{{ project.projectTitle }}</text>
                  <text class="project-description">{{ project.projectDescription }}</text>
                </view>
              </view>
            </x-skeleton>
          </template>
        </view>
      </view>

      <!-- Share Content (Import HTML in main area) -->
      <view v-if="activeNavItem === 'share'" class="settings-content">
        <view class="header">
          <text class="title">{{$t('dashboard.share.title')}}</text>
        </view>
        <view class="settings-section">
          <text class="section-title">{{$t('dashboard.share.sectionTitle')}}</text>
          <text class="section-description">{{$t('dashboard.share.sectionDescription')}}</text>

          <!-- Replaced basic input with design page's HTML file picker -->
          <view class="file-upload-container">
            <view class="html-file-picker">
              <view class="upload-placeholder" @click="chooseHtmlFile">
                <view class="upload-icon">
                  <view class="folder-icon">
                    <view class="folder-body"></view>
                    <view class="folder-tab"></view>
                  </view>
                  <view class="upload-arrow">↑</view>
                </view>
                <text class="upload-text">{{$t('dashboard.share.uploadText')}}</text>
                <text class="upload-hint">{{$t('dashboard.share.uploadHint')}}</text>
              </view>
              <view v-if="htmlFiles && htmlFiles.length" class="html-file-info">
                <text class="file-info-text">{{ htmlFiles.length }} {{$t('dashboard.share.filesLoaded')}}</text>
                <view v-for="(f, i) in htmlFiles" :key="i" class="file-list-item">
                  <view class="file-list-item-header">
                    <text class="file-info-text">- {{ f.name }}</text>
                    <button class="remove-file-btn" @click.stop="removeHtmlFile(i)">Delete</button>
                  </view>
                  <!-- <text class="file-content-preview">{{ f.content.substring(0, 100) }}...</text> -->
                </view>
              </view>
            </view>
          </view>

          <view v-if="!isImporting">
            <button class="save-btn" :disabled="!htmlFiles.length" @click="startHtmlImport">Import</button>
          </view>
          <view v-else class="password-strength">
            <view class="progress-bar">
              <view class="progress-indicator" :style="{ width: importProgress + '%' }"></view>
            </view>
            <text class="strength-text">{{ importProgress }}%</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Delete Confirmation Dialog -->
    <view class="dialog-overlay" v-if="showDeleteDialog" @click="closeDeleteDialog">
      <view class="dialog-container delete-dialog" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">{{$t('dashboard.delete.confirmTitle')}}</text>
          <text class="delete-warning" v-if="!isMultipleDelete">
            {{$t('dashboard.delete.confirmSingle')}}
          </text>
          <text class="delete-warning" v-else>
            {{$t('dashboard.delete.confirmMultiple').replace('{count}', projectsToDelete.length)}}
          </text>
          
          <!-- Single project delete -->
          <view class="project-to-delete" v-if="projectToDelete && !isMultipleDelete">
            <text class="project-name-highlight">{{ projectToDelete.projectTitle }}</text>
            <text class="project-desc-highlight">{{ projectToDelete.projectDescription }}</text>
          </view>
          
          <!-- Multiple projects delete -->
          <view class="projects-to-delete-list" v-if="isMultipleDelete">
            <view 
              v-for="project in projectsToDelete" 
              :key="project._id" 
              class="project-to-delete-item"
            >
              <text class="project-name-highlight">{{ project.projectTitle }}</text>
              <text class="project-desc-highlight">{{ project.projectDescription }}</text>
            </view>
          </view>
          
          <view class="delete-dialog-actions">
            <button class="cancel-btn" @click="closeDeleteDialog">{{$t('dashboard.delete.cancel')}}</button>
            <button class="confirm-delete-btn" @click="deleteProjects" :disabled="isDeletingProject">
              {{ isDeletingProject ? $t('dashboard.delete.deleting') : $t('dashboard.delete.deleteBtn') }}
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- Create Project Dialog -->
    <view class="dialog-overlay" v-if="showCreateProjectDialog" @click="closeCreateProjectDialog">
      <view class="dialog-container" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">{{$t('dashboard.createProject.title')}}</text>

          <!-- Error notification -->
          <view class="error-notification" v-if="errorMessage">
            <text>{{ errorMessage }}</text>
          </view>

          <view class="device-options">
            <view class="device-option" :class="{ 'selected': selectedDevice === 'mobile' }"
              @click="selectDevice('mobile')">
              <image class="device-icon" src="../../static/mobile.png"></image>
              <text>{{$t('dashboard.createProject.mobile')}}</text>
            </view>

            <view class="device-option" :class="{ 'selected': selectedDevice === 'desktop' }"
              @click="selectDevice('desktop')">
              <image class="device-icon" src="../../static/desktop.png"></image>
              <text>{{$t('dashboard.createProject.desktop')}}</text>
            </view>
          </view>

          <!-- Model Selection -->
          <view class="model-selection-container">
            <text class="model-selection-label">{{$t('dashboard.createProject.selectModel')}}</text>
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
          
          <div class="description-container-overall">
          <view class="try-example-container">
            <text class="description-label">{{$t('dashboard.createProject.describeLabel')}}</text>
            <view class="button-group">
              <button class="try-example-btn" @click="tryExample">{{$t('dashboard.createProject.tryExample')}}</button>
              <button class="try-example-btn" :disabled="!projectDescription || isOptimizingPrompt" @click="optimizeProjectDescription">{{ isOptimizingPrompt ? $t('dashboard.createProject.optimizing') : $t('dashboard.createProject.improveWithAI') }}</button>
            </view>
          </view>
          <view class="description-container">
            <textarea class="project-description-input" :placeholder="$t('dashboard.createProject.placeholder')"
              v-model="projectDescription" maxlength="50000"></textarea>
            <text class="char-count">{{ projectDescription.length }}/50000</text>
          </view>
          </div>

          <!-- Number of Pages Selector -->
          <!-- <view class="pages-selector-container">
            <text class="pages-selector-label">Number of Pages: {{ numPages }}</text>
            <slider class="pages-selector" min="1" max="7" step="1" show-value 
              :value="numPages" @change="onNumPagesChange" />
          </view> -->

          <button class="continue-btn" @click="createProject">{{$t('dashboard.createProject.continue')}}</button>
        </view>
      </view>
    </view>

    <!-- Import File Dialog -->
    <view class="dialog-overlay" v-if="showImportDialog" @click="closeImportDialog">
      <view class="dialog-container import-dialog" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">{{ $t('design.import.title') }}</text>

          <!-- Error notification -->
          <view class="error-notification" v-if="importError">
            <text>{{ importError }}</text>
          </view>

          <!-- Import type tabs -->
          <view class="import-type-tabs">
            <view v-for="type in importTypeOptions" :key="type.value" class="import-type-tab"
              :class="{ active: selectedImportType === type.value }" @click="selectImportType(type.value)">
              {{ $t('design.import.type.' + type.value) }}
            </view>
          </view>

          <view class="import-description">
            <text>{{ $t('design.import.description.' + selectedImportType) }}</text>
          </view>

          <view class="file-upload-container">
            <!-- HTML file picker -->
            <view v-if="selectedImportType === 'html'" class="html-file-picker">
              <view class="upload-placeholder" @click="chooseHtmlFile">
                <view class="upload-icon">
                  <view class="folder-icon">
                    <view class="folder-body"></view>
                    <view class="folder-tab"></view>
                  </view>
                  <view class="upload-arrow">↑</view>
                </view>
                <text class="upload-text">{{ $t('design.upload.clickToSelectHtmlFile') }}</text>
                <text class="upload-hint">{{ $t('design.upload.allowedHtml') }}</text>
              </view>
              <view v-if="htmlFiles && htmlFiles.length" class="html-file-info">
                <text class="file-info-text">{{ $t('design.import.htmlFilesCountLoaded', { count: htmlFiles.length }) }}</text>
                <view v-for="(f, i) in htmlFiles" :key="i" class="file-list-item">
                  <view class="file-list-item-header">
                    <text class="file-info-text">- {{ f.name }}</text>
                    <button class="remove-file-btn" @click.stop="removeHtmlFile(i)">{{ $t('common.delete') }}</button>
                  </view>
                </view>
              </view>
            </view>

            <!-- Regular file picker for other types -->
            <uni-file-picker v-else v-model="importFileList" fileMediatype="all" mode="grid"
              :limit="selectedImportType === 'image' ? 10 : 1" :file-extname="allowedExtensions"
              @success="successUploadFiles" @delete="onImportFileDelete">
              <view class="upload-placeholder">
                <view class="upload-icon">
                  <view class="folder-icon">
                    <view class="folder-body"></view>
                    <view class="folder-tab"></view>
                  </view>
                  <view class="upload-arrow">↑</view>
                </view>
                <text class="upload-text">{{ selectedImportType === 'image' ? $t('design.upload.clickToSelectImages') :
                  $t('design.upload.clickToSelectFile') }}</text>
                <text class="upload-hint">{{ $t('design.upload.allowedFormats', {
                  formats: allowedExtensions.join(', ')
                }) }}</text>
              </view>
            </uni-file-picker>
          </view>

          <view class="import-actions">
            <button class="import-btn"
              :disabled="selectedImportType === 'html' ? (htmlFiles.length === 0) : !importFileList.length"
              @click="importProject">
              {{ $t('common.import') }}
            </button>
            <button class="cancel-btn" @click="closeImportDialog">{{ $t('common.cancel') }}</button>
          </view>
        </view>
      </view>
    </view>

    <!-- Import Progress Overlay -->
    <view v-if="isImporting" class="progress-overlay">
      <view class="progress-container">
        <text class="progress-title">{{ $t('design.progress.importingFiles') }}</text>
        <view class="progress-bar-container">
          <view class="progress-bar" :style="{ width: importProgress + '%' }"></view>
        </view>
        <text class="progress-percentage">{{ Math.floor(importProgress) }}%</text>
        <text class="progress-message">{{ $t('design.progress.processingFiles') }}</text>
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

    <!-- Custom Toast Overlay -->
    <view class="toast-overlay" v-if="customToastVisible" @click="customToastVisible = false">
      <view class="custom-toast" @click.stop>
        <image class="device-icon" :src="customToastType === 'success' ? '../../static/success.png' : '../../static/skip.png'"></image>
        <text class="custom-toast-message">{{ customToastMessage }}</text>
      </view>
    </view>

    <!-- Longze Guide Component -->
    <longze-guide
      ref="guide"
      :steps="guideSteps"
      :theme="guideTheme"
      :primaryColor="'#e53935'"
      :primaryHoverColor="'#d32f2f'"
      :highlightColor="'#e53935'"
      :skip-enabled="true"
      @complete="onGuideComplete"
      @skip="onGuideSkip"
      @step-change="onGuideStepChange"
    />

    <!-- Membership Component -->
    <Membership v-if="activeNavItem === 'membership'" />

    <!-- Invite Code Component -->
    <InviteCode v-if="activeNavItem === 'inviteCode'" />
  </view>
</template>

<script>
import { API_BASE_URL } from '../../env.js';
import Membership from './membership.vue';
import InviteCode from './inviteCode.vue';

export default {
  name: 'Dashboard',
  components: {
    Membership,
    InviteCode
  },
  data() {
    return {
      activeNavItem: 'dashboard',
      showCreateProjectDialog: false,
      selectedDevice: 'desktop',
      projectDescription: '',
      numPages: 1,
      exampleDescription: 'Generate a women clothing Shopify store.',
      errorMessage: '',
      projectLoadingStates: {
        alpha: true,
        beta: true,
        gamma: true
      },
      networkErrorVisible: false,
      networkErrorMessage: '',
      customToastVisible: false,
      customToastMessage: '',
      customToastType: 'success',
      userProjects: [],
      userProjectsLoading: false,
      userInfo: uni.getStorageSync('googleUserInfo'),
      accountSettings: {
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        photoUrl: ''
      },
      currentEmail: uni.getStorageSync('email') || '',
      passwordStrength: 0,
      passwordStrengthText: '',
      // Model selection
      modelOptions: [
        { value: 'google/gemini-3.1-pro-preview', text: 'google/gemini3.1', isPro: true },
        { value: 'anthropic/claude-opus-4.6', text: 'anthropic/claude-opus-4.6', isPro: true },
        { value: 'xiaomi/mimo-v2-flash', text: 'xiaomi/mimo-v2-flash', isPro: true },
        { value: 'deepseek/deepseek-v3.2', text: 'deepseek/deepseek-v3.2', isPro: true },
        { value: 'anthropic/claude-opus-4.5', text: 'anthropic/claude-opus-4.5', isPro: true },
        { value: 'qwen/qwen3-coder', text: 'qwen/qwen3-coder', isPro: true },
        { value: 'deepseek/deepseek-chat-v3-0324', text: 'deepseek/deepseek-chat-v3-0324', isPro: true },
        { value: 'openai/gpt-oss-120b', text: 'openai/gpt-oss-120b', isPro: true },
        { value: 'x-ai/grok-code-fast-1', text: 'x-ai/grok-code-fast-1', isPro: true },
        { value: 'minimax/minimax-m2', text: 'minimax/minimax-m2', isPro: true },
        { value: 'z-ai/glm-4.7', text: 'z-ai/glm-4.7', isPro: true },
        { value: 'mistralai/devstral-2512:free', text: 'mistralai/devstral-2512:free', isPro: false },
        { value: 'google/gemma-3-27b-it:free', text: 'google/gemma-3-27b-it:free', isPro: false },
        { value: 'uigenius5:latest', text: 'uigenius/uigenius5:latest', isPro: false }
      ],
      selectedModel: 'google/gemini-3.1-pro-preview',
      showModelDropdown: false,
      // Longze Guide
      guideTheme: 'dark',
      prevGuideStepIndex: -1,
      // Import / Share state
      isImporting: false,
      importProgress: 0,
      htmlFiles: [],
      htmlFileContent: '',
      htmlFileName: '',
      isOptimizingPrompt: false,
      showImportDialog: false,
      importFileList: [],
      importError: '',
      selectedImportType: 'image',
      // Delete projects state
      deleteProjectsLoading: false,
      showDeleteDialog: false,
      projectToDelete: null,
      isDeletingProject: false,
      selectedProjects: [], // Array of selected project IDs
      isMultipleDelete: false, // Flag for multiple delete
      projectsToDelete: [], // Array of projects to delete
      currentUserId: uni.getStorageSync('uid'), // Track current user ID to detect account changes
      // Public share state
      sharedProjects: [],
      sharedProjectsLoading: false,
    }
  },
  computed: {
    guideSteps() {
      return [
        {
          target: '.create-project-btn',
          title: this.$t('dashboard.guide.step1.title'),
          content: this.$t('dashboard.guide.step1.content'),
          position: 'bottom'
        },
        {
          target: '.device-options',
          title: this.$t('dashboard.guide.step2.title'),
          content: this.$t('dashboard.guide.step2.content'),
          position: 'right'
        },
        {
          target: '.model-selection-container',
          title: this.$t('dashboard.guide.step3.title'),
          content: this.$t('dashboard.guide.step3.content'),
          position: 'right'
        },
        {
          target: '.description-container-overall',
          title: this.$t('dashboard.guide.step4.title'),
          content: this.$t('dashboard.guide.step4.content'),
          position: 'right'
        },
        {
          target: '.continue-btn',
          title: this.$t('dashboard.guide.step5.title'),
          content: this.$t('dashboard.guide.step5.content'),
          position: 'right'
        }
      ];
    },
    importTypeOptions() {
      return [
        { value: 'image', label: this.$t('design.import.type.image') },
        { value: 'html', label: this.$t('design.import.type.html') }
      ];
    },
    allowedExtensions() {
      switch (this.selectedImportType) {
        case 'image':
          return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
        case 'html':
          return ['html', 'htm'];
        default:
          return ['*'];
      }
    }
  },
  watch: {
    'accountSettings.newPassword': function (newVal) {
      this.updatePasswordStrength();
    }
  },
  onLoad(options) {
    this.checkAndStartGuide();
    
    // Check if payment return parameters exist
    if (options && (options.checkout_id || options.order_id || options.signature)) {
      this.verifyCreemPayment(options);
    }
  },
  onShow() {
    // Pick up desired nav from storage when returning to tab
    try {
      const nav = uni.getStorageSync('dashboardNavItem');
      if (nav) {
        this.setActiveNavItem(nav);
        uni.removeStorageSync('dashboardNavItem');
      }
      
      const ifLoadProjectsByUidWhenUserBackToDashboard = uni.getStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard');
      if (ifLoadProjectsByUidWhenUserBackToDashboard) {
        this.loadProjectsByUid();
        uni.removeStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard');
      }
      
      // Refresh account settings and email when returning to dashboard
      // This ensures the email is updated after login/account change
      this.initializeAccountSettings();
    } catch (e) {}

  },
  mounted() {
    // Load saved language preference
    //this.loadSavedLanguage();
    
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
  },
  
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    // Load saved language preference from storage
    // loadSavedLanguage() {
    //   try {
    //     const savedLocale = uni.getStorageSync('appLocale');
    //     if (savedLocale) {
    //       uni.setLocale(savedLocale);
    //       // Also update i18n locale if available
    //       if (this.$i18n) {
    //         this.$i18n.locale = savedLocale;
    //       }
    //       console.log('Dashboard: Loaded saved locale:', savedLocale);
    //     } else {
    //       // Get current locale from uni-app
    //       const currentLocale = uni.getLocale();
    //       console.log('Dashboard: Using current locale:', currentLocale);
    //     }
    //   } catch (error) {
    //     console.error('Dashboard: Error loading saved language:', error);
    //   }
    // },
    
    checkAndStartGuide() {
      const hasGuideShown = uni.getStorageSync('hasUserGuideShown'); // 或 localStorage.getItem('hasUserGuideShown')
      if (!hasGuideShown) {
        setTimeout(() => {
          this.startGuide(); 
          uni.setStorageSync('hasUserGuideShown', true); 
        }, 1000); 
      }
    },
    // Initialize account settings from stored user info
    initializeAccountSettings() {
      const userInfo = uni.getStorageSync('googleUserInfo') || {};
      this.accountSettings.firstName = userInfo.given_name || '';
      this.accountSettings.lastName = userInfo.family_name || '';
      // Keep email field empty for new email input
      this.accountSettings.email = '';
      this.accountSettings.photoUrl = userInfo.picture || userInfo.avatar || '';
      
      // Update currentEmail from storage to reflect the current logged-in user
      this.currentEmail = uni.getStorageSync('email') || userInfo.email || '';
      
      // Update userInfo to reflect current user
      this.userInfo = userInfo;
    },
    refreshProjects() {
      // Reset all project loading states
      this.projectLoadingStates.alpha = true;
      this.projectLoadingStates.beta = true;
      this.projectLoadingStates.gamma = true;
      this.userProjectsLoading = true;

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
    async loadSharedProjects() {
      this.sharedProjectsLoading = true;
      
      try {
        // Call cloud function to get all shared projects
        const result = await uniCloud.callFunction({
          name: 'user-project',
          data: {
            action: 'readSharedProject'
          }
        });

        if (result.result.success) {
          this.sharedProjects = result.result.data || [];
          console.log('Shared projects loaded:', this.sharedProjects);
        } else {
          console.error('Failed to load shared projects:', result.result.message);
          uni.showToast({
            title: this.$t('dashboard.publicShare.loadError'),
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Error loading shared projects:', error);
        uni.showToast({
          title: this.$t('dashboard.publicShare.loadError'),
          icon: 'none'
        });
      } finally {
        this.sharedProjectsLoading = false;
      }
    },
    setActiveNavItem(item) {
      this.activeNavItem = item;

      // Refresh projects when switching to dashboard if account has changed
      if (item === 'dashboard') {
        const newUserId = uni.getStorageSync('uid');
        if (newUserId && newUserId !== this.currentUserId) {
          // Account has changed, refresh projects
          this.currentUserId = newUserId;
          this.refreshProjects();
        }
      }
      
      // Refresh account settings when switching to account tab
      // This ensures email and other info are up-to-date
      if (item === 'account') {
        this.initializeAccountSettings();
      }

      // Load shared projects when switching to publicShare tab
      if (item === 'publicShare') {
        this.loadSharedProjects();
      }
    },
    jumpToDesign(project) {
      // If no project is provided (for example projects), clear any stored project data
      // and navigate to design page to show template previews
      if (!project) {
        // Clear stored project data to ensure template previews are shown
        uni.removeStorageSync('latest_7_overall_page');
        uni.removeStorageSync('currentProjectId');
        uni.removeStorageSync('shouldGenerateUI');
        
        uni.switchTab({
          url: '/pages/design/design'
        });
        return;
      }
      
      // Get the project id
      const projectId = project._id;
      uni.setStorageSync('currentProjectId', projectId);
      
      if (!projectId) {
        uni.showToast({
          title: 'Invalid project',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({
        title: this.$t('dashboard.loading.projectData')
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
          uni.setStorageSync('latest_7_overall_page', JSON.stringify(res.result.data));
          uni.setStorageSync('currentProjectId', projectId);
          
          // Navigate to design page
          uni.switchTab({
            url: '/pages/design/design'
          });
          
          // Fetch project metadata including theme color in the background
          uniCloud.callFunction({
            name: 'user-project',
            data: {
              action: 'readThemeColour',
              id: projectId
            }
          }).then(res => {
            if (res.result && res.result.success && res.result.data) {
              // console.log('Theme color for project', res.result.data);
              const themeColour = res.result.data.themeColour;
              
              // Load theme color if it exists
              if (themeColour && Array.isArray(themeColour) && themeColour.length > 0) {
                uni.setStorageSync('colorCard', JSON.stringify(themeColour));
              } else {
                // Clear colorCard if no theme color exists
                uni.removeStorageSync('colorCard');
              }
            }
          }).catch(err => {
            console.error('Failed to load theme color:', err);
          });
        } else {
          uni.hideLoading();
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
    openImportDialog() {
      this.setActiveNavItem('dashboard');
      this.showImportDialog = true;
      this.importError = '';
    },
    closeImportDialog() {
      this.showImportDialog = false;
      this.importFileList = [];
      this.htmlFileContent = '';
      this.htmlFileName = '';
      this.htmlFiles = [];
      this.importError = '';
      this.selectedImportType = 'image';
    },
    selectImportType(type) {
      this.selectedImportType = type;
      this.importFileList = [];
      this.htmlFileContent = '';
      this.htmlFileName = '';
      this.htmlFiles = [];
      this.importError = '';
    },
    onImportFileDelete(e) {
      if (e && e.index !== undefined) {
        this.importFileList.splice(e.index, 1);
      } else if (e && e.tempFilePaths) {
        const deletedPaths = Array.isArray(e.tempFilePaths) ? e.tempFilePaths : [e.tempFilePaths];
        this.importFileList = this.importFileList.filter(item => {
          const itemPath = item.path || item.url || item.name;
          return !deletedPaths.includes(itemPath);
        });
      } else {
        this.importFileList = [];
      }
    },
    selectDevice(device) {
      this.selectedDevice = device;
      this.errorMessage = '';
    },
    tryExample() {
      this.projectDescription = this.exampleDescription;
    },
    optimizeProjectDescription() {
      if (!this.projectDescription || this.isOptimizingPrompt) return;
      this.isOptimizingPrompt = true;
      uni.showToast({ title: 'Optimizing...', icon: 'none', duration: 1500 });
      uni.request({
        url: `${API_BASE_URL}/optimize-prompt`,
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: {
          description: this.projectDescription,
          model: this.selectedModel || 'gemini2.5'
        },
        timeout: 120000,
        success: (res) => {
          try {
            const data = res && res.data ? res.data : {};
            const optimized = data.optimized_description  || '';
            if (typeof optimized === 'string' && optimized.trim().length > 0) {
              this.projectDescription = optimized.trim();
              uni.showToast({ title: 'Prompt improved', icon: 'success', duration: 1500 });
            } else {
              uni.showToast({ title: 'No optimized prompt returned', icon: 'none', duration: 2000 });
            }
          } catch (e) {
            uni.showToast({ title: 'Optimize failed', icon: 'none', duration: 2000 });
          }
        },
        fail: (err) => {
          uni.showToast({ title: `Optimize error: ${err.errMsg || 'Request failed'}`, icon: 'none', duration: 2500 });
        },
        complete: () => {
          this.isOptimizingPrompt = false;
        }
      });
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
            setTimeout(() => reject(new Error('Timeout')), 5000)
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
      // const isConnected = await checkApiConnection();
      // if (!isConnected) return;

      // If we reach here, connection is good
      // Clear all storage that stored before
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
      await uni.removeStorageSync('currentProjectId');
      await uni.removeStorageSync('colorCard');


      await uni.setStorageSync('projectDescription', this.projectDescription);
      await uni.setStorageSync('selectedDevice', this.selectedDevice);
      await uni.setStorageSync('selectedModel', this.selectedModel);
      await uni.setStorageSync('numPages', this.numPages);
      // if loadProjectsByUid
      await uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
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

    showCustomToast(message, type = 'success') {
      this.customToastMessage = message;
      this.customToastType = type;
      this.customToastVisible = true;

      // Auto-hide after 1 seconds
      setTimeout(() => {
        this.customToastVisible = false;
      }, 1000);
    },
    loadProjectsByUid() {
      // Check if user is logged in
      if (!this.checkUserLogin()) {
        this.userProjectsLoading = false;
        return;
      }

      const userId = uni.getStorageSync('uid');

      if (!userId) {
        console.log('No user ID found');
        this.userProjectsLoading = false;
        // uni.showToast({
        //   title: 'User ID not found',
        //   icon: 'none',
        //   duration: 2000
        // });
        return;
      }

      // console.log('Loading projects for user ID:', userId);

      // Set loading state
      this.userProjectsLoading = true;

      uni.showLoading({
        title: this.$t('dashboard.loading.projects')
      });
      // test mode no login,just return 
      if (userId == '123bcbfeqqaeabfaf5a') {
        uni.hideLoading();
        this.userProjectsLoading = false;
        return
      }

      // Load both user's own projects and shared projects
      Promise.all([
        // Load user's own projects
        uniCloud.callFunction({
          name: 'user-project',
          data: {
            action: 'read',
            id: userId
          }
        }),
        // Load shared projects where user has access
        uniCloud.callFunction({
          name: 'user-project',
          data: {
            action: 'readSharedProjects',
            data: {
              uid: userId
            }
          }
        })
      ]).then(results => {
        uni.hideLoading();
        this.userProjectsLoading = false;

        const ownProjectsRes = results[0];
        const sharedProjectsRes = results[1];

        let allProjects = [];

        // Process own projects
        if (ownProjectsRes.result && ownProjectsRes.result.success) {
          const ownProjects = Array.isArray(ownProjectsRes.result.data) ? ownProjectsRes.result.data : [];
          allProjects = allProjects.concat(ownProjects);
          // console.log(`Loaded ${ownProjects.length} own projects for user ID ${userId}`);
        } else {
          console.error('Failed to load own projects:', ownProjectsRes.result);
        }

        // Process shared projects
        if (sharedProjectsRes.result && sharedProjectsRes.result.success) {
          const sharedProjects = Array.isArray(sharedProjectsRes.result.data) ? sharedProjectsRes.result.data : [];
          allProjects = allProjects.concat(sharedProjects);
          // console.log(`Loaded ${sharedProjects.length} shared projects for user ID ${userId}`);
        } else {
          console.error('Failed to load shared projects:', sharedProjectsRes.result);
        }

        // Ensure userProjects is always an array
        this.userProjects = allProjects;
        // console.log(`Total ${this.userProjects.length} projects loaded (own + shared)`);

        // Update the project grid with user projects
        this.updateProjectGrid();
      }).catch(err => {
        uni.hideLoading();
        this.userProjectsLoading = false;
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

    async verifyCreemPayment(paymentParams) {
      // navigate to the membership item
      this.setActiveNavItem('membership');
      // Get user ID from storage
      const uid = uni.getStorageSync('uid');
      if (!uid) {
        console.log('No user ID found for payment verification');
        return;
      }

      try {
        uni.showLoading({
          title: this.$t('dashboard.loading.verifyingPayment')
        });

        // Call the checkMembership cloud function with verifyCreemSignature action
        const result = await uniCloud.callFunction({
          name: 'checkMembership',
          data: {
            action: 'verifyCreemSignature',
            uid: uid,
            checkout_id: paymentParams.checkout_id || '',
            order_id: paymentParams.order_id || '',
            customer_id: paymentParams.customer_id || '',
            subscription_id: paymentParams.subscription_id || '',
            product_id: paymentParams.product_id || '',
            request_id: paymentParams.request_id || '',
            signature: paymentParams.signature || ''
          }
        });

        uni.hideLoading();

        if (result.result && result.result.success) {
          // Payment verified successfully
          uni.showToast({
            title: 'Congratulations! Membership activated.',
            icon: 'success',
            duration: 2000
          });
          // console.log('Payment verification successful:', result.result.data);
          
          // Reload projects to reflect membership changes
          // this.setActiveNavItem('dashboard');
        } else {
          // Payment verification failed
          uni.showToast({
            title: result.result?.message || 'Payment verification failed',
            icon: 'none',
            duration: 2000
          });
          // console.error('Payment verification failed:', result.result);
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error verifying payment',
          icon: 'none',
          duration: 2000
        });
        // console.error('Payment verification error:', error);
      }
    },

    updateProjectGrid() {
      this.projectLoadingStates.alpha = false;
      this.projectLoadingStates.beta = false;
      this.projectLoadingStates.gamma = false;
      this.userProjects.forEach((project, index) => {
        this.projectLoadingStates[`user-project-${index}`] = false;
      });
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
        title: this.$t('dashboard.loading.savingChanges')
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
        title: this.$t('dashboard.loading.updatingEmail')
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
          uni.setStorageSync('email', this.accountSettings.email);

          // Update the current userInfo object
          this.userInfo = userInfo;
          
          // Update the currentEmail to reflect the new email
          this.currentEmail = this.accountSettings.email;

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
        title: this.$t('dashboard.loading.updatingPassword')
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
        title: this.$t('dashboard.loading.loggingOut')
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
        uni.removeStorageSync('email')
        uni.removeStorageSync('latest_7_overall_page');
        uni.removeStorageSync('currentProjectId');

        // Hide loading and show success message
        uni.hideLoading();
        uni.showToast({
          title: this.$t('dashboard.account.logout.success'),
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
    changeAccount() {      
      uni.removeStorageSync('googleUserInfo');
      uni.removeStorageSync('uid');
      uni.removeStorageSync('token');
      uni.removeStorageSync('tokenExpiration');
      uni.removeStorageSync('email')
      uni.removeStorageSync('googleToken');
      uni.removeStorageSync('googleTokenExpiration');
      uni.removeStorageSync('googleUid');

      uni.removeStorageSync('latest_7_overall_page');
      uni.removeStorageSync('currentProjectId');
      
      // Clear user projects from the component state
      this.userProjects = [];
      
      uni.navigateTo({
        url: '/pages/login/login'
      });
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
            title: this.$t('dashboard.loading.uploadingPhoto')
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
              // console.log('Upload progress:', progressEvent);
            },
            success: (uploadRes) => {
              // console.log('Upload success:', uploadRes);
              
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
      // console.log('Selected model:', this.selectedModel);
    },
    
    // Custom dropdown methods
    toggleModelDropdown() {
      this.showModelDropdown = !this.showModelDropdown;
    },
    
    selectModel(value) {
      this.selectedModel = value;
      this.showModelDropdown = false;
      // console.log('Selected model:', this.selectedModel);
    },
    
    getSelectedModelText() {
      const selectedOption = this.modelOptions.find(option => option.value === this.selectedModel);
      return selectedOption ? selectedOption.text : this.$t('dashboard.createProject.selectModelPlaceholder');
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
    
    // Longze Guide methods
    startGuide() {
      const guide = this.$refs.guide;
      if (guide) {
        guide.start();
      }
    },

    onGuideComplete() {
      this.showCustomToast(this.$t('dashboard.guide.complete'), 'success');
    },

    onGuideSkip() {
      this.showCustomToast(this.$t('dashboard.guide.skip'), 'none');
    },
    onGuideStepChange(index) {
      const previousIndex = this.prevGuideStepIndex;
      this.prevGuideStepIndex = index;

      const shouldShowCreateProjectDialog = index >= 1;
      if (shouldShowCreateProjectDialog && !this.showCreateProjectDialog) {
        this.openCreateProjectDialog();
      }
      if (!shouldShowCreateProjectDialog && this.showCreateProjectDialog) {
        this.closeCreateProjectDialog();
      }

      // Only run side-effect actions when moving forward.
      if (previousIndex !== -1 && index <= previousIndex) {
        return;
      }

      if (index === 2) {
        this.selectDevice('desktop');
      }
      else if (index === 3) {
        this.selectModel('gemini2.5')
      }
      else if (index === 4) {
        this.tryExample();
      }
    },
    onHtmlFileChange(event) {
      const files = event.target && event.target.files ? Array.from(event.target.files) : [];
      if (!files.length) {
        this.htmlFiles = [];
        return;
      }
      // Read all files as text
      const readPromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ name: file.name, content: e.target.result });
          reader.readAsText(file, 'utf-8');
        });
      });
      Promise.all(readPromises).then(results => {
        this.htmlFiles = results;
      }).catch(err => {
        console.error('Error reading files:', err);
        this.htmlFiles = [];
        uni.showToast({ title: 'Failed to read selected files', icon: 'none' });
      });
    },
    startHtmlImport() {
      if (!this.htmlFiles.length) return;
      this.isImporting = true;
      this.importProgress = 0;
      const progressInterval = setInterval(() => {
        if (this.importProgress < 95) {
          this.importProgress += 5;
        }
      }, 80);
      this.handleHtmlImport(progressInterval);
    },
    handleHtmlImport(progressInterval) {
      try {
        // Stop the progress interval
        clearInterval(progressInterval);
        this.importProgress = 100;
        
        const filesToImport = (this.htmlFiles && this.htmlFiles.length)
          ? this.htmlFiles
          : (this.htmlFileContent ? [{ name: this.htmlFileName || 'Imported.html', content: this.htmlFileContent }] : []);
        if (!filesToImport.length) {
          throw new Error('No HTML files to import');
        }
        // console.log('Importing HTML files count:', filesToImport.length);
        
        const timestamp = new Date().toLocaleString();
        
        // Get existing project data
        const existingProjectData = uni.getStorageSync('latest_7_overall_page');
        let projectData;
        
        if (existingProjectData) {
          projectData = typeof existingProjectData === 'string' ? JSON.parse(existingProjectData) : existingProjectData;
        } else {
          projectData = {
            pages: [],
            AIProjectDescription: 'My Project',
            AIProjectName: 'UI Genius Project',
          };
        }
        
        // Add a new page to the project for each HTML file
        filesToImport.forEach(f => {
          const nameBase = f.name ? f.name.replace(/\.(html?|HTML?)$/, '') : 'HTML';
          const pageName = f.name ? `Imported ${nameBase}` : `Imported HTML ${timestamp}`;
          projectData.pages.push({ name: pageName, component: f.content });
        });
        
        // Save the updated project data
        const updatedProjectData = JSON.stringify(projectData);
        uni.setStorageSync('latest_7_overall_page', updatedProjectData);
        
        // Set flag to force regeneration of images
        uni.setStorageSync('force_regeneration', 'true');
        
        // Close import dialog
        setTimeout(() => {
          this.showImportDialog = false;
          this.isImporting = false;

          // Navigate to editor with the new template ID (use last page)
          const lastPage = projectData.pages[projectData.pages.length - 1];
          const newTemplateId = lastPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          uni.setStorageSync('selectedTemplateId', newTemplateId);

          // Navigate to editor (same flow as design)
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/editor/editor'
            });
          }, 200);
        }, 400);

      } catch (error) {
        console.error('Error processing HTML import:', error);
        
        // Handle error
        this.isImporting = false;
        uni.showToast({
          title: 'Failed to process HTML import: ' + error.message,
          icon: 'none',
          duration: 3000
        });
      }
    },
    // Added from design page: chooseHtmlFile and readMultipleFiles for HTML imports
    chooseHtmlFile() {
      this.htmlFileContent = '';
      this.htmlFileName = '';
      this.htmlFiles = [];
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.html';
      input.multiple = true;
      input.onchange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
          this.readMultipleFiles(files);
        }
        input.value = '';
      };
      input.click();
    },
    readMultipleFiles(files) {
      const readOne = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
        reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
        reader.readAsText(file, 'UTF-8');
      });
      Promise.all(files.map(readOne))
        .then(results => {
          const valid = results.filter(r => r.content && String(r.content).trim());
          this.htmlFiles = valid;
          if (valid.length === 0) {
            uni.showToast({ title: 'Selected files are empty', icon: 'none', duration: 2000 });
          } else {
            uni.showToast({ title: `Loaded ${valid.length} file(s)`, icon: 'success', duration: 1500 });
          }
        })
        .catch(err => {
          console.error('Error reading files:', err);
          this.htmlFiles = [];
          uni.showToast({ title: 'Failed to read selected files', icon: 'none' });
        });
    },
    removeHtmlFile(index) {
      if (!Array.isArray(this.htmlFiles)) return;
      if (index < 0 || index >= this.htmlFiles.length) return;
      this.htmlFiles.splice(index, 1);
    },
    successUploadFiles() {
      // Callback for successful file upload
    },
    async importProject() {
      if (this.selectedImportType === 'html') {
        if (!this.htmlFiles || this.htmlFiles.length === 0) {
          this.importError = this.$t('design.import.htmlFileRequired');
          return;
        }
      } else {
        if (!this.importFileList.length) {
          this.importError = this.$t('design.import.fileRequired');
          return;
        }
      }

      // Close dialog and prepare for navigation
      this.showImportDialog = false;

      // Clear existing project data
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
      await uni.removeStorageSync('currentProjectId');
      await uni.removeStorageSync('colorCard');

      // Store import data for the design page to process
      if (this.selectedImportType === 'html') {
        // Store HTML files data
        await uni.setStorageSync('pendingHtmlImport', JSON.stringify(this.htmlFiles));
        await uni.setStorageSync('shouldImportProject', 'html');
      } else {
        // Store image/other files data
        const filesData = this.importFileList.map(file => ({
          url: file.url,
        }));
        await uni.setStorageSync('pendingImportFiles', JSON.stringify(filesData));
        await uni.setStorageSync('pendingImportType', this.selectedImportType);
        await uni.setStorageSync('shouldImportProject', 'files');
      }

      // Set flag to load projects when user returns to dashboard
      await uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');

      // Set flag to indicate we should generate UI when design page loads
      await uni.setStorageSync('shouldGenerateUI', 'true');

      // Navigate to design page immediately
      uni.switchTab({
        url: '/pages/design/design'
      });
    },
    
    // Delete project methods
    confirmDeleteProject(project) {
      this.projectToDelete = project;
      this.projectsToDelete = [project];
      this.isMultipleDelete = false;
      this.showDeleteDialog = true;
    },
    
    confirmDeleteSelectedProjects() {
      if (this.selectedProjects.length === 0) return;
      
      this.projectsToDelete = this.userProjects.filter(p => 
        this.selectedProjects.includes(p._id)
      );
      this.isMultipleDelete = true;
      this.showDeleteDialog = true;
    },
    
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.projectToDelete = null;
      this.projectsToDelete = [];
      this.isMultipleDelete = false;
      this.isDeletingProject = false;
    },
    
    async deleteProjects() {
      if ((this.projectsToDelete.length === 0) || this.isDeletingProject) return;
      
      this.isDeletingProject = true;
      const projectIds = this.projectsToDelete.map(p => p._id);
      const totalProjects = projectIds.length;
      const currentProjectId = uni.getStorageSync('currentProjectId');
      const uid = uni.getStorageSync('uid');
      
      uni.showLoading({
        title: `Deleting ${totalProjects} project(s)...`
      });
      
      try {
        // Single project delete - use original delete action
        if (totalProjects === 1) {
          const res = await uniCloud.callFunction({
            name: 'user-project',
            data: {
              action: 'delete',
              id: projectIds[0],
              uid: uid
            }
          });
          
          uni.hideLoading();
          
          if (res.result && res.result.success) {
            // Remove from local array
            const index = this.userProjects.findIndex(p => p._id === projectIds[0]);
            if (index !== -1) {
              this.userProjects.splice(index, 1);
            }
            
            // If the deleted project is the current project, clear it
            if (currentProjectId === projectIds[0]) {
              uni.removeStorageSync('currentProjectId');
              uni.removeStorageSync('latest_7_overall_page');
            }
            
            // Clear selection
            this.selectedProjects = [];
            
            // Close dialog
            this.closeDeleteDialog();
            
            this.showCustomToast('Project deleted successfully', 'success');
          } else {
            uni.showToast({
              title: res.result.message || 'Failed to delete project',
              icon: 'none',
              duration: 2000
            });
          }
        } 
        // Multiple projects delete - use batch delete action
        else {
          const res = await uniCloud.callFunction({
            name: 'user-project',
            data: {
              action: 'batchDelete',
              projectIds: projectIds,
              uid: uid
            }
          });
          
          uni.hideLoading();
          
          if (res.result && res.result.data) {
            const { successCount, failCount, deleteResults } = res.result.data;
            
            // Remove successfully deleted projects from local array
            if (deleteResults && deleteResults.length > 0) {
              deleteResults.forEach(result => {
                if (result.success) {
                  const index = this.userProjects.findIndex(p => p._id === result.projectId);
                  if (index !== -1) {
                    this.userProjects.splice(index, 1);
                  }
                  
                  // If the deleted project is the current project, clear it
                  if (currentProjectId === result.projectId) {
                    uni.removeStorageSync('currentProjectId');
                    uni.removeStorageSync('latest_7_overall_page');
                  }
                }
              });
            }
            
            // Clear selection
            this.selectedProjects = [];
            
            // Close dialog
            this.closeDeleteDialog();
            
            // Show result message
            if (failCount === 0) {
              this.showCustomToast(`Successfully deleted ${successCount} project(s)`, 'success');
            } else if (successCount === 0) {
              uni.showToast({
                title: `Failed to delete all ${failCount} project(s)`,
                icon: 'none',
                duration: 2500
              });
            } else {
              uni.showToast({
                title: `Deleted ${successCount} project(s), ${failCount} failed`,
                icon: 'none',
                duration: 2500
              });
            }
          } else {
            uni.showToast({
              title: 'Failed to delete projects',
              icon: 'none',
              duration: 2000
            });
          }
        }
      } catch (error) {
        uni.hideLoading();
        console.error('Error deleting projects:', error);
        uni.showToast({
          title: 'Error deleting projects',
          icon: 'none',
          duration: 2000
        });
      } finally {
        this.isDeletingProject = false;
      }
    },
    
    // Multi-select methods
    toggleProjectSelection(projectId) {
      const index = this.selectedProjects.indexOf(projectId);
      if (index > -1) {
        // Remove from selection
        this.selectedProjects.splice(index, 1);
      } else {
        // Add to selection
        this.selectedProjects.push(projectId);
      }
    },
    
    isProjectSelected(projectId) {
      return this.selectedProjects.includes(projectId);
    },
    
    toggleSelectAll() {
      if (this.selectedProjects.length === this.userProjects.length) {
        // Deselect all
        this.selectedProjects = [];
      } else {
        // Select all
        this.selectedProjects = this.userProjects.map(p => p._id);
      }
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

.delete-icon {
  width: 22px;
  height: 22px;
}

.dashboard-icon {
  width: 22px;
  height: 22px;
}

.refresh-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  color: #767676;
  cursor: pointer;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.refresh-icon:hover {
  transform: rotate(180deg);
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
  
  .header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
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
  align-items: center;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.try-example-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  width: auto;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #d32f2f;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #f1a9a7;
    cursor: not-allowed;
    transform: none;
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
  z-index: 2000;
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
  z-index: 2001;
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

/* Custom Toast styles */
.custom-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  background-color: #333;
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2001;
  animation: toast-in 0.15s ease-out forwards;
  pointer-events: auto;
  will-change: transform, opacity;

  .custom-toast-icon {
    font-size: 20px;
    color: #fff;
  }

  .custom-toast-message {
    color: #fff;
    font-size: 14px;
    flex: 1;
  }

  @media (max-width: 480px) {
    width: 80%;
    max-width: 300px;

    .custom-toast-message {
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

.current-email {
  display: block;
  width: 96.5%;
  padding: 12px;
  background-color: #f8f8f8;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
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
::deep(.uni-data-select) {
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

/* Progress bar for import */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0 5px;
}

.progress-indicator {
  height: 100%;
  width: 0;
  background-color: #e53935;
  transition: width 0.2s ease;
}

/* File Upload Container and Placeholder Styles (copied from design page) */
.file-upload-container {
  margin: 20px 0;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.upload-placeholder:hover {
  border-color: #e53935;
  background-color: #fff5f5;
}

.upload-icon {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.folder-icon {
  position: relative;
  width: 60px;
  height: 45px;
  margin-right: 15px;
}

.folder-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35px;
  background: linear-gradient(135deg, #9e9e9e, #757575);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.folder-tab {
  position: absolute;
  top: 0;
  left: 8px;
  width: 25px;
  height: 12px;
  background: linear-gradient(135deg, #bdbdbd, #9e9e9e);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.upload-arrow {
  font-size: 24px;
  color: #e53935;
  font-weight: bold;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

.upload-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.upload-hint {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.4;
}

.html-file-picker { width: 100%; }

.html-file-info {
  margin-top: 15px;
  padding: 15px;
  background-color: #f0f8ff;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
}

.file-info-text {
  display: block;
  font-size: 14px;
  color: #0066cc;
  font-weight: 500;
  margin-bottom: 8px;
}

.file-content-preview {
  display: block;
  font-size: 12px;
  color: #666;
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 100px;
  overflow: hidden;
}

.file-list-item { margin-top: 2px; }
.file-list-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-file-btn {
  background-color: #f5f5f5;
  color: #e53935;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
}
.remove-file-btn:hover { background-color: #ffecec; }

/* Delete Projects styles */
.select-all-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e8e8e8;
  }
}

.delete-selected-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  &:disabled {
    background-color: #ffcdd2;
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.loading-text {
  font-size: 16px;
  color: #666;
}

.no-projects-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.no-projects-text {
  font-size: 16px;
  color: #999;
}

.delete-projects-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.delete-project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &.selected {
    background-color: #fff5f5;
    border-color: #e53935;
    box-shadow: 0 2px 8px rgba(229, 57, 53, 0.15);
  }
}

.project-checkbox {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: white;
  
  &.checked {
    background-color: #e53935;
    border-color: #e53935;
  }
}

.checkbox-icon {
  color: white;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-right: 20px;
}

.project-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: block;
}

.project-desc {
  font-size: 14px;
  color: #666;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-project-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  
  &:hover {
    background-color: #d32f2f;
  }
}

/* Delete Dialog styles */
.delete-dialog {
  max-width: 500px;
}

.delete-warning {
  display: block;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.project-to-delete {
  background-color: #fff5f5;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 25px;
}

.projects-to-delete-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-to-delete-item {
  background-color: #fff5f5;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 12px 15px;
}

.project-name-highlight {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #e53935;
  margin-bottom: 5px;
}

.project-desc-highlight {
  display: block;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-dialog-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e8e8e8;
  }
}

.confirm-delete-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  &:disabled {
    background-color: #ffcdd2;
    cursor: not-allowed;
  }
}

/* Import Dialog Styles */
.import-dialog {
  max-width: 600px;
}

.import-type-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.import-type-tab {
  padding: 12px 20px;
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: #333;
  }

  &.active {
    color: #e53935;
    border-bottom-color: #e53935;
  }
}

.import-description {
  background-color: #f8f8f8;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;

  text {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    display: block;
  }
}

.import-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.import-btn {
  flex: 1;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #d32f2f;
  }

  &:disabled {
    background-color: #f1a9a7;
    cursor: not-allowed;
  }
}

.cancel-btn {
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e8e8e8;
  }
}

.html-file-picker {
  width: 100%;
}

.html-file-info {
  margin-top: 15px;
  padding: 15px;
  background-color: #f0f8ff;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
}

.file-info-text {
  display: block;
  font-size: 14px;
  color: #0066cc;
  font-weight: 500;
  margin-bottom: 8px;
}

.file-list-item {
  margin-top: 8px;
}

.file-list-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-file-btn {
  background-color: #f5f5f5;
  color: #e53935;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ffecec;
  }
}

/* Progress Overlay Styles */
.progress-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.progress-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.progress-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-bar {
  height: 100%;
  background-color: #e53935;
  transition: width 0.3s ease;
  width: 0;
}

.progress-percentage {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #e53935;
  margin-bottom: 10px;
}

.progress-message {
  display: block;
  font-size: 14px;
  color: #666;
}
</style>
