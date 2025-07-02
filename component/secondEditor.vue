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
            pageUrl: '../static/editor/editor.html', // 指向静态文件夹中的 HTML 文件
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
                                    // 提取HTML和CSS
                                    const extractedContent = this.extractHtmlAndStyles(matchingPage.component);
                                    componentHtml = extractedContent.html;
                                    componentStyles = extractedContent.styles;
                                    // console.log('成功加载选中的模板:', selectedTemplateId);
                                } else {
                                    // 如果找不到匹配的页面，使用第一个页面
                                    const extractedContent = this.extractHtmlAndStyles(jsonData.pages[0].component);
                                    componentHtml = extractedContent.html;
                                    componentStyles = extractedContent.styles;
                                    // console.log('未找到选中的模板，使用第一个页面');
                                }
                            } else {
                                // 如果没有选中的模板ID，使用第一个页面
                                const extractedContent = this.extractHtmlAndStyles(jsonData.pages[0].component);
                                componentHtml = extractedContent.html;
                                componentStyles = extractedContent.styles;
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
                            
                            // 清理可能导致CSS选择器问题的类名
                            componentHtml = this.sanitizeHtml(componentHtml);
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
        
        // 从存储的内容中提取HTML和CSS样式
        extractHtmlAndStyles(componentData) {
            try {
                if (!componentData) return { html: '', styles: '' };
                
                // 使用全局正则表达式匹配所有样式标签
                const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
                let styles = '';
                let html = componentData;
                let match;
                
                // 收集所有样式标签
                const styleMatches = [];
                while ((match = styleRegex.exec(componentData)) !== null) {
                    styleMatches.push(match[0]);
                }
                
                if (styleMatches.length > 0) {
                    // 合并所有样式标签
                    styles = styleMatches.join('\n');
                    
                    // 从HTML中移除所有样式标签
                    html = componentData;
                    for (const styleTag of styleMatches) {
                        html = html.replace(styleTag, '');
                    }
                    html = html.trim();
                    
                    console.log('成功提取了' + styleMatches.length + '个样式标签');
                }
                
                // 处理可能嵌套的内容
                const extracted = this.extractSafeHtmlContent(html);
                
                return {
                    html: extracted,
                    styles: styles
                };
            } catch (error) {
                console.error('提取HTML和样式时出错:', error);
                return { html: componentData, styles: '' };
            }
        },
        
        // 安全地提取HTML内容，处理可能的嵌套JSON和反引号包裹的内容
        extractSafeHtmlContent(componentData) {
            try {
                if (!componentData) return '';
                
                // 直接使用正则表达式提取反引号之间的内容
                // 这将匹配最外层的反引号包裹的内容
                const backtickMatch = /`([\s\S]*)`/m.exec(componentData);
                if (backtickMatch && backtickMatch[1]) {
                    // console.log('使用正则表达式从反引号中提取了HTML内容');
                    return backtickMatch[1];
                }
                
                // 如果没有找到反引号，尝试解析JSON
                try {
                    // 检查是否是JSON字符串
                    const parsedData = JSON.parse(componentData);
                    
                    // 检查是否有嵌套的pages结构
                    if (parsedData.pages && parsedData.pages.length > 0 && parsedData.pages[0].component) {
                        // 递归处理嵌套的component
                        // console.log('发现嵌套JSON结构，递归提取HTML');
                        return this.extractSafeHtmlContent(parsedData.pages[0].component);
                    }
                    
                    // 如果没有嵌套结构但有component属性
                    if (parsedData.component) {
                        return this.extractSafeHtmlContent(parsedData.component);
                    }
                } catch (jsonError) {
                    // 不是JSON格式，检查是否已经是HTML内容
                    if (componentData.includes('<div') || componentData.includes('<section')) {
                        // console.log('已找到HTML内容');
                        return componentData;
                    }
                }
                
                // 如果以上方法都无法提取，返回原始内容
                return componentData;
            } catch (error) {
                console.error('提取HTML内容时出错:', error);
                return componentData || '';
            }
        },
        // 清理HTML内容，处理可能导致CSS选择器问题的类名
        sanitizeHtml(html) {
            try {
                if (!html) return html;
                
                // 创建临时DOM元素来解析HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // 处理所有元素的类名
                const allElements = doc.querySelectorAll('*');
                allElements.forEach(el => {
                    if (el.className && typeof el.className === 'string') {
                        // 替换类名中可能导致选择器问题的字符
                        const safeClassName = el.className
                            .split(' ')
                            .map(cls => {
                                // 处理包含特殊字符的类名
                                if (cls.includes(':') || cls.includes('[') || cls.includes(']') || 
                                    cls.includes('>') || cls.includes('.')) {
                                    // 将特殊字符替换为下划线
                                    return cls.replace(/[:[\]>\.]/g, '_');
                                }
                                return cls;
                            })
                            .join(' ');
                        
                        if (el.className !== safeClassName) {
                            el.className = safeClassName;
                        }
                    }
                });
                
                // 返回处理后的HTML
                return doc.documentElement.outerHTML;
            } catch (error) {
                console.error('清理HTML内容时出错:', error);
                return html; // 出错时返回原始HTML
            }
        },
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
                    
                    // 包装HTML和CSS
                    let componentContent = '';
                    
                    // 如果有样式，添加到组件内容中
                    if (res.params.styles) {
                        componentContent = `${res.params.styles}\n${res.params.html}`;
                    } else {
                        componentContent = res.params.html;
                    }
                    
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