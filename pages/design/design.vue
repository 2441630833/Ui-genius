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

          <view class="try-example-container">
            <text class="description-label">Describe your page in plain English</text>
            <button class="try-example-btn" @click="tryPageExample">Try example</button>
          </view>
          <view class="description-container">
            <textarea class="project-description-input" placeholder="Enter your page description"
              v-model="pageDescription" maxlength="300"></textarea>
            <text class="char-count">{{ pageDescription.length }}/300</text>
          </view>

          <button class="continue-btn" @click="createPage">Continue</button>
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
      examplePageDescription: 'a simple page just includes one heading',
      // examplePageDescription: 'A modern contact page with a form and interactive map, including name, email, and message fields',
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
        // Get all template IDs from both filtered templates and proposal templates
        const imagesToExport = [];
        
        // Add images from filtered templates
        if (this.filteredTemplates && this.filteredTemplates.length > 0) {
          this.filteredTemplates.forEach(template => {
            const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
            const imageData = uni.getStorageSync(`uigenius_image_${key}`);
            if (imageData) {
              imagesToExport.push({
                key: key,
                data: imageData
              });
            }
          });
        }
        

        
        // If no dynamic templates, fall back to default template keys
        if (imagesToExport.length === 0) {
          const defaultKeys = [
            'signup', 'home', 'notification', 'profile',
            'settings'
          ];
          
          defaultKeys.forEach(key => {
            const imageData = uni.getStorageSync(`uigenius_image_${key}`);
            if (imageData) {
              imagesToExport.push({
                key: key,
                data: imageData
              });
            }
          });
        }

        if (imagesToExport.length === 0) {
          uni.hideLoading();
          uni.showToast({
            title: 'No images available to export',
            icon: 'none',
            duration: 2000
          });
          this.isExporting = false;
          return;
        }
        

        // console.log(`Found ${imagesToExport.length} images to export`);
        
        // #ifdef H5 
        this.exportImagesWeb(imagesToExport);
        // #endif
        // #ifdef APP-PLUS
        this.exportImagesMobile(imagesToExport);
        // #endif
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error exporting images',
          icon: 'none',
          duration: 2000
        });
        // console.error('Error exporting images:', error);
        this.isExporting = false;
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

      // Set up progress interval - slower progression for longer expected wait time
      const progressInterval = setInterval(() => {
        if (this.generationProgress < 95) {
          // Slower increment for longer expected time (10+ minutes)
          const increment = this.generationProgress < 70 ? 0.5 : 0.2;
          this.generationProgress += increment;
        }
      }, 3000);

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
            
            // Clean up the response string - replace backticks with properly escaped quotes
            if (typeof responseData === 'string') {
              // Replace backtick-wrapped strings with properly escaped JSON strings
              responseData = responseData.replace(/`([\s\S]*?)`/g, function(match, p1) {
                // Escape any double quotes and newlines in the content
                return JSON.stringify(p1.replace(/\n\s*/g, ' ').trim());
              });
            }
            
            // Now parse the cleaned JSON
            const parsedResponse = JSON.parse(responseData);
            // console.log(parsedResponse)
            
            // Extract the page data
            if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
              const newPage = parsedResponse.pages[0];
              // console.log(newPage)
              
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
        indexContent += `
  </ul>
</div>`;

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
            framework: framework
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            uni.hideLoading();

            if (res.statusCode === 200 && res.data) {
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

              // Use the correct file extension based on the framework
              const fileExtension = framework === 'react' ? '.jsx' : '.vue';
              const fileName = `index${fileExtension}`;
              
              // Get the component code from the response
              const componentCode = res.data.code || 'No code generated';
              
              // Add the component file to the zip
              zip.file(fileName, componentCode);

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

      // Set up progress interval - slower progression for longer expected wait time
      const progressInterval = setInterval(() => {
        if (this.generationProgress < 95) {
          // Slower increment for longer expected time (10+ minutes)
          const increment = this.generationProgress < 70 ? 0.5 : 0.2;
          this.generationProgress += increment;
        }
      }, 3000);

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
        device_type: uni.getStorageSync('selectedDevice') || 'desktop',
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
            
            // Clean up the response string - replace backticks with properly escaped quotes
            if (typeof responseData === 'string') {
              // Replace backtick-wrapped strings with properly escaped JSON strings
              responseData = responseData.replace(/`([\s\S]*?)`/g, function(match, p1) {
                // Escape any double quotes and newlines in the content
                return JSON.stringify(p1.replace(/\n\s*/g, ' ').trim());
              });
            }
            
            // Now parse the cleaned JSON
            const parsedResponse = JSON.parse(responseData);
            // console.log(parsedResponse)
            
            // Extract the page data
            if (parsedResponse && parsedResponse.pages && parsedResponse.pages.length > 0) {
              const newPage = parsedResponse.pages[0];
              // console.log(newPage)
              
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
  font-size: 14px;
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
</style>
