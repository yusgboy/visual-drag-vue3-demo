<template>
    <svg class="svg-icon" :class="iconClass" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    iconClass: {
        type: String,
        default: 'icon' // 默认值
    },
    // 图标颜色
    color: {
        type: String,
        default: ''
    }
})
const iconName = computed(() => `#${props.icon}`)
</script>

<style scoped lang="less">
.svg-icon {
    width: 1em;
    height: 1em;
}
</style>
