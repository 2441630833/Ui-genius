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
          <view 
            v-for="(color, index) in neutralColors" 
            :key="'neutral-'+index" 
            class="color-swatch" 
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>
        
        <!-- Pastel Colors Row -->
        <view class="color-palette-row">
          <view 
            v-for="(color, index) in pastelColors" 
            :key="'pastel-'+index" 
            class="color-swatch" 
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>
        
        <!-- Warm Colors Row -->
        <view class="color-palette-row">
          <view 
            v-for="(color, index) in warmColors" 
            :key="'warm-'+index" 
            class="color-swatch" 
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>
        
        <!-- Cool Colors Row -->
        <view class="color-palette-row">
          <view 
            v-for="(color, index) in coolColors" 
            :key="'cool-'+index" 
            class="color-swatch" 
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': selectedColor === color.hex }"
            @click="selectColor(color.hex)">
            <text v-if="selectedColor === color.hex" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>
        
        <!-- Custom color input -->
        <view class="color-input-container">
          <text class="color-input-label">Custom Color:</text>
          <input 
            type="text" 
            v-model="customColor" 
            class="color-input" 
            placeholder="#RRGGBB" 
            @input="validateColorInput"
          />
          <view 
            class="color-preview-swatch" 
            :style="{ backgroundColor: isValidColor(customColor) ? customColor : '#cccccc' }"
            :class="{ 'selected': customColor && isValidColor(customColor) && !selectedColor }"
          ></view>
        </view>
        
        <!-- Simplified Preview section - only button -->
        <!-- <view class="color-preview-section">
          <text class="preview-label">Preview:</text>
          <view class="preview-button" :style="{ backgroundColor: previewColor }">Button</view>
        </view> -->
        
        <view class="color-actions">
          <button class="color-confirm" :style="{ backgroundColor: previewColor, color: '#ffffff' }" @click="confirmColorSelection">Apply Theme</button>
          <button class="color-cancel" @click="cancelColorSelection">Cancel</button>
        </view>
      </view>
    </view>

    <!-- Hidden Template Previews for html2canvas -->
    <view class="hidden-templates">
      <!-- Dynamic Templates from JSON -->
      <template v-if="jsonTemplates.length > 0">
        <!-- Only render the filtered templates -->
        <view v-for="(template, index) in filteredTemplates" :key="index" 
              :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')" 
              class="template-preview-content">
          <!-- <view class="preview-header">
            <text class="preview-title">{{ template.name.replace(/ Page/i, '') }}</text>
          </view> -->
          <view class="preview-content" v-html="getSimplifiedPreview(template)"></view>
        </view>
        
        <!-- Render proposal templates separately -->
        <view v-for="(template, index) in activeProposalTemplates" :key="'proposal-'+index" 
              :id="'proposal-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')" 
              class="template-preview-content">
          <!-- <view class="preview-header">
            <text class="preview-title">{{ template.name.replace(/ Page/i, '') }}</text>
          </view> -->
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
      </template>
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
            <image class="icon" :src="selectedDevice === 'desktop' ? '/static/desktop_active.png' : '/static/desktop.png'" @click="selectDevice('desktop')"></image>
            <image class="icon" :src="selectedDevice === 'mobile' ? '/static/mobile_active.png' : '/static/mobile.png'" @click="selectDevice('mobile')"></image>
          </view>

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
          
          <!-- Refresh Button -->
          <view class="tool-button" @click="refreshData">
            <text class="button-text">Refresh</text>
          </view>

          <view class="preview-button">
            <image class="icon" src="/static/play_white.png"></image>
            <text class="preview-text">Preview</text>
          </view>
        </view>
      </view>

      <!-- Templates Grid -->
      <view class="section">
        <text class="section-title">Basic Prototype</text>
        <view class="templates-grid">
          <!-- Dynamic Templates from JSON -->
          <template v-if="jsonTemplates.length > 0">
            <!-- Filter to only show the 5 main templates -->
            <x-skeleton v-for="(template, index) in filteredTemplates" :key="index"
                      type="banner" :loading="templateLoadingStates[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')]">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')">
                  <image class="template-image"
                    :src="capturedImages[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')] || ''"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">{{ template.name.replace(/ Page/i, '') }}</text>
                </view>
              </view>
            </x-skeleton>
          </template>
          
          <!-- Fallback Static Templates -->
          <template v-else>
            <!-- Signup Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.signup">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" id="template-signup">
                  <image class="template-image"
                    :src="capturedImages.signup"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Signup</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Home Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.home">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" id="template-home">
                  <image class="template-image"
                    :src="capturedImages.home"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Home</text>
                </view>
              </view>
            </x-skeleton>

            <!-- notification Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.notification">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" id="template-notification">
                  <image class="template-image"
                    :src="capturedImages.notification"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">notification</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Profile Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.profile">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" id="template-profile">
                  <image class="template-image"
                    :src="capturedImages.profile"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Profile</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Settings Template -->
            <x-skeleton type="banner" :loading="templateLoadingStates.settings">
              <view class="template-item" @click="navigateToGrapesEditor()">
                <view class="template-preview" id="template-settings">
                  <image class="template-image"
                    :src="capturedImages.settings"
                    mode="aspectFill"></image>
                </view>
                <view class="template-label">
                  <text class="template-name">Settings</text>
                </view>
              </view>
            </x-skeleton>
          </template>
        </view>
      </view>

      <!-- Additional Design Proposals -->
      <view class="section">
        <text class="section-title">Additional Pages</text>
        <view class="proposals-grid">
          <!-- Dynamic Proposals from JSON -->
          <template v-if="jsonTemplates.length > 0 && activeProposalTemplates.length > 0">
            <!-- Take a subset of templates to show as proposals (different layouts) -->
            <x-skeleton v-for="(template, index) in activeProposalTemplates" :key="index"
                      type="banner" :loading="proposalLoadingStates[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')]">
              <view class="proposal-item" @click="navigateToGrapesEditor()">
                <view class="proposal-preview" :id="'proposal-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')">
                  <image class="proposal-image"
                    :src="capturedImages[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')] || ''"
                    mode="aspectFill"></image>
                </view>
                <view class="proposal-label">
                  <text class="proposal-name">{{ template.name.replace(/ Page/i, '') }} Alternative</text>
                </view>
              </view>
            </x-skeleton>
          </template>
          
          <!-- Fallback Static Proposals -->
          <template v-else>
            <!-- Login Screen -->
            <x-skeleton type="banner" :loading="proposalLoadingStates.login">
              <view class="proposal-item" @click="navigateToGrapesEditor()">
                <view class="proposal-preview" id="proposal-login">
                  <image class="proposal-image"
                    :src="capturedImages.login"
                    mode="aspectFill"></image>
                </view>
                <view class="proposal-label">
                  <text class="proposal-name">Login Screen</text>
                </view>
              </view>
            </x-skeleton>

            <!-- Dashboard Screen -->
            <x-skeleton type="banner" :loading="proposalLoadingStates.dashboard">
              <view class="proposal-item" @click="navigateToGrapesEditor()">
                <view class="proposal-preview" id="proposal-dashboard">
                  <image class="proposal-image"
                    :src="capturedImages.dashboard"
                    mode="aspectFill"></image>
                </view>
                <view class="proposal-label">
                  <text class="proposal-name">Dashboard Screen</text>
                </view>
              </view>
            </x-skeleton>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import html2canvas from 'html2canvas';
import { API_BASE_URL } from '../../env.js';

export default {
  name: 'Design',
  data() {
    return {
      capturedImages: {
        signup: '',
        home: '',
        notification: '',
        profile: '',
        settings: '',
        login: '',
        dashboard: ''
      },
      // Add a version tracker for template content
      templateVersions: {},
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
        notification: true,
        profile: true,
        settings: true
      },
      proposalLoadingStates: {
        login: true,
        dashboard: true
      },
      jsonTemplates: [],
      dynamicTemplateIds: [],
      proposalTemplates: [],
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
      colorPaletteError: ''
    }
  },

  computed: {
    // Computed property for proposal templates to avoid infinite loop
    activeProposalTemplates() {
      return this.proposalTemplates;
    },
    filteredTemplates() {
      // Only show the 5 main templates that match the fallback static templates
      if (!this.jsonTemplates || this.jsonTemplates.length === 0) {
        return [];
      }
      
      // Define the template types we want to show
      const desiredTypes = ['home', 'signup', 'notification', 'profile', 'settings'];
      const filteredTemplates = [];
      
      // First try to find templates matching our desired types
      for (const type of desiredTypes) {
        const match = this.jsonTemplates.find(template => 
          template.name.toLowerCase().includes(type)
        );
        
        if (match) {
          filteredTemplates.push(match);
        }
      }
      
      // If we don't have 5 templates yet, add others until we reach 5
      if (filteredTemplates.length < 5) {
        for (const template of this.jsonTemplates) {
          if (!filteredTemplates.includes(template)) {
            filteredTemplates.push(template);
            if (filteredTemplates.length >= 5) break;
          }
        }
      }
      
      return filteredTemplates;
    }
  },

  mounted() {
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
    });
    
    // Load images from storage on initial mount to avoid display issues
    this.loadImagesFromStorage();
    
    // Set up loading state timers
    setTimeout(() => {
      this.templateLoadingStates.signup = false;
    }, 1500);
    
    setTimeout(() => {
      this.templateLoadingStates.home = false;
    }, 1800);
    
    setTimeout(() => {
      this.templateLoadingStates.notification = false;
    }, 2100);
    
    setTimeout(() => {
      this.templateLoadingStates.profile = false;
    }, 2400);
    
    setTimeout(() => {
      this.templateLoadingStates.settings = false;
      this.templatesLoading = false;
    }, 2700);
    
    // Staggered loading for proposals
    setTimeout(() => {
      this.proposalLoadingStates.login = false;
    }, 2200);
    
    setTimeout(() => {
      this.proposalLoadingStates.dashboard = false;
      this.proposalsLoading = false;
    }, 2500);
    // console.log(this.jsonTemplates);
  },
  
  onShow(){
    // Load images from local storage first and wait for a tick to ensure reactivity
    this.loadImagesFromStorage();
    
    // Load selectedDevice from storage if available
    const storedDevice = uni.getStorageSync('selectedDevice');
    if (storedDevice) {
      this.selectedDevice = storedDevice;
    }
    
    // Use nextTick to ensure the previous operation completes
    this.$nextTick(() => {
      // Load JSON templates if available
      this.loadJsonTemplates();
      
      // Generate preview images first (only if we don't have them in storage)
      if (this.needsImageGeneration()) {
        this.generatePreviewImages();
      }
      
      // Check if we should generate UI based on the flag from createProject
      this.shouldGenerateUI = uni.getStorageSync('shouldGenerateUI') === 'true';
      
      // Only generate UI if the flag is set and we have a project description
      if (this.shouldGenerateUI && 
          !uni.getStorageSync('latest_7_overall_page') && 
          uni.getStorageSync('projectDescription')) {
        // Clear the flag after using it
        uni.removeStorageSync('shouldGenerateUI');
        this.generateUI();
      } else {
        // If we already have JSON data, load it
        this.loadJsonTemplates();
      }
    });
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
            
            // Generate proposal templates
            this.proposalTemplates = this.getProposalTemplates();
          }
        } catch (e) {
          // console.error('Error parsing JSON template data:', e);
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
        }
      });
      
      // If any templates have changed, regenerate the images
      if (needsUpdate) {
        // Set a short timeout to allow the DOM to update first
        setTimeout(() => {
          this.generatePreviewImages();
        }, 300);
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
      
      // Create loading states for each template
      this.dynamicTemplateIds.forEach(id => {
        const key = id.replace('template-', '');
        this.$set(this.templateLoadingStates, key, true);
        
        // Also prepare capturedImages object
        if (!this.capturedImages[key]) {
          this.$set(this.capturedImages, key, '');
        }
      });
    },
    
    refreshData() {
      // Clear stored images first
      this.clearStoredImages();
      
      // Reset all loading states
      this.templatesLoading = true;
      this.proposalsLoading = true;
      
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
        
        // Reset proposal loading states for static templates
        this.proposalLoadingStates.login = true;
        this.proposalLoadingStates.dashboard = true;
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
      
      // For static templates, use staggered loading for proposals
      if (this.dynamicTemplateIds.length === 0) {
        setTimeout(() => {
          this.proposalLoadingStates.login = false;
        }, 2200);
        
        setTimeout(() => {
          this.proposalLoadingStates.dashboard = false;
          this.proposalsLoading = false;
        }, 2500);
      } else {
        // For dynamic templates, reveal proposals with staggered timing
        const proposalKeys = Object.keys(this.proposalLoadingStates);
        proposalKeys.forEach((key, index) => {
          setTimeout(() => {
            this.$set(this.proposalLoadingStates, key, false);
            if (index === proposalKeys.length - 1) {
              this.proposalsLoading = false;
            }
          }, 2200 + (index * 300));
        });
      }
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
        'template-settings': 'settings',
        'proposal-login': 'login',
        'proposal-dashboard': 'dashboard'
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
        // Only use template IDs for the filtered templates
        templateIds = this.filteredTemplates.map(template => 
          'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')
        );
        
        // Add proposal template IDs
        const proposalIds = this.activeProposalTemplates.map(template => 
          'proposal-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')
        );
        
        // Combine template and proposal IDs
        templateIds = [...templateIds, ...proposalIds];
        
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
          'template-settings',
          'proposal-login',
          'proposal-dashboard'
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
      
      // Capture elements sequentially with a shorter delay
      const captureSequentially = (index) => {
        if (index >= templatesToGenerate.length) {
          uni.hideLoading();
          return;
        }
        
        const id = templatesToGenerate[index];
        
        // Check if element exists before trying to capture it
        const element = document.getElementById(id);
        if (!element) {
          // console.warn(`Element not found: ${id}, skipping capture`);
          // Move to next element
          setTimeout(() => {
            captureSequentially(index + 1);
          }, 50);
          return;
        }
        
        uni.$emit('capture-element', { elementId: id });
        
        // Move to next element after a short delay
        setTimeout(() => {
          captureSequentially(index + 1);
        }, 300);
      };
      
      // Start the sequential capture
      captureSequentially(0);
    },
    
    generateUI() {
      // Prevent multiple simultaneous API calls
      if (this.isGenerating) {
        // console.log('Generation already in progress, skipping duplicate call');
        return;
      }
      
      // Clear any previous error message
      this.errorMessage = '';
    
        this.projectDescription = uni.getStorageSync('projectDescription');
        if (this.projectDescription) {
          // Start progress bar with improved initial progress
          this.isGenerating = true;
          this.generationProgress = 10;
          
          // Add simulated progress to avoid stalling perception
          this.progressInterval = setInterval(() => {
            // Increase progress gradually but slow down as we approach key milestones
            if (this.generationProgress < 20) {
              this.generationProgress += 1.5;
            } else if (this.generationProgress < 50) {
              this.generationProgress += 0.8;
            } else if (this.generationProgress < 80) {
              this.generationProgress += 0.4;
            } else if (this.generationProgress < 90) {
              this.generationProgress += 0.2;
            }
            // Cap at 90% - the real completion will set it to 100%
            if (this.generationProgress > 90) {
              this.generationProgress = 90;
            }
          }, 500);
          
          try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_BASE_URL}/generate-ui`, true);
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
                    
                    // Update progress based on status with improved distribution
                    if (data.status === 'started') {
                      // Clear the interval when we get real progress
                      if (this.progressInterval) {
                        clearInterval(this.progressInterval);
                        this.progressInterval = null;
                      }
                      // Set to at least 20% when started
                      this.generationProgress = Math.max(20, data.progress);
                      
                      // Accumulate content if available
                      if (data.chunk) {
                        receivedContent += data.chunk;
                      }
                    } else if (data.status === 'generating') {
                      // Map server progress (0-100) to a more balanced range (20-90)
                      // This avoids the 5% and 95% stalling perception
                      const serverProgress = data.progress || 0;
                      this.generationProgress = 20 + (serverProgress * 0.7);
                      
                      // Accumulate content if available
                      if (data.chunk) {
                        receivedContent += data.chunk;
                      }
                    } else if (data.status === 'completed') {
                      // Clear any remaining interval
                      if (this.progressInterval) {
                        clearInterval(this.progressInterval);
                        this.progressInterval = null;
                      }
                      
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
                        uni.removeStorageSync('selectedDevice');
                        
                        // Save to cloud database
                        this.saveProjectToCloud(parsedContent);
                        
                        // console.log('Page generation successful!');
                      } catch (e) {
                        // console.error('Error processing generated page data:', e);
                        // console.log('Raw content:', fullContent);
                        this.errorMessage = 'Failed to save generated page data';
                      }
                      
                      // Hide progress bar after a short delay
                      setTimeout(() => {
                        this.isGenerating = false;
                      }, 500);
                    }
                  } catch (e) {
                    // console.error('Error processing stream chunk:', e);
                  }
                }
              }
            };
            
            // Handle completion
            xhr.onload = () => {
              // Clear any remaining interval
              if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
              }
              
              if (xhr.status === 200) {
                // console.log('Stream complete');
              } else {
                // console.error('Request failed with status:', xhr.status);
                this.isGenerating = false;
                this.errorMessage = `Request failed with status: ${xhr.status}`;
                // Show error message to user
                uni.showToast({
                  title: this.errorMessage,
                  icon: 'none',
                  duration: 3000
                });
              }
            };
            
            // Handle errors
            xhr.onerror = (err) => {
              // Clear any remaining interval
              if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
              }
              
              this.isGenerating = false;
              uni.hideLoading();
              // console.error('API call failed:', err);
              this.errorMessage = 'Failed to generate page. Please try again.';
              // Show error message to user
              uni.showToast({
                title: this.errorMessage,
                icon: 'none',
                duration: 3000
              });
            };
            
            // Handle timeout
            xhr.ontimeout = () => {
              // Clear any remaining interval
              if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
              }
              
              this.isGenerating = false;
              uni.hideLoading();
              // console.error('API call timed out');
              this.errorMessage = 'Generation timed out. Please try again.';
              // Show error message to user
              uni.showToast({
                title: this.errorMessage,
                icon: 'none',
                duration: 3000
              });
            };
            
            // Send the request with both prompt and selectedDevice
            xhr.send(
              'prompt=' + encodeURIComponent(this.projectDescription) + 
              '&device_type=' + encodeURIComponent(this.selectedDevice)
            );
          } catch (e) {
            // Clear any remaining interval
            if (this.progressInterval) {
              clearInterval(this.progressInterval);
              this.progressInterval = null;
            }
            
            this.isGenerating = false;
            this.errorMessage = `Error initializing request: ${e.message}`;
            // Show error message to user
            uni.showToast({
              title: this.errorMessage,
              icon: 'none',
              duration: 3000
            });
          }
        } else {
          // console.log(uni.getStorageSync('latest_7_overall_page'));
        }
      
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
    },
    getSimplifiedPreview(template) {
      // console.log(template);  
      // Return the component property as a string
      if (!template || !template.component) {
        return '<div class="preview-placeholder">No preview available</div>';
      }
      
      try {
        // The component is already a string, so just return it
        return template.component;
      } catch (e) {
        console.error('Error rendering component:', e);
        return '<div class="preview-placeholder">Error rendering preview</div>';
      }
    },
    getProposalTemplates() {
      // Select a subset of templates to use as proposals with alternative layouts
      if (!this.jsonTemplates || this.jsonTemplates.length === 0) {
        return [];
      }
      
      // Prioritize certain page types for proposals
      const priorityTypes = ['login', 'dashboard'];
      const proposals = [];
      
      // First try to find pages matching our priority types
      for (const type of priorityTypes) {
        const match = this.jsonTemplates.find(template => 
          template.name.toLowerCase().includes(type)
        );
        
        if (match && !proposals.includes(match)) {
          proposals.push(match);
        }
      }
      
      // If we don't have enough, add other templates
      if (proposals.length < 2) {
        for (const template of this.jsonTemplates) {
          if (!proposals.includes(template)) {
            proposals.push(template);
            if (proposals.length >= 2) break;
          }
        }
      }
      
      // Create a copy of the proposals array to avoid reactivity issues
      const proposalsToReturn = proposals.slice(0, 2); // Limit to 2 proposals
      
      // Update proposal loading states - do this separately to avoid infinite loop
      this.$nextTick(() => {
        this.updateProposalLoadingStates(proposalsToReturn);
      });
      
      return proposalsToReturn;
    },
    
    updateProposalLoadingStates(proposals) {
      // Reset proposal loading states
      this.proposalLoadingStates = {};
      
      // Create loading states for each proposal
      proposals.forEach(template => {
        const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
        this.$set(this.proposalLoadingStates, key, true);
        
        // Also prepare capturedImages object for proposals
        const altKey = 'alt-' + key;
        if (!this.capturedImages[altKey]) {
          this.$set(this.capturedImages, altKey, '');
        }
      });
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
      
      // Define proposal keys
      const proposalKeys = [
        'login',
        'dashboard'
      ];
      
      // Try to load each image from storage
      let mainLoadedCount = 0;
      let proposalLoadedCount = 0;
      
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
      
      // Load proposal images
      for (const key of proposalKeys) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (imageData) {
            // Store in temp object
            tempImages[key] = imageData;
            proposalLoadedCount++;
            
            // Set the loading state to false for this proposal
            if (this.proposalLoadingStates[key]) {
              this.$set(this.proposalLoadingStates, key, false);
            }
            
            // console.log(`Loaded proposal image for ${key} from local storage`);
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
        
        // console.log(`Loaded ${mainLoadedCount}/${mainTemplateKeys.length} main templates and ${proposalLoadedCount}/${proposalKeys.length} proposals from local storage`);
      });
      
      // If we loaded all needed main templates, we can skip the loading states
      if (mainLoadedCount >= mainTemplateKeys.length) {
        this.templatesLoading = false;
        // console.log('All required main templates loaded from storage');
        
        // If we also loaded all proposals, we can skip proposal loading states
        if (proposalLoadedCount >= proposalKeys.length) {
          this.proposalsLoading = false;
          // console.log('All proposals loaded from storage');
        }
        
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
      
      Object.keys(this.proposalLoadingStates).forEach(key => {
        this.$set(this.proposalLoadingStates, key, false);
      });
      
      this.templatesLoading = false;
      this.proposalsLoading = false;
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
      
      // Define proposal keys
      const proposalKeys = [
        'login',
        'dashboard'
      ];
      
      // Combine all keys
      const allKeys = [...mainTemplateKeys, ...proposalKeys];
      
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
        settings: '',
        login: '',
        dashboard: ''
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
      // Get user ID
      const userId = uni.getStorageSync('uid');
      if (!userId) {
        console.log('No user ID');
        return;
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
    // Clean up event listeners
    uni.$off('capture-element', this.captureElement);
  },
  
  methods: {
    captureElement(data) {
      const { elementId } = data;
      setTimeout(() => {
        const dom = document.getElementById(elementId);
        if (!dom) {
          // console.error(`Element not found: ${elementId}`);   
          uni.$emit('capture-error', { element: elementId, error: 'Element not found' });
          return;
        }
        
        // console.log(`Capturing element: ${elementId}`);
        
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
          // console.error(`Failed to generate image for ${elementId}:`, err);
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
    height: 16px;
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
  max-width: 750px; /* Increased to accommodate more colors */
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
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.color-swatch {
  width: 70px; /* Wider to match image */
  height: 50px; /* Taller to match image */
  border-radius: 25px; /* More rounded to match pill shape */
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px; /* Space for the hex text */

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
  border-radius: 25px; /* Rounded to match color swatches */
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
  padding: 10px 20px; /* Reduced padding */
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: 500;
  min-width: 100px; /* Reduced from 120px */
  font-size: 14px; /* Reduced from 16px */

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
</style>


