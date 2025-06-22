<template>
    <div class="iframe-container">
        <iframe ref="iframe" :src="pageUrl" frameborder="0"></iframe>
        <!-- <button @click="vueSendMsg">vue向iframe传递信息</button>
        <button @click="iframeMethods">调用iframe中的方法</button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageUrl: '../static/VvvebJs/editor.html', // 指向静态文件夹中的 HTML 文件
            iframeLoaded: false, // 记录iframe是否已加载完成
            checkInterval: null // 用于定期检查iframe状态
        };
    },
    mounted() {
        window.addEventListener('message', this.getiframeMsg);
        
        // 添加iframe加载完成的事件监听
        if (this.$refs.iframe) {
            this.$refs.iframe.onload = () => this.handleIframeLoaded();
        }
        
        // 使用箭头函数确保this指向正确
        const vm = this;
        this.checkInterval = setInterval(function() {
            try {
                if (vm.$refs.iframe && vm.$refs.iframe.contentWindow) {
                    // 如果iframe已加载，尝试发送准备消息
                    if (vm.iframeLoaded) {
                        vm.sendPrepareMessage();
                    }
                }
            } catch (error) {
                console.error('定期检查iframe时出错:', error);
            }
        }, 1000);
    },
    onShow() {
        // 当组件显示时，检查iframe是否已加载
        console.log('组件显示，iframe加载状态:', this.iframeLoaded);
        
        // 使用箭头函数确保this指向正确
        const vm = this;
        
        if (vm.iframeLoaded) {
            // 如果iframe已加载，立即发送准备消息
            vm.sendPrepareMessage();
        } else {
            console.log('iframe尚未加载完成，将等待加载事件');
            
            // 延迟检查iframe状态，确保组件已完全挂载
            setTimeout(function() {
                try {
                    if (vm.$refs.iframe) {
                        vm.$refs.iframe.onload = function() {
                            vm.handleIframeLoaded();
                        };
                    } else {
                        console.log('无法访问iframe引用');
                    }
                } catch (error) {
                    console.error('onShow延迟检查iframe时出错:', error);
                }
            }, 100);
        }
    },
    beforeDestroy() {
        // 移除事件监听，避免内存泄漏
        window.removeEventListener('message', this.getiframeMsg);
        
        // 清除定期检查的计时器
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    },
    methods: {
        // 处理iframe加载完成事件
        handleIframeLoaded() {
            console.log('iframe已加载完成');
            this.iframeLoaded = true;
            
            // 延迟一段时间后尝试发送准备加载HTML的消息
            setTimeout(() => {
                this.sendPrepareMessage();
            }, 500);
        },
        
        // 检查并获取iframe对象的安全方法
        getIframeContentWindow() {
            try {
                if (this.$refs.iframe && this.$refs.iframe.contentWindow) {
                    return this.$refs.iframe.contentWindow;
                }
            } catch (error) {
                console.error('获取iframe contentWindow时出错:', error);
            }
            return null;
        },
        
        // 发送准备加载HTML的消息
        sendPrepareMessage() {
            try {
                const contentWindow = this.getIframeContentWindow();
                if (contentWindow) {
                    console.log('发送准备加载HTML消息');
                    contentWindow.postMessage({
                        cmd: 'prepareLoadHtml',
                        params: {}
                    }, '*');
                } else {
                    console.log('无法发送准备消息：iframe未就绪');
                }
            } catch (error) {
                console.error('发送准备消息时出错:', error);
            }
        },
        
        // 发送存储的HTML到iframe
        sendStoredHtmlToIframe() {
            try {
                // 获取存储的HTML内容
                const storedHtml = uni.getStorageSync('latest_7_overall_page');
                
                if (storedHtml) {
                    console.log('找到存储的HTML，长度:', storedHtml.length);
                    
                    let componentHtml = storedHtml;
                    
                    // 尝试解析JSON格式，如果是JSON则提取component属性
                    try {
                        const jsonData = JSON.parse(storedHtml);
                        if (jsonData.pages && jsonData.pages.length > 0 && jsonData.pages[0].component) {
                            // 只提取第一个页面的component属性
                            componentHtml = jsonData.pages[0].component;
                            console.log('成功提取component属性');
                        }
                    } catch (parseError) {
                        // 如果解析失败，则认为存储的内容不是JSON格式，直接使用原始内容
                        console.log('存储的内容不是JSON格式，使用原始内容');
                    }
                    
                    // 获取iframe窗口对象
                    const contentWindow = this.getIframeContentWindow();
                    if (contentWindow) {
                        // 发送HTML内容到iframe
                        console.log('发送HTML内容到iframe');
                        contentWindow.postMessage({
                            cmd: 'loadStoredHtml',
                            params: {
                                htmlContent: componentHtml
                            }
                        }, '*');
                    } else {
                        console.error('iframe未就绪，无法发送HTML内容');
                    }
                } else {
                    console.log('未找到存储的HTML内容');
                }
            } catch (error) {
                console.error('获取或发送存储的HTML时出错:', error);
            }
        },
        // vue获取iframe传递过来的信息
        getiframeMsg(event) {
                const res = event.data;
                if (!res || !res.cmd) return;
                
                console.log('收到iframe消息:', res.cmd);
                
                if (res.cmd == 'myIframe') {
                    console.log(res);
                } else if (res.cmd == 'htmlSaved') {
                    // 处理iframe保存HTML的消息
                    console.log('HTML已保存，长度:', res.params.html?.length);
                    if (res.params.html) {
                        // 检查是否已有存储的数据
                        let storedData = null;
                        try {
                            const existingData = uni.getStorageSync('latest_7_overall_page');
                            if (existingData) {
                                storedData = JSON.parse(existingData);
                            }
                        } catch (error) {
                            console.log('无法解析现有存储数据或不存在');
                        }
                        
                        // 如果没有现有数据或解析失败，创建新的数据结构
                        if (!storedData) {
                            storedData = {
                                "pages": [
                                    {
                                        "name": "Page 1",
                                        "component": res.params.html
                                    }
                                ],
                                "AIProjectDescription": "UI Genius项目",
                                "AIProjectName": "我的项目",
                                "themeColor": "#F5CEC7"
                            };
                        } else {
                            // 如果存在现有数据，更新第一个页面的component
                            if (storedData.pages && storedData.pages.length > 0) {
                                storedData.pages[0].component = res.params.html;
                            } else {
                                // 如果pages不存在或为空，创建新的pages数组
                                storedData.pages = [
                                    {
                                        "name": "Page 1",
                                        "component": res.params.html
                                    }
                                ];
                            }
                        }
                        
                        // 将更新后的数据保存到storage
                        uni.setStorageSync('latest_7_overall_page', JSON.stringify(storedData));
                        
                        // 显示保存成功提示
                        uni.showToast({
                            title: '页面已保存',
                            icon: 'success',
                            duration: 2000
                        });
                    } else {
                        console.error('接收到的HTML内容为空');
                    }
                } else if (res.cmd == 'editorReady') {
                    // 编辑器已准备好，可以发送HTML内容
                    console.log('编辑器已准备好，发送存储的HTML内容');
                    
                    // 如果定期检查计时器还在运行，停止它
                    if (this.checkInterval) {
                        clearInterval(this.checkInterval);
                        this.checkInterval = null;
                        console.log('已停止定期检查');
                    }
                    
                    // 发送存储的HTML内容
                    setTimeout(() => {
                        this.sendStoredHtmlToIframe();
                    }, 300); // 短暂延迟确保编辑器已完全准备好
                }
            },
            // vue向iframe传递信息
            vueSendMsg() {
                const contentWindow = this.getIframeContentWindow();
                if (contentWindow) {
                    contentWindow.postMessage({
                        cmd: 'myVue',
                        params: {
                            info: 'Vue向iframe传递的消息',
                        }
                    }, '*');
                } else {
                    console.error('无法发送消息：iframe未就绪');
                }
            },
            // 触发iframe中的方法
            iframeMethods() {
                const contentWindow = this.getIframeContentWindow();
                if (contentWindow) {
                    contentWindow.triggerByVue('通过Vue触发iframe中的方法');
                } else {
                    console.error('无法触发iframe方法：iframe未就绪');
                }
            },

    }
};
</script>

<style scoped>
.iframe-container {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
}
.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>