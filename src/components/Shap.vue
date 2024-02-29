<template>
    <div class="shap">
        <div v-for="item in pointList" :key="item" class="shape-point" :style="getStyle(item)"></div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
interface Props {
    defaultStyle: Record<string, any>
}
const props = defineProps<Props>()
const getStyle = (point: string): Props['defaultStyle'] => {
    const { width, height } = props.defaultStyle
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0
    if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
    } else {
        if (hasT || hasB) {
            newLeft = width / 2
            newTop = hasT ? 0 : height
        }
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width
            newTop = height / 2
        }
    }
    const style = {
        left: newLeft + 'px',
        top: newTop + 'px',
        marginLeft: '-4px',
        marginTop: '-4px'
    }
    return style
}
</script>

<style scoped lang="less">
.shap {
    position: relative;
    outline: 1px solid skyblue;
}

.shape-point {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border: 1px solid #59c7f9;
    border-radius: 50%;
}
</style>
