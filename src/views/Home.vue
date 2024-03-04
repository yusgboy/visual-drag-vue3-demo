<template>
    <div class="home">
        <ToolBar></ToolBar>
        <div class="container">
            <div class="left">
                <ComponentList></ComponentList>
            </div>
            <div class="center">
                <div class="content" @drop="handleDrop" @dragover="handleDragOver">
                    <Editor ref="editor"></Editor>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ToolBar from '@/components/Toolbar.vue'
import ComponentList from '@/components/ComponentList.vue'
import Editor from '@/components/Editor/Editor.vue'
import type InstanceType from 'vue'
import { ref } from 'vue'
import { useComponentStore } from '@/store'
import customComponentList from '@/customComponent/customComponentList'
import { deepClone, generateID } from '@/utils/utils'

const editor = ref<InstanceType<typeof Editor> | null>(null)

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const index = Number(e.dataTransfer?.getData('index'))
    const rectInfo = editor.value?.$el.getBoundingClientRect()
    if (!Number.isNaN(index)) {
        const store = useComponentStore()
        const { addComponent } = store
        const component = deepClone(customComponentList[index])
        component.style.left = e.clientX - rectInfo.x + ''
        component.style.top = e.clientY - rectInfo.y + ''
        component.id = generateID()
        addComponent({ component })
    }
}
const handleDragOver = (e: DragEvent) => {
    // 如果不阻止默认行为，drop事件不会触发。
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}
</script>
<style lang="less" scoped>
.home {
    height: 100%;
}

.container {
    display: flex;
    align-items: flex-start;
    height: 100%;

    .left,
    .center,
    .right,
    .content {
        height: 100%;
    }

    .left {
        flex-shrink: 0;
        flex-grow: 0;
        width: 200px;
    }

    .center {
        flex-grow: 1;
        padding: 20px;
        background-color: aquamarine;
    }

    .right {
        flex-shrink: 0;
        flex-grow: 0;
        width: 288px;
    }
}
</style>
