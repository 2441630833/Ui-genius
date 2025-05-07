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
</style>
