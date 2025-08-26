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

    <!-- Import Progress Bar Overlay -->
    <view v-if="isImporting" class="progress-overlay">
      <view class="progress-container">
        <text class="progress-title">Importing Files</text>
        <view class="progress-bar-container">
          <view class="progress-bar" :style="{ width: importProgress + '%' }"></view>
        </view>
        <text class="progress-percentage">{{ Math.floor(importProgress) }}%</text>
        <text class="progress-message">Processing imported files, please wait...</text>
      </view>
    </view>

    <!-- Update the color palette component -->
    <view v-if="showColorPalette" class="color-palette-overlay">
      <view class="color-palette-container">
        <text class="color-palette-title" style="display: block;">Select Theme Color For Your Project</text>

        <!-- Error message area -->
        <view v-if="colorPaletteError" class="color-palette-error">
          <text class="error-text">{{ colorPaletteError }}</text>
        </view>

        <!-- Neutral Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in neutralColors" :key="'neutral-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Pastel Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in pastelColors" :key="'pastel-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Warm Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in warmColors" :key="'warm-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Cool Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in coolColors" :key="'cool-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Custom color input -->
        <view class="color-input-container">
          <text class="color-input-label">Custom Color:</text>
          <input type="text" v-model="customColor" class="color-input" placeholder="#RRGGBB"
            @input="validateColorInput" />
          <view class="color-preview-swatch"
            :style="{ backgroundColor: isValidColor(customColor) ? customColor : '#cccccc' }"
            :class="{ 'selected': customColor && isValidColor(customColor) && !selectedColor }"></view>
        </view>

        <!-- Simplified Preview section - only button -->
        <!-- <view class="color-preview-section">
          <text class="preview-label">Preview:</text>
          <view class="preview-button" :style="{ backgroundColor: previewColor }">Button</view>
        </view> -->

        <view class="color-actions">
          <button class="color-confirm" :style="{ backgroundColor: previewColor, color: '#ffffff' }"
            @click="confirmColorSelection">Apply Theme</button>
          <button class="color-cancel" @click="cancelColorSelection">Cancel</button>
        </view>
      </view>
    </view>

    <!-- Hidden Template Previews for html2canvas -->
    <view class="hidden-templates">
      <!-- Dynamic Templates from JSON -->
      <template v-if="jsonTemplates.length > 0">
        <!-- Render all templates -->
        <view v-for="(template, index) in jsonTemplates" :key="index"
          :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')"
          class="template-preview-content">
          <view class="preview-header">
            <text class="preview-title">{{ template.name.replace(/ Page/i, '') }}</text>
          </view>
          <view class="preview-content" v-html="getSimplifiedPreview(template)"></view>
        </view>
      </template>

      <!-- Fallback Static Templates -->
      <template v-else>
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

        <!-- notification Template Preview -->
        <view id="template-notification" class="template-preview-content">
          <view class="preview-header">
            <text class="preview-title">notification</text>
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
      </template>
      
      <!-- Always include a simple template for testing -->
      <view id="template-simple" class="template-preview-content">
        <view class="preview-header">
          <text class="preview-title">Simple</text>
        </view>
        <view class="preview-content">
          <view class="preview-card"></view>
        </view>
      </view>
    </view>

    <!-- Design Toolbar -->
    <view class="design-toolbar">
      <view class="logo-container">
        <image class="logo-icon"
          src="../../static/logo.png"></image>
      </view>

      <view class="nav-links">
        <view class="nav-item" :class="{ active: activeNavItem === 'plus' }" @click="navigateTo('plus')">
          <image class="nav-icon" :src="activeNavItem === 'plus' ? '/static/plus_white.png' : '/static/plus.png'">
          </image>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'import' }" @click="navigateTo('import')">
          <image class="nav-icon" :src="activeNavItem === 'import' ? '/static/import_white.png' : '/static/import.png'">
          </image>
        </view>

        <view class="nav-item" :class="{ active: activeNavItem === 'delete' }" @click="navigateTo('delete')">
          <image class="nav-icon" :src="activeNavItem === 'delete' ? '/static/delete_white.png' : '/static/delete.png'">
          </image>
        </view>

        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'magic' }" @click="navigateTo('magic')">
          <image class="nav-icon" :src="activeNavItem === 'magic' ? '/static/magic_white.png' : '/static/magic.png'">
          </image>
        </view> -->

        <!-- <view class="nav-item" :class="{ active: activeNavItem === 'color' }" @click="navigateTo('color')">
          <image class="nav-icon" :src="activeNavItem === 'color' ? '/static/color_white.png' : '/static/color.png'">
          </image>
        </view> -->


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
        <view class="left-controls">
          <!-- <view class="device-preview">
            <image class="icon" :src="selectedDevice === 'desktop' ? '/static/desktop_active.png' : '/static/desktop.png'" @click="selectDevice('desktop')"></image>
            <image class="icon" :src="selectedDevice === 'mobile' ? '/static/mobile_active.png' : '/static/mobile.png'" @click="selectDevice('mobile')"></image>
          </view> -->

          <!-- <view class="navigation-controls">
            <image class="icon" src="/static/back.png"></image>
            <image class="icon" src="/static/forward.png"></image>
          </view> -->
        </view>

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
          <view class="device-preview">
            <!-- <image class="icon"
              :src="selectedDevice === 'desktop' ? '/static/desktop_active.png' : '/static/desktop.png'"
              @click="selectDevice('desktop')"></image>
            <image class="icon" :src="selectedDevice === 'mobile' ? '/static/mobile_active.png' : '/static/mobile.png'"
              @click="selectDevice('mobile')"></image> -->
          </view>

          <view class="separator"></view>

          <!-- <view class="tool-button">
            <text class="button-text">Comments</text>
          </view> -->
          <view class="tool-button">
            <text class="button-text" @click="shareProject">Share</text>
          </view>
          <!-- <view class="tool-button">
            <text class="button-text">Export</text>
          </view> -->

          <!-- Refresh Button -->
          <view class="tool-button" @click="refreshData">
            <text class="button-text">Refresh</text>
          </view>

          <view class="preview-button" @click="exportProject">
            <image class="icon" src="/static/export_white.png"></image>
            <text class="preview-text">Export</text>
          </view>
        </view>
      </view>

      <!-- Templates Grid -->
      <view class="section">
        <text class="section-title">Project Prototypes <span class="template-count">({{ jsonTemplates.length }} pages)</span></text>
        <view class="templates-grid-container">
          <view class="templates-grid">
          <!-- Dynamic Templates from JSON -->
          <template v-if="jsonTemplates.length > 0">
            <!-- Filter to only show the 5 main templates -->
            <x-skeleton v-for="(template, index) in filteredTemplates" :key="index" type="banner"
              :loading="templateLoadingStates[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')]">
              <view class="template-item" @click="navigateToEditor(template)">
                <view class="template-preview"
                  :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')">
                  <image class="template-image"
                    :src="capturedImages[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')] || ''"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">{{ template.name.replace(/ Page/i, '') }}</text>
                </view>
              </view>
            </x-skeleton>
            
            <!-- Add New Page Button -->
            <view class="template-item add-template-item" @click="navigateTo('plus')">
              <view class="template-preview add-template-preview">
                <view class="add-icon">+</view>
              </view>
              <view class="template-label">
                <text class="template-name">Add New Page</text>
              </view>
            </view>
          </template>

          <!-- Fallback Static Templates -->
          <template v-else>
            <!-- Signup Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.signup">
              <view class="template-item" @click="navigateToEditor('signup')">
                <view class="template-preview" id="template-signup">
                  <image class="template-image" :src="capturedImages.signup" mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Signup</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Home Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.home">
              <view class="template-item" @click="navigateToEditor('home')">
                <view class="template-preview" id="template-home">
                  <image class="template-image" :src="capturedImages.home" mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Home</text>
                </view>
              </view>
            </x-skeleton>

            <!-- notification Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.notification">
              <view class="template-item" @click="navigateToEditor('notification')">
                <view class="template-preview" id="template-notification">
                  <image class="template-image" :src="capturedImages.notification" mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">notification</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Profile Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.profile">
              <view class="template-item" @click="navigateToEditor('profile')">
                <view class="template-preview" id="template-profile">
                  <image class="template-image" :src="capturedImages.profile" mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Profile</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Settings Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.settings">
              <view class="template-item" @click="navigateToEditor('settings')">
                <view class="template-preview" id="template-settings">
                  <image class="template-image" :src="capturedImages.settings" mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Settings</text>
                </view>
              </view>
            </x-skeleton>
          </template>
        </view>
        </view>
      </view>


    </view>

    <!-- Custom Action Sheet Component -->
    <view v-if="showCustomActionSheet" class="custom-action-sheet-overlay" @click="closeCustomActionSheet">
      <view class="custom-action-sheet" @click.stop>
        <view class="custom-action-sheet-title">Export Options</view>
        <view v-for="(option, index) in actionSheetOptions" :key="index" class="custom-action-sheet-item"
          @click="handleActionSheetSelection(index)">
          {{ option }}
        </view>
        <view class="custom-action-sheet-cancel" @click="closeCustomActionSheet">Cancel</view>
      </view>
    </view>

    <!-- Create New Page Dialog -->
    <view class="dialog-overlay" v-if="showCreatePageDialog" @click="closeCreatePageDialog">
      <view class="dialog-container" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">Create a New Page</text>

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
                    :class="{ 'selected': selectedPageModel === option.value }"
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
            <text class="description-label">Describe your page in plain English</text>
            <button class="try-example-btn" @click="tryPageExample">Try example</button>
          </view>
          <view class="description-container">
            <textarea class="project-description-input" placeholder="Enter your page description"
              v-model="pageDescription" maxlength="700"></textarea>
            <text class="char-count">{{ pageDescription.length }}/700</text>
          </view>

          <button class="continue-btn" @click="createPage">Continue</button>
        </view>
      </view>
    </view>

    <!-- Delete Pages Dialog -->
    <view class="dialog-overlay" v-if="showDeleteDialog" @click="closeDeleteDialog">
      <view class="dialog-container" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">Delete Pages</text>
          
          <!-- Error notification -->
          <view class="error-notification" v-if="errorMessage">
            <text>{{ errorMessage }}</text>
          </view>
          
          <!-- Select All Option -->
          <view class="select-all-container" v-if="jsonTemplates.length > 0">
            <!-- Custom checkbox implementation -->
            <view class="checkbox-wrapper" @click="toggleSelectAll">
              <view class="checkbox-custom" :class="{ 'checked': isAllSelected }"></view>
              <text class="select-all-text">Select All</text>
            </view>
          </view>
          
          <view class="delete-pages-list" v-if="jsonTemplates.length > 0">
            <view class="delete-page-item" v-for="(template, index) in jsonTemplates" :key="index">
              <!-- Custom checkbox implementation -->
              <view class="checkbox-wrapper" @click="togglePageSelection(index)">
                <view class="checkbox-custom" :class="{ 'checked': pagesToDelete.includes(index) }"></view>
                <text class="delete-page-name">{{ template.name.replace(/ Page/i, '') }}</text>
              </view>
            </view>
          </view>
          <view class="empty-state" v-else>
            <text>No pages available to delete</text>
          </view>
          
          <view class="delete-actions">
            <button class="delete-btn" :disabled="pagesToDelete.length === 0" @click="deleteSelectedPages">Delete Selected</button>
            <button class="cancel-btn" @click="closeDeleteDialog">Cancel</button>
          </view>
        </view>
      </view>
    </view>

    <!-- Import File Dialog -->
    <view class="dialog-overlay" v-if="showImportDialog" @click="closeImportDialog">
      <view class="dialog-container import-dialog" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">Import File</text>
          
          <!-- Error notification -->
          <view class="error-notification" v-if="importError">
            <text>{{ importError }}</text>
          </view>
          
          <!-- Import type tabs -->
          <view class="import-type-tabs">
            <view 
              v-for="type in importTypeOptions" 
              :key="type.value" 
              class="import-type-tab" 
              :class="{ active: selectedImportType === type.value }"
              @click="selectImportType(type.value)"
            >
              {{ type.label }}
            </view>
          </view>
          
          <view class="import-description">
            <text>{{ importDescription }}</text>
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
                <text class="upload-text">Click to select HTML file</text>
                <text class="upload-hint">Allowed: .html</text>
              </view>
              <view v-if="htmlFileContent" class="html-file-info">
                <text class="file-info-text">HTML file loaded successfully: {{ htmlFileName }}</text>
                <text class="file-content-preview">{{ htmlFileContent.substring(0, 100) }}...</text>
              </view>
            </view>
            
            <!-- Regular file picker for other types -->
            <uni-file-picker 
              v-else
              v-model="importFileList"
              fileMediatype="all"
              mode="grid"
              :limit="selectedImportType === 'image' ? 10 : 1"
              :file-extname="allowedExtensions"
              @success="successUploadFiles" 
              @delete="onImportFileDelete"
            >
              <view class="upload-placeholder">
                <view class="upload-icon">
                  <view class="folder-icon">
                    <view class="folder-body"></view>
                    <view class="folder-tab"></view>
                  </view>
                  <view class="upload-arrow">↑</view>
                </view>
                <text class="upload-text">Click to select file{{ selectedImportType === 'image' ? 's' : '' }}</text>
                <text class="upload-hint">Allowed: {{ allowedExtensions.join(', ') }}</text>
              </view>
            </uni-file-picker>
          </view>
          
          <view class="import-actions">
            <button 
              class="import-btn" 
              :disabled="selectedImportType === 'html' ? !htmlFileContent : !importFileList.length" 
              @click="importProject"
            >
              Import
            </button>
            <button class="cancel-btn" @click="closeImportDialog">Cancel</button>
          </view>
        </view>
      </view>
    </view>

    <!-- Color Palette Overlay -->
    <view v-if="showColorPalette" class="color-palette-overlay">
      <view class="color-palette-container">
        <text class="color-palette-title" style="display: block;">Select Theme Color For Your Project</text>

        <!-- Error message area -->
        <view v-if="colorPaletteError" class="color-palette-error">
          <text class="error-text">{{ colorPaletteError }}</text>
        </view>

        <!-- Neutral Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in neutralColors" :key="'neutral-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Pastel Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in pastelColors" :key="'pastel-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Warm Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in warmColors" :key="'warm-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Cool Colors Row -->
        <view class="color-palette-row">
          <view v-for="(color, index) in coolColors" :key="'cool-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }" :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Custom color input -->
        <view class="color-input-container">
          <text class="color-input-label">Custom Color:</text>
          <input type="text" v-model="customColor" class="color-input" placeholder="#RRGGBB"
            @input="validateColorInput" />
          <view class="color-preview-swatch"
            :style="{ backgroundColor: isValidColor(customColor) ? customColor : '#cccccc' }"
            :class="{ 'selected': customColor && isValidColor(customColor) && !selectedColor }"></view>
        </view>

        <!-- Simplified Preview section - only button -->
        <!-- <view class="color-preview-section">
          <text class="preview-label">Preview:</text>
          <view class="preview-button" :style="{ backgroundColor: previewColor }">Button</view>
        </view> -->

        <view class="color-actions">
          <button class="color-confirm" :style="{ backgroundColor: previewColor, color: '#ffffff' }"
            @click="confirmColorSelection">Apply Theme</button>
          <button class="color-cancel" @click="cancelColorSelection">Cancel</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { API_BASE_URL } from '../../env.js';
import html2canvas from 'html2canvas';
// Import JSZip and FileSaver for export functionality
import JSZip from 'jszip';
import saveAs from 'file-saver';

export default {
  name: 'Design',
  data() {
    return {
      capturedImages: {
        signup: '',
        home: '',
        notification: '',
        profile: '',
        settings: ''
      },
      // Add export related data properties
      showExportOptions: false,
      exportType: '',
      exportLoading: false,
      exportError: '',
      // Add a version tracker for template content
      templateVersions: {},
      activeNavItem: 'home',
      selectedTemplate: null,
      projectDescription: '',
      project_id: '',
      templatesLoading: true,
      isGenerating: false,
      generationProgress: 0,
      progressInterval: null,
      templateLoadingStates: {
        signup: true,
        home: true,
        notification: true,
        profile: true,
        settings: true
      },

      jsonTemplates: [],
      dynamicTemplateIds: [],

      // Add a flag to track if we should generate UI
      shouldGenerateUI: false,
      // Add selectedDevice property with default value 'desktop'
      selectedDevice: 'desktop',
      // Add errorMessage property
      errorMessage: '',
      showColorPalette: false,
      // Replace themeColors with color palette groups
      neutralColors: [
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#E7E7E7', name: 'Light Gray' },
        { hex: '#D1D1D1', name: 'Gray' },
        { hex: '#B6B6B6', name: 'Medium Gray' },
        { hex: '#9B9B9B', name: 'Dark Gray' }
      ],
      pastelColors: [
        { hex: '#AAC9CE', name: 'Pastel Teal' },
        { hex: '#B6B4C2', name: 'Pastel Purple' },
        { hex: '#C9B8CB', name: 'Pastel Lavender' },
        { hex: '#E5C1CD', name: 'Pastel Pink' },
        { hex: '#F3DBCF', name: 'Pastel Peach' }
      ],
      warmColors: [
        { hex: '#F5CEC7', name: 'Soft Peach' },
        { hex: '#E79796', name: 'Coral' },
        { hex: '#FFC9BB', name: 'Salmon' },
        { hex: '#FFB284', name: 'Light Orange' },
        { hex: '#C8C09C', name: 'Sage' }
      ],
      coolColors: [
        { hex: '#86E3CE', name: 'Mint' },
        { hex: '#D0E6A5', name: 'Light Green' },
        { hex: '#FFDD94', name: 'Light Yellow' },
        { hex: '#FA897B', name: 'Coral Red' },
        { hex: '#CCABD8', name: 'Lavender' }
      ],
      selectedColor: '',
      customColor: '',
      previewColor: '#86E3CE', // Change default color to mint
      colorPaletteError: '',
      numPages: 1,
      // Add export related data properties
      showExportOptions: false,
      exportType: '',
      exportLoading: false,
      exportError: '',
      isExporting: false, // Add flag to prevent multiple simultaneous exports

      // Custom action sheet properties
      showCustomActionSheet: false,
      actionSheetOptions: ['Export as Images', 'Export as HTML', 'Export as Vue 2', 'Export as Vue 3', 'Export as React'],
      showCreatePageDialog: false,
      pageDescription: '',
      examplePageDescription: 'A modern login page of Artificial Intelligence Tech Stack',
      // examplePageDescription: 'A modern contact page with a form and interactive map, including name, email, and message fields',
      showDeleteDialog: false,
      pagesToDelete: [],
      
      // Model selection for Create New Page dialog
      modelOptions: [
        { value: 'gimini2.5', text: 'gimini2.5 (recommended 1 minute)', isPro: true },
        { value: 'uigenius5:latest', text: 'uigenius5:latest (recommended 3 minutes)', isPro: true },
        { value: 'uigenius3:basic', text: 'uigenius3:basic (free basic model, 3 minutes)', isPro: false},
      ],
      selectedPageModel: 'gimini2.5',
      showModelDropdown: false,
      
      // Import dialog properties
      showImportDialog: false,
      importFileList: [],
      importError: '',
      importTypeOptions: [
        { value: 'image', label: 'Image' },
        { value: 'html', label: 'HTML' }
        //{ value: 'vue', label: 'Vue' },
        //{ value: 'react', label: 'React' }
      ],
      selectedImportType: 'image',
      
      // HTML file content
      htmlFileContent: '',
      htmlFileName: '',
      
      // Import progress properties
      isImporting: false,
      importProgress: 0,
    }
  },

  computed: {
    filteredTemplates() {
      // Return all templates from jsonTemplates
      if (!this.jsonTemplates || this.jsonTemplates.length === 0) {
        return [];
      }
      
      // Return all templates
      return this.jsonTemplates;
    },
    
    isAllSelected() {
      // Check if all pages are selected
      return this.jsonTemplates.length > 0 && this.pagesToDelete.length === this.jsonTemplates.length;
    },
    

    allowedExtensions() {
      switch (this.selectedImportType) {
        case 'image':
          return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
        case 'html':
          return ['html', 'htm'];
        case 'vue':
          return ['vue'];
        case 'react':
          return ['jsx', 'tsx'];
        default:
          return ['*'];
      }
    },
    importDescription() {
      switch (this.selectedImportType) {
        case 'image':
          return 'Upload one or more images to your project assets. Supported formats: PNG, JPG, JPEG, GIF, WEBP, SVG.';
        case 'html':
          return 'Upload an HTML file.';
        case 'vue':
          return 'Upload a Vue Single File Component (.vue).';
        case 'react':
          return 'Upload a React component file (.jsx/.tsx).';
        default:
          return '';
      }
    }
  },

  mounted() {
    // this.saveProjectToCloud();
    // Check if we have a stored project description
    const projectDescription = uni.getStorageSync('projectDescription');
    if (projectDescription) {
      this.projectDescription = projectDescription;
    }

    // Check if we have a stored device selection
    const selectedDevice = uni.getStorageSync('selectedDevice');
    if (selectedDevice) {
      this.selectedDevice = selectedDevice;
    }

    // Listen for image capture events from renderjs
    uni.$on('image-captured', this.receiveImageData);
    uni.$on('capture-error', (data) => {
      this._errAlert(`Error capturing image: ${data.error}`);
      this.handleCaptureError(data);
    });

    // Load images from storage on initial mount to avoid display issues
    this.loadImagesFromStorage();

    // Set up loading state timers
    setTimeout(() => {
      this.templateLoadingStates.signup = false;
    }, 500); // Reduced from 1500ms

    setTimeout(() => {
      this.templateLoadingStates.home = false;
    }, 600); // Reduced from 1800ms

    setTimeout(() => {
      this.templateLoadingStates.notification = false;
    }, 700); // Reduced from 2100ms

    setTimeout(() => {
      this.templateLoadingStates.profile = false;
    }, 800); // Reduced from 2400ms

    setTimeout(() => {
      this.templateLoadingStates.settings = false;
      this.templatesLoading = false;
    }, 900); // Reduced from 2700ms


    // console.log(this.jsonTemplates);
    
    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
  },
  
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  },

  onShow() {
    // Load images from local storage first
    this.loadImagesFromStorage();

    // Load selectedDevice from storage if available
    const storedDevice = uni.getStorageSync('selectedDevice');
    if (storedDevice) {
      this.selectedDevice = storedDevice;
    }

    // Load JSON templates if available
    this.loadJsonTemplates();

    // Use a timeout to ensure DOM is fully rendered before capturing
    setTimeout(() => {
      // Check if we should generate UI based on the flag from createProject
      this.shouldGenerateUI = uni.getStorageSync('shouldGenerateUI') === 'true';

      // Only generate UI if the flag is set and we have a project description
      if (this.shouldGenerateUI &&
        !uni.getStorageSync('latest_7_overall_page') &&
        uni.getStorageSync('projectDescription')) {
        this.generateUI();
        uni.setStorageSync('shouldGenerateUI', 'false');
      } else {
        // Generate preview images only if we need them
        if (this.needsImageGeneration()) {
          // Use a timeout to ensure DOM is ready
          setTimeout(() => {
            this.generatePreviewImages();
          }, 300);
        }
      }
    }, 500);
  },

  beforeDestroy() {
    // Clean up event listeners
    uni.$off('image-captured', this.receiveImageData);
    uni.$off('capture-error');

    // Clean up progress interval if it exists
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  },

  methods: {
    shareProject() {
      uni.showToast({
        title: 'This feature is developing, please wait for the update',
        icon: 'none',
        duration: 2000
      });
      // Share the project
      // uni.share({
      //   title: 'Share Project',
      //   path: '/pages/design/design',
      // });
    },
    exportProject() {
      // Show custom action sheet instead of uni.showActionSheet
      this.showCustomActionSheet = true;
    },

    closeCustomActionSheet() {
      this.showCustomActionSheet = false;
    },

    handleActionSheetSelection(index) {
      this.closeCustomActionSheet();

      const exportTypes = ['images', 'html', 'vue2', 'vue3', 'react'];
      this.exportType = exportTypes[index];

      switch (this.exportType) {
        // case 'images':
        //   console.log(this.exportType);
        case 'images':
          this.exportImages();
          break;
        case 'html':
          this.exportHTML();
          break;
        case 'vue2':
        case 'vue3':
        case 'react':
          this.exportFrameworkCode(this.exportType);
          break;
      }
    },

    async exportImages() {
      // Debounce protection
      if (this.isExporting) {
        uni.showToast({
          title: 'Export already in progress',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      this.isExporting = true;

      // Show loading toast
      uni.showLoading({
        title: 'Preparing images...',
        mask: true
      });

      try {
        // Get the project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: 'No project data found',
            icon: 'none',
            duration: 2000
          });
          this.isExporting = false;
          return;
        }

        // Parse the JSON data
        const projectData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Check if we have pages
        if (!projectData.pages || !projectData.pages.length) {
          uni.hideLoading();
          uni.showToast({
            title: 'No pages found in project',
            icon: 'none',
            duration: 2000
          });
          this.isExporting = false;
          return;
        }

        // Create temporary HTML elements for screenshots
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.width = 'auto'; // Standard website width
        container.style.height = 'auto'; // Auto height to accommodate content
        document.body.appendChild(container);

        const images = [];
        const renderPage = async (index) => {
          if (index >= projectData.pages.length) {
            // Clean up the temporary container
            document.body.removeChild(container);
            
            // Export the images
            // #ifdef H5 
            this.exportImagesWeb(images);
            // #endif
            // #ifdef APP-PLUS
            this.exportImagesMobile(images);
            // #endif
            return;
          }

          const page = projectData.pages[index];
          const pageName = page.name.replace(/ Page/i, '');
          const pageKey = pageName.toLowerCase().replace(/\s+/g, '-');
          
          // Create a div for this page
          container.innerHTML = '';
          const pageElement = document.createElement('div');
          pageElement.style.padding = '20px';
          pageElement.style.backgroundColor = '#ffffff';
          pageElement.style.fontFamily = 'Arial, sans-serif';
          pageElement.style.color = '#333333';
          pageElement.style.width = '100%';
          pageElement.style.maxWidth = 'auto';
          pageElement.style.margin = '0 auto';
          
          // Add page title
          const titleElement = document.createElement('h1');
          titleElement.style.fontSize = '24px';
          titleElement.style.fontWeight = 'bold';
          titleElement.style.marginBottom = '20px';
          titleElement.textContent = pageName;
          pageElement.appendChild(titleElement);
          
          // Add page content
          const contentElement = document.createElement('div');
          contentElement.innerHTML = page.component || '<div>No content available</div>';
          pageElement.appendChild(contentElement);
          
          container.appendChild(pageElement);
          
          // Wait for any images to load
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Capture screenshot
          try {
            // Let content determine its natural dimensions
            const contentHeight = pageElement.scrollHeight;
            const contentWidth = pageElement.scrollWidth;
            
            const canvas = await html2canvas(pageElement, {
              width: contentWidth,
              height: contentHeight,
              scale: 2, // Higher scale for better quality
              useCORS: true,
              logging: false,
              backgroundColor: '#ffffff',
              allowTaint: true // Allow cross-origin images
            });
            
            const imageData = canvas.toDataURL('image/png');
            images.push({
              key: pageKey,
              data: imageData
            });
            
            // Move to next page
            renderPage(index + 1);
          } catch (error) {
            console.error(`Error capturing screenshot for ${pageName}:`, error);
            // Move to next page even if there's an error
            renderPage(index + 1);
          }
        };
        
        // Start rendering pages
        renderPage(0);
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error exporting images',
          icon: 'none',
          duration: 2000
        });
        console.error('Error exporting images:', error);
        this.isExporting = false;
        
        // Clean up any temporary elements
        const container = document.querySelector('div[style*="-9999px"]');
        if (container) {
          document.body.removeChild(container);
        }
      }
    },

    exportImagesMobile(images) {
      try {
        // For mobile platforms, save images one by one to downloads folder
        let savedCount = 0;

        const saveNext = (index) => {
          if (index >= images.length) {
            uni.hideLoading();
            uni.showToast({
              title: `${savedCount} images exported`,
              icon: 'success',
              duration: 2000
            });
            this.isExporting = false; // Reset export flag when done
            return;
          }

          const image = images[index];
          const filePath = `${uni.env.USER_DATA_PATH}/${image.key}.png`;

          // Convert base64 to file and save
          const fs = uni.getFileSystemManager();
          const buffer = uni.base64ToArrayBuffer(image.data.split(',')[1]);

          fs.writeFile({
            filePath: filePath,
            data: buffer,
            encoding: 'binary',
            success: () => {
              // Save to photos album
              uni.saveImageToPhotosAlbum({
                filePath: filePath,
                success: () => {
                  savedCount++;
                  saveNext(index + 1);
                },
                fail: (err) => {
                  // console.error(`Failed to save ${image.key}.png to photos:`, err);
                  saveNext(index + 1);
                }
              });
            },
            fail: (err) => {
              // console.error(`Failed to write ${image.key}.png:`, err);
              saveNext(index + 1);
            }
          });
        };

        saveNext(0);
      } catch (error) {
        uni.hideLoading();
        // console.error('Error in exportImagesMobile:', error);
        uni.showToast({
          title: 'Error exporting images',
          icon: 'none',
          duration: 2000
        });
        this.isExporting = false; // Reset export flag on error
      }
    },

    async exportImagesWeb(images) {
      try {
        // Use the imported JSZip and saveAs
        // If they're not available, show an error
        if (typeof JSZip !== 'function' || typeof saveAs !== 'function') {
          uni.hideLoading();
          // console.error('JSZip or saveAs is not available');
          uni.showToast({
            title: 'Export libraries not available',
            icon: 'none',
            duration: 2000
          });
          this.isExporting = false;
          return;
        }

        // console.log(`Exporting ${images.length} images to a single zip file`);

        // Create a single zip file with all images
        const zip = new JSZip();
        let imagesFolder = zip.folder("ui_genius_images");

        // Convert all images to blobs and add them to the zip
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          try {
            // Convert base64 data URL to blob
            const parts = image.data.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const raw = window.atob(parts[1]);
            const rawLength = raw.length;
            const uInt8Array = new Uint8Array(rawLength);

            for (let j = 0; j < rawLength; ++j) {
              uInt8Array[j] = raw.charCodeAt(j);
            }

            const blob = new Blob([uInt8Array], { type: contentType });
            imagesFolder.file(`${image.key}.png`, blob);
            // console.log(`Added ${image.key}.png to zip (${i + 1}/${images.length})`);
          } catch (error) {
            // console.error(`Error processing image ${image.key}:`, error);
          }
        }

        // Generate and save the zip
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "ui_genius_images.zip");

        uni.hideLoading();
        uni.showToast({
          title: 'Images exported successfully!',
          icon: 'success',
          duration: 2000
        });
      } catch (error) {
        // Handle any errors
        uni.hideLoading();
        // console.error('Error exporting images:', error);
        uni.showToast({
          title: 'Error exporting images',
          icon: 'none',
          duration: 2000
        });
      } finally {
        // Always reset the exporting flag when done
        this.isExporting = false;
      }
    },

    exportImagesIndividually(images) {
      // Fallback method to download images one by one
      uni.showToast({
        title: 'Downloading images individually',
        icon: 'none',
        duration: 2000
      });

      images.forEach(image => {
        try {
          const a = document.createElement('a');
          a.href = image.data;
          a.download = `${image.key}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (e) {
          // console.error(`Failed to download ${image.key}.png`, e);
        }
      });
    },

    exportHTML() {
      // Show loading toast
      uni.showLoading({
        title: 'Preparing HTML...',
        mask: true
      });

      try {
        // Get project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: 'No project data found',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // Parse the JSON data
        const projectData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Extract page components
        if (!projectData.pages || !projectData.pages.length) {
          uni.hideLoading();
          uni.showToast({
            title: 'No pages found in project',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // For mobile, save to file directly
        if (uni.getSystemInfoSync().platform !== 'web') {
          this.exportHTMLMobile(projectData);
          return;
        }

        // For web, try to create a zip file using the imported libraries
        try {
          // Use the imported JSZip and saveAs
          if (typeof JSZip !== 'function' || typeof saveAs !== 'function') {
            // Fallback to a simple HTML download if libraries aren't available
            this.exportHTMLSimple(projectData);
            return;
          }

          const zip = new JSZip();

          // Project name for zip file name
          const projectName = projectData.AIProjectName || 'ui_genius_project';

          // Basic HTML template
          const htmlTemplate = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; line-height: 1.6; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

          // Create an index.html with links to all pages
          let indexContent = `<div style="max-width: 800px; margin: 0 auto; padding: 20px;">
  <h1 style="color: var(--theme-color); margin-bottom: 20px;">${projectName}</h1>
  <p style="margin-bottom: 20px;">${projectData.AIProjectDescription || ''}</p>
  <h2 style="margin-bottom: 15px;">Pages:</h2>
  <ul style="list-style: none;">`;

          // Add each page to the zip and create link in index
          projectData.pages.forEach((page) => {
            const pageName = page.name.replace(/ Page/i, '');
            const fileName = pageName.toLowerCase().replace(/\s+/g, '-') + '.html';

            // Create HTML file for the page
            const pageContent = page.component || '<div>No content available</div>';
            const fullHtml = htmlTemplate(pageName, pageContent);
            zip.file(fileName, fullHtml);

            // Add link to index
            indexContent += `<li style="margin-bottom: 10px;">
      <a href="${fileName}" style="color: var(--theme-color); text-decoration: none; font-weight: bold; padding: 5px 0; display: inline-block;">
        ${pageName}
      </a>
    </li>`;
          });

          // Close the index HTML
          indexContent += `</ul></div>`;

          // Add index.html to zip
          zip.file('index.html', htmlTemplate(projectName, indexContent));

          // Generate and save the zip
          zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}_html.zip`);
            uni.hideLoading();
            uni.showToast({
              title: 'HTML exported successfully!',
              icon: 'success',
              duration: 2000
            });
          });
        } catch (error) {
          // Fallback to simple HTML export
          this.exportHTMLSimple(projectData);
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error exporting HTML',
          icon: 'none',
          duration: 2000
        });
        console.error('Error exporting HTML:', error);
      }
    },

    exportHTMLMobile(projectData) {
      // Create a single HTML file with all pages for mobile platforms
      const projectName = projectData.AIProjectName || 'ui_genius_project';
      let content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    /* Navigation */
    .nav { background: var(--theme-color); padding: 10px; position: sticky; top: 0; z-index: 100; }
    .nav ul { display: flex; list-style: none; overflow-x: auto; white-space: nowrap; }
    .nav a { color: white; text-decoration: none; padding: 10px 15px; display: inline-block; }
    .page { padding: 20px; min-height: 100vh; }
    h1 { margin-bottom: 20px; }
  </style>
</head>
<body>
  <nav class="nav">
    <ul>`;

      // Add navigation links
      projectData.pages.forEach((page) => {
        const pageName = page.name.replace(/ Page/i, '');
        const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
        content += `<li><a href="#${pageId}">${pageName}</a></li>`;
      });

      content += `</ul>
  </nav>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1 style="color: var(--theme-color);">${projectName}</h1>
    <p style="margin-bottom: 30px;">${projectData.AIProjectDescription || ''}</p>
  </div>`;

      // Add each page
      projectData.pages.forEach((page) => {
        const pageName = page.name.replace(/ Page/i, '');
        const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
        const pageContent = page.component || '<div>No content available</div>';

        content += `<div id="${pageId}" class="page">
    <h2 style="color: var(--theme-color); margin-bottom: 20px;">${pageName}</h2>
    ${pageContent}
  </div>`;
      });

      content += `</body></html>`;

      // Save the file
      const filePath = `${uni.env.USER_DATA_PATH}/${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
      const fs = uni.getFileSystemManager();

      fs.writeFile({
        filePath: filePath,
        data: content,
        encoding: 'utf8',
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: 'HTML file saved',
            icon: 'success',
            duration: 2000
          });

          // Open the file if possible
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            fail: () => {
              console.log('Unable to open HTML file');
            }
          });
        },
        fail: (error) => {
          uni.hideLoading();
          uni.showToast({
            title: 'Failed to save HTML file',
            icon: 'none',
            duration: 2000
          });
          console.error('Failed to save HTML file:', error);
        }
      });
    },

    exportHTMLSimple(projectData) {
      // Create a single HTML file for all pages
      const projectName = projectData.AIProjectName || 'ui_genius_project';
      let content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    /* Navigation */
    .nav { background: var(--theme-color); padding: 10px; position: sticky; top: 0; z-index: 100; }
    .nav ul { display: flex; list-style: none; overflow-x: auto; white-space: nowrap; }
    .nav a { color: white; text-decoration: none; padding: 10px 15px; display: inline-block; }
    .page { padding: 20px; min-height: 100vh; }
    h1 { margin-bottom: 20px; }
  </style>
</head>
<body>
  <nav class="nav">
    <ul>`;

      // Add navigation links
      projectData.pages.forEach((page) => {
        const pageName = page.name.replace(/ Page/i, '');
        const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
        content += `<li><a href="#${pageId}">${pageName}</a></li>`;
      });

      content += `</ul>
  </nav>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1 style="color: var(--theme-color);">${projectName}</h1>
    <p style="margin-bottom: 30px;">${projectData.AIProjectDescription || ''}</p>
  </div>`;

      // Add each page
      projectData.pages.forEach((page) => {
        const pageName = page.name.replace(/ Page/i, '');
        const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
        const pageContent = page.component || '<div>No content available</div>';

        content += `<div id="${pageId}" class="page">
    <h2 style="color: var(--theme-color); margin-bottom: 20px;">${pageName}</h2>
    ${pageContent}
  </div>`;
      });

      content += `</body></html>`;

      // Download the file
      try {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        uni.hideLoading();
        uni.showToast({
          title: 'HTML exported successfully!',
          icon: 'success',
          duration: 2000
        });
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error downloading HTML',
          icon: 'none',
          duration: 2000
        });
        console.error('Error downloading HTML:', error);
      }
    },
    selectDevice(device) {
      this.selectedDevice = device;
      // Save selected device to storage
      uni.setStorageSync('selectedDevice', device);
    },

    loadJsonTemplates() {
      const jsonData = uni.getStorageSync('latest_7_overall_page');
      if (jsonData) {
        try {
          // Parse JSON if it's a string
          const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

          // Check if we have pages in the JSON
          if (data && data.pages && Array.isArray(data.pages)) {
            // Clear previous templates
            this.jsonTemplates = [];
            this.dynamicTemplateIds = [];

            // Set new templates
            this.jsonTemplates = data.pages;
            // console.log(this.jsonTemplates);

            // Generate template IDs based on page names
            this.dynamicTemplateIds = this.jsonTemplates.map(template =>
              'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')
            );

            // Check if templates have changed and need re-rendering
            this.checkTemplateVersions();

            // Update loading states for dynamic templates
            this.updateLoadingStates();

            // Force a re-render
            this.$forceUpdate();
          }
        } catch (e) {
          console.error('Error parsing JSON template data:', e);
        }
      }
    },

    // Add a new method to check template versions
    checkTemplateVersions() {
      let needsUpdate = false;

      // Check each template to see if its content has changed
      this.jsonTemplates.forEach(template => {
        const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
        // Create a simple hash of the component content
        const contentHash = this.hashString(template.component || '');

        // If we don't have a stored version or the hash has changed
        if (!this.templateVersions[key] || this.templateVersions[key] !== contentHash) {
          // Update the version
          this.templateVersions[key] = contentHash;
          // Store the new version in storage
          uni.setStorageSync(`uigenius_template_version_${key}`, contentHash);
          // Mark that we need to update images
          needsUpdate = true;
          // Remove the old image from storage
          uni.removeStorageSync(`uigenius_image_${key}`);
          console.log(`Template ${key} has changed, will regenerate image`);
        }
      });

      // Always force regeneration after a UI generation
      const forceRegeneration = uni.getStorageSync('force_regeneration') === 'true';
      if (forceRegeneration) {
        needsUpdate = true;
        uni.removeStorageSync('force_regeneration');
        console.log('Forcing template regeneration after UI generation');
      }

      // If any templates have changed, regenerate the images
      if (needsUpdate) {
        // Reset loading states to show skeletons
        Object.keys(this.templateLoadingStates).forEach(key => {
          this.$set(this.templateLoadingStates, key, true);
        });

        // Set a short timeout to allow the DOM to update first
        setTimeout(() => {
          this.generatePreviewImages();
        }, 100); // Reduced from 300ms
      }
    },

    // Add a simple string hashing function
    hashString(str) {
      let hash = 0;
      if (str.length === 0) return hash;

      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }

      return hash.toString();
    },

    updateLoadingStates() {
      // Reset loading states
      this.templateLoadingStates = {};

      // If we have dynamic templates
      if (this.jsonTemplates && this.jsonTemplates.length > 0) {
        // Create loading states for all templates from jsonTemplates
        this.jsonTemplates.forEach(template => {
          const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          this.$set(this.templateLoadingStates, key, true);
          
          // Also prepare capturedImages object
          if (!this.capturedImages[key]) {
            this.$set(this.capturedImages, key, '');
          }
          
          // Set a timeout to turn off loading state after a delay - REDUCED TIME
          setTimeout(() => {
            this.$set(this.templateLoadingStates, key, false);
          }, 500 + (Math.random() * 300)); // Reduced from 1500-2500ms to 500-800ms
        });
      } else {
        // Create loading states for each template from dynamicTemplateIds
        this.dynamicTemplateIds.forEach(id => {
          const key = id.replace('template-', '');
          this.$set(this.templateLoadingStates, key, true);
  
          // Also prepare capturedImages object
          if (!this.capturedImages[key]) {
            this.$set(this.capturedImages, key, '');
          }
  
          // Set a timeout to turn off loading state after a delay - REDUCED TIME
          setTimeout(() => {
            this.$set(this.templateLoadingStates, key, false);
          }, 500 + (Math.random() * 300)); // Reduced from 1500-2500ms to 500-800ms
        });
      }
    },

    refreshData() {
      // Clear stored images first
      this.clearStoredImages();

      // Reset all loading states
      this.templatesLoading = true;

      // Load JSON templates if available
      this.loadJsonTemplates();

      if (this.dynamicTemplateIds.length > 0) {
        // Reset dynamic template loading states
        Object.keys(this.templateLoadingStates).forEach(key => {
          this.$set(this.templateLoadingStates, key, true);
        });
      } else {
        // Reset static template loading states
        this.templateLoadingStates.signup = true;
        this.templateLoadingStates.home = true;
        this.templateLoadingStates.notification = true;
        this.templateLoadingStates.profile = true;
        this.templateLoadingStates.settings = true;


      }

      // Generate preview images first
      this.generatePreviewImages();

      // Start revealing templates with staggered timing
      const keys = Object.keys(this.templateLoadingStates);
      keys.forEach((key, index) => {
        setTimeout(() => {
          this.$set(this.templateLoadingStates, key, false);
          if (index === keys.length - 1) {
            this.templatesLoading = false;
          }
        }, 1500 + (index * 300));
      });


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
      // console.log(`Received image data for ${data.element}`);

      // Map element IDs to data properties
      const elementMap = {
        'template-signup': 'signup',
        'template-home': 'home',
        'template-notification': 'notification',
        'template-profile': 'profile',
        'template-settings': 'settings'
      };

      // For dynamic templates, create mapping based on ID
      if (this.dynamicTemplateIds.includes(data.element)) {
        const key = data.element.replace('template-', '');
        elementMap[data.element] = key;
      }

      // Update the captured images
      if (elementMap[data.element]) {
        const key = elementMap[data.element];

        // Use Vue.set to ensure reactivity
        this.$set(this.capturedImages, key, data.imageData);

        // Store in local storage with a prefix to identify our app's data
        try {
          uni.setStorageSync(`uigenius_image_${key}`, data.imageData);
          // console.log(`Stored image data for ${key} in local storage`);
        } catch (e) {
          // console.error(`Failed to store image data for ${key} from local storage:`, e);
        }
      }
    },

    generatePreviewImages() {
      // console.log('Generating preview images');

      // Use dynamic template IDs if available, otherwise use static ones
      let templateIds = [];

      if (this.jsonTemplates.length > 0) {
        // Use template IDs for all templates
        templateIds = this.jsonTemplates.map(template =>
          'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')
        );

        // Store the template IDs for later use
        this.dynamicTemplateIds = templateIds.filter(id => id.startsWith('template-'));

        // console.log('Using dynamic template IDs:', templateIds);
      } else {
        // Fallback to static template IDs
        templateIds = [
          'template-signup',
          'template-home',
          'template-notification',
          'template-profile',
          'template-settings'
        ];

        // console.log('Using static template IDs:', templateIds);
      }

      // Filter out templates that already have images in storage
      const templatesToGenerate = templateIds.filter(id => {
        // Get the key for storage lookup
        let key;
        if (id.startsWith('template-')) {
          key = id.replace('template-', '');
        } else if (id.startsWith('proposal-')) {
          key = id.replace('proposal-', '');
        }

        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          return !imageData; // Only include templates that don't have images
        } catch (e) {
          return true; // If there's an error, include the template
        }
      });

      if (templatesToGenerate.length === 0) {
        // console.log('All templates already have images in storage, skipping generation');
        return;
      }

      // console.log(`Generating ${templatesToGenerate.length} templates:`, templatesToGenerate);

      // Show loading indicator
      this._showLoading(`Generating ${templatesToGenerate.length} images...`);

      // First check if elements exist in DOM before trying to capture
      const elementsToCapture = [];
      for (let i = 0; i < templatesToGenerate.length; i++) {
        const id = templatesToGenerate[i];
        // Check if element exists in DOM
        if (document.getElementById(id)) {
          elementsToCapture.push(id);
        } else {
          console.warn(`Element not found in DOM: ${id}, skipping capture`);
        }
      }

      if (elementsToCapture.length === 0) {
        uni.hideLoading();
        uni.showToast({
          title: 'No elements found to capture',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // Capture elements sequentially with a shorter delay
      const captureSequentially = (index) => {
        if (index >= elementsToCapture.length) {
          uni.hideLoading();
          return;
        }

        const id = elementsToCapture[index];

        // Double check if element exists before trying to capture it
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element disappeared: ${id}, skipping capture`);
          // Move to next element
          setTimeout(() => {
            captureSequentially(index + 1);
          }, 20); // Reduced from 50ms
          return;
        }

        uni.$emit('capture-element', { elementId: id });

        // Move to next element after a short delay
        setTimeout(() => {
          captureSequentially(index + 1);
        }, 150); // Reduced from 300ms
      };

      // Start the sequential capture
      captureSequentially(0);
    },

    generateUI() {
      // Prevent multiple simultaneous API calls
      if (this.isGenerating) {
        return;
      }
      // Show generation progress overlay
      this.isGenerating = true;
      this.generationProgress = 0;

        // Set up progress interval - evenly distributed over 5 minutes (300 seconds)
        const progressInterval = setInterval(() => {
        if (this.generationProgress < 98) {
          // Calculate increment to reach 98% in approximately 5 minutes
          // 98% over 300 seconds = ~0.33% per second
          const increment = 0.33;
          this.generationProgress += increment;
        }
      }, 1000);

      // Get existing project data
      const existingProjectData = uni.getStorageSync('latest_7_overall_page');
      let projectData;

      if (existingProjectData) {
        // Use existing project data if available
        projectData = typeof existingProjectData === 'string' ? JSON.parse(existingProjectData) : existingProjectData;
      } else {
        // Create new project data structure if none exists
        projectData = {
          pages: [],
          AIProjectDescription: 'My Project',
          AIProjectName: 'UI Genius Project',
        };
      }

      // Prepare form data for uni.request
      const formData = {
        prompt: uni.getStorageSync('projectDescription') || this.projectDescription,
        device_type: uni.getStorageSync('selectedDevice') || 'desktop',
        model: uni.getStorageSync('selectedModel') || 'gimini2.5',
        num_pages: 1
      };

      // Show a toast to indicate a long wait
      uni.showToast({
        title: 'Generating page, this may take 10+ minutes',
        icon: 'none',
        duration: 3000
      });

      // Make the API call using uni.request instead of fetch
      uni.request({
        url: `${API_BASE_URL}/generate-ui`,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData,
        // Set a much longer timeout (20 minutes = 1,200,000ms)
        timeout: 1200000,
        success: (response) => {
          // console.log('API Response:', response);
          
          // Stop the progress interval
          clearInterval(progressInterval);
          this.generationProgress = 100;

          // Handle successful response
          if (response.statusCode !== 200) {
            // Handle API error
            this.isGenerating = false;
            uni.showToast({
              title: 'API error: ' + response.statusCode,
              icon: 'none',
              duration: 2000
            });
            return;
          }

          const data = response.data;
          // console.log('Generated page data:', data);
          
          try {
            // Process the response data - handle both string and object formats
            let responseData = data;
            
            // If it's an object with a response property, extract it
            if (typeof data === 'object' && data.response) {
              responseData = data.response;
            }
            
            // If responseData is already a parsed object, use it directly
            if (typeof responseData === 'object' && responseData.pages) {
              const parsedResponse = responseData;
              
              // Extract the page data
              if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                const newPage = parsedResponse.pages[0];
                
                // Rename the page if needed
                if (!newPage.name.toLowerCase().includes('page')) {
                  newPage.name = newPage.name + ' Page';
                }
                
                // Add the new page to the project
                projectData.pages.push(newPage);
                
                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                
                // Save project to the cloud if logged in
                this.saveProjectToCloud(projectData);
                
                // Set flag to force regeneration of images
                uni.setStorageSync('force_regeneration', 'true');
                
                // Hide generation overlay
                setTimeout(() => {
                  this.isGenerating = false;
                  
                  // Refresh templates to show the new page
                  this.loadJsonTemplates();
                  this.updateLoadingStates();
                  
                  // Force generation of new preview images
                  setTimeout(() => {
                    this.generatePreviewImages();
                  }, 100);
                  
                  // Complete refresh after a delay
                  setTimeout(() => {
                    this.refreshTemplates();
                  }, 500);
                  
                  // Show success message
                  uni.showToast({
                    title: 'New page created successfully!',
                    icon: 'success',
                    duration: 2000
                  });
                }, 1000);
              } else {
                throw new Error('No valid page data found in response');
              }
            } else if (typeof responseData === 'string') {
              try {
                // Try to clean up the response string for proper JSON parsing
                
                // First attempt: Try direct parsing - it might already be valid JSON
                try {
                  const parsedResponse = JSON.parse(responseData);
                  // If we get here, parsing succeeded
                  
                  // Continue with the same logic as above
                  if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                    const newPage = parsedResponse.pages[0];
                    
                    // Rename the page if needed
                    if (!newPage.name.toLowerCase().includes('page')) {
                      newPage.name = newPage.name + ' Page';
                    }
                    
                    // Add the new page to the project
                    projectData.pages.push(newPage);
                    
                    // Save the updated project data
                    const updatedProjectData = JSON.stringify(projectData);
                    uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                    
                    // Save project to the cloud if logged in
                    this.saveProjectToCloud(projectData);
                    
                    // Set flag to force regeneration of images
                    uni.setStorageSync('force_regeneration', 'true');
                    
                    // Hide generation overlay
                    setTimeout(() => {
                      this.isGenerating = false;
                      
                      // Refresh templates to show the new page
                      this.loadJsonTemplates();
                      this.updateLoadingStates();
                      
                      // Force generation of new preview images
                      setTimeout(() => {
                        this.generatePreviewImages();
                      }, 100);
                      
                      // Complete refresh after a delay
                      setTimeout(() => {
                        this.refreshTemplates();
                      }, 500);
                      
                      // Show success message
                      uni.showToast({
                        title: 'New page created successfully!',
                        icon: 'success',
                        duration: 2000
                      });
                    }, 1000);
                  } else {
                    throw new Error('No valid page data found in response');
                  }
                  return; // Exit early if first attempt succeeded
                } catch (initialParseError) {
                  // First attempt failed, continue with more robust cleaning
                }
                
                // Second attempt: More thorough cleaning for complex responses
                // Extract JSON-like structure from the response if it contains backticks
                let cleanedResponse = responseData;
                
                // Replace backtick-wrapped strings with properly escaped JSON strings
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function(match, p1) {
                  // Escape any double quotes and newlines in the content
                  return JSON.stringify(p1.replace(/\n\s*/g, ' ').trim());
                });
                
                // Handle HTML content in component property by properly escaping it
                const componentMatch = cleanedResponse.match(/"component"\s*:\s*(".*?"|'.*?'|\{.*?\}|\[.*?\])/s);
                if (componentMatch) {
                  const componentContent = componentMatch[1];
                  // If component content isn't already properly quoted JSON
                  if (!componentContent.startsWith('"') || !componentContent.endsWith('"')) {
                    // Extract the content and properly escape it
                    const rawContent = componentContent.replace(/^['"{]|['"}\]]$/g, '');
                    const escapedContent = JSON.stringify(rawContent);
                    // Replace the original component content with properly escaped version
                    cleanedResponse = cleanedResponse.replace(componentMatch[0], `"component": ${escapedContent}`);
                  }
                }
                
                // Try parsing the cleaned response
                const parsedResponse = JSON.parse(cleanedResponse);
                
                // Extract the page data
                if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                  const newPage = parsedResponse.pages[0];
                  
                  // Rename the page if needed
                  if (!newPage.name.toLowerCase().includes('page')) {
                    newPage.name = newPage.name + ' Page';
                  }
                  
                  // Add the new page to the project
                  projectData.pages.push(newPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide generation overlay
                  setTimeout(() => {
                    this.isGenerating = false;
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'New page created successfully!',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                } else {
                  throw new Error('No valid page data found in response');
                }
              } catch (parseError) {
                // If all parsing attempts fail, try to extract and create a page manually
                try {
                  // Create a simple page object based on the description
                  const pageName = this.pageDescription.split(' ').slice(0, 2).join(' ');
                  const simplifiedPage = {
                    name: pageName || 'New Page',
                    component: `<div class="container mx-auto p-4">
                      <h1 class="text-2xl font-bold mb-4">Simple Page</h1>
                      <p>This is a simple page created from your description: "${this.pageDescription}"</p>
                    </div>`
                  };
                  
                  // Add the simple page to the project
                  projectData.pages.push(simplifiedPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide generation overlay
                  setTimeout(() => {
                    this.isGenerating = false;
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'Simple page created (parsing failed)',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                  
                  console.error('Used fallback page creation due to parsing error:', parseError);
                } catch (fallbackError) {
                  throw new Error(`JSON parsing failed: ${parseError.message}`);
                }
              }
            } else {
              throw new Error('Invalid response format');
            }
          } catch (error) {
            console.error('Error processing page data:', error);
            
            // Handle error
            this.isGenerating = false;
            uni.showToast({
              title: 'Failed to process page data: ' + error.message,
              icon: 'none',
              duration: 3000
            });
          }
        },
        fail: (error) => {
          // Stop the progress interval
          clearInterval(progressInterval);
          
          // Log the error
          console.error('Error generating page:', error);
          
          // Handle error
          this.isGenerating = false;
          uni.showToast({
            title: 'Error generating page: ' + (error.errMsg || 'Request failed'),
            icon: 'none',
            duration: 3000
          });
        }
      });
    },
    navigateTo(item) {
      this.activeNavItem = item;

      // Show color palette if color nav item is clicked
      if (item === 'color') {
        this.showColorPalette = true;
        // Set default selected color to mint
        if (!this.selectedColor && !this.customColor) {
          this.selectedColor = this.coolColors[0].hex; // Mint color
          this.previewColor = this.coolColors[0].hex;
        }
      }

      // Show create new page dialog if plus nav item is clicked
      if (item === 'plus') {
        this.showCreatePageDialog = true;
        this.pageDescription = '';
        this.errorMessage = '';
        // Initialize model selection to gimini2.5
        this.selectedPageModel = 'gimini2.5';
      }
      
      // Show delete pages dialog if delete nav item is clicked
      if (item === 'delete') {
        this.showDeleteDialog = true;
        this.pagesToDelete = [];
        this.errorMessage = '';
      }
      
      // Show import dialog if import nav item is clicked
      if (item === 'import') {
        this.showImportDialog = true;
        this.importFileList = [];
        this.importError = '';
        this.selectedImportType = 'image';
      }
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      uni.showToast({
        title: `Selected ${template} template`,
        icon: 'none'
      });
    },

    navigateToEditor(template) {
      // Get the template name or ID to pass to the editor
      let templateId = '';
      if (template) {
        // If a template object is passed, get its name
        if (typeof template === 'object' && template.name) {
          templateId = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
        } else {
          // If a string is passed, use it directly
          templateId = String(template).toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
        }
      }
      
      // Navigate to editor with the template ID as a parameter
      uni.switchTab({
        url: '/pages/editor/editor',
        success: () => {
          // Store the selected template ID in storage for the editor to access
          uni.setStorageSync('selectedTemplateId', templateId);
        }
      });
    },
    getSimplifiedPreview(template) {
      // Return the component property as a string
      if (!template || !template.component) {
        return '<div class="preview-placeholder">No preview available</div>';
      }

      try {
        // Make sure the component is a string
        if (typeof template.component !== 'string') {
          // If it's not a string, try to stringify it
          return JSON.stringify(template.component);
        }
        
        // Clean up the component string if needed
        let component = template.component;
        
        // Remove code block markers if present
        if (component.startsWith('```')) {
          component = component.replace(/^```(?:html|vue)?\s*/, '').replace(/```\s*$/, '');
        }
        
        // Fix row bar issue by removing problematic HTML elements and styles
        // Remove any style tags that might be causing the black bars
        component = component.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
        
        return component;
      } catch (e) {
        console.error('Error rendering component:', e);
        return '<div class="preview-placeholder">Error rendering preview</div>';
      }
    },

    loadImagesFromStorage() {
      // console.log('Loading images from local storage');

      // Define the main template keys we need
      const mainTemplateKeys = [
        'signup',
        'home',
        'notification',
        'profile',
        'settings'
      ];

      // Get dynamic template keys if available
      const dynamicKeys = [];
      if (this.jsonTemplates && this.jsonTemplates.length > 0) {
        this.jsonTemplates.forEach(template => {
          const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          if (!mainTemplateKeys.includes(key)) {
            dynamicKeys.push(key);
          }
        });
      }

      // Try to load each image from storage
      let mainLoadedCount = 0;
      let dynamicLoadedCount = 0;

      // Create a temporary object to hold all image data
      const tempImages = {};

      // Load previously stored template versions
      this.loadTemplateVersions();

      // Load main template images
      for (const key of mainTemplateKeys) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (imageData) {
            // Store in temp object
            tempImages[key] = imageData;
            mainLoadedCount++;

            // Immediately set the loading state to false for this template
            if (this.templateLoadingStates[key]) {
              this.$set(this.templateLoadingStates, key, false);
            }

            // console.log(`Loaded main template image for ${key} from local storage`);
          }
        } catch (e) {
          // console.error(`Failed to load image data for ${key} from local storage:`, e);
        }
      }
      
      // Load dynamic template images
      for (const key of dynamicKeys) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (imageData) {
            // Store in temp object
            tempImages[key] = imageData;
            dynamicLoadedCount++;

            // Immediately set the loading state to false for this template
            if (this.templateLoadingStates[key]) {
              this.$set(this.templateLoadingStates, key, false);
            }

            // console.log(`Loaded dynamic template image for ${key} from local storage`);
          }
        } catch (e) {
          // console.error(`Failed to load image data for ${key} from local storage:`, e);
        }
      }



      // Wait for next tick then update all images at once to ensure reactivity
      this.$nextTick(() => {
        // Update all images at once
        Object.keys(tempImages).forEach(key => {
          this.$set(this.capturedImages, key, tempImages[key]);
        });

        // Force update after all images are set
        this.$forceUpdate();

        // console.log(`Loaded ${mainLoadedCount}/${mainTemplateKeys.length} main templates and ${dynamicLoadedCount}/${dynamicKeys.length} dynamic templates from local storage`);
      });

      // Determine if we have enough templates loaded to skip loading states
      const hasAllMainTemplates = mainLoadedCount >= mainTemplateKeys.length;
      const hasAllDynamicTemplates = dynamicKeys.length > 0 && dynamicLoadedCount >= dynamicKeys.length;
      
      // If we're using dynamic templates and have them all, or we have all main templates when not using dynamic ones
      if ((dynamicKeys.length > 0 && hasAllDynamicTemplates) || 
          (dynamicKeys.length === 0 && hasAllMainTemplates)) {
        this.templatesLoading = false;
        // console.log('All required templates loaded from storage');
        return true;
      }

      return false;
    },

    // Add a new method to load template versions
    loadTemplateVersions() {
      // Load template versions from storage
      this.templateVersions = {};

      // If we have dynamic templates from JSON
      if (this.jsonTemplates.length > 0) {
        this.jsonTemplates.forEach(template => {
          const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          try {
            const version = uni.getStorageSync(`uigenius_template_version_${key}`);
            if (version) {
              this.templateVersions[key] = version;
            }
          } catch (e) {
            // Ignore errors
          }
        });
      } else {
        // For static templates
        const staticKeys = [
          'signup', 'home', 'notification', 'profile', 'settings',
          'login', 'dashboard'
        ];

        staticKeys.forEach(key => {
          try {
            const version = uni.getStorageSync(`uigenius_template_version_${key}`);
            if (version) {
              this.templateVersions[key] = version;
            }
          } catch (e) {
            // Ignore errors
          }
        });
      }
    },

    skipLoadingStates() {
      // Immediately set all loading states to false
      Object.keys(this.templateLoadingStates).forEach(key => {
        this.$set(this.templateLoadingStates, key, false);
      });

      this.templatesLoading = false;
    },

    needsImageGeneration() {
      // Define the main template keys we need
      const mainTemplateKeys = [
        'signup',
        'home',
        'notification',
        'profile',
        'settings'
      ];

      // Define proposal keys
      const proposalKeys = [
        'login',
        'dashboard'
      ];

      // If we're using dynamic templates, check those instead
      const keysToCheck = this.filteredTemplates && this.filteredTemplates.length > 0
        ? this.filteredTemplates.map(t => t.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-'))
        : mainTemplateKeys;

      let missingMainTemplates = [];
      let missingProposals = [];

      // Check main templates
      for (const key of keysToCheck) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (!imageData) {
            missingMainTemplates.push(key);
          }
        } catch (e) {
          missingMainTemplates.push(key);
        }
      }

      // Check proposal templates
      for (const key of proposalKeys) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (!imageData) {
            missingProposals.push(key);
          }
        } catch (e) {
          missingProposals.push(key);
        }
      }

      // If we're missing any of the main templates, we need to generate them
      const needsGeneration = missingMainTemplates.length > 0 || missingProposals.length > 0;

      if (missingMainTemplates.length > 0) {
        // console.log(`Missing ${missingMainTemplates.length} main templates: [${missingMainTemplates.join(', ')}]`);
      }

      if (missingProposals.length > 0) {
        // console.log(`Missing ${missingProposals.length} proposals: [${missingProposals.join(', ')}]`);
      }

      // console.log(`Needs generation: ${needsGeneration}`);
      return needsGeneration;
    },
    clearStoredImages() {
      // console.log('Clearing stored images');

      // Define the main template keys we need
      const mainTemplateKeys = [
        'signup',
        'home',
        'notification',
        'profile',
        'settings'
      ];

      // Use main template keys
      const allKeys = [...mainTemplateKeys];

      // Clear each image from storage
      for (const key of allKeys) {
        try {
          uni.removeStorageSync(`uigenius_image_${key}`);
          // Also clear version information
          uni.removeStorageSync(`uigenius_template_version_${key}`);
          // console.log(`Cleared image data for ${key} from local storage`);
        } catch (e) {
          // console.error(`Failed to clear image data for ${key} from local storage:`, e);
        }
      }

      // Reset captured images
      this.capturedImages = {
        signup: '',
        home: '',
        notification: '',
        profile: '',
        settings: ''
      };

      // Also reset template versions
      this.templateVersions = {};

      // Show toast
      uni.showToast({
        title: 'Images cleared',
        icon: 'none',
        duration: 2000
      });
    },
    selectColor(color) {
      // Clear any error message when selecting a color
      this.colorPaletteError = '';

      this.selectedColor = color;
      this.customColor = ''; // Clear custom color when a predefined color is selected
      this.previewColor = color; // Update preview color
    },
    cancelColorSelection() {
      this.showColorPalette = false;
      this.selectedColor = '';
      this.customColor = '';
      this.previewColor = '#86E3CE'; // Reset to default color
      this.colorPaletteError = ''; // Clear any error message
    },
    confirmColorSelection() {
      // Clear any previous error
      this.colorPaletteError = '';

      // Use either selected color from swatches or custom color input
      const themeColor = this.customColor && this.isValidColor(this.customColor)
        ? this.customColor
        : this.selectedColor;

      if (!themeColor) {
        this.colorPaletteError = 'Please select a valid color';
        return;
      }

      // Show loading
      uni.showLoading({
        title: 'Updating theme...',
        mask: true
      });

      // Get the current template data
      const jsonData = uni.getStorageSync('latest_7_overall_page');
      if (!jsonData) {
        uni.hideLoading();
        this.colorPaletteError = 'No usable page data available, please generate your project first';
        return;
      }

      // Send the color and template data to backend
      this.updateThemeColor(themeColor, jsonData);
    },
    updateThemeColor(color, templateData) {
      // Make API call to update theme color
      uni.request({
        url: `${API_BASE_URL}/update-theme-color`,
        method: 'POST',
        data: {
          themeColor: color,
          templateData: typeof templateData === 'string' ? templateData : JSON.stringify(templateData)
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          uni.hideLoading();

          if (res.statusCode === 200 && res.data) {
            // Store the updated template data
            uni.setStorageSync('latest_7_overall_page', res.data);

            // Clear stored images to force regeneration with new theme
            this.clearStoredImages();

            // Refresh the UI
            this.loadJsonTemplates();
            this.generatePreviewImages();

            // Hide color palette
            this.showColorPalette = false;

            uni.showToast({
              title: 'Theme updated successfully',
              icon: 'success',
              duration: 2000
            });
          } else {
            this.colorPaletteError = 'Failed to update theme';
          }
        },
        fail: (err) => {
          uni.hideLoading();
          this.colorPaletteError = 'Error updating theme: ' + (err.errMsg || 'Unknown error');
        }
      });
    },
    validateColorInput() {
      // Clear any error message when entering a custom color
      this.colorPaletteError = '';

      // Clear selected color when custom color is being entered
      if (this.customColor) {
        this.selectedColor = '';
      }

      // Update preview color if valid
      if (this.isValidColor(this.customColor)) {
        this.previewColor = this.customColor;
      } else if (this.selectedColor) {
        this.previewColor = this.selectedColor;
      } else {
        this.previewColor = '#86E3CE'; // Default color
      }
    },
    isValidColor(color) {
      // Check if the color is a valid hex color
      return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    },
    saveProjectToCloud(content) {
      // const content = uni.getStorageSync('latest_7_overall_page');
      // Get user ID
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        console.log('No user ID');
        return;
      }
      // test mode no login,just return 
      if (userId == '123bcbfeqqaeabfaf5a') {
        return
      }
      // Prepare project data
      const projectData = {
        uid: userId,
        email: uni.getStorageSync('email') || '',
        projectTitle: content.AIProjectName || 'Untitled Project',
        projectDescription: content.AIProjectDescription || 'No description',
        generated_overall_pages: content
      };

      // Call the cloud function to save the project
      uniCloud.callFunction({
        name: 'user-project',
        data: {
          action: 'create',
          data: projectData
        }
      }).then(res => {
        if (res.result && res.result.success && res.result.data && res.result.data.id) {
          // Store the project ID for future reference
          uni.setStorageSync('currentProjectId', res.result.data.id);
          console.log('Project saved successfully with ID:', res.result.data.id);
        }
      }).catch(err => {
        console.error('Cloud function error:', err);
      });
    },
    // Add a new method to fully refresh templates
    refreshTemplates() {
      console.log('Refreshing templates completely');

      // Reset all loading states
      this.templatesLoading = true;

      // Reset all template loading states
      Object.keys(this.templateLoadingStates).forEach(key => {
        this.$set(this.templateLoadingStates, key, true);
      });

      // Reload JSON templates
      this.loadJsonTemplates();

      // Generate new preview images
      this.generatePreviewImages();

      // Start revealing templates with staggered timing - REDUCED TIMES
      const keys = Object.keys(this.templateLoadingStates);
      keys.forEach((key, index) => {
        setTimeout(() => {
          this.$set(this.templateLoadingStates, key, false);
          if (index === keys.length - 1) {
            this.templatesLoading = false;
          }
        }, 500 + (index * 100)); // Reduced from 1500ms + 300ms per item
      });


    },
    exportProject() {
      // Show custom action sheet instead of uni.showActionSheet
      this.showCustomActionSheet = true;
    },
    // Helper function to convert dataURL to Blob
    dataURLToBlob(dataURL) {
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },

    exportHTML() {
      // Show loading toast
      uni.showLoading({
        title: 'Preparing HTML...',
        mask: true
      });

      try {
        // Get project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: 'No project data found',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // Parse the JSON data
        const projectData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Extract page components
        if (!projectData.pages || !projectData.pages.length) {
          uni.hideLoading();
          uni.showToast({
            title: 'No pages found in project',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // Create a zip file with HTML files
        const JSZip = require('jszip');
        const saveAs = require('file-saver');
        const zip = new JSZip();

        // Project name for zip file name
        const projectName = projectData.AIProjectName || 'ui_genius_project';

        // Basic HTML template
        const htmlTemplate = (title, content, cssStyles) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    /* Additional styles */
    ${cssStyles || ''}
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

        // Create an index.html with links to all pages
        let indexContent = `
<div style="max-width: 800px; margin: 0 auto; padding: 20px;">
  <h1 style="color: var(--theme-color); margin-bottom: 20px;">${projectName}</h1>
  <p style="margin-bottom: 20px;">${projectData.AIProjectDescription || ''}</p>
  <h2 style="margin-bottom: 15px;">Pages:</h2>
  <ul style="list-style: none;">`;

        // Add each page to the zip and create link in index
        projectData.pages.forEach((page, index) => {
          const pageName = page.name.replace(/ Page/i, '');
          const fileName = pageName.toLowerCase().replace(/\s+/g, '-') + '.html';

          // Create HTML file for the page
          const pageContent = page.component || '<div>No content available</div>';
          const fullHtml = htmlTemplate(pageName, pageContent);
          zip.file(fileName, fullHtml);

          // Add link to index
          indexContent += `
    <li style="margin-bottom: 10px;">
      <a href="${fileName}" style="color: var(--theme-color); text-decoration: none; font-weight: bold; padding: 5px 0; display: inline-block;">
        ${pageName}
      </a>
    </li>`;
        });

        // Close the index HTML
        indexContent += `</ul></div>`;

        // Add index.html to zip
        zip.file('index.html', htmlTemplate(projectName, indexContent));

        // Generate and save the zip
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}_html.zip`);
          uni.hideLoading();
          uni.showToast({
            title: 'HTML exported successfully!',
            icon: 'success',
            duration: 2000
          });
        });

      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error exporting HTML',
          icon: 'none',
          duration: 2000
        });
        console.error('Error exporting HTML:', error);
      }
    },

    exportFrameworkCode(framework) {
      // Show loading toast
      uni.showLoading({
        title: `Preparing ${framework.toUpperCase()} code...`,
        mask: true
      });

      try {
        // Get project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: 'No project data found',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // Parse the JSON data if it's a string
        const projectData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Make API call to backend for code conversion
        uni.request({
          url: `${API_BASE_URL}/export-code`,
          method: 'POST',
          data: {
            templateData: JSON.stringify(projectData),
            model: 'gimini2.5',
            framework: framework
          },
          header: {
            'content-type': 'application/json'
          },
          // Set a much longer timeout (15 minutes)
          timeout: 900000,
          success: (res) => {

            uni.hideLoading();
            console.log('res', res);
            if (res.data) {
              console.log('res.data', res.data);
              // Save the converted code as a zip file
              const JSZip = require('jszip');
              const saveAs = require('file-saver');
              const zip = new JSZip();

              // Project name for zip file name
              const projectName = projectData.AIProjectName || 'ui_genius_project';

              // Add README file with basic instructions
              const readmeContent = `# ${projectName}\n\n${projectData.AIProjectDescription || ''}\n\n## Generated by UI Genius\n\nThis code was automatically generated by UI Genius.`;
              zip.file('README.md', readmeContent);
              
              // Check if the response has multiple files
              if (res.data.multi_file && res.data.components) {
                // It's a multi-file response with multiple components
                
                // Use the correct file extension based on the framework
                const fileExtension = framework === 'react' ? '.jsx' : '.vue';
                
                // Add main app file
                const mainFileName = `App${fileExtension}`;
                zip.file(mainFileName, res.data.code || 'No code generated');
                
                // Create pages directory
                const pagesFolder = zip.folder("pages");
                
                // Add individual component files
                res.data.components.forEach(component => {
                  const componentFileName = `${component.name}${fileExtension}`;
                  pagesFolder.file(componentFileName, component.code || 'No code generated');
                });
                
                // Add a basic package.json for the project
                const packageJson = {
                  "name": projectName.toLowerCase().replace(/\s+/g, '-'),
                  "version": "1.0.0",
                  "private": true,
                  "description": projectData.AIProjectDescription || "UI Genius generated project",
                  "scripts": {
                    "serve": "vue-cli-service serve",
                    "build": "vue-cli-service build",
                    "start": "react-scripts start",
                    "build-react": "react-scripts build"
                  },
                  "dependencies": {
                    "vue": framework.includes("vue") ? "^3.2.0" : undefined,
                    "vue-router": framework.includes("vue") ? "^4.0.0" : undefined,
                    "react": framework === "react" ? "^18.2.0" : undefined,
                    "react-dom": framework === "react" ? "^18.2.0" : undefined,
                    "react-router-dom": framework === "react" ? "^6.8.0" : undefined
                  }
                };
                
                // Remove undefined dependencies
                Object.keys(packageJson.dependencies).forEach(key => {
                  if (packageJson.dependencies[key] === undefined) {
                    delete packageJson.dependencies[key];
                  }
                });
                
                zip.file('package.json', JSON.stringify(packageJson, null, 2));
              } else {
                // It's a single file response
                // Use the correct file extension based on the framework
                const fileExtension = framework === 'react' ? '.jsx' : '.vue';
                const fileName = `index${fileExtension}`;
                
                // Get the component code from the response
                const componentCode = res.data.code || 'No code generated';
                
                // Add the component file to the zip
                zip.file(fileName, componentCode);
              }

              // Generate and save the zip
              zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}_${framework}.zip`);
                uni.showToast({
                  title: `${framework.toUpperCase()} code exported!`,
                  icon: 'success',
                  duration: 2000
                });
              });
            } else {
              uni.showToast({
                title: `Error exporting ${framework.toUpperCase()} code`,
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: (err) => {
            uni.hideLoading();
            uni.showToast({
              title: `Export failed: ${err.errMsg}`,
              icon: 'none',
              duration: 2000
            });
          }
        });

      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: `Error exporting ${framework.toUpperCase()} code`,
          icon: 'none',
          duration: 2000
        });
        console.error(`Error exporting ${framework} code:`, error);
      }
    },
    tryPageExample() {
      this.pageDescription = this.examplePageDescription;
    },
    
    // Handle model selection for new page
    onPageModelChange(e) {
      this.selectedPageModel = e;
      console.log('Selected page model:', this.selectedPageModel);
    },
    
    // Custom dropdown methods
    toggleModelDropdown() {
      this.showModelDropdown = !this.showModelDropdown;
    },
    
    selectModel(value) {
      this.selectedPageModel = value;
      this.showModelDropdown = false;
      console.log('Selected page model:', this.selectedPageModel);
    },
    
    getSelectedModelText() {
      const selectedOption = this.modelOptions.find(option => option.value === this.selectedPageModel);
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
    createPage() {
      // Close the dialog immediately to provide better UX
      this.showCreatePageDialog = false;
      
      // Validate the page description
      if (!this.pageDescription) {
        this.errorMessage = 'Please enter a page description';
        this.showCreatePageDialog = true; // Re-open dialog if validation fails
        return;
      }

      // Clear error message when validation passes
      this.errorMessage = '';

      // Show generation progress overlay
      this.isGenerating = true;
      this.generationProgress = 0;

      // Set up progress interval - evenly distributed over 5 minutes (300 seconds)
      const progressInterval = setInterval(() => {
        if (this.generationProgress < 98) {
          // Calculate increment to reach 98% in approximately 5 minutes
          // 98% over 300 seconds = ~0.33% per second
          const increment = 0.33;
          this.generationProgress += increment;
        }
      }, 1000);

      // Get existing project data
      const existingProjectData = uni.getStorageSync('latest_7_overall_page');
      let projectData;

      if (existingProjectData) {
        // Use existing project data if available
        projectData = typeof existingProjectData === 'string' ? JSON.parse(existingProjectData) : existingProjectData;
      } else {
        // Create new project data structure if none exists
        projectData = {
          pages: [],
          AIProjectDescription: 'My Project',
          AIProjectName: 'UI Genius Project',
        };
      }

      // Prepare form data for uni.request
      const formData = {
        prompt: this.pageDescription,
        device_type: this.selectedDevice,
        model: this.selectedPageModel,
        num_pages: 1
      };

      // Show a toast to indicate a long wait
      uni.showToast({
        title: 'Generating page, this may take 10+ minutes',
        icon: 'none',
        duration: 3000
      });

      // Make the API call using uni.request instead of fetch
      uni.request({
        url: `${API_BASE_URL}/generate-ui`,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData,
        // Set a much longer timeout (20 minutes = 1,200,000ms)
        timeout: 1200000,
        success: (response) => {
          // console.log('API Response:', response);
          
          // Stop the progress interval
          clearInterval(progressInterval);
          this.generationProgress = 100;

          // Handle successful response
          if (response.statusCode !== 200) {
            // Handle API error
            this.isGenerating = false;
            uni.showToast({
              title: 'API error: ' + response.statusCode,
              icon: 'none',
              duration: 2000
            });
            return;
          }

          const data = response.data;
          // console.log('Generated page data:', data);
          
          try {
            // Process the response data - handle both string and object formats
            let responseData = data;
            console.log('responseData', responseData);
            
            // If it's an object with a response property, extract it
            if (typeof data === 'object' && data.response) {
              responseData = data.response;
            }
            
            // If responseData is already a parsed object, use it directly
            if (typeof responseData === 'object' && responseData.pages) {
              const parsedResponse = responseData;
              
              // Extract the page data
              if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                const newPage = parsedResponse.pages[0];
                
                // Rename the page if needed
                if (!newPage.name.toLowerCase().includes('page')) {
                  newPage.name = newPage.name + ' Page';
                }
                
                // Add the new page to the project
                projectData.pages.push(newPage);
                
                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                
                // Save project to the cloud if logged in
                this.saveProjectToCloud(projectData);
                
                // Set flag to force regeneration of images
                uni.setStorageSync('force_regeneration', 'true');
                
                // Hide generation overlay
                setTimeout(() => {
                  this.isGenerating = false;
                  
                  // Refresh templates to show the new page
                  this.loadJsonTemplates();
                  this.updateLoadingStates();
                  
                  // Force generation of new preview images
                  setTimeout(() => {
                    this.generatePreviewImages();
                  }, 100);
                  
                  // Complete refresh after a delay
                  setTimeout(() => {
                    this.refreshTemplates();
                  }, 500);
                  
                  // Show success message
                  uni.showToast({
                    title: 'New page created successfully!',
                    icon: 'success',
                    duration: 2000
                  });
                }, 1000);
              } else {
                throw new Error('No valid page data found in response');
              }
            } else if (typeof responseData === 'string') {
              try {
                // Try to clean up the response string for proper JSON parsing
                
                // First attempt: Try direct parsing - it might already be valid JSON
                try {
                  const parsedResponse = JSON.parse(responseData);
                  // If we get here, parsing succeeded
                  
                  // Continue with the same logic as above
                  if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                    const newPage = parsedResponse.pages[0];
                    
                    // Rename the page if needed
                    if (!newPage.name.toLowerCase().includes('page')) {
                      newPage.name = newPage.name + ' Page';
                    }
                    
                    // Add the new page to the project
                    projectData.pages.push(newPage);
                    
                    // Save the updated project data
                    const updatedProjectData = JSON.stringify(projectData);
                    uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                    
                    // Save project to the cloud if logged in
                    this.saveProjectToCloud(projectData);
                    
                    // Set flag to force regeneration of images
                    uni.setStorageSync('force_regeneration', 'true');
                    
                    // Hide generation overlay
                    setTimeout(() => {
                      this.isGenerating = false;
                      
                      // Refresh templates to show the new page
                      this.loadJsonTemplates();
                      this.updateLoadingStates();
                      
                      // Force generation of new preview images
                      setTimeout(() => {
                        this.generatePreviewImages();
                      }, 100);
                      
                      // Complete refresh after a delay
                      setTimeout(() => {
                        this.refreshTemplates();
                      }, 500);
                      
                      // Show success message
                      uni.showToast({
                        title: 'New page created successfully!',
                        icon: 'success',
                        duration: 2000
                      });
                    }, 1000);
                  } else {
                    throw new Error('No valid page data found in response');
                  }
                  return; // Exit early if first attempt succeeded
                } catch (initialParseError) {
                  // First attempt failed, continue with more robust cleaning
                }
                
                // Second attempt: More thorough cleaning for complex responses
                // Extract JSON-like structure from the response if it contains backticks
                let cleanedResponse = responseData;
                
                // Replace backtick-wrapped strings with properly escaped JSON strings
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function(match, p1) {
                  // Escape any double quotes and newlines in the content
                  return JSON.stringify(p1.replace(/\n\s*/g, ' ').trim());
                });
                
                // Handle HTML content in component property by properly escaping it
                const componentMatch = cleanedResponse.match(/"component"\s*:\s*(".*?"|'.*?'|\{.*?\}|\[.*?\])/s);
                if (componentMatch) {
                  const componentContent = componentMatch[1];
                  // If component content isn't already properly quoted JSON
                  if (!componentContent.startsWith('"') || !componentContent.endsWith('"')) {
                    // Extract the content and properly escape it
                    const rawContent = componentContent.replace(/^['"{]|['"}\]]$/g, '');
                    const escapedContent = JSON.stringify(rawContent);
                    // Replace the original component content with properly escaped version
                    cleanedResponse = cleanedResponse.replace(componentMatch[0], `"component": ${escapedContent}`);
                  }
                }
                
                // Try parsing the cleaned response
                const parsedResponse = JSON.parse(cleanedResponse);
                
                // Extract the page data
                if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                  const newPage = parsedResponse.pages[0];
                  
                  // Rename the page if needed
                  if (!newPage.name.toLowerCase().includes('page')) {
                    newPage.name = newPage.name + ' Page';
                  }
                  
                  // Add the new page to the project
                  projectData.pages.push(newPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide generation overlay
                  setTimeout(() => {
                    this.isGenerating = false;
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'New page created successfully!',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                } else {
                  throw new Error('No valid page data found in response');
                }
              } catch (parseError) {
                // If all parsing attempts fail, try to extract and create a page manually
                try {
                  // Create a simple page object based on the description
                  const pageName = this.pageDescription.split(' ').slice(0, 2).join(' ');
                  const simplifiedPage = {
                    name: pageName || 'New Page',
                    component: `<div class="container mx-auto p-4">
                      <h1 class="text-2xl font-bold mb-4">Simple Page</h1>
                      <p>This is a simple page created from your description: "${this.pageDescription}"</p>
                    </div>`
                  };
                  
                  // Add the simple page to the project
                  projectData.pages.push(simplifiedPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide generation overlay
                  setTimeout(() => {
                    this.isGenerating = false;
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'Simple page created (parsing failed)',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                  
                  console.error('Used fallback page creation due to parsing error:', parseError);
                } catch (fallbackError) {
                  throw new Error(`JSON parsing failed: ${parseError.message}`);
                }
              }
            } else {
              throw new Error('Invalid response format');
            }
          } catch (error) {
            console.error('Error processing page data:', error);
            
            // Handle error
            this.isGenerating = false;
            uni.showToast({
              title: 'Failed to process page data: ' + error.message,
              icon: 'none',
              duration: 3000
            });
          }
        },
        fail: (error) => {
          // Stop the progress interval
          clearInterval(progressInterval);
          
          // Log the error
          console.error('Error generating page:', error);
          
          // Handle error
          this.isGenerating = false;
          uni.showToast({
            title: 'Error generating page: ' + (error.errMsg || 'Request failed'),
            icon: 'none',
            duration: 3000
          });
        }
      });
    },
    closeCreatePageDialog() {
      this.showCreatePageDialog = false;
    },
    
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.pagesToDelete = [];
      this.errorMessage = '';
    },
    
    togglePageSelection(index) {
      const position = this.pagesToDelete.indexOf(index);
      if (position === -1) {
        // Add to selection
        this.pagesToDelete.push(index);
      } else {
        // Remove from selection
        this.pagesToDelete.splice(position, 1);
      }
    },
    
    toggleSelectAll() {
      if (this.isAllSelected) {
        // If all are selected, deselect all
        this.pagesToDelete = [];
      } else {
        // If not all selected, select all
        this.pagesToDelete = this.jsonTemplates.map((_, index) => index);
      }
    },
    
    deleteSelectedPages() {
      // Check if we have pages to delete
      if (this.pagesToDelete.length === 0) {
        this.errorMessage = 'Please select at least one page to delete';
        return;
      }
      
      // Get existing project data
      const existingProjectData = uni.getStorageSync('latest_7_overall_page');
      if (!existingProjectData) {
        this.errorMessage = 'No project data found';
        return;
      }
      
      // Parse the project data
      const projectData = typeof existingProjectData === 'string' ? JSON.parse(existingProjectData) : existingProjectData;
      
      // Prevent deleting all pages
      if (this.pagesToDelete.length >= projectData.pages.length) {
        this.errorMessage = 'You must keep at least one page in your project';
        return;
      }
      
      // Sort indices in descending order to avoid index shifting when removing items
      const sortedIndices = [...this.pagesToDelete].sort((a, b) => b - a);
      
      // Remove pages from the project data
      sortedIndices.forEach(index => {
        projectData.pages.splice(index, 1);
      });
      
      // Save the updated project data
      const updatedProjectData = JSON.stringify(projectData);
      uni.setStorageSync('latest_7_overall_page', updatedProjectData);
      
      // Save project to the cloud if logged in
      this.saveProjectToCloud(projectData);
      
      // Set flag to force regeneration of images
      uni.setStorageSync('force_regeneration', 'true');
      
      // Close the dialog
      this.closeDeleteDialog();
      
      // Refresh templates to show the updated pages
      this.loadJsonTemplates();
      this.updateLoadingStates();
      
      // Force generation of new preview images
      setTimeout(() => {
        this.generatePreviewImages();
      }, 100);
      
      // Complete refresh after a delay
      setTimeout(() => {
        this.refreshTemplates();
      }, 500);
      
      // Show success message
      uni.showToast({
        title: 'Pages deleted successfully!',
        icon: 'success',
        duration: 2000
      });
    },
    handleCaptureError(data) {
      // Extract the template name from the element ID
      const templateName = data.element.replace('template-', '');
      
      // Set the loading state to false for this template
      if (this.templateLoadingStates[templateName]) {
        this.$set(this.templateLoadingStates, templateName, false);
      }
      
      // Create a fallback image for the missing template
      if (data.error.includes('not found')) {
        console.log(`Creating fallback image for missing template: ${templateName}`);
        
        // Set a placeholder image in capturedImages
        this.$set(this.capturedImages, templateName, '');
        
        // Mark template as not loading
        this.$set(this.templateLoadingStates, templateName, false);
        
        // If the template is in jsonTemplates but missing in DOM, try to fix it
        if (this.jsonTemplates.length > 0) {
          const missingTemplate = this.jsonTemplates.find(t => 
            t.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-') === templateName
          );
          
          if (missingTemplate) {
            console.log(`Found missing template in jsonTemplates: ${missingTemplate.name}`);
            // Force a re-render
            this.$forceUpdate();
          }
        }
      }
    },
    // Import dialog methods
    closeImportDialog() {
      this.showImportDialog = false;
      this.importFileList = [];
      this.htmlFileContent = '';
      this.htmlFileName = '';
      this.importError = '';
      this.selectedImportType = 'image';
    },
    
    selectImportType(type) {
      this.selectedImportType = type;
      this.importFileList = [];
      this.htmlFileContent = '';
      this.htmlFileName = '';
      this.importError = '';
    },
    
    onImportFileDelete(e) {
      console.log('File deleted:', e);
      // Remove only the specific item that was deleted
      if (e && e.index !== undefined) {
        // If the event provides an index, remove that specific item
        this.importFileList.splice(e.index, 1);
      } else if (e && e.tempFilePaths) {
        // If the event provides tempFilePaths, find and remove the matching item
        const deletedPaths = Array.isArray(e.tempFilePaths) ? e.tempFilePaths : [e.tempFilePaths];
        this.importFileList = this.importFileList.filter(item => {
          const itemPath = item.path || item.url || item.name;
          return !deletedPaths.includes(itemPath);
        });
      } else {
        // Fallback: if we can't determine which item was deleted, clear the list
        // This should rarely happen with uni-file-picker
        this.importFileList = [];
      }
    },
    
    importProject() {
      if (this.selectedImportType === 'html') {
        if (!this.htmlFileContent) {
          this.importError = 'Please select an HTML file to import';
          return;
        }
      } else {
        if (!this.importFileList.length) {
          this.importError = 'Please select a file to import';
          return;
        }
      }
      this.showImportDialog = false;
      // Show import progress overlay
      this.isImporting = true;
      this.importProgress = 0;
      
      // Set up progress interval - evenly distributed over 3 minutes (180 seconds)
      const progressInterval = setInterval(() => {
        if (this.importProgress < 98) {
          // Calculate increment to reach 98% in approximately 3 minutes
          // 98% over 180 seconds = ~0.54% per second
          const increment = 0.54;
          this.importProgress += increment;
        }
      }, 1000);
      
      // Check if import type is HTML - handle directly
      if (this.selectedImportType === 'html') {
        this.handleHtmlImport(progressInterval);
        return;
      }
      
      // Prepare files data for backend
      const filesData = this.importFileList.map(file => {
        return {
          url: file.url,
        };
      });      
      // Prepare request data
      const requestData = {
        files: filesData,
        importType: this.selectedImportType
      };
      
      // Show a toast to indicate processing
      uni.showToast({
        title: 'Processing imported files...',
        icon: 'none',
        duration: 3000
      });
      
      // Make the API call
      uni.request({
        url: `${API_BASE_URL}/import-project`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: requestData,
        timeout: 600000, // 10 minutes timeout
        success: (response) => {
          // Stop the progress interval
          clearInterval(progressInterval);
          this.importProgress = 100;
          
          const data = response.data;
          
          try {
            // Process the response data - handle both string and object formats
            let responseData = data;
            
            // If it's an object with a response property, extract it
            if (typeof data === 'object' && data.response) {
              responseData = data.response;
            }
            
            // If responseData is already a parsed object, use it directly
            if (typeof responseData === 'object' && responseData.pages) {
              const parsedResponse = responseData;
              
              // Extract the page data
              if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                const newPage = parsedResponse.pages[0];
                
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
                
                // Add the new page to the project
                projectData.pages.push(newPage);
                
                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                
                // Save project to the cloud if logged in
                this.saveProjectToCloud(projectData);
                
                // Set flag to force regeneration of images
                uni.setStorageSync('force_regeneration', 'true');
                
                // Hide import overlay
                setTimeout(() => {
                  this.isImporting = false;
                  
                  // Close import dialog
                  this.closeImportDialog();
                  
                  // Refresh templates to show the new page
                  this.loadJsonTemplates();
                  this.updateLoadingStates();
                  
                  // Force generation of new preview images
                  setTimeout(() => {
                    this.generatePreviewImages();
                  }, 100);
                  
                  // Complete refresh after a delay
                  setTimeout(() => {
                    this.refreshTemplates();
                  }, 500);
                  
                  // Show success message
                  uni.showToast({
                    title: 'Files imported successfully!',
                    icon: 'success',
                    duration: 2000
                  });
                }, 1000);
              } else {
                throw new Error('No valid page data found in response');
              }
            } else if (typeof responseData === 'string') {
              try {
                // Try to clean up the response string for proper JSON parsing
                
                // First attempt: Try direct parsing - it might already be valid JSON
                try {
                  const parsedResponse = JSON.parse(responseData);
                  
                  // Continue with the same logic as above
                  if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                    const newPage = parsedResponse.pages[0];
                    
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
                    
                    // Add the new page to the project
                    projectData.pages.push(newPage);
                    
                    // Save the updated project data
                    const updatedProjectData = JSON.stringify(projectData);
                    uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                    
                    // Save project to the cloud if logged in
                    this.saveProjectToCloud(projectData);
                    
                    // Set flag to force regeneration of images
                    uni.setStorageSync('force_regeneration', 'true');
                    
                    // Hide import overlay
                    setTimeout(() => {
                      this.isImporting = false;
                      
                      // Close import dialog
                      this.closeImportDialog();
                      
                      // Refresh templates to show the new page
                      this.loadJsonTemplates();
                      this.updateLoadingStates();
                      
                      // Force generation of new preview images
                      setTimeout(() => {
                        this.generatePreviewImages();
                      }, 100);
                      
                      // Complete refresh after a delay
                      setTimeout(() => {
                        this.refreshTemplates();
                      }, 500);
                      
                      // Show success message
                      uni.showToast({
                        title: 'Files imported successfully!',
                        icon: 'success',
                        duration: 2000
                      });
                    }, 1000);
                  } else {
                    throw new Error('No valid page data found in response');
                  }
                  return; // Exit early if first attempt succeeded
                } catch (initialParseError) {
                  // First attempt failed, continue with more robust cleaning
                }
                
                // Second attempt: More thorough cleaning for complex responses
                let cleanedResponse = responseData;
                
                // Replace backtick-wrapped strings with properly escaped JSON strings
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function(match, p1) {
                  return JSON.stringify(p1.replace(/\n\s*/g, ' ').trim());
                });
                
                // Handle HTML content in component property by properly escaping it
                const componentMatch = cleanedResponse.match(/"component"\s*:\s*(".*?"|'.*?'|\{.*?\}|\[.*?\])/s);
                if (componentMatch) {
                  const componentContent = componentMatch[1];
                  if (!componentContent.startsWith('"') || !componentContent.endsWith('"')) {
                    const rawContent = componentContent.replace(/^['"{]|['"}\]]$/g, '');
                    const escapedContent = JSON.stringify(rawContent);
                    cleanedResponse = cleanedResponse.replace(componentMatch[0], `"component": ${escapedContent}`);
                  }
                }
                
                // Try parsing the cleaned response
                const parsedResponse = JSON.parse(cleanedResponse);
                
                // Extract the page data
                if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
                  const newPage = parsedResponse.pages[0];
                  
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
                  
                  // Add the new page to the project
                  projectData.pages.push(newPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide import overlay
                  setTimeout(() => {
                    this.isImporting = false;
                    
                    // Close import dialog
                    this.closeImportDialog();
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'Files imported successfully!',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                } else {
                  throw new Error('No valid page data found in response');
                }
              } catch (parseError) {
                // If all parsing attempts fail, try to extract and create a page manually
                try {
                  // Create a simple page object based on the imported files
                  const pageName = `Imported ${this.selectedImportType} ${new Date().toLocaleDateString()}`;
                  const simplifiedPage = {
                    name: pageName,
                    component: `<div class="container mx-auto p-4">
                      <h1 class="text-2xl font-bold mb-4">Imported Content</h1>
                      <p>This page was created from imported ${this.selectedImportType} files.</p>
                      <p>Files imported: ${this.importFileList.map(f => f.name).join(', ')}</p>
                    </div>`
                  };
                  
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
                  
                  // Add the simple page to the project
                  projectData.pages.push(simplifiedPage);
                  
                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);
                  
                  // Save project to the cloud if logged in
                  this.saveProjectToCloud(projectData);
                  
                  // Set flag to force regeneration of images
                  uni.setStorageSync('force_regeneration', 'true');
                  
                  // Hide import overlay
                  setTimeout(() => {
                    this.isImporting = false;
                    
                    // Close import dialog
                    this.closeImportDialog();
                    
                    // Refresh templates to show the new page
                    this.loadJsonTemplates();
                    this.updateLoadingStates();
                    
                    // Force generation of new preview images
                    setTimeout(() => {
                      this.generatePreviewImages();
                    }, 100);
                    
                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);
                    
                    // Show success message
                    uni.showToast({
                      title: 'Simple page created (parsing failed)',
                      icon: 'success',
                      duration: 2000
                    });
                  }, 1000);
                  
                  console.error('Used fallback page creation due to parsing error:', parseError);
                } catch (fallbackError) {
                  throw new Error(`JSON parsing failed: ${parseError.message}`);
                }
              }
            } else {
              throw new Error('Invalid response format');
            }
          } catch (error) {
            console.error('Error processing import data:', error);
            
            // Handle error
            this.isImporting = false;
            uni.showToast({
              title: 'Failed to process import data: ' + error.message,
              icon: 'none',
              duration: 3000
            });
          }
        },
        fail: (error) => {
          // Stop the progress interval
          clearInterval(progressInterval);
          
          // Log the error
          console.error('Error importing files:', error);
          
          // Handle error
          this.isImporting = false;
          uni.showToast({
            title: 'Error importing files: ' + (error.errMsg || 'Request failed'),
            icon: 'none',
            duration: 3000
          });
        }
      });
    },
    
    getFileNameWithoutExt(pathStr) {
      try {
        const parts = String(pathStr).split(/[\\/]/);
        const filename = parts[parts.length - 1];
        return filename.replace(/\.[^.]+$/, '');
      } catch (_) {
        return 'Imported';
      }
    },
    
    mimeTypeFromExt(ext) {
      switch (ext) {
        case 'png': return 'image/png';
        case 'jpg':
        case 'jpeg': return 'image/jpeg';
        case 'gif': return 'image/gif';
        case 'webp': return 'image/webp';
        case 'svg': return 'image/svg+xml';
        default: return 'application/octet-stream';
      }
    },
    
    escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    
    getFileTypeFromName(filename) {
      if (!filename) return 'unknown';
      const ext = filename.split('.').pop().toLowerCase();
      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'webp':
        case 'svg':
          return 'image';
        case 'html':
        case 'htm':
          return 'html';
        case 'vue':
          return 'vue';
        case 'jsx':
        case 'tsx':
          return 'react';
        default:
          return 'unknown';
      }
    },
    successUploadFiles(){
      console.log('successUploadFiles',this.importFileList);
    },
    handleHtmlImport(progressInterval) {
      try {
        // Stop the progress interval
        clearInterval(progressInterval);
        this.importProgress = 100;
        
        console.log('Importing HTML content, length:', this.htmlFileContent.length);
        console.log('HTML content preview:', this.htmlFileContent.substring(0, 200));
        
        // Create a new page from the HTML content
        // const timestamp = new Date().toLocaleString();
        const pageName = this.htmlFileName 
          ? `Imported ${this.htmlFileName}`
          : `Imported HTML ${timestamp}`;
        const newPage = {
          name: pageName,
          component: this.htmlFileContent
        };
        
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
        
        // Add the new page to the project
        projectData.pages.push(newPage);
        
        // Save the updated project data
        const updatedProjectData = JSON.stringify(projectData);
        uni.setStorageSync('latest_7_overall_page', updatedProjectData);
        
        // Save project to the cloud if logged in
        this.saveProjectToCloud(projectData);
        
        // Set flag to force regeneration of images
        uni.setStorageSync('force_regeneration', 'true');
        
        // Hide import overlay
        setTimeout(() => {
          this.isImporting = false;
          
          // Close import dialog
          this.closeImportDialog();
          
          // Refresh templates to show the new page
          this.loadJsonTemplates();
          this.updateLoadingStates();
          
          // Force generation of new preview images
          setTimeout(() => {
            this.generatePreviewImages();
          }, 100);
          
          // Complete refresh after a delay
          setTimeout(() => {
            this.refreshTemplates();
          }, 500);
          
          // Show success message
          uni.showToast({
            title: 'HTML file imported successfully!',
            icon: 'success',
            duration: 2000
          });
        }, 1000);
        
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
    
    // Choose HTML file using FileReader API (H5 compatible)
    chooseHtmlFile() {
      // Clear previous HTML content first
      this.htmlFileContent = '';
      this.htmlFileName = '';
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.html'; // 限制为HTML文件
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.readFileContent(file);
        }
        // Clear the input value to allow selecting the same file again
        input.value = '';
      };
      input.click();
    },
    
    // Read HTML file content using FileReader
    readFileContent(file) {
      console.log('Reading file:', file.name, 'Size:', file.size);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        this.htmlFileContent = content;
        this.htmlFileName = file.name; // Store the filename
        console.log('HTML file content loaded:', file.name);
        console.log('Content length:', this.htmlFileContent.length);
        console.log('First 100 characters:', this.htmlFileContent.substring(0, 100));
        
        // Validate that it's actually HTML content
        if (this.htmlFileContent && this.htmlFileContent.trim()) {
          uni.showToast({
            title: `HTML file "${file.name}" loaded successfully`,
            icon: 'success',
            duration: 2000
          });
        } else {
          this.htmlFileContent = '';
          this.htmlFileName = '';
          uni.showToast({
            title: 'Invalid HTML file content',
            icon: 'none',
            duration: 2000
          });
        }
      };
      
      reader.onerror = () => {
        console.error('读取文件失败');
        this.htmlFileContent = '';
        uni.showToast({
          title: 'Failed to read file',
          icon: 'none',
          duration: 2000
        });
      };
      
      reader.readAsText(file, 'UTF-8'); // 以文本形式读取
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
    // console.log('Renderjs module mounted, html2canvas ready');
  },
  
  beforeDestroy() {
    // Clean up event listeners
    uni.$off('capture-element', this.captureElement);
  },
  
  methods: {
    captureElement(data) {
      const { elementId } = data;
      setTimeout(() => {
        try {
          const dom = document.getElementById(elementId);
          if (!dom) {
            console.error(`Element not found: ${elementId}`);   
            uni.$emit('capture-error', { element: elementId, error: 'Element not found' });
            return;
          }
          
          // Check if element has size
          if (dom.clientWidth <= 0 || dom.clientHeight <= 0) {
            console.error(`Element has no size: ${elementId}`);
            uni.$emit('capture-error', { element: elementId, error: 'Element has no size' });
            return;
          }
          
          console.log(`Capturing element: ${elementId}`);
          
          html2canvas(dom, {
            width: dom.clientWidth,
            height: dom.clientHeight,
            scrollY: 0,
            scrollX: 0,
            useCORS: true,
            scale: 1.5, // Reduced from 2 for faster rendering
            logging: false, // Disable logging for performance
            backgroundColor: null, // Transparent background
            imageTimeout: 0, // No timeout for images
            allowTaint: true, // Allow tainted canvas for better performance
            removeContainer: true // Clean up after rendering
          }).then((canvas) => {
            const imageData = canvas.toDataURL('image/png', 0.85); // Added compression for faster processing
            // Send the image data back to the Vue component
            uni.$emit('image-captured', { element: elementId, imageData });
            console.log(`Successfully captured ${elementId}`);
          }).catch(err => {
            console.error(`Failed to generate image for ${elementId}:`, err);
            uni.$emit('capture-error', { element: elementId, error: err.toString() });
          });
        } catch (err) {
          console.error(`Exception while capturing ${elementId}:`, err);
          uni.$emit('capture-error', { element: elementId, error: `Exception: ${err.toString()}` });
        }
      }, 50); // Reduced from 100ms
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
  width: 75px;
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

.vvveb-nav-item {
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
    height: 10%;
    gap: 6px;
    background-color: #e53935;
    padding: 7px 14px;
    margin-bottom: 7px;
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

.template-count {
  font-size: 16px;
  font-weight: 400;
  color: #666;
}

/* Templates Grid */
.templates-grid-container {
  max-height: 75vh;
  overflow-y: auto;
  padding-right: 15px;
  padding-bottom: 20px;
}

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
  min-width: 200px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }

  .template-image {
    width: 100%;
    height: 150px;
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

.add-template-item {
  border: 2px dashed #ddd;
  background-color: #f9f9f9;
  
  &:hover {
    border-color: #e53935;
    background-color: #fff;
  }
}

.add-template-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: transparent;
}

.add-icon {
  font-size: 40px;
  color: #aaa;
  font-weight: 300;
  transition: color 0.3s ease;
  
  .add-template-item:hover & {
    color: #e53935;
  }
}



/* Responsive adjustments */
@media (max-width: 1400px) {
  .templates-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1100px) {
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

  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .templates-grid {
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

/* Add this color palette component right after the progress overlay */
.color-palette-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.color-palette-container {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 750px;
  /* Increased to accommodate more colors */
  text-align: center;
}

.color-palette-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
}

.color-palette-row {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  /* Allow wrapping on smaller screens */
}

.color-swatch {
  width: 70px;
  /* Wider to match image */
  height: 50px;
  /* Taller to match image */
  border-radius: 25px;
  /* More rounded to match pill shape */
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  /* Space for the hex text */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  &.selected {
    border: 2px solid #333;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
}

.color-check {
  color: white;
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.color-hex {
  font-size: 10px;
  color: #333;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 0;
  border-radius: 0 0 25px 25px;
}

.color-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
}

.color-preview-section {
  margin: 25px 0;
}

.preview-button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  /* Rounded to match color swatches */
  cursor: pointer;
  color: white;
  font-weight: 500;
  text-align: center;
  display: inline-block;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.preview-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.preview-accent {
  width: 40px;
  height: 40px;
  border: 3px solid;
  border-radius: 8px;
  background-color: white;
}

.color-actions {
  display: inline;
}

.color-cancel,
.color-confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  /* Reduced padding */
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: 500;
  min-width: 100px;
  /* Reduced from 120px */
  font-size: 14px;
  /* Reduced from 16px */

  &:hover {
    transform: translateY(-2px);
  }
}

.color-cancel {
  background-color: #f5f5f5;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
}

.color-confirm {
  &:hover {
    opacity: 0.9;
  }
}

.color-input-label {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}

.color-input {
  height: 36px;
  width: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 8px;
}

.color-preview-swatch {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-left: 10px;
}

.color-palette-error {
  margin: 15px auto;
  padding: 12px 15px;
  background-color: #ffebee;
  border-radius: 8px;
  border: 1px solid #ffcdd2;
  max-width: 80%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-text {
  font-size: 14px;
  color: #d32f2f;
  font-weight: 500;
}

/* Custom Action Sheet Styles */
.custom-action-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.custom-action-sheet {
  width: 100%;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  animation: slide-up 0.3s ease;
}

.custom-action-sheet-title {
  text-align: center;
  padding: 16px;
  font-size: 16px;
  color: #888;
  border-bottom: 1px solid #eee;
}

.custom-action-sheet-item {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #eee;

  &:active {
    background-color: #f5f5f5;
  }
}

.custom-action-sheet-cancel {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: #e53935;
  margin-top: 8px;

  &:active {
    background-color: #f5f5f5;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

/* Create New Page Dialog Styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  padding: 30px;
  position: relative;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

/* Device options styles */
.device-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
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
}

.device-option:hover {
  background-color: #f0f0f0;
}

.device-option.selected {
  border-color: #e53935;
  background-color: rgba(229, 57, 53, 0.1);
}

.device-option text {
  color: #333;
  font-size: 16px;
}

.device-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
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

.error-notification {
  background-color: #ffebee;
  border-radius: 8px;
  border: 1px solid #ffcdd2;
  padding: 12px 15px;
  margin-bottom: 20px;
}

.try-example-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.description-container {
  position: relative;
  margin-bottom: 20px;
}

.description-label {
  font-size: 20px;
  color: #333;
  margin-right: 10px;
}

.project-description-input {
  width: 100%;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
}

.char-count {
  font-size: 12px;
  color: #999;
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

/* Delete Pages Dialog Styles */
.select-all-container {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.select-all-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.delete-pages-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
}

.delete-page-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.delete-page-name {
  margin-left: 10px;
  font-size: 16px;
  color: #333;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #999;
}

.delete-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.delete-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn {
  background-color: #e53935;
  color: #fff;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  &:disabled {
    background-color: #ffcdd2;
    cursor: not-allowed;
  }
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
}

/* Custom Checkbox Styles */
.custom-checkbox {
  /* Override default checkbox styles */
  /deep/ .uni-checkbox-input {
    border-color: #e0e0e0;
    
    &.uni-checkbox-input-checked {
      background-color: #e53935 !important;
      border-color: #e53935 !important;
    }
  }
}

/* Alternative deep selector for better compatibility */
::v-deep .custom-checkbox .uni-checkbox-input {
  border-color: #e0e0e0;
}

::v-deep .custom-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
  background-color: #e53935 !important;
  border-color: #e53935 !important;
}

/* For newer Vue versions */
:deep(.custom-checkbox .uni-checkbox-input) {
  border-color: #e0e0e0;
}

:deep(.custom-checkbox .uni-checkbox-input.uni-checkbox-input-checked) {
  background-color: #e53935 !important;
  border-color: #e53935 !important;
}

/* Custom checkbox with red color */
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 3px;
  position: relative;
  margin-right: 10px;
  transition: all 0.2s;
}

.checkbox-custom.checked {
  background-color: #e53935;
  border-color: #e53935;
}

.checkbox-custom.checked:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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

.import-type-tabs {
  display: flex;
  gap: 8px;
  margin: 8px 0 12px;
}
.import-type-tab {
  padding: 6px 10px;
  border-radius: 6px;
  background: #f2f2f2;
  color: #333;
  font-size: 12px;
}
.import-type-tab.active {
  background: #e53935;
  color: #fff;
}
.import-name-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.import-name-label {
  width: 90px;
  font-size: 12px;
  color: #555;
}
.import-name-input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
}

/* File Upload Container and Placeholder Styles */
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
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
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

/* HTML file picker styles */
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

.import-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}

.import-btn, .cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.import-btn {
  background-color: #e53935;
  color: white;
}

.import-btn:hover:not(:disabled) {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

.import-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

/* Consistent sizing for Import dialog across types */
.import-dialog {
  min-height: 520px;
}

.import-dialog .dialog-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.import-dialog .file-upload-container {
  flex: 1;
}

/* Keep description height consistent even if text length differs */
.import-description {
  min-height: 20px;
}

/* Cap the file list area so it doesn't grow when selecting many images */
:deep(.uni-file-picker__container) {
  max-height: 240px !important;
}

:deep(.uni-file-picker__lists) {
  max-height: 240px !important;
  overflow-y: auto !important;
}

/* Ensure consistent placeholder centering and area sizing */
.import-dialog .file-upload-container {
  min-height: 260px;
  display: flex;
  align-items: center;
}

.import-dialog .upload-placeholder {
  height: 100%;
}

/* Keep the action buttons at a consistent bottom position */
.import-dialog .import-actions {
  margin-top: auto;
  padding-top: 16px;
}

</style>
