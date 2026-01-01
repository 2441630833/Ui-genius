<template>
  <view class="design-container">
    <!-- Progress Bar Overlay -->
    <view v-if="isGenerating" class="progress-overlay">
      <view class="progress-container">
        <text class="progress-title">{{ $t('design.progress.generatingUI') }}</text>
        <view class="progress-bar-container">
          <view class="progress-bar" :style="{ width: generationProgress + '%' }"></view>
        </view>
        <text class="progress-percentage">{{ Math.floor(generationProgress) }}%</text>
        <text class="progress-message">{{ $t('design.progress.pleaseWait') }}</text>
      </view>
    </view>

    <!-- Import Progress Bar Overlay -->
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
    <!-- Hidden Template Previews for html2canvas -->
    <view class="hidden-templates">
      <!-- Dynamic Templates from JSON -->
      <!-- Dynamic Templates from JSON - REMOVED to prevent DOM pollution -->
      <!-- We now use an iframe in generatePreviewImages to render these -->

      <!-- Fallback Static Templates -->
      <template v-if="jsonTemplates.length === 0">
        <!-- Signup Template Preview -->
        <view id="template-signup" class="template-preview-content">
          <view class="preview-header">
            <text class="preview-title">{{ $t('design.templates.signup') }}</text>
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
            <text class="preview-title">{{ $t('design.templates.home') }}</text>
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
            <text class="preview-title">{{ $t('design.templates.notification') }}</text>
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
            <text class="preview-title">{{ $t('design.templates.profile') }}</text>
          </view>
          <view class="preview-info">
            <view class="preview-info-item"></view>
            <view class="preview-info-item"></view>
          </view>
        </view>

        <!-- Settings Template Preview -->
        <view id="template-settings" class="template-preview-content">
          <view class="preview-header">
            <text class="preview-title">{{ $t('design.templates.settings') }}</text>
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
          <text class="preview-title">{{ $t('design.templates.simple') }}</text>
        </view>
        <view class="preview-content">
          <view class="preview-card"></view>
        </view>
      </view>
    </view>

    <!-- Design Toolbar -->
    <view class="design-toolbar">
      <view class="logo-container">
        <image class="logo-icon" src="../../static/logo.png"></image>
      </view>

      <view class="nav-links">
        <view class="nav-item plus_guide" :class="{ active: activeNavItem === 'plus' }" @click="navigateTo('plus')">
          <image class="nav-icon" :src="activeNavItem === 'plus' ? '/static/plus_white.png' : '/static/plus.png'">
          </image>
        </view>

        <view class="nav-item template_guide"
          :class="{ active: activeNavItem === 'template' || isTemplateSelectionMode }" @click="navigateTo('template')">
          <image class="nav-icon"
            :src="activeNavItem === 'template' || isTemplateSelectionMode ? '/static/template_white.png' : '/static/template.png'">
          </image>
        </view>

        <view class="nav-item import_guide" :class="{ active: activeNavItem === 'import' }"
          @click="navigateTo('import')">
          <image class="nav-icon" :src="activeNavItem === 'import' ? '/static/import_white.png' : '/static/import.png'">
          </image>
        </view>

        <view class="nav-item color_guide" :class="{ active: activeNavItem === 'color' }" @click="navigateTo('color')">
          <image class="nav-icon" :src="activeNavItem === 'color' ? '/static/color_white.png' : '/static/color.png'">
          </image>
        </view>

        <view class="nav-item delete_guide" :class="{ active: activeNavItem === 'delete' }"
          @click="navigateTo('delete')">
          <image class="nav-icon" :src="activeNavItem === 'delete' ? '/static/delete_white.png' : '/static/delete.png'">
          </image>
        </view>

        <view class="nav-item guide_guide" :class="{ active: activeNavItem === 'guide' }" @click="navigateTo('guide')">
          <image class="nav-icon" :src="activeNavItem === 'guide' ? '/static/guide_white.png' : '/static/guide.png'">
          </image>
        </view>
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
          <view class="tool-button share-button" @click="shareProject">
            <text class="button-text" @click="shareProject">{{ $t('design.header.share') }}</text>
          </view>
          <!-- <view class="tool-button">
            <text class="button-text">Export</text>
          </view> -->

          <!-- Refresh Button -->
          <view class="tool-button refresh-button" @click="refreshData">
            <text class="button-text">{{ $t('design.header.refresh') }}</text>
          </view>

          <view class="preview-button export-button" @click="exportProject">
            <image class="icon" src="/static/export_white.png"></image>
            <text class="preview-text">{{ $t('design.header.export') }}</text>
          </view>
        </view>
      </view>

      <!-- Templates Grid -->
      <view class="section">
        <text class="section-title">{{ $t('design.sectionTitle') }} <span class="template-count">({{
          jsonTemplates.length
        }}
            {{ $t('design.pagesLabel') }})</span></text>
        <view class="templates-grid-container">
          <view class="templates-grid">
            <!-- Dynamic Templates from JSON -->
            <template v-if="jsonTemplates.length > 0">
              <!-- Filter to only show the 5 main templates -->
              <x-skeleton v-for="(template, index) in filteredTemplates" :key="index" type="banner"
                :loading="templateLoadingStates[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')]">
                <view class="template-item"
                  :class="{ 'template-selected': selectedTemplatePageIndex === index && useColor }"
                  @click="handleTemplateClick(template, index)">
                  <view class="template-preview"
                    :id="'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')">
                    <image class="template-image"
                      :src="capturedImages[template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-')] || ''"
                      mode="aspectFill"></image>
                    <!-- Selected indicator -->
                    <view v-if="selectedTemplatePageIndex === index && useColor" class="template-selected-indicator">
                      <text class="template-selected-check">✓</text>
                    </view>
                  </view>
                  <view class="template-label">
                    <text class="template-name">{{ template.name.replace(/ Page/i, '') }}</text>
                    <text v-if="selectedTemplatePageIndex === index && useColor"
                      class="template-selected-badge">Template</text>
                  </view>
                </view>
              </x-skeleton>

              <!-- Add New Page Button -->
              <view class="template-item add-template-item" @click="navigateTo('plus')">
                <view class="template-preview add-template-preview">
                  <view class="add-icon">+</view>
                </view>
                <view class="template-label">
                  <text class="template-name">{{ $t('design.addNewPage') }}</text>
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
        <view class="custom-action-sheet-title">{{ $t('design.export.title') }}</view>
        <view v-for="(option, index) in actionSheetOptions" :key="index" class="custom-action-sheet-item"
          @click="handleActionSheetSelection(index)">
          {{ option }}
        </view>
        <view class="custom-action-sheet-cancel" @click="closeCustomActionSheet">{{ $t('design.export.cancel') }}</view>
      </view>
    </view>

    <!-- Create New Page Dialog -->
    <view class="dialog-overlay" v-if="showCreatePageDialog" @click="closeCreatePageDialog">
      <view class="dialog-container create-page-dialog" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">{{ $t('design.dialogTitle') }}</text>

          <!-- Error notification -->
          <view class="error-notification" v-if="errorMessage">
            <text>{{ errorMessage }}</text>
          </view>

          <view class="device-options">
            <view class="device-option" :class="{ 'selected': selectedDevice === 'mobile' }"
              @click="selectDevice('mobile')">
              <image class="device-icon" src="../../static/mobile.png"></image>
              <text>{{ $t('design.createPage.mobile') }}</text>
            </view>

            <view class="device-option" :class="{ 'selected': selectedDevice === 'desktop' }"
              @click="selectDevice('desktop')">
              <image class="device-icon" src="../../static/desktop.png"></image>
              <text>{{ $t('design.createPage.desktop') }}</text>
            </view>
          </view>

          <!-- Model Selection -->
          <view class="model-selection-container">
            <text class="model-selection-label">{{ $t('design.createPage.selectModel') }}</text>
            <view class="model-selector">
              <view class="custom-dropdown" @click="toggleModelDropdown">
                <view class="dropdown-display">
                  <text class="dropdown-text">{{ getSelectedModelText() }}</text>
                  <view class="dropdown-arrow" :class="{ 'rotated': showModelDropdown }">▼</view>
                </view>
                <view class="dropdown-options" v-if="showModelDropdown">
                  <view v-for="option in modelOptions" :key="option.value" class="dropdown-option"
                    :class="{ 'selected': selectedPageModel === option.value }" @click.stop="selectModel(option.value)">
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

          <!-- Apply Colors Switch and uniform style-->
          <view class="extract-colors-container">
            <view class="extract-colors-row">
              <text class="model-selection-label">{{ $t('design.createPage.uniformStyle') }}</text>
              <view class="toggle-switch" :class="{ 'active': useColor }" @click="toggleuseColor">
                <view class="toggle-slider"></view>
              </view>
            </view>
          </view>

          <!-- Selected Template Info (show which template is selected) -->
          <view v-if="useColor && availableTemplatePages.length > 0" class="selected-template-info">
            <text class="model-selection-label">{{ $t('design.createPage.referenceTemplate') }}{{
              getSelectedTemplatePageText() }}</text>
            <text class="template-hint">{{ $t('design.createPage.templateHint') }}</text>
          </view>

          <view class="try-example-container">
            <text class="description-label">{{ $t('design.createPage.describeLabel') }}</text>
            <view class="button-group">
              <button class="try-example-btn" @click="tryPageExample">{{ $t('design.createPage.tryExample') }}</button>
              <button class="try-example-btn" :disabled="!pageDescription || isOptimizingPrompt"
                @click="optimizePageDescription">{{ isOptimizingPrompt ? $t('design.createPage.optimizing') :
                  $t('design.createPage.improveWithAI') }}</button>
            </view>
          </view>
          <view class="description-container">
            <textarea class="project-description-input" :placeholder="$t('design.createPage.placeholder')"
              v-model="pageDescription" maxlength="7000"></textarea>
            <text class="char-count">{{ pageDescription.length }}/7000 </text>
          </view>

          <button class="continue-btn" @click="createPage">{{ $t('design.createPage.continue') }}</button>
        </view>
      </view>
    </view>

    <!-- Delete Pages Dialog -->
    <view class="dialog-overlay" v-if="showDeleteDialog" @click="closeDeleteDialog">
      <view class="dialog-container deleteDialogGuide" @click.stop>
        <view class="dialog-content">
          <text class="dialog-title">{{ $t('design.deletePage.title') }}</text>

          <!-- Error notification -->
          <view class="error-notification" v-if="errorMessage">
            <text>{{ errorMessage }}</text>
          </view>

          <!-- Select All Option -->
          <view class="select-all-container" v-if="jsonTemplates.length > 0">
            <!-- Custom checkbox implementation -->
            <view class="checkbox-wrapper" @click="toggleSelectAll">
              <view class="checkbox-custom" :class="{ 'checked': isAllSelected }"></view>
              <text class="select-all-text">{{ $t('design.deletePage.selectAll') }}</text>
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
            <text>{{ $t('design.deletePage.noPages') }}</text>
          </view>

          <view class="delete-actions">
            <button class="delete-btn" :disabled="pagesToDelete.length === 0" @click="deleteSelectedPages">{{
              $t('design.deletePage.deleteSelected') }}</button>
            <button class="cancel-btn" @click="closeDeleteDialog">{{ $t('design.deletePage.cancel') }}</button>
          </view>
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
                <text class="file-info-text">{{ $t('design.import.htmlFilesCountLoaded', { count: htmlFiles.length })
                }}</text>
                <view v-for="(f, i) in htmlFiles" :key="i" class="file-list-item">
                  <view class="file-list-item-header">
                    <text class="file-info-text">- {{ f.name }}</text>
                    <button class="remove-file-btn" @click.stop="removeHtmlFile(i)">{{ $t('common.delete') }}</button>
                  </view>
                  <!-- <text class="file-content-preview">{{ f.content.substring(0, 100) }}...</text> -->
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
                })
                }}</text>
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

    <!-- Color Palette Overlay -->
    <view v-if="showColorPalette" class="color-palette-overlay" @click="cancelColorSelection">
      <view class="color-palette-container" @click.stop>
        <text class="color-palette-title" style="display: block;">{{ $t('design.colorPalette.title') }}</text>


        <view v-if="colorPaletteError" class="color-palette-error">
          <text class="error-text">{{ colorPaletteError }}</text>
        </view>

        <view class="color-palette-row">
          <view v-for="(color, index) in neutralColors" :key="'neutral-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': colorCard && colorCard.indexOf(color.hex) > -1 }" @click="selectColor(color.hex)">
            <text v-if="colorCard && colorCard.indexOf(color.hex) > -1" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>


        <view class="color-palette-row">
          <view v-for="(color, index) in pastelColors" :key="'pastel-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': colorCard && colorCard.indexOf(color.hex) > -1 }" @click="selectColor(color.hex)">
            <text v-if="colorCard && colorCard.indexOf(color.hex) > -1" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>


        <view class="color-palette-row">
          <view v-for="(color, index) in warmColors" :key="'warm-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': colorCard && colorCard.indexOf(color.hex) > -1 }" @click="selectColor(color.hex)">
            <text v-if="colorCard && colorCard.indexOf(color.hex) > -1" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <view class="color-palette-row">
          <view v-for="(color, index) in coolColors" :key="'cool-' + index" class="color-swatch"
            :style="{ backgroundColor: color.hex }"
            :class="{ 'selected': colorCard && colorCard.indexOf(color.hex) > -1 }" @click="selectColor(color.hex)">
            <text v-if="colorCard && colorCard.indexOf(color.hex) > -1" class="color-check">✓</text>
            <text class="color-hex">{{ color.hex }}</text>
          </view>
        </view>

        <!-- Color Card Colors Row (if colors exist and are not in preset lists) -->
        <view v-if="colorCard && colorCard.length > 0" class="color-palette-row">
          <text class="color-card-label">{{ $t('design.colorPalette.selectedColors') }}</text>
          <view v-for="(color, index) in colorCard" :key="'colorcard-' + index" class="color-swatch"
            :style="{ backgroundColor: color }" :class="{ 'selected': colorCard && colorCard.indexOf(color) > -1 }"
            @click="selectColor(color)">
            <text v-if="colorCard && colorCard.indexOf(color) > -1" class="color-check">✓</text>
            <text class="color-hex">{{ color }}</text>
          </view>
        </view>

        <!-- Selected Colors Counter -->
        <view v-if="colorCard && colorCard.length > 0" class="selected-colors-info">
          <text class="selected-colors-text">{{ $t('design.colorPalette.selectedCounter', { count: colorCard.length })
          }}</text>
        </view>

        <view class="color-input-container">
          <text class="color-input-label">{{ $t('design.colorPalette.customColor') }}</text>
          <input type="text" v-model="customColor" class="color-input"
            :placeholder="$t('design.colorPalette.hexPlaceholder')" @input="validateColorInput"
            @confirm="addCustomColor" />
          <view class="color-preview-swatch"
            :style="{ backgroundColor: isValidColor(customColor) ? customColor : '#cccccc' }"
            :class="{ 'selected': customColor && isValidColor(customColor) && colorCard && colorCard.indexOf(customColor) > -1 }"
            @click="selectColor(customColor)"></view>
        </view>

        <view class="color-actions">
          <button class="color-confirm" :style="{ backgroundColor: previewColor, color: '#ffffff' }"
            @click="confirmColorSelection">{{ $t('design.colorPalette.apply') }}</button>
          <button class="color-cancel" @click="cancelColorSelection">{{ $t('common.cancel') }}</button>
        </view>
      </view>
    </view>
    <view class="toast-overlay" v-if="customToastVisible" @click="customToastVisible = false">
      <view class="custom-toast" @click.stop>
        <image class="device-icon"
          :src="customToastType === 'success' ? '../../static/success.png' : '../../static/skip.png'"></image>
        <text class="custom-toast-message">{{ customToastMessage }}</text>
      </view>
    </view>
    <!-- Longze Guide Component -->
    <longze-guide ref="guide" :steps="guideSteps" :theme="guideTheme" :primaryColor="'#e53935'"
      :primaryHoverColor="'#d32f2f'" :highlightColor="'#e53935'" :skip-enabled="true" @complete="onGuideComplete"
      @skip="onGuideSkip" @step-change="onGuideStepChange" />

    <!-- Custom Upgrade Modal -->
    <view v-if="showUpgradeModal" class="upgrade-modal-overlay" @click="closeUpgradeModal">
      <view class="upgrade-modal-container" @click.stop>
        <view class="upgrade-modal-header">
          <text class="upgrade-modal-title">{{ $t('common.upgradeRequired') }}</text>
        </view>
        <view class="upgrade-modal-content">
          <text class="upgrade-modal-message">{{ upgradeModalMessage }}</text>
        </view>
        <view class="upgrade-modal-actions">
          <button class="upgrade-modal-cancel" @click="closeUpgradeModal">{{ $t('common.cancel') }}</button>
          <button class="upgrade-modal-confirm" @click="handleUpgradeConfirm">{{ $t('common.upgrade') }}</button>
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
      // Store parsed template content (HTML and scoped styles)
      parsedTemplates: {},

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
      colorCard: [], // Array to store up to 5 selected colors
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
      showCreatePageDialog: false,
      pageDescription: '',
      // examplePageDescription: 'A modern contact page with a form and interactive map, including name, email, and message fields',
      showDeleteDialog: false,
      pagesToDelete: [],

      // Model selection for Create New Page dialog
      modelOptions: [
        { value: 'google/gemini-3-flash-preview', text: 'google/gemini3', isPro: true },
        { value: 'xiaomi/mimo-v2-flash:free', text: 'xiaomi/mimo-v2-flash', isPro: true },
        { value: 'deepseek/deepseek-v3.2', text: 'deepseek/deepseek-v3.2', isPro: true },
        { value: 'anthropic/claude-opus-4.5', text: 'anthropic/claude-opus-4.5', isPro: true },
        { value: 'qwen/qwen3-coder', text: 'qwen/qwen3-coder', isPro: true },
        { value: 'deepseek/deepseek-chat-v3-0324', text: 'deepseek/deepseek-chat-v3-0324', isPro: true },
        { value: 'openai/gpt-oss-120b', text: 'openai/gpt-oss-120b', isPro: true },
        { value: 'x-ai/grok-code-fast-1', text: 'x-ai/grok-code-fast-1', isPro: true },
        { value: 'minimax/minimax-m2', text: 'minimax/minimax-m2', isPro: true },
        { value: 'z-ai/glm-4.7', text: 'z-ai/glm-4.7', isPro: true },
        { value: 'mistralai/devstral-2512:free', text: 'mistralai/devstral-2512:free', isPro: false },
        { value: 'kwaipilot/kat-coder-pro:free', text: 'kwaipilot/kat-coder-pro:free', isPro: false },
        { value: 'google/gemma-3-27b-it:free', text: 'google/gemma-3-27b-it:free', isPro: false },
        { value: 'uigenius5:latest', text: 'uigenius/uigenius5:latest', isPro: false }
      ],
      selectedPageModel: 'google/gemini-3-flash-preview',
      showModelDropdown: false,

      // Import dialog properties
      showImportDialog: false,
      importFileList: [],
      importError: '',
      selectedImportType: 'image',

      // HTML file content
      htmlFileContent: '',
      htmlFileName: '',
      htmlFiles: [],

      // Import progress properties
      isImporting: false,
      importProgress: 0,
      customToastVisible: false,
      customToastMessage: '',
      customToastType: 'success',
      guideTheme: 'dark',
      // Color extraction properties
      isExtractingColors: false,
      colorCard: [],
      useColor: true, // Default is open/enabled
      // Template page selector properties
      selectedTemplatePageIndex: 0, // Default to first page
      availableTemplatePages: [], // Will be populated from latest_7_overall_page
      isTemplateSelectionMode: false, // Toggle template selection mode from sidebar
      isOptimizingPrompt: false,
      showUpgradeModal: false,
      upgradeModalMessage: '',
      // Flag to track if preview images have been generated in this session
      previewImagesGenerated: false
    }
  },

  computed: {
    importTypeOptions() {
      return [
        { value: 'image', label: this.$t('design.import.type.image') },
        { value: 'html', label: this.$t('design.import.type.html') }
      ];
    },
    examplePageDescription() {
      return this.$t('design.createPage.exampleAppleDescription');
    },
    guideSteps() {
      return [
        {
          target: '.plus_guide',
          title: this.$t('design.guide.step1.title'),
          content: this.$t('design.guide.step1.content'),
          position: 'bottom'
        },
        {
          target: '.create-page-dialog',
          title: this.$t('design.guide.step2.title'),
          content: this.$t('design.guide.step2.content'),
          position: 'right'
        },
        {
          target: '.template_guide',
          title: this.$t('design.guide.step3.title'),
          content: this.$t('design.guide.step3.content'),
          position: 'right'
        },
        {
          target: '.import_guide',
          title: this.$t('design.guide.step4.title'),
          content: this.$t('design.guide.step4.content'),
          position: 'right'
        },
        {
          target: '.import-dialog',
          title: this.$t('design.guide.step5.title'),
          content: this.$t('design.guide.step5.content'),
          position: 'right'
        },
        {
          target: '.color_guide',
          title: this.$t('design.guide.step6.title'),
          content: this.$t('design.guide.step6.content'),
          position: 'right'
        },
        {
          target: '.delete_guide',
          title: this.$t('design.guide.step7.title'),
          content: this.$t('design.guide.step7.content'),
          position: 'right'
        },
        {
          target: '.deleteDialogGuide',
          title: this.$t('design.guide.step8.title'),
          content: this.$t('design.guide.step8.content'),
          position: 'right'
        },
        {
          target: '.export-button',
          title: this.$t('design.guide.step9.title'),
          content: this.$t('design.guide.step9.content'),
          position: 'left'
        },
        {
          target: '.refresh-button',
          title: this.$t('design.guide.step10.title'),
          content: this.$t('design.guide.step10.content'),
          position: 'left'
        },
        {
          target: '.share-button',
          title: this.$t('design.guide.step11.title'),
          content: this.$t('design.guide.step11.content'),
          position: 'left'
        },
      ];
    },
    actionSheetOptions() {
      return [
        this.$t('design.export.asImages'),
        this.$t('design.export.asHtml'),
        this.$t('design.export.asVue2'),
        this.$t('design.export.asVue3'),
        this.$t('design.export.asReact')
      ];
    },
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
          return this.$t('design.import.description.image');
        case 'html':
          return this.$t('design.import.description.html');
        case 'vue':
          return this.$t('design.import.description.vue');
        case 'react':
          return this.$t('design.import.description.react');
        default:
          return '';
      }
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
      this.handleCaptureError(data);
    });

    // Load images from storage on initial mount to avoid display issues
    this.loadImagesFromStorage();

    // Inject scoped styles after initial mount
    this.$nextTick(() => {
      this.injectScopedStyles();
    });

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

  updated() {
    // Inject scoped styles for templates after DOM update
    this.injectScopedStyles();
  },
  onHide() {
    // Remove injected template styles when leaving the page
    this.cleanupInjectedStyles();
  },
  onUnload() {
    // Ensure cleanup when the page is destroyed
    this.cleanupInjectedStyles();
  },

  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
    // Clean up injected styles
    this.cleanupInjectedStyles();
  },
  onLoad(options) {
    // this.loadSavedLanguage();
    // Initialize project_id from storage
    const storedProjectId = uni.getStorageSync('currentProjectId');
    if (storedProjectId) {
      this.project_id = storedProjectId;
    }

    this.checkAndStartGuide();
    // Also handle shared content if navigating normally (non-H5)
    if (options && options.pid) {
      this.tryImportByProjectId(options.pid);
    } else {
      this.pullRefreshProject();
    }
  },
  onShow() {
    // this.loadSavedLanguage();
    // Check for project switch
    const storedProjectId = uni.getStorageSync('currentProjectId');
    if (storedProjectId && storedProjectId !== this.project_id) {
      this.project_id = storedProjectId;
      // Refresh local data (silently) because keys are shared between projects
      // This clears images and resets loading states
      this.refreshDataLocal(false);
    }

    // Load images from local storage first
    this.loadImagesFromStorage();

    // Load selectedDevice from storage if available
    const storedDevice = uni.getStorageSync('selectedDevice');
    if (storedDevice) {
      this.selectedDevice = storedDevice;
    }

    // Load color card from storage
    this.loadColorCardFromStorage();

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
      }
      // Note: Preview images are now generated on-demand when needed, not on every page load
      // They will be generated when:
      // 1. A new page is created (handled in createPage method)
      // 2. Project is refreshed (handled in pullRefreshProject method)
      // 3. Templates are imported (handled in import methods)
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
    // loadSavedLanguage() {
    //   try {
    //     const savedLocale = uni.getStorageSync('appLocale');
    //     if (savedLocale) {
    //       uni.setLocale(savedLocale);
    //       // Also update i18n locale if available
    //       if (this.$i18n) {
    //         this.$i18n.locale = savedLocale;
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Design page: Error loading saved language:', error);
    //   }
    // },
    // tryLoadSharedFromQuery() {
    //   // H5 only: parse params from hash URL
    //   // #ifdef H5
    //   try {
    //     const hash = window.location.hash || '';
    //     const queryIndex = hash.indexOf('?');
    //     if (queryIndex !== -1) {
    //       const query = hash.substring(queryIndex + 1);
    //       const params = new URLSearchParams(query);
    //       const pid = params.get('pid');
    //       if (pid) {
    //         this.tryImportByProjectId(pid);
    //         return;
    //       }
    //       const shared = params.get('shared');
    //       if (shared) {
    //         // Backward compatibility: old base64 payload
    //         this.tryImportShared(shared);
    //       }
    //     }
    //   } catch (e) {
    //     console.warn('Failed parsing shared query:', e);
    //   }
    //   // #endif
    // },
    // tryImportShared(payload) {
    //   try {
    //     const decodeBase64 = (b64) => {
    //       try {
    //         return decodeURIComponent(escape(atob(b64)));
    //       } catch (e) {
    //         return atob(b64);
    //       }
    //     };
    //     const json = decodeBase64(payload);
    //     const project = JSON.parse(json);
    //     if (!project || !project.pages || !Array.isArray(project.pages)) {
    //       throw new Error('Invalid project format');
    //     }
    //     uni.setStorageSync('latest_7_overall_page', project);
    //     uni.setStorageSync('force_regeneration', 'true');
    //     this.loadJsonTemplates();
    //     this.updateLoadingStates();
    //     setTimeout(() => {
    //       this.generatePreviewImages();
    //     }, 100);
    //     uni.showToast({ title: 'Project loaded from link', icon: 'success', duration: 2000 });
    //   } catch (e) {
    //     console.error('Failed to import shared project:', e);
    //     uni.showToast({ title: 'Invalid share link', icon: 'none', duration: 2000 });
    //   }
    // },
    checkAndStartGuide() {
      const designHasGuideShown = uni.getStorageSync('designHasUserGuideShown'); // 或 localStorage.getItem('hasUserGuideShown')
      if (!designHasGuideShown) {
        setTimeout(() => {
          this.startGuide();
          uni.setStorageSync('designHasUserGuideShown', true);
        }, 1000);
      }
    },
    // Longze Guide methods
    startGuide() {
      const guide = this.$refs.guide;
      if (guide) {
        guide.start();
      }
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
    onGuideComplete() {
      this.showCustomToast(this.$t('design.guide.finished'), 'success');
    },
    onGuideSkip() {
      this.showCustomToast(this.$t('design.guide.skipped'), 'none');
    },
    onGuideStepChange(index) {
      // Make step-change behavior work for BOTH directions by driving UI from the current step.
      const shouldShowCreatePageDialog = index === 1;
      const shouldShowImportDialog = index === 4;
      const shouldShowDeleteDialog = index === 7;

      // Close dialogs when the new step shouldn't show them (covers going backwards).
      if (!shouldShowCreatePageDialog && this.showCreatePageDialog) {
        this.showCreatePageDialog = false;
      }
      if (!shouldShowImportDialog && this.showImportDialog) {
        this.closeImportDialog();
      }
      if (!shouldShowDeleteDialog && this.showDeleteDialog) {
        this.closeDeleteDialog();
      }

      // Open/init dialogs only when entering their steps.
      if (shouldShowCreatePageDialog && !this.showCreatePageDialog) {
        this.showCreatePageDialog = true;
        this.pageDescription = '';
        this.errorMessage = '';
        // Initialize model selection to google/gemini-3-flash-preview
        this.selectedPageModel = 'google/gemini-3-flash-preview';
      }
      if (shouldShowImportDialog && !this.showImportDialog) {
        this.showImportDialog = true;
        this.importFileList = [];
        this.importError = '';
        this.selectedImportType = 'image';
      }
      if (shouldShowDeleteDialog && !this.showDeleteDialog) {
        this.showDeleteDialog = true;
      }
    },
    shareProject() {
      try {
        let projectId = uni.getStorageSync('currentProjectId');

        if (!projectId) {
          // No project ID found, create a new project first
          const projectData = uni.getStorageSync('latest_7_overall_page');
          if (!projectData) {
            uni.showToast({
              title: this.$t('design.toast.noProjectData'),
              icon: 'none',
              duration: 2000
            });
            return;
          }

          // Show loading toast
          uni.showLoading({
            title: this.$t('design.toast.creatingProject'),
            mask: true
          });

          // Create new project using the existing saveProjectToCloud method
          this.saveProjectToCloud(JSON.parse(projectData)).then(() => {
            uni.hideLoading();

            // Get the newly created project ID
            projectId = uni.getStorageSync('currentProjectId');
            if (projectId) {
              this.generateShareUrl(projectId);
            } else {
              uni.showToast({
                title: this.$t('design.toast.createProjectFailed'),
                icon: 'none',
                duration: 2000
              });
            }
          }).catch(error => {
            uni.hideLoading();
            uni.showToast({
              title: this.$t('design.toast.createProjectFailed'),
              icon: 'none',
              duration: 2000
            });
            console.error('Error creating project:', error);
          });
          return;
        }

        // Project ID exists, generate share URL directly
        this.generateShareUrl(projectId);

      } catch (error) {
        uni.showToast({
          title: this.$t('design.toast.shareProjectFailed'),
          icon: 'none',
          duration: 2000
        });
        console.error('shareProject error:', error);
      }
    },

    generateShareUrl(projectId) {
      let shareUrl = '';
      // force the base url to be https://uigenius.top/pages/design/design

      const base = 'https://uigenius.top/pages/design/design'
      // test localhost url link
      // const base = 'http://localhost:5173/pages/design/design'
      // const isElectron = window.location.protocol === 'http:' && window.location.hostname === '127.0.0.1';
      // const base = isElectron ? 'https://uigenius.top/pages/design/design' : window.location.origin + '/pages/design/design';
      shareUrl = `${base}?pid=${encodeURIComponent(projectId)}`;

      uni.setClipboardData({
        data: shareUrl,
        success: () => {
          uni.showToast({
            title: this.$t('design.toast.shareLinkCopied'),
            icon: 'success',
            duration: 2000
          });
        },
        fail: () => {
          uni.showToast({
            title: this.$t('design.toast.copyFailed'),
            icon: 'none',
            duration: 2000
          });
        }
      });
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
        // case 'images':
        //   this.exportImages();
        //   break;
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
          title: this.$t('design.export.alreadyInProgress'),
          icon: 'none',
          duration: 2000
        });
        return;
      }

      this.isExporting = true;

      // Show loading toast
      uni.showLoading({
        title: this.$t('design.export.preparingImages'),
        mask: true
      });

      try {
        // Get the project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: this.$t('design.toast.noProjectData'),
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
            title: this.$t('design.export.noData'),
            icon: 'none',
            duration: 2000
          });
          this.isExporting = false;
          return;
        }

        // OPTIMIZATION: Dynamic parallel count based on device capabilities
        const getOptimalParallelCount = (totalPages) => {
          const cpuCores = navigator.hardwareConcurrency || 4;
          const memory = navigator.deviceMemory || 4;
          let optimal = Math.max(2, Math.floor(cpuCores * 0.75));
          const memoryLimit = Math.max(2, Math.floor(memory));
          optimal = Math.min(optimal, memoryLimit, 8);
          return Math.min(optimal, totalPages);
        };

        const PARALLEL_COUNT = getOptimalParallelCount(projectData.pages.length);
        console.log(`[Export] Using ${PARALLEL_COUNT} parallel workers`);

        // Create multiple iframes for parallel processing
        const iframes = [];
        for (let i = 0; i < PARALLEL_COUNT; i++) {
          const iframe = document.createElement('iframe');
          iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1440px;height:2000px;visibility:hidden;';
          document.body.appendChild(iframe);
          iframes.push(iframe);
        }

        // OPTIMIZATION: Faster render check with reduced timeouts
        const waitForRender = (iframeDoc, maxWait = 1500) => {
          return new Promise((resolve) => {
            let waited = 0;
            const checkInterval = 50;
            const checkReady = () => {
              waited += checkInterval;
              if (iframeDoc.readyState === 'complete' || waited >= maxWait) {
                setTimeout(resolve, 400); // Increased for ECharts
                return;
              }
              setTimeout(checkReady, checkInterval);
            };
            setTimeout(checkReady, 100);
          });
        };

        // OPTIMIZATION: Process single page with minimal delays
        const renderSinglePage = async (page, iframe) => {
          const pageName = page.name.replace(/ Page/i, '');
          const pageKey = pageName.toLowerCase().replace(/\s+/g, '-');
          const templateId = 'template-' + pageKey;

          let componentContent = page.component || '';
          if (typeof componentContent === 'string' && componentContent.startsWith('```')) {
            componentContent = componentContent.replace(/^```(?:html|vue)?\s*/, '').replace(/```\s*$/, '');
          }

          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin: 0; padding: 0;">
  <div id="${templateId}">
    ${componentContent}
  </div>
</body>
</html>`);
          iframeDoc.close();

          await waitForRender(iframeDoc);

          try {
            const root = iframeDoc.getElementById(templateId);
            if (root) {
              void root.offsetHeight;
              // Wait for charts/scripts to render (increased for ECharts compatibility)
              await new Promise(r => setTimeout(r, 600));
              
              const contentHeight = root.scrollHeight;
              const contentWidth = root.scrollWidth;

              const canvas = await html2canvas(root, {
                width: contentWidth,
                height: contentHeight,
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                allowTaint: true,
                imageTimeout: 5000,
                removeContainer: true,
                foreignObjectRendering: false,
                // OPTIMIZATION: Only copy background colors for direct children
                onclone: (clonedDoc) => {
                  const clonedElement = clonedDoc.getElementById(templateId);
                  if (clonedElement) {
                    void clonedElement.offsetHeight;
                    const originalElement = iframeDoc.getElementById(templateId);
                    if (originalElement) {
                      const directChildren = originalElement.children;
                      const clonedChildren = clonedElement.children;
                      const len = Math.min(directChildren.length, clonedChildren.length, 50);
                      for (let i = 0; i < len; i++) {
                        const computedStyle = window.getComputedStyle(directChildren[i]);
                        if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                          clonedChildren[i].style.backgroundColor = computedStyle.backgroundColor;
                        }
                      }
                    }
                  }
                }
              });

              const imageData = canvas.toDataURL('image/png');
              return { key: pageKey, data: imageData };
            }
          } catch (error) {
            console.error(`Error capturing screenshot for ${pageName}:`, error);
          }
          return null;
        };

        // OPTIMIZATION: Process pages in parallel batches
        const images = [];
        const pages = projectData.pages;
        
        for (let i = 0; i < pages.length; i += PARALLEL_COUNT) {
          const batch = pages.slice(i, i + PARALLEL_COUNT);
          const results = await Promise.all(
            batch.map((page, idx) => renderSinglePage(page, iframes[idx]))
          );
          results.forEach(result => {
            if (result) images.push(result);
          });
        }

        // Clean up iframes
        iframes.forEach(iframe => document.body.removeChild(iframe));

        // Export the images (web only for now)
        // #ifdef H5 
        this.exportImagesWeb(images);
        // #endif
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: this.$t('design.toast.errorExportingImages'),
          icon: 'none',
          duration: 2000
        });
        console.error('Error exporting images:', error);
        this.isExporting = false;

        // Clean up any temporary elements
        const orphanIframes = Array.from(document.querySelectorAll('iframe'))
          .filter(f => f.style && f.style.left === '-9999px' && f.style.top === '-9999px');
        orphanIframes.forEach(f => {
          try { document.body.removeChild(f); } catch (_) { }
        });
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
            title: this.$t('design.export.librariesNotAvailable'),
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
          title: this.$t('design.export.success'),
          icon: 'success',
          duration: 2000
        });
      } catch (error) {
        // Handle any errors
        uni.hideLoading();
        // console.error('Error exporting images:', error);
        uni.showToast({
          title: this.$t('design.toast.errorExportingImages'),
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
        title: this.$t('design.export.downloadingIndividually'),
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

    //     exportHTML() {
    //       // Show loading toast
    //       uni.showLoading({
    //         title: 'Preparing HTML...',
    //         mask: true
    //       });

    //       try {
    //         // Get project data from storage
    //         const jsonData = uni.getStorageSync('latest_7_overall_page');
    //         if (!jsonData) {
    //           uni.hideLoading();
    //           uni.showToast({
    //             title: 'No project data found',
    //             icon: 'none',
    //             duration: 2000
    //           });
    //           return;
    //         }

    //         // Parse the JSON data
    //         const projectData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    //         // Extract page components
    //         if (!projectData.pages || !projectData.pages.length) {
    //           uni.hideLoading();
    //           uni.showToast({
    //             title: 'No pages found in project',
    //             icon: 'none',
    //             duration: 2000
    //           });
    //           return;
    //         }

    //         // For mobile, save to file directly
    //         if (uni.getSystemInfoSync().platform !== 'web') {
    //           this.exportHTMLMobile(projectData);
    //           return;
    //         }

    //         // For web, try to create a zip file using the imported libraries
    //         try {
    //           // Use the imported JSZip and saveAs
    //           if (typeof JSZip !== 'function' || typeof saveAs !== 'function') {
    //             // Fallback to a simple HTML download if libraries aren't available
    //             this.exportHTMLSimple(projectData);
    //             return;
    //           }

    //           const zip = new JSZip();

    //           // Project name for zip file name
    //           const projectName = projectData.AIProjectName || 'ui_genius_project';

    //           // Basic HTML template
    //           const htmlTemplate = (content) => `${content}`;

    //           // Create an index.html with links to all pages
    //           let indexContent = `<div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    //   <h1 style="color: var(--theme-color); margin-bottom: 20px;">${projectName}</h1>
    //   <p style="margin-bottom: 20px;">${projectData.AIProjectDescription || ''}</p>
    //   <h2 style="margin-bottom: 15px;">Pages:</h2>
    //   <ul style="list-style: none;">`;

    //           // Add each page to the zip and create link in index
    //           projectData.pages.forEach((page) => {
    //             const pageName = page.name.replace(/ Page/i, '');
    //             const fileName = pageName.toLowerCase().replace(/\s+/g, '-') + '.html';

    //             // Create HTML file for the page
    //             const pageContent = page.component || '<div>No content available</div>';
    //             const fullHtml = htmlTemplate(pageContent);
    //             zip.file(fileName, fullHtml);

    //             // Add link to index
    //             indexContent += `<li style="margin-bottom: 10px;">
    //       <a href="${fileName}" style="color: var(--theme-color); text-decoration: none; font-weight: bold; padding: 5px 0; display: inline-block;">
    //         ${pageName}
    //       </a>
    //     </li>`;
    //           });

    //           // Close the index HTML
    //           indexContent += `</ul></div>`;

    //           // Add index.html to zip
    //           zip.file('index.html', htmlTemplate(indexContent));

    //           // Generate and save the zip
    //           zip.generateAsync({ type: "blob" }).then((content) => {
    //             saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}_html.zip`);
    //             uni.hideLoading();
    //             uni.showToast({
    //               title: 'HTML exported successfully!',
    //               icon: 'success',
    //               duration: 2000
    //             });
    //           });
    //         } catch (error) {
    //           // Fallback to simple HTML export
    //           this.exportHTMLSimple(projectData);
    //         }
    //       } catch (error) {
    //         uni.hideLoading();
    //         uni.showToast({
    //           title: 'Error exporting HTML',
    //           icon: 'none',
    //           duration: 2000
    //         });
    //         console.error('Error exporting HTML:', error);
    //       }
    //     },

    //     exportHTMLMobile(projectData) {
    //       // Create a single HTML file with all pages for mobile platforms
    //       const projectName = projectData.AIProjectName || 'ui_genius_project';
    //       let content = `<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8">
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //   <title>${projectName}</title>
    //   <style>
    //     /* Reset styles */
    //     * { margin: 0; padding: 0; box-sizing: border-box; }
    //     body { font-family: Arial, sans-serif; line-height: 1.6; }
    //     /* Navigation */
    //     .nav { background: var(--theme-color); padding: 10px; position: sticky; top: 0; z-index: 100; }
    //     .nav ul { display: flex; list-style: none; overflow-x: auto; white-space: nowrap; }
    //     .nav a { color: white; text-decoration: none; padding: 10px 15px; display: inline-block; }
    //     .page { padding: 20px; min-height: 100vh; }
    //     h1 { margin-bottom: 20px; }
    //   </style>
    // </head>
    // <body>
    //   <nav class="nav">
    //     <ul>`;

    //       // Add navigation links
    //       projectData.pages.forEach((page) => {
    //         const pageName = page.name.replace(/ Page/i, '');
    //         const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    //         content += `<li><a href="#${pageId}">${pageName}</a></li>`;
    //       });

    //       content += `</ul>
    //   </nav>
    //   <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    //     <h1 style="color: var(--theme-color);">${projectName}</h1>
    //     <p style="margin-bottom: 30px;">${projectData.AIProjectDescription || ''}</p>
    //   </div>`;

    //       // Add each page
    //       projectData.pages.forEach((page) => {
    //         const pageName = page.name.replace(/ Page/i, '');
    //         const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    //         const pageContent = page.component || '<div>No content available</div>';

    //         content += `<div id="${pageId}" class="page">
    //     <h2 style="color: var(--theme-color); margin-bottom: 20px;">${pageName}</h2>
    //     ${pageContent}
    //   </div>`;
    //       });

    //       content += `</body></html>`;

    //       // Save the file
    //       const filePath = `${uni.env.USER_DATA_PATH}/${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
    //       const fs = uni.getFileSystemManager();

    //       fs.writeFile({
    //         filePath: filePath,
    //         data: content,
    //         encoding: 'utf8',
    //         success: () => {
    //           uni.hideLoading();
    //           uni.showToast({
    //             title: 'HTML file saved',
    //             icon: 'success',
    //             duration: 2000
    //           });

    //           // Open the file if possible
    //           uni.openDocument({
    //             filePath: filePath,
    //             showMenu: true,
    //             fail: () => {
    //               console.log('Unable to open HTML file');
    //             }
    //           });
    //         },
    //         fail: (error) => {
    //           uni.hideLoading();
    //           uni.showToast({
    //             title: 'Failed to save HTML file',
    //             icon: 'none',
    //             duration: 2000
    //           });
    //           console.error('Failed to save HTML file:', error);
    //         }
    //       });
    //     },

    //     exportHTMLSimple(projectData) {
    //       // Create a single HTML file for all pages
    //       const projectName = projectData.AIProjectName || 'ui_genius_project';
    //       let content = `<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8">
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //   <title>${projectName}</title>
    //   <style>
    //     /* Reset styles */
    //     * { margin: 0; padding: 0; box-sizing: border-box; }
    //     body { font-family: Arial, sans-serif; line-height: 1.6; }
    //     /* Navigation */
    //     .nav { background: var(--theme-color); padding: 10px; position: sticky; top: 0; z-index: 100; }
    //     .nav ul { display: flex; list-style: none; overflow-x: auto; white-space: nowrap; }
    //     .nav a { color: white; text-decoration: none; padding: 10px 15px; display: inline-block; }
    //     .page { padding: 20px; min-height: 100vh; }
    //     h1 { margin-bottom: 20px; }
    //   </style>
    // </head>
    // <body>
    //   <nav class="nav">
    //     <ul>`;

    //       // Add navigation links
    //       projectData.pages.forEach((page) => {
    //         const pageName = page.name.replace(/ Page/i, '');
    //         const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    //         content += `<li><a href="#${pageId}">${pageName}</a></li>`;
    //       });

    //       content += `</ul>
    //   </nav>
    //   <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    //     <h1 style="color: var(--theme-color);">${projectName}</h1>
    //     <p style="margin-bottom: 30px;">${projectData.AIProjectDescription || ''}</p>
    //   </div>`;

    //       // Add each page
    //       projectData.pages.forEach((page) => {
    //         const pageName = page.name.replace(/ Page/i, '');
    //         const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    //         const pageContent = page.component || '<div>No content available</div>';

    //         content += `<div id="${pageId}" class="page">
    //     <h2 style="color: var(--theme-color); margin-bottom: 20px;">${pageName}</h2>
    //     ${pageContent}
    //   </div>`;
    //       });

    //       content += `</body></html>`;

    //       // Download the file
    //       try {
    //         const blob = new Blob([content], { type: 'text/html' });
    //         const url = URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(url);

    //         uni.hideLoading();
    //         uni.showToast({
    //           title: 'HTML exported successfully!',
    //           icon: 'success',
    //           duration: 2000
    //         });
    //       } catch (error) {
    //         uni.hideLoading();
    //         uni.showToast({
    //           title: 'Error downloading HTML',
    //           icon: 'none',
    //           duration: 2000
    //         });
    //         console.error('Error downloading HTML:', error);
    //       }
    //     },
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

            // Force a re-render and inject styles
            this.$forceUpdate();
            this.$nextTick(() => {
              this.injectScopedStyles();
              
              // Generate preview images only if:
              // 1. We haven't generated them in this session yet, OR
              // 2. We're missing images for some templates
              if (!this.previewImagesGenerated || this.needsImageGeneration()) {
                setTimeout(() => {
                  this.generatePreviewImages();
                  this.previewImagesGenerated = true;
                }, 300);
              }
            });
          }
        } catch (e) {
          console.error('Error parsing JSON template data:', e);
        }
      } else {
        // No project data - clear templates to show fallback static templates
        if (this.jsonTemplates.length > 0 || this.dynamicTemplateIds.length > 0) {
          this.jsonTemplates = [];
          this.dynamicTemplateIds = [];

          // Clear all existing loading states first
          this.templateLoadingStates = {};

          // Reset to static template loading states
          this.$set(this.templateLoadingStates, 'signup', true);
          this.$set(this.templateLoadingStates, 'home', true);
          this.$set(this.templateLoadingStates, 'notification', true);
          this.$set(this.templateLoadingStates, 'profile', true);
          this.$set(this.templateLoadingStates, 'settings', true);

          // Force a re-render to show fallback templates
          this.$forceUpdate();

          // Generate preview images for static templates only if needed
          this.$nextTick(() => {
            if (!this.previewImagesGenerated || this.needsImageGeneration()) {
              setTimeout(() => {
                this.generatePreviewImages();
                this.previewImagesGenerated = true;
                // Reveal static templates
                const staticKeys = ['signup', 'home', 'notification', 'profile', 'settings'];
                staticKeys.forEach((key, index) => {
                  setTimeout(() => {
                    this.$set(this.templateLoadingStates, key, false);
                  }, 500 + (index * 100));
                });
              }, 300);
            } else {
              // Just reveal the templates if images already exist
              const staticKeys = ['signup', 'home', 'notification', 'profile', 'settings'];
              staticKeys.forEach((key, index) => {
                setTimeout(() => {
                  this.$set(this.templateLoadingStates, key, false);
                }, 100 + (index * 50));
              });
            }
          });
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
          // console.log(`Template ${key} has changed, will regenerate image`);
        }
      });

      // Always force regeneration after a UI generation
      const forceRegeneration = uni.getStorageSync('force_regeneration') === 'true';
      if (forceRegeneration) {
        needsUpdate = true;
        uni.removeStorageSync('force_regeneration');
        // console.log('Forcing template regeneration after UI generation');
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
      // Reset the flag to force regeneration of preview images
      this.previewImagesGenerated = false;
      
      // Use the new pullRefreshProject method to refresh from cloud
      this.pullRefreshProject();
      this.loadJsonTemplates();
      this.updateLoadingStates();
      // Note: generatePreviewImages() is handled by loadJsonTemplates() when flag is reset
    },

    refreshDataLocal(showToast = true) {
      // Reset the flag to force regeneration of preview images
      this.previewImagesGenerated = false;
      
      // Clear stored images first
      this.clearStoredImages(showToast);

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

      // Generate preview images first with proper timing
      setTimeout(() => {
        this.generatePreviewImages();
      }, 500);

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
        title: message || this.$t('design.toast.loading'),
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

          // Check if this is the first page and update project preview
          this.updateProjectPreviewIfNeeded(key, data.imageData);
        } catch (e) {
          // console.error(`Failed to store image data for ${key} from local storage:`, e);
        }
      }
    },

    updateProjectPreviewIfNeeded(pageKey, imageData) {
      // Get the current project data
      const projectDataStr = uni.getStorageSync('latest_7_overall_page');
      if (!projectDataStr) {
        return;
      }

      try {
        const projectData = typeof projectDataStr === 'string' ? JSON.parse(projectDataStr) : projectDataStr;

        // Check if this is the first page
        if (projectData.pages && projectData.pages.length > 0) {
          const firstPage = projectData.pages[0];
          const firstPageKey = firstPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');

          // If this is the first page's image, update the project preview
          if (pageKey === firstPageKey) {
            const currentProjectId = uni.getStorageSync('currentProjectId');

            // Only update if we have a valid project ID
            if (currentProjectId) {
              // Check if we've already updated the preview for this project
              const previewUpdatedKey = `preview_updated_${currentProjectId}`;
              const alreadyUpdated = uni.getStorageSync(previewUpdatedKey);

              if (alreadyUpdated) {
                // console.log('Project preview already updated, skipping:', currentProjectId);
                return;
              }

              // console.log('Updating project preview image for first page:', pageKey);

              // Call cloud function to update preview image
              uniCloud.callFunction({
                name: 'user-project',
                data: {
                  action: 'update',
                  id: currentProjectId,
                  data: {
                    currentProjectId: currentProjectId,
                    projectPreviewImage: imageData
                  }
                }
              }).then(res => {
                if (res.result && res.result.success) {
                  // console.log('Project preview image updated successfully');
                  // Mark as updated to prevent duplicate updates
                  uni.setStorageSync(previewUpdatedKey, 'true');
                }
              }).catch(err => {
                console.error('Failed to update project preview image:', err);
              });
            }
          }
        }
      } catch (e) {
        console.error('Error updating project preview:', e);
      }
    },

    updateImportedProjectPreview(projectData, retryCount = 0) {
      // Get the first page preview image from storage
      if (!projectData || !projectData.pages || projectData.pages.length === 0) {
        // console.log('No pages in imported project to create preview');
        return;
      }

      const currentProjectId = uni.getStorageSync('currentProjectId');

      if (!currentProjectId) {
        // console.log('No current project ID found');
        return;
      }

      // Check if we've already updated the preview for this project
      const previewUpdatedKey = `preview_updated_${currentProjectId}`;
      const alreadyUpdated = uni.getStorageSync(previewUpdatedKey);

      if (alreadyUpdated) {
        // console.log('Imported project preview already updated, skipping:', currentProjectId);
        return;
      }

      const firstPage = projectData.pages[0];
      const firstPageKey = firstPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');

      try {
        const previewImage = uni.getStorageSync(`uigenius_image_${firstPageKey}`);

        if (!previewImage) {
          // Only retry up to 5 times to prevent infinite loops
          if (retryCount < 5) {
            // console.log(`Preview image not yet generated for first page: ${firstPageKey}, retry ${retryCount + 1}/5`);
            // Retry after another delay
            setTimeout(() => {
              this.updateImportedProjectPreview(projectData, retryCount + 1);
            }, 1000);
          } else {
            // console.log('Max retry attempts reached, preview image not available');
          }
          return;
        }

        // console.log('Updating imported project preview image with first page:', firstPageKey);

        // Update the project preview image in the cloud
        uniCloud.callFunction({
          name: 'user-project',
          data: {
            action: 'update',
            id: currentProjectId,
            data: {
              currentProjectId: currentProjectId,
              projectPreviewImage: previewImage
            }
          }
        }).then(res => {
          if (res.result && res.result.success) {
            // console.log('Imported project preview image updated successfully');
            // Mark as updated to prevent duplicate updates
            uni.setStorageSync(previewUpdatedKey, 'true');
          }
        }).catch(err => {
          console.error('Failed to update imported project preview image:', err);
        });
      } catch (e) {
        console.error('Error updating imported project preview:', e);
      }
    },

    async generatePreviewImages() {
      // Use iframe isolation for dynamic templates to prevent style leakage
      if (this.jsonTemplates.length > 0) {
        const templatesToGenerate = this.jsonTemplates.filter(template => {
          const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          let hasImage = false;
          try {
            hasImage = !!uni.getStorageSync('uigenius_image_' + key);
          } catch (e) { }
          return !hasImage;
        });

        if (templatesToGenerate.length === 0) {
          return;
        }

        // OPTIMIZATION: Dynamic parallel count based on device capabilities
        const getOptimalParallelCount = () => {
          // Use navigator.hardwareConcurrency to detect CPU cores (defaults to 4 if unavailable)
          const cpuCores = navigator.hardwareConcurrency || 4;
          // Use deviceMemory if available (in GB), default to 4GB assumption
          const memory = navigator.deviceMemory || 4;
          
          // Calculate optimal count: 
          // - Base on CPU cores (leave 1-2 cores free for UI)
          // - Cap based on memory (each iframe ~50-100MB)
          // - Never exceed templates count
          let optimal = Math.max(2, Math.floor(cpuCores * 0.75)); // Use 75% of cores
          
          // Adjust for memory: ~1 parallel task per 1GB RAM, minimum 2
          const memoryLimit = Math.max(2, Math.floor(memory));
          optimal = Math.min(optimal, memoryLimit);
          
          // Cap at reasonable maximum (8) to avoid diminishing returns
          optimal = Math.min(optimal, 8);
          
          return Math.min(optimal, templatesToGenerate.length);
        };
        
        const PARALLEL_COUNT = getOptimalParallelCount();
        // console.log(`[Preview] Using ${PARALLEL_COUNT} parallel workers (CPU: ${navigator.hardwareConcurrency || 'unknown'}, Memory: ${navigator.deviceMemory || 'unknown'}GB)`);
        
        const iframes = [];
        
        for (let i = 0; i < PARALLEL_COUNT; i++) {
          const iframe = document.createElement('iframe');
          iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1440px;height:1200px;visibility:hidden;';
          document.body.appendChild(iframe);
          iframes.push(iframe);
        }

        // OPTIMIZATION: Faster render check with reduced timeouts
        const waitForRender = (iframeDoc, maxWait = 1500) => {
          return new Promise((resolve) => {
            let waited = 0;
            const checkInterval = 50;
            
            const checkReady = () => {
              waited += checkInterval;
              if (iframeDoc.readyState === 'complete' || waited >= maxWait) {
                setTimeout(resolve, 400); // Increased for ECharts
                return;
              }
              setTimeout(checkReady, checkInterval);
            };
            setTimeout(checkReady, 100);
          });
        };

        // OPTIMIZATION: Process single template with minimal delays
        const processTemplate = async (template, iframe) => {
          const key = template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          const templateId = 'template-' + key;

          let componentContent = template.component || '';
          if (typeof componentContent === 'string' && componentContent.startsWith('```')) {
            componentContent = componentContent.replace(/^```(?:html|vue)?\s*/, '').replace(/```\s*$/, '');
          }

          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; font-family: Arial, sans-serif; }
    img { max-width: 100%; }
  </style>
</head>
<body>
  <div id="${templateId}" style="width: 100%; background: #fff;">
    ${componentContent}
  </div>
</body>
</html>`);
          iframeDoc.close();

          await waitForRender(iframeDoc);

          try {
            const wrapper = iframeDoc.getElementById(templateId);
            if (wrapper) {
              void wrapper.offsetHeight;
              // Wait for charts/scripts to render (increased for ECharts compatibility)
              await new Promise(r => setTimeout(r, 600));
              
              const rect = wrapper.getBoundingClientRect();
              if (rect.height > 0 && rect.width > 0) {
                const canvas = await html2canvas(wrapper, {
                  width: rect.width,
                  height: Math.min(rect.height, 1200),
                  scale: 0.75, // OPTIMIZATION: Reduced scale for faster rendering
                  useCORS: true,
                  logging: false,
                  backgroundColor: '#ffffff',
                  allowTaint: true,
                  imageTimeout: 5000, // OPTIMIZATION: Limit image loading time
                  removeContainer: true,
                  foreignObjectRendering: false
                });

                const imageData = canvas.toDataURL('image/jpeg', 0.7); // OPTIMIZATION: JPEG is faster than PNG
                this.receiveImageData({ element: templateId, imageData: imageData });
              }
            }
          } catch (e) {
            console.error('Preview generation failed for ' + key, e);
          }
        };

        // OPTIMIZATION: Process templates in parallel batches
        const processBatch = async (startIndex) => {
          const batch = templatesToGenerate.slice(startIndex, startIndex + PARALLEL_COUNT);
          if (batch.length === 0) {
            // Cleanup iframes
            iframes.forEach(iframe => document.body.removeChild(iframe));
            uni.hideLoading();
            return;
          }

          await Promise.all(batch.map((template, i) => processTemplate(template, iframes[i])));
          
          // Process next batch
          await processBatch(startIndex + PARALLEL_COUNT);
        };

        await processBatch(0);

      } else {
        // Fallback to static template IDs (DOM based)
        const templateIds = [
          'template-signup',
          'template-home',
          'template-notification',
          'template-profile',
          'template-settings'
        ];

        // Filter out templates that already have images in storage
        const templatesToGenerate = templateIds.filter(id => {
          const key = id.replace('template-', '');
          try {
            const imageData = uni.getStorageSync(`uigenius_image_${key}`);
            return !imageData;
          } catch (e) {
            return true;
          }
        });

        if (templatesToGenerate.length === 0) {
          return;
        }

        this._showLoading(this.$t('design.toast.generatingImages', { count: templatesToGenerate.length }));

        // Capture elements sequentially
        const captureSequentially = (index) => {
          if (index >= templatesToGenerate.length) {
            uni.hideLoading();
            return;
          }

          const id = templatesToGenerate[index];
          if (document.getElementById(id)) {
            uni.$emit('capture-element', { elementId: id });
          }

          setTimeout(() => {
            captureSequentially(index + 1);
          }, 150);
        };

        captureSequentially(0);
      }
    },

    async generateUI() {
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

      // Check special user limitation first
      const skipLoginUid = uni.getStorageSync('uid');
      if (skipLoginUid === '123bcbfeqqaeabfaf5a') {
        const specialUserCheck = await this.checkSpecialUserLimitation('generate-ui');
        if (!specialUserCheck.allowed) {
          this.isGenerating = false;
          this.generationProgress = 0;
          clearInterval(progressInterval);
          return; // Exit if not allowed
        }
      }
      else {
        const membershipCheck = await this.performMembershipCheck('generate-ui');
        if (!membershipCheck.allowed) {
          this.isGenerating = false;
          this.generationProgress = 0;
          clearInterval(progressInterval);
          return; // Exit if not allowed
        }
      }
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
        model: uni.getStorageSync('selectedModel') || 'gemini2.5',
        num_pages: 1,
        need_project_description: true  // Only generate description for new projects
      };

      // Show a toast to indicate a long wait
      uni.showToast({
        title: this.$t('design.toast.generatingLongWait'),
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
              title: this.$t('design.toast.apiError', { code: response.statusCode }),
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
                const projectTitle = parsedResponse.AIProjectName;
                const projectDescription = parsedResponse.AIProjectDescription;

                // Use AIProjectName directly as page name
                newPage.name = parsedResponse.AIProjectName;

                // Add the new page to the project
                projectData.pages.push(newPage);

                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);

                // Save project to the cloud if logged in
                this.saveProjectToCloud(projectData, projectTitle, projectDescription)
                  .then(() => {
                    // Set flag to refresh dashboard when user returns
                    uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
                  })
                  .catch((err) => {
                    console.error('Failed to save project to cloud:', err);
                  });

                // Do not Extract colors anymore
                // this.extractColors(newPage);


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
                  // uni.showToast({
                  //   title: 'New page created successfully!',
                  //   icon: 'success',
                  //   duration: 2000
                  // });

                  // Navigate to editor with the new template ID
                  const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                  uni.setStorageSync('selectedTemplateId', newTemplateId);

                  setTimeout(() => {
                    uni.switchTab({
                      url: '/pages/editor/editor'
                    });
                  }, 500);
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
                      // uni.showToast({
                      //   title: 'New page created successfully!',
                      //   icon: 'success',
                      //   duration: 2000
                      // });

                      // Navigate to editor with the new template ID
                      const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                      uni.setStorageSync('selectedTemplateId', newTemplateId);

                      setTimeout(() => {
                        uni.switchTab({
                          url: '/pages/editor/editor'
                        });
                      }, 500);
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
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function (match, p1) {
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
                    // uni.showToast({
                    //   title: 'New page created successfully!',
                    //   icon: 'success',
                    //   duration: 2000
                    // });

                    // Navigate to editor with the new template ID
                    const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
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
                      title: this.$t('design.toast.simplePageCreated'),
                      icon: 'success',
                      duration: 2000
                    });

                    // Navigate to editor with the new template ID
                    const newTemplateId = simplifiedPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
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
              title: this.$t('design.toast.failedToProcessPageData') + error.message,
              icon: 'none',
              duration: 3000
            });
          }

          // Remove the automatic navigation since we're handling it in success cases
        },
        fail: (error) => {
          // Stop the progress interval
          clearInterval(progressInterval);

          // Log the error
          console.error('Error generating page:', error);

          // Handle error
          this.isGenerating = false;
          uni.showToast({
            title: this.$t('design.toast.errorGeneratingPage') + (error.errMsg || this.$t('design.toast.requestFailed')),
            icon: 'none',
            duration: 3000
          });
        }
      });
    },
    navigateTo(item) {
      this.activeNavItem = item;

      // Disable template selection mode when clicking other nav items (not template)
      if (item !== 'template' && this.isTemplateSelectionMode) {
        this.isTemplateSelectionMode = false;
      }

      // Show color palette if color nav item is clicked
      if (item === 'color') {
        this.showColorPalette = true;
        // Load colorCard from storage if not already loaded
        this.loadColorCardFromStorage();
        // Set selected colors from colorCard if available
        if (this.colorCard && this.colorCard.length > 0) {
          // Use all colors from colorCard as selected (up to 5)
          this.colorCard = [...this.colorCard];
          this.previewColor = this.colorCard[0];
          this.customColor = '';
        } else {
          // Initialize empty selection
          this.colorCard = [];
          this.previewColor = this.coolColors[0].hex;
          this.customColor = '';
        }
      }

      // Show create new page dialog if plus nav item is clicked
      if (item === 'plus') {
        this.showCreatePageDialog = true;
        this.pageDescription = '';
        this.errorMessage = '';
        // Initialize model selection to google/gemini-3-flash-preview
        this.selectedPageModel = 'google/gemini-3-flash-preview';

        // Populate available template pages from latest_7_overall_page (but DON'T reset selectedTemplatePageIndex)
        const existingProjectData = uni.getStorageSync('latest_7_overall_page');
        if (existingProjectData) {
          try {
            const projectData = typeof existingProjectData === 'string'
              ? JSON.parse(existingProjectData)
              : existingProjectData;

            if (projectData && projectData.pages && projectData.pages.length > 0) {
              this.availableTemplatePages = projectData.pages;
              // Only set to 0 if current index is out of bounds
              if (this.selectedTemplatePageIndex >= projectData.pages.length) {
                this.selectedTemplatePageIndex = 0;
              }
            } else {
              this.availableTemplatePages = [];
            }
          } catch (e) {
            console.error('Error parsing project data:', e);
            this.availableTemplatePages = [];
          }
        } else {
          this.availableTemplatePages = [];
        }
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
      if (item === 'guide') {
        this.startGuide();
      }

      // Toggle template selection mode
      if (item === 'template') {
        this.isTemplateSelectionMode = !this.isTemplateSelectionMode;

        // Populate available template pages
        const existingProjectData = uni.getStorageSync('latest_7_overall_page');
        if (existingProjectData) {
          try {
            const projectData = typeof existingProjectData === 'string'
              ? JSON.parse(existingProjectData)
              : existingProjectData;

            if (projectData && projectData.pages && projectData.pages.length > 0) {
              this.availableTemplatePages = projectData.pages;
            }
          } catch (e) {
            console.error('Error parsing project data:', e);
          }
        }

        if (this.isTemplateSelectionMode) {
          uni.showToast({
            title: this.$t('design.toast.clickToSelectTemplate'),
            icon: 'none',
            duration: 2000
          });
        } else {
          uni.showToast({
            title: this.$t('design.toast.templateSelectionDisabled'),
            icon: 'none',
            duration: 1500
          });
        }
      }
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      uni.showToast({
        title: this.$t('design.toast.selectedTemplate', { template: template }),
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
    // Parse template and extract HTML and styles separately
    parseTemplate(template) {
      if (!template || !template.component) {
        return { html: '<div class="preview-placeholder">No preview available</div>', styles: '' };
      }

      try {
        let component = template.component;
        const templateId = 'template-' + template.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');

        // Clean up code block markers if present
        if (typeof component === 'string' && component.startsWith('```')) {
          component = component.replace(/^```(?:html|vue)?\s*/, '').replace(/```\s*$/, '');
        }

        if (typeof component !== 'string') {
          return { html: '<div class="preview-placeholder">Invalid component format</div>', styles: '' };
        }

        // Extract style tags
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        let styles = '';
        let match;
        const styleMatches = [];

        while ((match = styleRegex.exec(component)) !== null) {
          styleMatches.push(match[1]);
        }

        // Remove style tags from HTML
        let html = component.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

        // Scope the styles to this template's container
        if (styleMatches.length > 0) {
          const scopedStyles = styleMatches.map(styleContent => {
            // Add scope prefix to all CSS selectors
            // This ensures styles only apply within the template container
            return this.scopeCSS(styleContent, `#${templateId} .preview-content`);
          }).join('\n');

          // Return styles as plain CSS (not wrapped in style tag)
          // We'll inject it dynamically via updated hook
          styles = scopedStyles;
        }

        return { html, styles };
      } catch (e) {
        console.error('Error parsing template:', e);
        return { html: '<div class="preview-placeholder">Error rendering preview</div>', styles: '' };
      }
    },

    // Scope CSS selectors to a specific container
    // This ensures styles only apply within the preview container, preventing global CSS leakage
    scopeCSS(css, scopeSelector) {
      if (!css || !scopeSelector) return css;

      let scopedCSS = css;

      // First, handle @media queries - extract and scope their content
      scopedCSS = scopedCSS.replace(/@media\s+([^{]+)\{([\s\S]*?)\}/g, (match, mediaQuery, content) => {
        // Scope all rules inside the media query
        const scopedContent = this.scopeCSSRules(content, scopeSelector);
        return `@media ${mediaQuery} {${scopedContent}}`;
      });

      // Handle @keyframes - keep them as is (they don't need scoping)
      // But we'll scope any selectors that reference them

      // Handle regular CSS rules - scope all selectors
      scopedCSS = scopedCSS.replace(/(^|\n|\r)([^{@\n\r]+)\{([^}]+)\}/gm, (match, prefix, selector, declarations) => {
        const trimmedSelector = selector.trim();
        // Skip @rules (already handled above)
        if (trimmedSelector.startsWith('@')) {
          return match;
        }
        // Skip empty selectors
        if (!trimmedSelector) {
          return match;
        }
        // Handle multiple selectors separated by commas
        const scopedSelectors = trimmedSelector.split(',').map(s => {
          const trimmed = s.trim();
          // Don't scope if it's already scoped or is a pseudo-element/class
          if (trimmed.startsWith(scopeSelector) || trimmed.startsWith('::') || trimmed.startsWith(':')) {
            return trimmed;
          }
          return `${scopeSelector} ${trimmed}`;
        }).join(', ');

        return `${prefix}${scopedSelectors} {${declarations}}`;
      });

      return scopedCSS;
    },

    // Scope CSS rules within a block (like inside @media)
    scopeCSSRules(css, scopeSelector) {
      if (!css) return css;

      // Handle nested rules and regular rules
      return css.replace(/(^|\n|\r)([^{@\n\r]+)\{([^}]+)\}/gm, (match, prefix, selector, declarations) => {
        const trimmedSelector = selector.trim();
        if (trimmedSelector.startsWith('@') || !trimmedSelector) {
          return match;
        }

        // Handle multiple selectors separated by commas
        const scopedSelectors = trimmedSelector.split(',').map(s => {
          const trimmed = s.trim();
          if (trimmed.startsWith(scopeSelector) || trimmed.startsWith('::') || trimmed.startsWith(':')) {
            return trimmed;
          }
          return `${scopeSelector} ${trimmed}`;
        }).join(', ');

        return `${prefix}${scopedSelectors} {${declarations}}`;
      });
    },

    // Get HTML content without styles
    getPreviewHTML(template) {
      const parsed = this.parseTemplate(template);
      return parsed.html;
    },

    // Get scoped styles
    getScopedStyles(template) {
      const parsed = this.parseTemplate(template);
      return parsed.styles;
    },

    // Legacy method for backward compatibility
    getSimplifiedPreview(template) {
      return this.getPreviewHTML(template);
    },

    // Inject scoped styles dynamically into the page
    injectScopedStyles() {
      // Always start from a clean slate so no stale styles leak out
      this.cleanupInjectedStyles();
      // Use nextTick to ensure DOM is updated
      this.$nextTick(() => {
        const injectors = document.querySelectorAll('.preview-style-injector');
        injectors.forEach(injector => {
          const templateId = injector.getAttribute('data-template-id');
          const styles = injector.getAttribute('data-styles');

          if (!templateId || !styles) return;

          // Check if style already injected for this template
          const existingStyleId = `scoped-style-${templateId}`;
          let styleElement = document.getElementById(existingStyleId);

          if (!styleElement) {
            // Create new style element
            styleElement = document.createElement('style');
            styleElement.id = existingStyleId;
            document.head.appendChild(styleElement);
          }

          // Update style content
          styleElement.textContent = styles;
        });
      });
    },

    // Clean up injected styles
    cleanupInjectedStyles() {
      const styleElements = document.querySelectorAll('[id^="scoped-style-"]');
      styleElements.forEach(el => el.remove());
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

    clearStoredImages(showToast = true) {
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
      // if (showToast) {
      //   uni.showToast({
      //     title: 'Images cleared',
      //     icon: 'none',
      //     duration: 2000
      //   });
      // }
    },

    saveProjectToCloud(content, projectTitle, projectDescription) {
      // Check if this is the special skip login user
      const skipLoginUid = uni.getStorageSync('uid');
      if (skipLoginUid === '123bcbfeqqaeabfaf5a') {
        // Return early for skip login user
        return Promise.resolve();
      }

      // Check for existing project ID
      const currentProjectId = uni.getStorageSync('currentProjectId');
      const uid = uni.getStorageSync('uid');
      const email = uni.getStorageSync('email');

      // Get preview image for the first page
      let previewImage = '';
      if (content && content.pages && content.pages.length > 0) {
        const firstPage = content.pages[0];
        const firstPageKey = firstPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');

        // Try to get the captured image from storage
        try {
          previewImage = uni.getStorageSync(`uigenius_image_${firstPageKey}`) || '';
          // console.log(`Using preview image for project from page: ${firstPageKey}`);
        } catch (e) {
          console.error('Failed to get preview image:', e);
        }
      }

      // Prepare project data
      const projectData = {
        uid: uid,
        email: email,
        currentProjectId: currentProjectId,
        projectTitle: projectTitle || '',
        projectDescription: projectDescription || '',
        generated_overall_pages: content,
        projectPreviewImage: previewImage
      };

      // Decide action and payload
      const action = currentProjectId ? 'update' : 'create';
      const callData = currentProjectId ? {
        action: action,
        id: currentProjectId,
        data: projectData
      } : {
        action: action,
        data: projectData
      };

      // Call cloud function to save
      return uniCloud.callFunction({
        name: 'user-project',
        data: callData
      }).then(res => {
        if (res.result && res.result.success) {
          // console.log('res.result', res.result);
          if (action === 'create' && res.result.project_id) {
            uni.setStorageSync('currentProjectId', res.result.project_id);
            // console.log('Project created in cloud with ID:', res.result.project_id);

            // Clear the preview update flag for the new project to allow preview update
            const previewUpdatedKey = `preview_updated_${res.result.project_id}`;
            uni.removeStorageSync(previewUpdatedKey);
          } else {
            // console.log('Project updated in cloud with ID:', currentProjectId);
          }
          return res.result.project_id || currentProjectId;
        } else {
          throw new Error(this.$t('design.toast.failedTo') + action + this.$t('design.toast.project'));
        }
      }).catch(err => {
        console.error('Cloud function error:', err);
        uni.showToast({
          title: this.$t('design.toast.cloudSaveFailed'),
          icon: 'error',
          duration: 2000
        });
        throw err;
      });
    },
    saveProjectThemeToCloud(themeColour) {
      // Check for existing project ID
      const currentProjectId = uni.getStorageSync('currentProjectId');

      // If no project ID exists, cannot update theme
      if (!currentProjectId) {
        // console.warn('No project ID found, cannot update theme color');
        return Promise.reject(new Error('No project ID found'));
      }

      // Prepare theme update data
      const projectData = {
        themeColour: themeColour || []
      };

      // Call cloud function to update theme only
      return uniCloud.callFunction({
        name: 'user-project',
        data: {
          action: 'update',
          id: currentProjectId,
          data: projectData
        }
      }).then(res => {
        if (res.result && res.result.success) {
          // console.log('Project theme updated in cloud with ID:', currentProjectId);
          return res.result.project_id || currentProjectId;
        } else {
          throw new Error(this.$t('design.toast.failedToUpdateProjectTheme'));
        }
      }).catch(err => {
        console.error('Cloud function error:', err);
        uni.showToast({
          title: this.$t('design.toast.themeSaveFailed'),
          icon: 'error',
          duration: 2000
        });
        throw err;
      });
    },
    // Add a new method to fully refresh templates
    refreshTemplates() {
      // console.log('Refreshing templates completely');

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
        title: this.$t('design.toast.preparingHtml'),
        mask: true
      });

      try {
        // Get project data from storage
        const jsonData = uni.getStorageSync('latest_7_overall_page');
        if (!jsonData) {
          uni.hideLoading();
          uni.showToast({
            title: this.$t('design.toast.noProjectData'),
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
            title: this.$t('design.export.noData'),
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
        const htmlTemplate = (content) => `${content}`;

        // Create an index.html with links to all pages
        let indexContent = `
<div style="max-width: 800px; margin: 0 auto; padding: 20px;">
  <h1 style="color: var(--theme-color); margin-bottom: 20px;">${projectName}</h1>
  <p style="margin-bottom: 20px;">${projectData.AIProjectDescription || ''}</p>
  <h2 style="margin-bottom: 15px;">${this.$t('design.export.pages')}</h2>
  <ul style="list-style: none;">`;

        // Add each page to the zip and create link in index
        projectData.pages.forEach((page, index) => {
          const pageName = page.name.replace(/ Page/i, '');
          const fileName = pageName.toLowerCase().replace(/\s+/g, '-') + '.html';

          // Create HTML file for the page
          const pageContent = page.component || `<div>${this.$t('design.export.noContent')}</div>`;
          const fullHtml = htmlTemplate(pageContent);
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
        zip.file('index.html', htmlTemplate(indexContent));

        // Generate and save the zip
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `${projectName.toLowerCase().replace(/\s+/g, '-')}_html.zip`);
          uni.hideLoading();
          uni.showToast({
            title: this.$t('design.toast.htmlExportSuccess'),
            icon: 'success',
            duration: 2000
          });
        });

      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: this.$t('design.toast.htmlExportError'),
          icon: 'none',
          duration: 2000
        });
        console.error('Error exporting HTML:', error);
      }
    },

    exportFrameworkCode(framework) {
      // Show loading toast
      uni.showLoading({
        title: this.$t('design.toast.preparingCode', { framework: framework.toUpperCase() }),
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
            model: 'gemini2.5',
            framework: framework
          },
          header: {
            'content-type': 'application/json'
          },
          // Set a much longer timeout (15 minutes)
          timeout: 900000,
          success: (res) => {

            uni.hideLoading();
            // console.log('res', res);
            if (res.data) {
              // console.log('res.data', res.data);
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
                  title: this.$t('design.toast.codeExportSuccess', { framework: framework.toUpperCase() }),
                  icon: 'success',
                  duration: 2000
                });
              });
            } else {
              uni.showToast({
                title: this.$t('design.toast.codeExportError', { framework: framework.toUpperCase() }),
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: (err) => {
            uni.hideLoading();
            uni.showToast({
              title: this.$t('design.toast.exportFailed', { error: err.errMsg }),
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
      // console.log('Selected page model:', this.selectedPageModel);
    },

    // Custom dropdown methods
    toggleModelDropdown() {
      this.showModelDropdown = !this.showModelDropdown;
    },

    selectModel(value) {
      this.selectedPageModel = value;
      this.showModelDropdown = false;
      // console.log('Selected page model:', this.selectedPageModel);
    },

    getSelectedModelText() {
      const selectedOption = this.modelOptions.find(option => option.value === this.selectedPageModel);
      return selectedOption ? selectedOption.text : this.$t('design.model.pleaseSelect');
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

    // Template page selection methods
    handleTemplateClick(template, index) {
      if (this.isTemplateSelectionMode) {
        // In template selection mode, select this template
        this.selectedTemplatePageIndex = index;
        // Stay in template selection mode - user can click multiple times to change selection
        // User needs to click another nav item to exit template selection mode

        // Show confirmation toast
        const templateName = template.name ? template.name.replace(/ Page/i, '') : `Page ${index + 1}`;
        uni.showToast({
          title: this.$t('design.toast.templateSelected', { name: templateName }),
          icon: 'none',
          duration: 1500
        });

        // console.log('Selected template page index:', this.selectedTemplatePageIndex);
      } else {
        // Normal mode, navigate to editor
        this.navigateToEditor(template);
      }
    },

    selectTemplatePage(index) {
      this.selectedTemplatePageIndex = index;
      // console.log('Selected template page index:', this.selectedTemplatePageIndex);
    },

    getSelectedTemplatePageText() {
      if (this.availableTemplatePages.length === 0) {
        return this.$t('design.createPage.noTemplateSelected');
      }
      const selectedPage = this.availableTemplatePages[this.selectedTemplatePageIndex];
      return selectedPage ? (selectedPage.name || this.$t('design.createPage.defaultPageName', { index: this.selectedTemplatePageIndex + 1 })) : this.$t('design.createPage.selectTemplatePage');
    },
    async createPage() {
      // Close the dialog immediately to provide better UX
      this.showCreatePageDialog = false;

      // Validate the page description
      if (!this.pageDescription) {
        this.errorMessage = this.$t('design.toast.enterPageDescription');
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
      // Get the current user ID
      const skipLoginUid = uni.getStorageSync('uid');
      // Check if this is the special user
      if (skipLoginUid === '123bcbfeqqaeabfaf5a') {
        // Check special user limitation first
        const specialUserCheck = await this.checkSpecialUserLimitation('create-page');
        if (!specialUserCheck.allowed) {
          this.isGenerating = false;
          this.generationProgress = 0;
          clearInterval(progressInterval);
          this.showCreatePageDialog = false; // Re-open dialog if not allowed
          return; // Exit if not allowed
        }
      }
      else {
        // Check membership before proceeding
        const membershipCheck = await this.performMembershipCheck('create-page');
        if (!membershipCheck.allowed) {
          this.isGenerating = false;
          this.generationProgress = 0;
          clearInterval(progressInterval);
          this.showCreatePageDialog = false; // Re-open dialog if not allowed
          return; // Exit if not allowed
        }
      }
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
      let prompt = this.pageDescription;

      // If color card exists and toggle is enabled, append color information to the prompt
      if (this.useColor && this.colorCard) {
        const colorInstruction = `\n\nIMPORTANT COLOR SCHEME: Use the following 5 colors as the main color palette for this design: ${this.colorCard.join(', ')}. These colors should be prominently featured in the UI elements, backgrounds, buttons, headers, and other design components. Maintain visual consistency with these colors throughout the design.`;
        prompt += colorInstruction;
      }


      const formData = {
        prompt: prompt,
        device_type: this.selectedDevice,
        model: this.selectedPageModel,
        num_pages: 1,
        need_project_description: false  // Don't generate description when adding pages to existing project
      };

      // If useColor is enabled, also pass the latest_7_overall_page data for context
      if (this.useColor && existingProjectData) {
        const projectData = typeof existingProjectData === 'string'
          ? JSON.parse(existingProjectData)
          : existingProjectData;
        // Extract the selected page based on selectedTemplatePageIndex
        if (projectData && projectData.pages && projectData.pages.length > 0) {
          // Use the selected template page index, or default to 0 if index is out of bounds
          const pageIndex = this.selectedTemplatePageIndex < projectData.pages.length
            ? this.selectedTemplatePageIndex
            : 0;
          formData.latest_7_overall_page = JSON.stringify(projectData.pages[pageIndex]);
        }
      }

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
            // console.log('responseData', responseData);

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

                // Use AIProjectName directly as page name
                newPage.name = parsedResponse.AIProjectName;

                // Add the new page to the project
                projectData.pages.push(newPage);

                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);

                // If useColor is enabled but colorCard doesn't exist, extract colors from the new page
                // Note: This runs asynchronously in the background and doesn't block subsequent code execution
                // if (this.useColor && (!this.colorCard || this.colorCard.length === 0)) {
                // }

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
                  // uni.showToast({
                  //   title: 'New page created successfully!',
                  //   icon: 'success',
                  //   duration: 2000
                  // });

                  // Navigate to editor with the new template ID
                  const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                  uni.setStorageSync('selectedTemplateId', newTemplateId);

                  setTimeout(() => {
                    uni.switchTab({
                      url: '/pages/editor/editor'
                    });
                  }, 500);
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

                    // If useColor is enabled but colorCard doesn't exist, extract colors from the new page
                    // Note: This runs asynchronously in the background and doesn't block subsequent code execution
                    // if (this.useColor && (!this.colorCard || this.colorCard.length === 0)) {
                    //   this.extractColors(newPage);
                    // }

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
                      // uni.showToast({
                      //   title: 'New page created successfully!',
                      //   icon: 'success',
                      //   duration: 2000
                      // });

                      // Navigate to editor with the new template ID
                      const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                      uni.setStorageSync('selectedTemplateId', newTemplateId);

                      setTimeout(() => {
                        uni.switchTab({
                          url: '/pages/editor/editor'
                        });
                      }, 500);
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
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function (match, p1) {
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

                  // If useColor is enabled but colorCard doesn't exist, extract colors from the new page
                  // Note: This runs asynchronously in the background and doesn't block subsequent code execution
                  // if (this.useColor && (!this.colorCard || this.colorCard.length === 0)) {
                  //   this.extractColors(newPage);
                  // }

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
                    // uni.showToast({
                    //   title: 'New page created successfully!',
                    //   icon: 'success',
                    //   duration: 2000
                    // });

                    // Navigate to editor with the new template ID
                    const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
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
                    name: pageName || this.$t('design.createPage.defaultPageName', { index: projectData.pages.length + 1 }),
                    component: `<div class="container mx-auto p-4">
                      <h1 class="text-2xl font-bold mb-4">${this.$t('design.createPage.simplePageTitle')}</h1>
                      <p>${this.$t('design.createPage.simplePageDescription', { description: this.pageDescription })}</p>
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

                    // Navigate to editor with the new template ID
                    const newTemplateId = simplifiedPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
                  }, 1000);

                  // console.error('Used fallback page creation due to parsing error:', parseError);
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

          // Remove the automatic navigation since we're handling it in success cases
        },
        fail: (error) => {
          // Stop the progress interval
          clearInterval(progressInterval);

          // Log the error
          console.error('Error generating page:', error);

          // Handle error
          this.isGenerating = false;
          uni.showToast({
            title: this.$t('design.toast.generatePageError', { error: error.errMsg || 'Request failed' }),
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
        this.errorMessage = this.$t('design.deletePages.error.selectRequired');
        return;
      }

      // Get existing project data
      const existingProjectData = uni.getStorageSync('latest_7_overall_page');
      if (!existingProjectData) {
        this.errorMessage = this.$t('design.toast.noProjectData');
        return;
      }

      // Parse the project data
      const projectData = typeof existingProjectData === 'string' ? JSON.parse(existingProjectData) : existingProjectData;

      // Prevent deleting all pages
      if (this.pagesToDelete.length >= projectData.pages.length) {
        this.errorMessage = this.$t('design.deletePages.error.keepOne');
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
        title: this.$t('design.deletePages.success'),
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
        // console.log(`Creating fallback image for missing template: ${templateName}`);

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
            // console.log(`Found missing template in jsonTemplates: ${missingTemplate.name}`);
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
      // console.log('File deleted:', e);
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

      // Only check membership for image imports, not HTML imports
      // if (this.selectedImportType === 'image') {
      //   const membershipCheck = await this.performMembershipCheck('import-project');
      //   if (!membershipCheck.allowed) {
      //     return; // Exit if not allowed
      //   }
      // }

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

      // Only check membership for image imports, not HTML imports
      if (this.selectedImportType === 'image') {
        // Check special user limitation first
        const skipLoginUid = uni.getStorageSync('uid');
        if (skipLoginUid === '123bcbfeqqaeabfaf5a') {
          const specialUserCheck = await this.checkSpecialUserLimitation('import-project');
          if (!specialUserCheck.allowed) {
            this.isImporting = false;
            this.importProgress = 0;
            clearInterval(progressInterval);
            return; // Exit if not allowed
          }
        }
        else {
          const membershipCheck = await this.performMembershipCheck('import-project');
          if (!membershipCheck.allowed) {
            this.isImporting = false;
            this.importProgress = 0;
            clearInterval(progressInterval);
            return; // Exit if not allowed
          }
        }
      }

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
        title: this.$t('design.import.processing'),
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

                // Generate title and description for imported project
                const currentProjectId = uni.getStorageSync('currentProjectId');
                let projectTitle, projectDescription;

                if (!currentProjectId) {
                  // Creating a new project - generate title and description
                  const importDate = new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  const fileNames = this.importFileList.map(f => {
                    const name = f.name || f.url || 'image';
                    return name.split('/').pop().split('\\').pop();
                  }).join(', ');
                  projectTitle = fileNames ? `Imported Image Project - ${fileNames.split(',')[0]}` : 'Imported Image Project';
                  projectDescription = `Project created from imported image${this.importFileList.length > 1 ? 's' : ''} on ${importDate}`;
                } else {
                  // Updating existing project - use existing title/description or generate new ones
                  projectTitle = projectData.AIProjectName || 'Imported Image Project';
                  projectDescription = projectData.AIProjectDescription || 'Project updated with imported image';
                }

                // Save the updated project data
                const updatedProjectData = JSON.stringify(projectData);
                uni.setStorageSync('latest_7_overall_page', updatedProjectData);

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

                    // After preview images are generated, update the project preview image and save to cloud
                    setTimeout(() => {
                      this.updateImportedProjectPreview(projectData);

                      // Save project to the cloud if logged in
                      this.saveProjectToCloud(projectData, projectTitle, projectDescription)
                        .then(() => {
                          // Set flag to refresh dashboard when user returns
                          uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
                        })
                        .catch((err) => {
                          console.error('Failed to save project to cloud:', err);
                        });
                    }, 2000);
                  }, 100);

                  // Complete refresh after a delay
                  setTimeout(() => {
                    this.refreshTemplates();
                  }, 500);

                  // Show success message
                  // uni.showToast({
                  //   title: 'Files imported successfully!',
                  //   icon: 'success',
                  //   duration: 2000
                  // });

                  // Navigate to editor with the new template ID
                  const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                  uni.setStorageSync('selectedTemplateId', newTemplateId);

                  setTimeout(() => {
                    uni.switchTab({
                      url: '/pages/editor/editor'
                    });
                  }, 500);
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

                    // Generate title and description for imported project
                    const currentProjectId = uni.getStorageSync('currentProjectId');
                    let projectTitle, projectDescription;

                    if (!currentProjectId) {
                      // Creating a new project - generate title and description
                      const importDate = new Date().toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      });
                      const fileNames = this.importFileList.map(f => {
                        const name = f.name || f.url || 'image';
                        return name.split('/').pop().split('\\').pop();
                      }).join(', ');
                      projectTitle = fileNames ? `Imported Image Project - ${fileNames.split(',')[0]}` : 'Imported Image Project';
                      projectDescription = `Project created from imported image${this.importFileList.length > 1 ? 's' : ''} on ${importDate}`;
                    } else {
                      // Updating existing project - use existing title/description or generate new ones
                      projectTitle = projectData.AIProjectName || 'Imported Image Project';
                      projectDescription = projectData.AIProjectDescription || 'Project updated with imported image';
                    }

                    // Save the updated project data
                    const updatedProjectData = JSON.stringify(projectData);
                    uni.setStorageSync('latest_7_overall_page', updatedProjectData);

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

                        // After preview images are generated, update the project preview image and save to cloud
                        setTimeout(() => {
                          this.updateImportedProjectPreview(projectData);

                          // Save project to the cloud if logged in
                          this.saveProjectToCloud(projectData, projectTitle, projectDescription)
                            .then(() => {
                              // Set flag to refresh dashboard when user returns
                              uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
                            })
                            .catch((err) => {
                              console.error('Failed to save project to cloud:', err);
                            });
                        }, 2000);
                      }, 100);

                      // Complete refresh after a delay
                      setTimeout(() => {
                        this.refreshTemplates();
                      }, 500);

                      // Show success message
                      // uni.showToast({
                      //   title: 'Files imported successfully!',
                      //   icon: 'success',
                      //   duration: 2000
                      // });

                      // Navigate to editor with the new template ID
                      const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                      uni.setStorageSync('selectedTemplateId', newTemplateId);

                      setTimeout(() => {
                        uni.switchTab({
                          url: '/pages/editor/editor'
                        });
                      }, 500);
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
                cleanedResponse = cleanedResponse.replace(/`([\s\S]*?)`/g, function (match, p1) {
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

                  // Generate title and description for imported project
                  const currentProjectId = uni.getStorageSync('currentProjectId');
                  let projectTitle, projectDescription;

                  if (!currentProjectId) {
                    // Creating a new project - generate title and description
                    const importDate = new Date().toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });
                    const fileNames = this.importFileList.map(f => {
                      const name = f.name || f.url || 'image';
                      return name.split('/').pop().split('\\').pop();
                    }).join(', ');
                    projectTitle = fileNames ? `Imported Image Project - ${fileNames.split(',')[0]}` : 'Imported Image Project';
                    projectDescription = `Project created from imported image${this.importFileList.length > 1 ? 's' : ''} on ${importDate}`;
                  } else {
                    // Updating existing project - use existing title/description or generate new ones
                    projectTitle = projectData.AIProjectName || 'Imported Image Project';
                    projectDescription = projectData.AIProjectDescription || 'Project updated with imported image';
                  }

                  // Save the updated project data
                  const updatedProjectData = JSON.stringify(projectData);
                  uni.setStorageSync('latest_7_overall_page', updatedProjectData);

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

                      // After preview images are generated, update the project preview image and save to cloud
                      setTimeout(() => {
                        this.updateImportedProjectPreview(projectData);

                        // Save project to the cloud if logged in
                        this.saveProjectToCloud(projectData, projectTitle, projectDescription)
                          .then(() => {
                            // Set flag to refresh dashboard when user returns
                            uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
                          })
                          .catch((err) => {
                            console.error('Failed to save project to cloud:', err);
                          });
                      }, 2000);
                    }, 100);

                    // Complete refresh after a delay
                    setTimeout(() => {
                      this.refreshTemplates();
                    }, 500);

                    // Show success message
                    // uni.showToast({
                    //   title: 'Files imported successfully!',
                    //   icon: 'success',
                    //   duration: 2000
                    // });

                    // Navigate to editor with the new template ID
                    const newTemplateId = newPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
                  }, 1000);
                } else {
                  throw new Error('No valid page data found in response');
                }
              } catch (parseError) {
                // If all parsing attempts fail, try to extract and create a page manually
                try {
                  // Create a simple page object based on the imported files
                  const type = this.selectedImportType.toUpperCase();
                  const date = new Date().toLocaleDateString();
                  const pageName = this.$t('design.import.pageName', { type, date });
                  const files = this.importFileList.map(f => f.name).join(', ');

                  const simplifiedPage = {
                    name: pageName,
                    component: `<div class="container mx-auto p-4">
                      <h1 class="text-2xl font-bold mb-4">${this.$t('design.import.contentTitle')}</h1>
                      <p>${this.$t('design.import.contentDescription', { type: this.selectedImportType })}</p>
                      <p>${this.$t('design.import.filesList', { files })}</p>
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

                      // After preview images are generated, update the project preview image and save to cloud
                      setTimeout(() => {
                        this.updateImportedProjectPreview(projectData);

                        // Save project to the cloud if logged in
                        this.saveProjectToCloud(projectData);
                      }, 2000);
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

                    // Navigate to editor with the new template ID
                    const newTemplateId = simplifiedPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                    uni.setStorageSync('selectedTemplateId', newTemplateId);

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/editor/editor'
                      });
                    }, 500);
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
    successUploadFiles() {
      // console.log('successUploadFiles', this.importFileList);
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
          const timestamp = new Date().getTime();
          const pageName = f.name ? `Imported ${nameBase}` : `Imported HTML ${timestamp}`;
          projectData.pages.push({ name: pageName, component: f.content });
        });

        // Generate title and description for imported project
        const currentProjectId = uni.getStorageSync('currentProjectId');
        let projectTitle, projectDescription;

        if (!currentProjectId) {
          // Creating a new project - generate title and description
          const importDate = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          const fileNames = filesToImport.map(f => {
            const name = f.name || 'HTML';
            return name.replace(/\.(html?|HTML?)$/, '');
          }).join(', ');
          projectTitle = fileNames ? `Imported HTML Project - ${fileNames.split(',')[0]}` : 'Imported HTML Project';
          projectDescription = `Project created from imported HTML file${filesToImport.length > 1 ? 's' : ''} on ${importDate}`;
        } else {
          // Updating existing project - use existing title/description or generate new ones
          projectTitle = projectData.AIProjectName || 'Imported HTML Project';
          projectDescription = projectData.AIProjectDescription || 'Project updated with imported HTML';
        }

        // Save the updated project data
        const updatedProjectData = JSON.stringify(projectData);
        uni.setStorageSync('latest_7_overall_page', updatedProjectData);

        // Save project to the cloud if logged in
        this.saveProjectToCloud(projectData, projectTitle, projectDescription)
          .then(() => {
            // Set flag to refresh dashboard when user returns
            uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
          })
          .catch((err) => {
            console.error('Failed to save project to cloud:', err);
          });

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

          // Navigate to editor with the new template ID
          const lastPage = projectData.pages[projectData.pages.length - 1];
          const newTemplateId = lastPage.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
          uni.setStorageSync('selectedTemplateId', newTemplateId);

          setTimeout(() => {
            uni.switchTab({
              url: '/pages/editor/editor'
            });
          }, 500);
        }, 1000);

      } catch (error) {
        console.error('Error processing HTML import:', error);

        // Handle error
        this.isImporting = false;
        uni.showToast({
          title: this.$t('design.import.processHtmlError', { error: error.message }),
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
      this.htmlFiles = [];

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.html'; // 限制为HTML文件
      input.multiple = true;
      input.onchange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
          this.readMultipleFiles(files);
        }
        // Clear the input value to allow selecting the same file again
        input.value = '';
      };
      input.click();
    },

    // Read HTML file content using FileReader
    readFileContent(file) {
      // console.log('Reading file:', file.name, 'Size:', file.size);

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        this.htmlFileContent = content;
        this.htmlFileName = file.name; // Store the filename
        this.htmlFiles = [{ name: file.name, content }];
        // console.log('HTML file content loaded:', file.name);
        // console.log('Content length:', this.htmlFileContent.length);
        // console.log('First 100 characters:', this.htmlFileContent.substring(0, 100));

        // Validate that it's actually HTML content
        if (this.htmlFileContent && this.htmlFileContent.trim()) {
          uni.showToast({
            title: this.$t('design.import.htmlFileLoaded', { name: file.name }),
            icon: 'success',
            duration: 2000
          });
        } else {
          this.htmlFileContent = '';
          this.htmlFileName = '';
          this.htmlFiles = [];
          uni.showToast({
            title: this.$t('design.import.invalidHtml'),
            icon: 'none',
            duration: 2000
          });
        }
      };

      reader.onerror = () => {
        console.error('读取文件失败');
        this.htmlFileContent = '';
        this.htmlFiles = [];
        uni.showToast({
          title: this.$t('design.import.readError'),
          icon: 'none',
          duration: 2000
        });
      };

      reader.readAsText(file, 'UTF-8'); // 以文本形式读取
    },
    // Read multiple HTML files as text and populate htmlFiles
    readMultipleFiles(files) {
      const readOne = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
        reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
        reader.readAsText(file, 'UTF-8');
      });
      Promise.all(files.map(readOne))
        .then(results => {
          // Filter out empty contents
          const valid = results.filter(r => r.content && String(r.content).trim());
          this.htmlFiles = valid;
          if (valid.length === 0) {
            uni.showToast({ title: this.$t('design.import.emptyFiles'), icon: 'none', duration: 2000 });
            return;
          }
          // Keep backward-compatible single fields for any other logic
          this.htmlFileName = valid[0].name;
          this.htmlFileContent = valid[0].content;
          uni.showToast({ title: this.$t('design.import.htmlFilesCountLoaded', { count: valid.length }), icon: 'success', duration: 2000 });
        })
        .catch(err => {
          console.error(err);
          this.htmlFiles = [];
          uni.showToast({ title: this.$t('design.import.readSelectedError'), icon: 'none', duration: 2000 });
        });
    },
    tryImportByProjectId(projectId) {
      if (!projectId) return;

      // Check if this shared project has already been imported
      // let importedProjectsMap = {};
      // try {
      //   const mapStr = uni.getStorageSync('importedShareProjectsMap');
      //   if (mapStr) {
      //     importedProjectsMap = JSON.parse(mapStr);
      //   }
      // } catch (e) {
      //   console.error('Failed to parse importedShareProjectsMap:', e);
      // }

      // If already imported, load the existing project instead of push the uid to the project's share uid list
      // if (importedProjectsMap[projectId]) {
      //   const existingProjectId = importedProjectsMap[projectId];
      //   console.log('Project already imported. Loading existing project:', existingProjectId);

      //   uni.showLoading({ title: 'Loading imported project...' });
      //   uniCloud.callFunction({
      //     name: 'generated-overall-pages',
      //     data: {
      //       action: 'read',
      //       id: existingProjectId
      //     }
      //   }).then(res => {
      //     uni.hideLoading();
      //     if (res.result && res.result.success && res.result.data) {
      //       const projectData = res.result.data;
      //       uni.setStorageSync('latest_7_overall_page', JSON.stringify(projectData));
      //       uni.setStorageSync('currentProjectId', existingProjectId);
      //       uni.setStorageSync('force_regeneration', 'true');

      //       this.loadJsonTemplates();
      //       this.updateLoadingStates();
      //       setTimeout(() => {
      //         this.generatePreviewImages();

      //         // Update preview image after images are generated
      //         setTimeout(() => {
      //           this.updateImportedProjectPreview(projectData);
      //         }, 2000);
      //       }, 100);

      //       uni.showToast({ title: 'Loaded previously imported project', icon: 'success', duration: 2000 });
      //     } else {
      //       uni.showToast({ title: 'Failed to load existing project', icon: 'none', duration: 2000 });
      //     }
      //   }).catch(err => {
      //     uni.hideLoading();
      //     uni.showToast({ title: 'Error loading existing project', icon: 'none', duration: 2000 });
      //     console.error('Cloud function error:', err);
      //   });
      //   return;
      // }

      // If not imported before, proceed with import
      uni.showLoading({ title: this.$t('design.toast.loadingProject') });
      uniCloud.callFunction({
        name: 'generated-overall-pages',
        data: {
          action: 'read',
          id: projectId
        }
      }).then(res => {
        uni.hideLoading();
        if (res.result && res.result.success && res.result.data) {
          const importedData = res.result.data;
          // Store imported project locally
          uni.setStorageSync('latest_7_overall_page', JSON.stringify(importedData));
          uni.setStorageSync('force_regeneration', 'true');
          this.loadJsonTemplates();
          this.updateLoadingStates();
          setTimeout(() => {
            this.generatePreviewImages();
            this.refreshTemplates();
            uni.showToast({ title: this.$t('design.toast.projectRefreshed'), icon: 'success', duration: 2000 });

            // After preview images are generated, update the project preview image
            // Wait longer to ensure images are captured
            setTimeout(() => {
              this.updateImportedProjectPreview(importedData);
            }, 2000);
          }, 100);

          // Always create a new project for the current user when importing from a share link
          // Clear the existing project ID to force creation of a new project
          // const originalProjectId = uni.getStorageSync('currentProjectId');
          // uni.removeStorageSync('currentProjectId');

          // Check if current user is the project owner
          const currentUid = uni.getStorageSync('uid') || uni.getStorageSync('userInfo')?.uid;
          if (currentUid == '123bcbfeqqaeabfaf5a') {
            uni.hideLoading();
            return
          }

          uniCloud.callFunction({
            name: 'user-project',
            data: {
              action: 'readUidByProjectId',
              id: projectId
            }
          }).then(uidRes => {
            // Only call shareProjectUpdateUidArray if current user is not the project owner
            if (uidRes.result && uidRes.result.success && uidRes.result.data) {
              const projectOwnerUid = uidRes.result.data.uid;

              if (projectOwnerUid !== currentUid) {
                // Call shareProjectUpdate to add current user to the shared project's shareProjectUidArray
                uniCloud.callFunction({
                  name: 'user-project',
                  data: {
                    action: 'shareProjectUpdateUidArray',
                    id: projectId,
                    data: {
                      shareUid: currentUid
                    }
                  }
                }).then(shareRes => {
                  // console.log('Project shared successfully:', shareRes);
                }).catch(shareErr => {
                  console.error('Failed to update share project:', shareErr);
                });
              } else {
                console.log('Current user is the project owner, skipping share update');
              }
            }
          }).catch(uidErr => {
            console.error('Failed to retrieve project owner UID:', uidErr);
          });

          // Prepare project title and description for imported project
          // const importedProjectTitle = 'Shared project from other users';
          // const importDate = new Date().toLocaleString('en-US', { 
          //   year: 'numeric', 
          //   month: 'short', 
          //   day: 'numeric', 
          //   hour: '2-digit', 
          //   minute: '2-digit' 
          // });
          // const importedProjectDescription = `Imported shared project on ${importDate}`;

          // No longer need to create a new project - user now has direct access via shareProjectUpdate
          // The shared project is added to the current user's accessible projects through shareProjectUidArray
          /*
          // Create a new project in the current user's account with the imported content
          this.saveProjectToCloud(importedData, importedProjectTitle, importedProjectDescription)
            .then((newId) => {
              // saveProjectToCloud sets currentProjectId on create
              const createdProjectId = newId || uni.getStorageSync('currentProjectId');
              console.log('Imported project saved to cloud with ID:', createdProjectId);
              
              // Record the mapping from shared project ID to new project ID
              importedProjectsMap[projectId] = createdProjectId;
              uni.setStorageSync('importedShareProjectsMap', JSON.stringify(importedProjectsMap));
              
              // Set flag to refresh dashboard when user navigates to it
              uni.setStorageSync('ifLoadProjectsByUidWhenUserBackToDashboard', 'true');
              
              uni.showToast({ title: 'Project imported successfully', icon: 'success', duration: 2000 });
            })
            .catch((err) => {
              console.error('Failed to save imported project to cloud:', err);
              // Restore original project ID on failure
              if (originalProjectId) {
                uni.setStorageSync('currentProjectId', originalProjectId);
              }
              uni.showToast({ title: 'Failed to save imported project', icon: 'none', duration: 2000 });
            });
          */
        } else {
          uni.showToast({ title: this.$t('design.toast.failedToLoadProject'), icon: 'none', duration: 2000 });
        }
      }).catch(err => {
        uni.hideLoading();
        uni.showToast({ title: this.$t('design.toast.errorLoadingProject'), icon: 'none', duration: 2000 });
        console.error('Cloud function error:', err);
      });
    },

    pullRefreshProject() {
      // Get the current project ID from storage
      const currentProjectId = uni.getStorageSync('currentProjectId');

      if (!currentProjectId) {
        // If no current project ID, fall back to regular refresh
        this.refreshDataLocal();
        return;
      }

      // Show loading indicator
      uni.showLoading({ title: this.$t('design.toast.refreshingProject') });

      // Call the cloud function to get the latest project data
      uniCloud.callFunction({
        name: 'generated-overall-pages',
        data: {
          action: 'read',
          id: currentProjectId
        }
      }).then(res => {
        uni.hideLoading();
        if (res.result && res.result.success && res.result.data) {
          // Update the project data with the latest version
          uni.setStorageSync('latest_7_overall_page', JSON.stringify(res.result.data));
          // uni.setStorageSync('force_regeneration', 'true');

          // Clear stored images to force regeneration
          this.clearStoredImages();

          // Reset all loading states
          this.templatesLoading = true;

          // Load the updated JSON templates
          // this.loadJsonTemplates();
          // this.updateLoadingStates();

          // Generate new preview images
          setTimeout(() => {
            this.generatePreviewImages();
            // Load the newly generated images after a delay
            this.loadImagesFromStorage();
          }, 100);

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

          uni.showToast({ title: this.$t('design.toast.projectRefreshed'), icon: 'success', duration: 2000 });
        } else {
          // If cloud refresh fails, fall back to regular refresh
          // console.warn('Failed to refresh from cloud, falling back to local refresh');
          this.refreshDataLocal();
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('Cloud function error during refresh:', err);

        // If cloud refresh fails, fall back to regular refresh
        console.warn('Cloud refresh failed, falling back to local refresh');
        this.refreshDataLocal();
      });
    },
    removeHtmlFile(index) {
      if (!Array.isArray(this.htmlFiles)) return;
      if (index < 0 || index >= this.htmlFiles.length) return;
      this.htmlFiles.splice(index, 1);
    },
    async optimizePageDescription() {
      if (!this.pageDescription || this.isOptimizingPrompt) return;

      // Check membership before proceeding
      // const membershipCheck = await this.performMembershipCheck('optimize-prompt');
      // if (!membershipCheck.allowed) {
      //   return; // Exit if not allowed
      // }

      this.isOptimizingPrompt = true;
      // Optional: show a quick toast
      uni.showToast({ title: this.$t('design.toast.optimizingPrompt'), icon: 'none', duration: 1500 });
      uni.request({
        url: `${API_BASE_URL}/optimize-prompt`,
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: {
          description: this.pageDescription,
          model: 'gemini2.5'
        },
        timeout: 120000,
        success: (res) => {
          // console.log('Optimize prompt response:', res);  
          try {
            const data = res && res.data ? res.data : {};
            // Try several common shapes
            const optimized = data.optimized_description || '';
            if (typeof optimized === 'string' && optimized.trim().length > 0) {
              this.pageDescription = optimized.trim();
              uni.showToast({ title: this.$t('design.toast.promptImproved'), icon: 'success', duration: 1500 });
            } else {
              uni.showToast({ title: this.$t('design.toast.noOptimizedPrompt'), icon: 'none', duration: 2000 });
            }
          } catch (e) {
            uni.showToast({ title: this.$t('design.toast.optimizeFailed'), icon: 'none', duration: 2000 });
          }
        },
        fail: (err) => {
          uni.showToast({ title: this.$t('design.toast.optimizeError', { error: err.errMsg || 'Request failed' }), icon: 'none', duration: 2500 });
        },
        complete: () => {
          this.isOptimizingPrompt = false;
        }
      });
    },

    // async extractColors(page = null) {
    //   // If no page is provided, just return
    //   if (!page || !page.component) {
    //     return;
    //   }

    //   this.isExtractingColors = true;
    //   uni.showToast({ title: 'Extracting colors...', icon: 'none', duration: 1500 });

    //   try {
    //     const htmlCode = page.component;

    //     if (!htmlCode) {
    //       throw new Error('No HTML code found in the page');
    //     }

    //     // Call the backend API to extract colors
    //     uni.request({
    //       url: `${API_BASE_URL}/extract-colors`,
    //       method: 'POST',
    //       header: { 'content-type': 'application/json' },
    //       data: {
    //         code: htmlCode,
    //         model: this.selectedPageModel || 'gemini2.5'
    //       },
    //       timeout: 60000,
    //       success: (res) => {
    //         try {
    //           const data = res && res.data ? res.data : {};
    //           if (data.success && data.colors && Array.isArray(data.colors) && data.colors.length === 5) {
    //             // Store color card in component data
    //             this.colorCard = data.colors;

    //             // Store color card in localStorage
    //             uni.setStorageSync('colorCard', JSON.stringify(data.colors));

    //             // If color palette is open, update selected colors from colorCard
    //             if (this.showColorPalette && this.colorCard.length > 0) {
    //               this.colorCard = [...this.colorCard];
    //               this.previewColor = this.colorCard[0];
    //               this.customColor = '';
    //             }

    //             // Save extracted colors to cloud
    //             this.saveProjectThemeToCloud(this.colorCard).catch(err => {
    //               console.error('Failed to save extracted colors to cloud:', err);
    //             });

    //             uni.showToast({
    //               title: 'Color card extracted successfully!',
    //               icon: 'success',
    //               duration: 2000
    //             });
    //           } else {
    //             throw new Error('Invalid color data returned from server');
    //           }
    //         } catch (e) {
    //           console.error('Error processing color extraction response:', e);
    //           uni.showToast({
    //             title: 'Failed to extract colors: ' + e.message,
    //             icon: 'none',
    //             duration: 2000
    //           });
    //         }
    //       },
    //       fail: (err) => {
    //         console.error('Color extraction request failed:', err);
    //         uni.showToast({
    //           title: `Color extraction error: ${err.errMsg || 'Request failed'}`,
    //           icon: 'none',
    //           duration: 2500
    //         });
    //       },
    //       complete: () => {
    //         this.isExtractingColors = false;
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Error in extractColors:', error);
    //     uni.showToast({
    //       title: 'Error: ' + error.message,
    //       icon: 'none',
    //       duration: 2000
    //     });
    //     this.isExtractingColors = false;
    //   }
    // },

    clearColorCard() {
      this.colorCard = [];
      uni.removeStorageSync('colorCard');
      // Clear selected colors when colorCard is cleared
      this.colorCard = [];
      this.customColor = '';
      this.previewColor = this.coolColors[0].hex;
      uni.showToast({
        title: this.$t('design.toast.colorCardCleared'),
        icon: 'success',
        duration: 1500
      });
    },

    loadColorCardFromStorage() {
      try {
        const storedColorCard = uni.getStorageSync('colorCard');
        if (storedColorCard) {
          this.colorCard = JSON.parse(storedColorCard);
          // If color palette is open, update selected colors from colorCard
          if (this.showColorPalette && this.colorCard.length > 0) {
            this.colorCard = [...this.colorCard];
            this.previewColor = this.colorCard[0];
            this.customColor = '';
          }
        } else {
          // Clear colorCard if no stored color card exists
          this.colorCard = [];
        }

        // Load the toggle state (default to true if not set)
        const storedToggleState = uni.getStorageSync('useColor');
        if (storedToggleState !== null && storedToggleState !== undefined && storedToggleState !== '') {
          this.useColor = storedToggleState === true || storedToggleState === 'true' || storedToggleState === 1 || storedToggleState === '1';
        }
      } catch (e) {
        console.error('Error loading color card from storage:', e);
      }
    },

    // Membership check methods
    async checkMembership() {
      try {
        const uid = uni.getStorageSync('uid');
        if (!uid) {
          throw new Error('User not logged in');
        }

        const result = await uniCloud.callFunction({
          name: 'checkMembership',
          data: {
            action: 'checkMembership',
            uid: uid
          }
        });

        if (result.result && result.result.success) {
          return result.result.data;
        } else {
          throw new Error(result.result?.message || 'Failed to check membership');
        }
      } catch (error) {
        console.error('Error checking membership:', error);
        throw error;
      }
    },

    async checkFreeUsage(type) {
      try {
        const uid = uni.getStorageSync('uid');
        if (!uid) {
          throw new Error('User not logged in');
        }

        const result = await uniCloud.callFunction({
          name: 'checkMembership',
          data: {
            action: 'checkFreeUsage',
            uid: uid,
            type: type // 0 for UI generation, 1 for screenshot conversion
          }
        });

        if (result.result && result.result.success) {
          return result.result.data;
        } else {
          throw new Error(result.result?.message || 'Failed to check free usage');
        }
      } catch (error) {
        console.error('Error checking free usage:', error);
        throw error;
      }
    },

    async performMembershipCheck(actionType) {
      try {
        // First check membership
        const membershipData = await this.checkMembership();

        if (membershipData.hasMembership) {
          // User has membership, allow the action
          return { allowed: true, reason: 'membership', membershipData };
        }

        // No membership, check free usage based on action type
        let usageType;
        switch (actionType) {
          case 'generate-ui':
          case 'create-page':
            usageType = 0; // UI generation
            break;
          case 'import-project':
            usageType = 1; // Screenshot conversion
            break;
          case 'export-code':
          case 'optimize-prompt':
            usageType = 0; // UI generation
            break;
          default:
            throw new Error('Invalid action type');
        }

        const freeUsageData = await this.checkFreeUsage(usageType);

        if (!freeUsageData.allowed) {
          // Show membership upgrade dialog or message
          const usageTypeText = usageType === 0 ? this.$t('common.usageType.uiGeneration') : this.$t('common.usageType.screenshotConversion');
          const message = this.$t('common.limitReachedMessage', { type: usageTypeText });

          // Use custom modal instead of uni.showModal
          this.showCustomUpgradeModal(message);

          return { allowed: false, reason: freeUsageData.reason, freeUsageData };
        }

        // Free usage allowed
        return { allowed: true, reason: 'free_usage', freeUsageData };

      } catch (error) {
        console.error('Error performing membership check:', error);
        uni.showToast({
          title: this.$t('design.toast.permissionCheckError', { error: error.message }),
          icon: 'none',
          duration: 3000
        });
        return { allowed: false, reason: 'error', error: error.message };
      }
    },

    showCustomUpgradeModal(message) {
      this.upgradeModalMessage = message;
      this.showUpgradeModal = true;
    },

    closeUpgradeModal() {
      this.showUpgradeModal = false;
      this.upgradeModalMessage = '';
    },

    handleUpgradeConfirm() {
      this.closeUpgradeModal();
      // Navigate to membership page
      try {
        uni.setStorageSync('dashboardNavItem', 'membership');
      } catch (e) { }
      uni.switchTab({
        url: '/pages/dashboard/dashboard'
      });
    },
    toggleuseColor() {
      this.useColor = !this.useColor;
      try {
        uni.setStorageSync('useColor', this.useColor);
      } catch (e) { }
    },
    // Color palette methods
    selectColor(color) {
      // Initialize colorCard if not exists
      if (!this.colorCard) {
        this.colorCard = [];
      }

      // Check if color is already selected
      const index = this.colorCard.indexOf(color);

      if (index > -1) {
        // If already selected, remove it (toggle off)
        this.colorCard.splice(index, 1);
      } else {
        // If not selected and we have less than 5 colors, add it
        if (this.colorCard.length < 5) {
          this.colorCard.push(color);
        } else {
          // Show error if trying to select more than 5 colors
          this.colorPaletteError = this.$t('design.colorPalette.error.limitReached');
          setTimeout(() => {
            this.colorPaletteError = '';
          }, 3000);
          return;
        }
      }

      // Update preview color to the first selected color or default
      if (this.colorCard.length > 0) {
        this.previewColor = this.colorCard[0];
      } else {
        this.previewColor = '#86E3CE';
      }

      this.customColor = '';
      this.colorPaletteError = '';
    },

    validateColorInput() {
      if (this.customColor && this.isValidColor(this.customColor)) {
        // Only validate the color, don't automatically add to selection
        // Clear any previous error
        this.colorPaletteError = '';
      } else if (this.customColor) {
        this.colorPaletteError = 'Invalid color format. Please use #RRGGBB format.';
      }
    },

    addCustomColor() {
      // Add custom color when user presses Enter
      if (this.customColor && this.isValidColor(this.customColor)) {
        this.selectColor(this.customColor);
      } else if (this.customColor) {
        this.colorPaletteError = this.$t('design.colorPalette.error.invalidFormat');
        setTimeout(() => {
          this.colorPaletteError = '';
        }, 3000);
      }
    },

    isValidColor(color) {
      if (!color) return false;
      // Check if it's a valid hex color (#RRGGBB or #RGB)
      const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexPattern.test(color);
    },

    confirmColorSelection() {
      // Check if custom color is valid and add it if not already in colorCard
      if (this.customColor && this.isValidColor(this.customColor)) {
        if (!this.colorCard) {
          this.colorCard = [];
        }
        if (this.colorCard.indexOf(this.customColor) === -1 && this.colorCard.length < 5) {
          this.colorCard.push(this.customColor);
        }
      }

      // Check if we have at least one color selected(don't check anymore)
      // if (!this.colorCard || this.colorCard.length === 0) {
      //   this.colorPaletteError = 'Please select at least one color or enter a valid custom color.';
      //   return;
      // }

      // Update colorCard with selected colors (up to 5)
      // Keep the actual selected colors without padding
      this.colorCard = [...this.colorCard];

      // Save to storage
      uni.setStorageSync('colorCard', JSON.stringify(this.colorCard));

      // Save theme color to cloud
      this.saveProjectThemeToCloud(this.colorCard).catch(err => {
        console.error('Failed to save theme color:', err);
      });

      // Close the palette
      this.showColorPalette = false;
      this.colorPaletteError = '';

      uni.showToast({
        title: this.$t('design.colorPalette.toast.applied', { count: this.colorCard.length }),
        icon: 'success',
        duration: 2000
      });
    },

    cancelColorSelection() {
      this.showColorPalette = false;
      this.colorPaletteError = '';
      // Restore previous selection from colorCard if available
      if (this.colorCard && this.colorCard.length > 0) {
        this.colorCard = [...this.colorCard];
        this.previewColor = this.colorCard[0];
      } else {
        this.colorCard = [];
        this.previewColor = '#86E3CE';
      }
      this.customColor = '';
    },

    async checkSpecialUserLimitation(actionType) {
      try {
        // Get the current usage count for this special user
        const usageKey = 'special_user_usage';
        let currentUsage = uni.getStorageSync(usageKey) || 0;

        // Check if user has reached the limit (3 times total)
        if (currentUsage >= 3) {
          uni.showToast({
            title: this.$t('design.toast.specialUserLimitReached'),
            icon: 'none',
            duration: 4000
          });
          return { allowed: false, reason: 'limit_reached', currentUsage: currentUsage };
        }

        // Check if the action type is one of the limited actions
        const limitedActions = ['generate-ui', 'create-page', 'import-project'];
        if (limitedActions.includes(actionType)) {
          // Increment the usage count
          currentUsage += 1;
          uni.setStorageSync(usageKey, currentUsage);
          // Show remaining usage
          const remaining = 3 - currentUsage;
          return { allowed: true, reason: 'special_user', currentUsage: currentUsage, remaining: remaining };
        }

        // For non-limited actions, allow the action
        return { allowed: true, reason: 'normal_action' };

      } catch (error) {
        console.error('Error checking special user limitation:', error);
        // If there's an error, allow the action to proceed
        return { allowed: true, reason: 'error_fallback' };
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
            return;
          }
          
          if (dom.clientWidth <= 0 || dom.clientHeight <= 0) {
            return;
          }
          
          void dom.offsetHeight;
          
          html2canvas(dom, {
            width: dom.clientWidth,
            height: dom.clientHeight,
            scrollY: 0,
            scrollX: 0,
            useCORS: true,
            scale: 1, // OPTIMIZATION: Reduced from 1.5 for faster rendering
            logging: false,
            backgroundColor: '#ffffff',
            imageTimeout: 5000, // OPTIMIZATION: Add timeout instead of 0 (infinite)
            allowTaint: true,
            removeContainer: true,
            foreignObjectRendering: false,
            // OPTIMIZATION: Remove expensive onclone callback - html2canvas handles styles well enough
            // Only copy styles for elements with explicit background colors if needed
            onclone: (clonedDoc) => {
              const clonedElement = clonedDoc.getElementById(elementId);
              if (clonedElement) {
                void clonedElement.offsetHeight;
                // OPTIMIZATION: Only copy background colors for direct children (not all descendants)
                const originalElement = document.getElementById(elementId);
                if (originalElement) {
                  const directChildren = originalElement.children;
                  const clonedChildren = clonedElement.children;
                  const len = Math.min(directChildren.length, clonedChildren.length, 50); // Limit to 50 elements
                  for (let i = 0; i < len; i++) {
                    const computedStyle = window.getComputedStyle(directChildren[i]);
                    if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                      clonedChildren[i].style.backgroundColor = computedStyle.backgroundColor;
                    }
                  }
                }
              }
            }
          }).then((canvas) => {
            const imageData = canvas.toDataURL('image/jpeg', 0.75); // OPTIMIZATION: JPEG is faster than PNG
            uni.$emit('image-captured', { element: elementId, imageData });
          }).catch(err => {
            console.error(`Failed to generate image for ${elementId}:`, err);
            uni.$emit('capture-error', { element: elementId, error: err.toString() });
          });
        } catch (err) {
          console.error(`Exception while capturing ${elementId}:`, err);
          uni.$emit('capture-error', { element: elementId, error: `Exception: ${err.toString()}` });
        }
      }, 50); // OPTIMIZATION: Reduced from 100ms
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
  flex-shrink: 0;
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

.preview-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-scoped-styles {
  display: none;
  /* Hide the style container, styles will still apply */
}

.preview-style-injector {
  display: none;
  /* Hidden element used for style injection via data attributes */
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
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
  background-color: rgba(0, 0, 0, 0.5);
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
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  /* Allow wrapping on smaller screens */
}

.color-card-label {
  font-size: 14px;
  color: #666;
  margin-right: 10px;
  font-weight: 500;
}

.selected-colors-info {
  text-align: center;
  margin: 15px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.selected-colors-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
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
    border: 2px solid #e53935;
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
  max-width: 570px;
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

/* Color Extraction styles */
.extract-colors-container {
  margin-bottom: 20px;
}

.extract-colors-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.extract-colors-row .model-selection-label {
  display: inline-block !important;
  margin-bottom: 0 !important;
  flex: 1;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  background-color: #ccc;
  border-radius: 13px;
  transition: background-color 0.3s;
  cursor: pointer;
  flex-shrink: 0;

  &.active {
    background-color: #f44336;
  }
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(24px);
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

.delete-btn,
.cancel-btn {
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

  0%,
  20%,
  50%,
  80%,
  100% {
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

.import-btn,
.cancel-btn {
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

/* Custom Toast styles */
.custom-toast {
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

.file-list-item {
  margin-top: 2px;
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
}

.remove-file-btn:hover {
  background-color: #ffecec;
}

/* Custom Upgrade Modal Styles */
.upgrade-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upgrade-modal-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 570px;
  text-align: center;
}

.upgrade-modal-header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.upgrade-modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.upgrade-modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upgrade-modal-message {
  font-size: 16px;
  color: #666;
}

.upgrade-modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.upgrade-modal-cancel,
.upgrade-modal-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upgrade-modal-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.upgrade-modal-confirm {
  background-color: #e53935;
  color: #fff;
}

.upgrade-modal-cancel:hover,
.upgrade-modal-confirm:hover {
  opacity: 0.9;
}

/* Template Selection Mode Styles */
.template-selected {
  position: relative;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(239, 154, 154, 0.3);
}

.template-selected-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, #e53935, #e57373);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(229, 115, 115, 0.35);
  z-index: 10;
}

.template-selected-check {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.template-selected-badge {
  background: linear-gradient(135deg, #e53935, #e57373);
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
  font-weight: 500;
}

.selected-template-info {
  background-color: #fff3e0;
  border: 1px solid #ffcc80;
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 15px;
}

.template-hint {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}
</style>
