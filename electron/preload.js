const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  versions: process.versions,
  storage: {
    // Debug function to check localStorage persistence
    checkStorage: () => {
      const testKey = 'electron_storage_test';
      const testValue = Date.now().toString();
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      console.log('Storage test - Set:', testValue, 'Retrieved:', retrieved, 'Match:', testValue === retrieved);
      return testValue === retrieved;
    },
    // Get all localStorage keys for debugging
    getAllKeys: () => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      return keys;
    },
    // Get localStorage size for debugging
    getStorageInfo: () => {
      return {
        length: localStorage.length,
        keys: Array.from({length: localStorage.length}, (_, i) => localStorage.key(i))
      };
    }
  }
}); 