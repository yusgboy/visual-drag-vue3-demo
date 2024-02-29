<template>
    <div class="component-list" @dragstart="handleDragStart">
        <div
            v-for="(item, index) in customComponentList"
            :key="index"
            class="list-item"
            draggable="true"
            :data-index="index"
        >
            <SvgIcon :icon="`icon-${item.icon}`"></SvgIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import customComponentList from '@/customComponent/customComponentList'
import SvgIcon from './SvgIcon/SvgIcon.vue'

const handleDragStart = (e: DragEvent) => {
    if (e.target instanceof HTMLElement) {
        e.dataTransfer?.setData('index', e.target.dataset.index as string)
    }
}
</script>

<style scoped lang="less">
.component-list {
    display: grid;
    padding: 8px;
    grid-gap: 10px 19px;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 40px);

    .list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 5px;
        width: 80px;
        height: 40px;
        text-align: center;
        border: 1px solid #ddd;
        cursor: grab;
    }
}
</style>
