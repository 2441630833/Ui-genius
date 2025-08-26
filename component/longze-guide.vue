<template>
  <view class="longze-guide" :class="[theme]" :style="cssVars">
    <view v-if="visible" class="guide-container">
      <!-- Mask layer -->
      <view v-if="theme === 'dark'" class="mask-layer">
        <view class="mask-top" :style="{
          left: '0',
          top: '0',
          right: '0',
          height: targetPosition.top + 'px'
        }"></view>
        <view class="mask-right" :style="{
          left: (targetPosition.left + targetPosition.width) + 'px',
          top: targetPosition.top + 'px',
          right: '0',
          height: targetPosition.height + 'px'
        }"></view>
        <view class="mask-bottom" :style="{
          left: '0',
          top: (targetPosition.top + targetPosition.height) + 'px',
          right: '0',
          bottom: '0'
        }"></view>
        <view class="mask-left" :style="{
          left: '0',
          top: targetPosition.top + 'px',
          width: targetPosition.left + 'px',
          height: targetPosition.height + 'px'
        }"></view>
      </view>
      
      <!-- Highlight border -->
      <view class="highlight-border" :style="{
        left: targetPosition.left + 'px',
        top: targetPosition.top + 'px',
        width: targetPosition.width + 'px',
        height: targetPosition.height + 'px'
      }"></view>
      
      <!-- Guide box -->
      <view class="guide-box" :style="guideBoxStyle" :class="[guideBoxClass]">
        <view class="content">
          <text class="title">{{ currentStep ? currentStep.title : '' }}</text>
          <text class="description">{{ currentStep ? currentStep.content : '' }}</text>
        </view>
        
        <view class="actions">
          <button v-if="currentIndex > 0" class="btn-prev" @click="prevStep">Previous</button>
          <button v-if="skipEnabled" class="btn-skip" @click="skipGuide">Skip</button>
          <button class="btn-next" @click="nextStep">
            {{ isLastStep ? 'Done' : 'Next' }}
          </button>
        </view>
        
        <view class="step-indicator">
          <text>{{ currentIndex + 1 }}/{{ steps.length }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'longze-guide',
  
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
    },
    skipEnabled: {
      type: Boolean,
      default: true
    },
    // Primary action color (e.g., Next button)
    primaryColor: {
      type: String,
      default: '#e53935'
    },
    // Hover color for primary action
    primaryHoverColor: {
      type: String,
      default: '#d32f2f'
    },
    // Highlight border color for target element
    highlightColor: {
      type: String,
      default: '#e53935'
    },
    // Opacity for highlight shadow (0-1)
    highlightShadowOpacity: {
      type: Number,
      default: 0.3
    }
  },
  
  data() {
    return {
      visible: false,
      currentIndex: 0,
      targetPosition: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  
  computed: {
    currentStep() {
      return this.steps[this.currentIndex] || null;
    },
    
    isLastStep() {
      return this.currentIndex === this.steps.length - 1;
    },
    
    guideBoxStyle() {
      if (!this.currentStep) return {};
      
      const position = this.currentStep.position || 'bottom';
      const offset = 20;
      let left, top;
      
      switch (position) {
        case 'top':
          left = this.targetPosition.left;
          top = this.targetPosition.top - offset - 120;
          break;
        case 'bottom':
          left = this.targetPosition.left;
          top = this.targetPosition.top + this.targetPosition.height + offset;
          break;
        case 'left':
          left = this.targetPosition.left - offset - 300;
          top = this.targetPosition.top;
          break;
        case 'right':
          left = this.targetPosition.left + this.targetPosition.width + offset;
          top = this.targetPosition.top;
          break;
        default:
          left = this.targetPosition.left;
          top = this.targetPosition.top + this.targetPosition.height + offset;
      }
      
      return {
        left: left + 'px',
        top: top + 'px'
      };
    },
    
    guideBoxClass() {
      if (!this.currentStep) return '';
      return `position-${this.currentStep.position || 'bottom'}`;
    },
    
    cssVars() {
      return {
        '--lg-primary': this.primaryColor,
        '--lg-primary-hover': this.primaryHoverColor,
        '--lg-highlight': this.highlightColor,
        '--lg-highlight-shadow': this.hexToRgba(this.highlightColor, this.highlightShadowOpacity)
      }
    }
  },
  
  methods: {
    start() {
      if (this.steps.length === 0) return;
      
      this.currentIndex = 0;
      this.visible = true;
      this.updateTargetPosition();
    },
    
    nextStep() {
      if (this.isLastStep) {
        this.complete();
      } else {
        this.currentIndex++;
        this.updateTargetPosition();
        this.$emit('step-change', this.currentIndex);
      }
    },
    
    prevStep() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateTargetPosition();
        this.$emit('step-change', this.currentIndex);
      }
    },
    
    skipGuide() {
      this.visible = false;
      this.$emit('skip');
    },
    
    complete() {
      this.visible = false;
      this.$emit('complete');
    },
    
    updateTargetPosition() {
      if (!this.currentStep) return;
      
      // Ensure DOM is updated before measuring
      this.$nextTick(() => {
        const targetElement = document.querySelector(this.currentStep.target);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          this.targetPosition = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
          };
        }
      });
    },
    
    hexToRgba(hex, alpha = 1) {
      if (!hex) return `rgba(0,0,0,${alpha})`;
      let normalized = hex.replace('#', '');
      if (normalized.length === 3) {
        normalized = normalized.split('').map(c => c + c).join('');
      }
      const r = parseInt(normalized.substring(0, 2), 16);
      const g = parseInt(normalized.substring(2, 4), 16);
      const b = parseInt(normalized.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}
</script>

<style scoped>
.longze-guide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
}

.guide-container {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.mask-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.mask-top,
.mask-right,
.mask-bottom,
.mask-left {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
}

.highlight-border {
  position: absolute;
  border: 2px solid var(--lg-highlight);
  border-radius: 4px;
  box-shadow: 0 0 0 4px var(--lg-highlight-shadow);
  pointer-events: none;
}

.guide-box {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  min-width: 250px;
  z-index: 10000;
}

.guide-box.light {
  background-color: white;
  color: #333;
}

.guide-box.dark {
  background-color: #333;
  color: white;
}

.content {
  margin-bottom: 16px;
}

.title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  display: block;
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-prev,
.btn-skip,
.btn-next {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-prev {
  background-color: #f0f0f0;
  color: #666;
}

.btn-prev:hover {
  background-color: #e0e0e0;
}

.btn-skip {
  background-color: transparent;
  color: #999;
  border: 1px solid #ddd;
}

.btn-skip:hover {
  background-color: #f5f5f5;
}

.btn-next {
  background-color: var(--lg-primary);
  color: white;
}

.btn-next:hover {
  background-color: var(--lg-primary-hover);
}

.step-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  color: #999;
}

/* Position classes */
.position-top {
  transform: translateY(-100%);
}

.position-bottom {
  transform: translateY(0);
}

.position-left {
  transform: translateX(-100%);
}

.position-right {
  transform: translateX(0);
}
</style> 