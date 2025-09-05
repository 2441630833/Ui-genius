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
            // Use absolute path instead of relative path
            pageUrl: '/static/editor/editor.html',
            iframeLoaded: false,
            checkInterval: null
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
        // console.log('组件显示，iframe加载状态:', this.iframeLoaded);
        
        // 使用箭头函数确保this指向正确
        const vm = this;
        
        if (vm.iframeLoaded) {
            // 如果iframe已加载，立即发送准备消息
            vm.sendPrepareMessage();
        } else {
            // console.log('iframe尚未加载完成，将等待加载事件');
            
            // 延迟检查iframe状态，确保组件已完全挂载
            setTimeout(function() {
                try {
                    if (vm.$refs.iframe) {
                        vm.$refs.iframe.onload = function() {
                            vm.handleIframeLoaded();
                        };
                    } else {
                        // console.log('无法访问iframe引用');
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
        
        // 清除选中的模板ID
        try {
            uni.removeStorageSync('selectedTemplateId');
            // console.log('已清除选中的模板ID');
        } catch (error) {
            console.error('清除选中的模板ID时出错:', error);
        }
    },
    methods: {
        // 处理iframe加载完成事件
        handleIframeLoaded() {
            // console.log('iframe已加载完成');
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
                    // console.log('发送准备加载HTML消息');
                    contentWindow.postMessage({
                        cmd: 'prepareLoadHtml',
                        params: {}
                    }, '*');
                } else {
                    // console.log('无法发送准备消息：iframe未就绪');
                }
            } catch (error) {
                console.error('发送准备消息时出错:', error);
            }
        },
        
        // 发送存储的HTML到iframe
        sendStoredHtmlToIframe() {
            try {
                // 获取存储的HTML内容
                const storedData = uni.getStorageSync('latest_7_overall_page');
                if (storedData) {
                    let componentHtml = '';
                    let componentStyles = '';

                    try {
                        // 解析存储的JSON数据
                        const jsonData = JSON.parse(storedData);
                        
                        if (jsonData.pages && jsonData.pages.length > 0) {
                            // 获取选中的模板ID
                            const selectedTemplateId = uni.getStorageSync('selectedTemplateId');
                            
                            if (selectedTemplateId) {
                                // 查找匹配的页面
                                const matchingPage = jsonData.pages.find(page => {
                                    const pageId = page.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                                    return pageId === selectedTemplateId;
                                });
                                
                                if (matchingPage) {
                                    // 直接使用matchingPage.component，不进行提取
                                    componentHtml = matchingPage.component;
                                    componentStyles = '';
                                    // console.log('成功加载选中的模板:', selectedTemplateId);
                                } else {
                                    // 如果找不到匹配的页面，使用第一个页面
                                    componentHtml = jsonData.pages[0].component;
                                    componentStyles = '';
                                    // console.log('未找到选中的模板，使用第一个页面');
                                }
                            } else {
                                // 如果没有选中的模板ID，使用第一个页面
                                componentHtml = jsonData.pages[0].component;
                                componentStyles = '';
                                // console.log('未指定模板ID，使用第一个页面');
                            }
                        }
                    } catch (parseError) {
                        // 如果解析失败，则认为存储的内容不是JSON格式，直接使用原始内容
                        // console.log('存储的内容不是JSON格式，使用原始内容');
                        console.error('解析错误:', parseError);
                    }
                    
                    // 确保HTML内容是有效的
                    if (componentHtml) {
                        // 简单的HTML内容验证和修复
                        try {
                            // 确保HTML内容有一个根元素包裹
                            if (!componentHtml.trim().startsWith('<div') && !componentHtml.trim().startsWith('<section')) {
                                componentHtml = `<div class="container">${componentHtml}</div>`;
                                // console.log('已添加容器元素包裹HTML内容');
                            }
                            
                            // 移除可能导致问题的脚本标签
                            componentHtml = componentHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                        } catch (sanitizeError) {
                            console.error('净化HTML内容时出错:', sanitizeError);
                        }
                    }
                    
                    // 获取iframe窗口对象
                    const contentWindow = this.getIframeContentWindow();
                    if (contentWindow) {
                        // 发送HTML内容和样式到iframe
                        // console.log('发送HTML内容和样式到iframe');
                        contentWindow.postMessage({
                            cmd: 'loadStoredHtml',
                            params: {
                                htmlContent: componentHtml,
                                stylesContent: componentStyles
                            }
                        }, '*');
                    } else {
                        console.error('iframe未就绪，无法发送HTML内容');
                    }
                } else {
                    // console.log('未找到存储的HTML内容');
                }
            } catch (error) {
                console.error('获取或发送存储的HTML时出错:', error);
            }
        },
        
        // 不再需要提取HTML和CSS样式的方法，因为我们直接传递组件数据
        
        // 不再需要提取HTML内容的方法，因为我们直接传递组件数据
        // 不再需要清理HTML内容的方法，因为我们直接传递组件数据
        // vue获取iframe传递过来的信息
        getiframeMsg(event) {
            const res = event.data;
            if (!res || !res.cmd) return;
            
            // console.log('收到iframe消息:', res.cmd);
            
            if (res.cmd == 'myIframe') {
                // console.log(res);
            } else if (res.cmd == 'htmlSaved') {
                                    // 处理iframe保存HTML的消息
                // console.log('HTML已保存，长度:', res.params.html?.length);
                if (res.params.html) {
                    // 检查是否已有存储的数据
                    let storedData = null;
                    try {
                        const existingData = uni.getStorageSync('latest_7_overall_page');
                        if (existingData) {
                            storedData = JSON.parse(existingData);
                        }
                    } catch (error) {
                        // console.log('无法解析现有存储数据或不存在');
                    }
                    
                    // 获取选中的模板ID
                    const selectedTemplateId = uni.getStorageSync('selectedTemplateId');
                    
                    // 直接使用完整的HTML内容作为组件内容
                    const componentContent = res.params.html;
                    
                    // 如果没有现有数据或解析失败，创建新的数据结构
                    if (!storedData) {
                        storedData = {
                            "pages": [
                                {
                                    "name": selectedTemplateId ? selectedTemplateId.charAt(0).toUpperCase() + selectedTemplateId.slice(1) + " Page" : "Page 1",
                                    "component": componentContent
                                }
                            ],
                            "AIProjectDescription": "UI Genius project",
                            "AIProjectName": "My project",
                        };
                    } else {
                        // 如果存在现有数据，更新对应页面的component
                        if (storedData.pages && storedData.pages.length > 0) {
                            if (selectedTemplateId) {
                                // 查找匹配的页面
                                const pageIndex = storedData.pages.findIndex(page => {
                                    const pageId = page.name.toLowerCase().replace(/ page/i, '').replace(/\s+/g, '-');
                                    return pageId === selectedTemplateId;
                                });
                                
                                if (pageIndex !== -1) {
                                    // 如果找到匹配的页面，更新它
                                    storedData.pages[pageIndex].component = componentContent;
                                    // console.log('已更新页面:', selectedTemplateId);
                                } else {
                                    // 如果没有找到匹配的页面，更新第一个页面
                                    storedData.pages[0].component = componentContent;
                                    // console.log('未找到匹配页面，已更新第一个页面');
                                }
                            } else {
                                // 如果没有选中的模板ID，更新第一个页面
                                storedData.pages[0].component = componentContent;
                                // console.log('未指定模板ID，已更新第一个页面');
                            }
                        } else {
                            // 如果pages不存在或为空，创建新的pages数组
                            storedData.pages = [
                                {
                                    "name": selectedTemplateId ? selectedTemplateId.charAt(0).toUpperCase() + selectedTemplateId.slice(1) + " Page" : "Page 1",
                                    "component": componentContent
                                }
                            ];
                        }
                    }
                    
                    // 将更新后的数据保存到storage
                    uni.setStorageSync('latest_7_overall_page', JSON.stringify(storedData));
                    
                    // 同时保存到云端
                    this.saveProjectToCloud(storedData);
                    
                    // 显示保存成功提示
                    uni.showToast({
                        title: 'page saved',
                        icon: 'success',
                        duration: 2000
                    });
                } else {
                    console.error('接收到的HTML内容为空');
                }
            } else if (res.cmd == 'editorReady') {
                // 编辑器已准备好，可以发送HTML内容
                // console.log('编辑器已准备好，发送存储的HTML内容');
                
                // 如果定期检查计时器还在运行，停止它
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                    this.checkInterval = null;
                    // console.log('已停止定期检查');
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

        // 保存项目到云端
        saveProjectToCloud(content) {
            // 检查是否有现有的项目ID
            const currentProjectId = uni.getStorageSync('currentProjectId');
            const uid = uni.getStorageSync('uid');
            
            // 准备项目数据
            const projectData = {
                uid: uid,
                currentProjectId: currentProjectId,
                generated_overall_pages: content
            };

            // 如果有现有项目ID，使用更新方法；否则创建新项目
            const action = currentProjectId ? 'update' : 'create';
            const callData = currentProjectId ? {
                action: action,
                id: currentProjectId,
                data: projectData
            } : {
                action: action,
                data: projectData
            };

            // 调用云函数保存项目
            return uniCloud.callFunction({
                name: 'user-project',
                data: callData
            }).then(res => {
                if (res.result && res.result.success) {
                    // 如果是新创建的项目，存储项目ID
                    if (action === 'create' && res.result.project_id) {
                        uni.setStorageSync('currentProjectId', res.result.project_id);
                        console.log('Project created in cloud with ID:', res.result.project_id);
                    } else {
                        console.log('Project updated in cloud with ID:', currentProjectId);
                    }
                    return res.result.project_id || currentProjectId;
                } else {
                    throw new Error('Failed to ' + action + ' project');
                }
            }).catch(err => {
                console.error('Cloud function error:', err);
                // 显示错误提示
                uni.showToast({
                    title: 'Cloud save failed',
                    icon: 'error',
                    duration: 2000
                });
                throw err;
            });
        },
        getEditorUrl() {
            // Get the current origin and construct the full URL
            const baseUrl = window.location.origin;
            return `${baseUrl}/static/editor/editor.html`;
        }

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