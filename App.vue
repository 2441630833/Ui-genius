<script>
import initPermission from './common/permission.js'
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // initPermission()
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  .container {
    padding: 15px;
  }

  button {
    margin-bottom: 15px;
  }
  
  /* Custom TabBar Styles */
  /* .uni-tabbar {
    border-radius: 24px !important;
    margin: 0 15px 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: none !important;
    height: 60px !important;
  }
  
  .uni-tabbar::before {
    display: none !important;
  }
  
  .uni-tabbar__item {
    height: 60px !important;
    position: relative;
  }
  
  .uni-tabbar__item--selected {
    background-color: rgba(229, 57, 53, 0.08);
  }
  
  .uni-tabbar__item--selected::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 3px;
    background-color: #e53935;
    border-radius: 3px;
  }
  
  .uni-tabbar__item--selected .uni-tabbar__label {
    color: #e53935 !important;
    font-weight: 500;
  }
  
  .uni-tabbar__bd {
    padding: 5px 0;
  }
  
  .uni-tabbar__icon {
    margin-bottom: 4px;
  } */
</style>
