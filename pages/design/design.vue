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
      <!-- Dynamic Templates from JSON -->
      <template v-if="jsonTemplates.length > 0">
        <!-- Only render the filtered templates -->
        <view v-for="(template, index) in filteredTemplates" :key="index" 
              :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')" 
              class="template-preview-content">
          <view class="preview-header">
            <text class="preview-title">{{ template.name.replace(/ Page/i, '') }}</text>
          </view>
          <view class="preview-content" v-html="getSimplifiedPreview(template)"></view>
        </view>
        
        <!-- Render proposal templates separately -->
        <view v-for="(template, index) in activeProposalTemplates" :key="'proposal-'+index" 
              :id="'proposal-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')" 
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
        <text class="section-title">Interactive Prototype</text>
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
        <text class="section-title">Additional Design Proposals</text>
        <view class="proposals-grid">
          <!-- Dynamic Proposals from JSON -->
          <template v-if="jsonTemplates.length > 0 && activeProposalTemplates.length > 0">
            <!-- Take a subset of templates to show as proposals (different layouts) -->
            <x-skeleton v-for="(template, index) in activeProposalTemplates" :key="index"
                      type="banner" :loading="proposalLoadingStates[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')]">
              <view class="proposal-item" @click="navigateToGrapesEditor()">
                <view class="proposal-preview" :id="'proposal-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')">
                  <image class="proposal-image"
                    :src="capturedImages['alt-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')] || ''"
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
import html2canvas from 'html2canvas';

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
      proposalTemplates: []
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
    // Load images from local storage first
    this.loadImagesFromStorage();
    
    // Listen for image capture events from renderjs
    uni.$on('image-captured', this.receiveImageData);
    uni.$on('capture-error', (data) => {
      this._errAlert(`Error capturing image: ${data.error}`);
    });
    
    // Load JSON templates if available
    this.loadJsonTemplates();
    
    // Generate preview images first (only if we don't have them in storage)
    if (this.needsImageGeneration()) {
      this.generatePreviewImages();
    }
    
    // After generating images, start revealing templates with staggered timing
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
  },
  
  onShow(){
    // Only generate UI if we haven't already and we have a project description
    if (!uni.getStorageSync('latest_7_overall_page') && 
        uni.getStorageSync('projectDescription')) {
      this.generateUI();
    } else {
      // If we already have JSON data, load it
      this.loadJsonTemplates();
    }
  },

  beforeDestroy() {
    // Clean up event listeners
    uni.$off('image-captured', this.receiveImageData);
    uni.$off('capture-error');
  },

  methods: {
    loadJsonTemplates() {
      const jsonData = uni.getStorageSync('latest_7_overall_page');
      if (jsonData) {
        try {
          // Parse JSON if it's a string
          const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
          
          // Check if we have pages in the JSON
          if (data && data.pages && Array.isArray(data.pages)) {
            this.jsonTemplates = data.pages;
            
            // Generate template IDs based on page names
            this.dynamicTemplateIds = this.jsonTemplates.map(template => 
              'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')
            );
            
            console.log('Loaded JSON templates:', this.jsonTemplates.length);
            console.log('Dynamic template IDs:', this.dynamicTemplateIds);
            
            // Update loading states for dynamic templates
            this.updateLoadingStates();
            
            // Generate proposal templates
            this.proposalTemplates = this.getProposalTemplates();
          }
        } catch (e) {
          console.error('Error parsing JSON template data:', e);
        }
      }
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
      console.log(`Received image data for ${data.element}`);
      
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
          console.log(`Stored image data for ${key} in local storage`);
        } catch (e) {
          console.error(`Failed to store image data for ${key} in local storage:`, e);
        }
      }
    },
    
    generatePreviewImages() {
      // this._showLoading('Generating preview images...');
      
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
        
        console.log('Using dynamic template IDs:', templateIds);
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
        
        console.log('Using static template IDs:', templateIds);
      }
      
      // Capture elements sequentially with a shorter delay
      const captureSequentially = (index) => {
        if (index >= templateIds.length) {
          uni.hideLoading();
          return;
        }
        
        const id = templateIds[index];
        
        // Check if element exists before trying to capture it
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element not found: ${id}, skipping capture`);
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
    },
    getSimplifiedPreview(template) {
      // Extract a simplified preview from the component HTML
      // This is a basic implementation that should be enhanced based on your needs
      if (!template || !template.component) {
        return '<div class="preview-placeholder">No preview available</div>';
      }
      
      // Create a simplified preview based on the component type
      const name = template.name.toLowerCase();
      
      if (name.includes('login') || name.includes('signup')) {
        return `
          <view class="preview-form">
            <view class="preview-input"></view>
            <view class="preview-input"></view>
            <view class="preview-button"></view>
          </view>
        `;
      } else if (name.includes('home')) {
        return `
          <view class="preview-content">
            <view class="preview-card"></view>
            <view class="preview-card"></view>
            <view class="preview-card"></view>
          </view>
        `;
      } else if (name.includes('notification')) {
        return `
          <view class="preview-list">
            <view class="preview-list-item"></view>
            <view class="preview-list-item"></view>
            <view class="preview-list-item"></view>
          </view>
        `;
      } else if (name.includes('profile')) {
        return `
          <view>
            <view class="preview-avatar"></view>
            <view class="preview-info">
              <view class="preview-info-item"></view>
              <view class="preview-info-item"></view>
            </view>
          </view>
        `;
      } else if (name.includes('dashboard')) {
        return `
          <view class="preview-dashboard">
            <view class="preview-chart"></view>
            <view class="preview-stats">
              <view class="preview-stat-item"></view>
              <view class="preview-stat-item"></view>
            </view>
          </view>
        `;
      } else if (name.includes('settings')) {
        return `
          <view class="preview-settings">
            <view class="preview-settings-item"></view>
            <view class="preview-settings-item"></view>
            <view class="preview-settings-item"></view>
          </view>
        `;
      } else {
        // Default preview for unknown types
        return `
          <view class="preview-generic">
            <view class="preview-generic-item"></view>
            <view class="preview-generic-item"></view>
          </view>
        `;
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
      console.log('Loading images from local storage');
      
      // Define the keys we want to load
      const imageKeys = [
        'signup', 
        'home', 
        'notification', 
        'profile', 
        'settings', 
        'login', 
        'dashboard',
      ];
      
      // Try to load each image from storage
      let loadedCount = 0;
      
      for (const key of imageKeys) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (imageData) {
            // Use Vue.set to ensure reactivity
            this.$set(this.capturedImages, key, imageData);
            loadedCount++;
            console.log(`Loaded image data for ${key} from local storage`);
          }
        } catch (e) {
          console.error(`Failed to load image data for ${key} from local storage:`, e);
        }
      }
      
      console.log(`Loaded ${loadedCount} images from local storage`);
      
      // If we loaded images, we can skip the loading states
      if (loadedCount > 0) {
        this.skipLoadingStates();
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
      // Check if we already have images in storage
      const keysToCheck = ['signup', 'home', 'notification', 'profile', 'settings'];
      let missingCount = 0;
      
      for (const key of keysToCheck) {
        try {
          const imageData = uni.getStorageSync(`uigenius_image_${key}`);
          if (!imageData) {
            missingCount++;
          }
        } catch (e) {
          missingCount++;
        }
      }
      
      // If we're missing any of the main images, we need to generate them
      const needsGeneration = missingCount > 0;
      console.log(`Missing ${missingCount} images, needs generation: ${needsGeneration}`);
      return needsGeneration;
    },
    clearStoredImages() {
      console.log('Clearing stored images');
      
      // Define the keys we want to clear
      const imageKeys = [
        'signup', 
        'home', 
        'notification', 
        'profile', 
        'settings', 
        'login', 
        'dashboard',
      ];
      
      // Clear each image from storage
      for (const key of imageKeys) {
        try {
          uni.removeStorageSync(`uigenius_image_${key}`);
          console.log(`Cleared image data for ${key} from local storage`);
        } catch (e) {
          console.error(`Failed to clear image data for ${key} from local storage:`, e);
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
      
      // Show toast
      uni.showToast({
        title: 'Images cleared',
        icon: 'none',
        duration: 2000
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
    
    // Listen for proposal capture events
    uni.$on('capture-proposal', this.captureProposal);
  },
  
  beforeDestroy() {
    // Clean up event listeners
    uni.$off('capture-element', this.captureElement);
    uni.$off('capture-proposal', this.captureProposal);
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
          
          // If this is a template, also create a proposal version with slight modifications
          // Only do this for templates that match our expected format
          if (elementId.startsWith('template-') && !elementId.includes('proposal')) {
            try {
              const baseName = elementId.substring(9); // Remove 'template-' prefix
              const proposalId = 'proposal-' + baseName;
              const altKey = 'alt-' + baseName;
              
              // Create a slightly modified version for the proposal
              this.createAlternativeDesign(canvas).then(altCanvas => {
                const altImageData = altCanvas.toDataURL('image/png');
                
                // Emit with both IDs for flexibility
                uni.$emit('image-captured', { element: proposalId, imageData: altImageData });
                uni.$emit('image-captured', { element: altKey, imageData: altImageData });
                
                console.log(`Generated alternative design for: ${baseName}`);
              }).catch(err => {
                console.error(`Failed to generate alternative design for ${baseName}:`, err);
              });
            } catch (err) {
              console.error('Error generating proposal:', err);
            }
          }
        }).catch(err => {
          console.error(`Failed to generate image for ${elementId}:`, err);
          uni.$emit('capture-error', { element: elementId, error: err.toString() });
        });
      }, 100);
    },
    
    captureProposal(data) {
      const { templateId } = data;
      
      // Validate template ID format
      if (!templateId || !templateId.startsWith('template-')) {
        console.error(`Invalid template ID for proposal: ${templateId}`);
        return;
      }
      
      const proposalId = 'proposal-' + templateId.substring(9);
      
      setTimeout(() => {
        const dom = document.getElementById(templateId);
        if (!dom) {
          console.error(`Template not found for proposal: ${templateId}`);
          uni.$emit('capture-error', { element: proposalId, error: 'Template not found' });
          return;
        }
        
        console.log(`Creating proposal from template: ${templateId}`);
        
        html2canvas(dom, {
          width: dom.clientWidth,
          height: dom.clientHeight,
          scrollY: 0,
          scrollX: 0,
          useCORS: true,
          scale: 2
        }).then((canvas) => {
          // Create a modified version for the proposal
          return this.createAlternativeDesign(canvas);
        }).then((altCanvas) => {
          const imageData = altCanvas.toDataURL('image/png');
          // Send the image data back to the Vue component
          uni.$emit('image-captured', { element: proposalId, imageData });
        }).catch(err => {
          console.error(`Failed to generate proposal for ${proposalId}:`, err);
          uni.$emit('capture-error', { element: proposalId, error: err.toString() });
        });
      }, 100);
    },
    
    createAlternativeDesign(canvas) {
      return new Promise((resolve) => {
        try {
          // Create a new canvas with the same dimensions
          const altCanvas = document.createElement('canvas');
          altCanvas.width = canvas.width;
          altCanvas.height = canvas.height;
          const ctx = altCanvas.getContext('2d');
          
          // Draw the original canvas
          ctx.drawImage(canvas, 0, 0);
          
          // Apply modifications to create an alternative design
          // These are simple modifications for demonstration purposes
          
          // 1. Apply a slight color overlay
          ctx.fillStyle = 'rgba(229, 57, 53, 0.1)'; // Red with low opacity
          ctx.fillRect(0, 0, altCanvas.width, altCanvas.height);
          
          // 2. Add some alternative styling elements
          // For example, add a border or header color change
          ctx.fillStyle = 'rgba(229, 57, 53, 0.8)';
          ctx.fillRect(0, 0, altCanvas.width, 10); // Top border
          
          // 3. Add some decorative elements
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          ctx.arc(altCanvas.width - 20, 20, 10, 0, Math.PI * 2);
          ctx.fill();
          
          // Return the modified canvas
          resolve(altCanvas);
        } catch (err) {
          console.error('Error creating alternative design:', err);
          // If there's an error, return the original canvas
          resolve(canvas);
        }
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
</style>
