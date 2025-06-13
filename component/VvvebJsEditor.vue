<template>
    <div>
        <iframe :src="pageUrl" width="100%" height="1200px" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageUrl: '../static/VvvebJs/editor.html' // 指向静态文件夹中的 HTML 文件
        };
    }
};
</script>