<template>
    <div ref="shap" class="shap" @click="selectCurComponent" @mousedown="handleMouseDownOnShape">
        <SvgIcon
            v-if="isActve()"
            class="icon"
            icon="icon-right-rotate"
            color="#59c7f9"
            @mousedown="handleRotate"
        ></SvgIcon>
        <template v-if="isActve()">
            <div v-for="item in pointList" :key="item" class="shape-point" :style="getStyle(item)"></div>
        </template>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useComponentStore } from '@/store'
import type { Component } from '@/store/types'
import emitter from '@/utils/mitt'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ref } from 'vue'

const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
interface Props {
    defaultStyle: Record<string, any>
    active: Boolean
    element: Record<string, any>
    index: number
}
const props = defineProps<Props>()
const { setCurComponent, setShapeStyle, setClickComponentStatus } = useComponentStore()
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
const isActve = () => {
    return props.active
}
const selectCurComponent = (e: MouseEvent) => {}
const handleMouseDownOnShape = (e: MouseEvent) => {
    // 阻止事件冒泡到外层 触发外层的事件
    e.stopPropagation()
    setCurComponent({ component: props.element as Component, index: props.index })
    setClickComponentStatus(true)
    const pos = { ...props.defaultStyle }
    // 鼠标起始位置
    const startX = e.clientX
    const startY = e.clientY
    // 当前组件位置
    const curTop = Number(pos.top)
    const curLeft = Number(pos.left)
    const move = (mevt: MouseEvent) => {
        const curX = mevt.clientX
        const curY = mevt.clientY
        pos.top = curY - startY + curTop
        pos.left = curX - startX + curLeft
        setShapeStyle(pos)
        emitter.emit('move', { isDownward: curY > startY, isRightward: curX > startX })
    }
    const up = () => {
        emitter.emit('unmove')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
const shap = ref<HTMLElement | null>(null)

const handleRotate = (e: MouseEvent) => {
    setClickComponentStatus(true)
    e.stopPropagation()
    const pos = { ...props.defaultStyle }
    const startX = e.clientX
    const startY = e.clientY
    const startRotate = pos.rotate - 0
    const rectInfo = shap.value?.getBoundingClientRect()
    const centerX = rectInfo!.left + rectInfo!.width / 2
    const centerY = rectInfo!.top + rectInfo!.height / 2
    // 旋转前角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) * (180 / Math.PI)
    const move = (moveEvent: MouseEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        // 旋转后角度
        const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) * (180 / Math.PI)
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
        setShapeStyle(pos)
    }
    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
</script>

<style scoped lang="less">
.shap {
    position: absolute;
    outline: 1px solid skyblue;
}

.icon {
    position: absolute;
    top: 0;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
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
