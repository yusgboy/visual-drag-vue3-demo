<template>
    <div class="editor">
        <Grid :isDarkMode="false"></Grid>
        <Shap
            v-for="(item, index) in componentData"
            :key="index"
            :defaultStyle="item.style"
            :style="getStyle(item.style)"
        >
            <component :is="item.component" :propValue="item.propValue" :style="getStyle(item.style)"></component>
        </Shap>
    </div>
</template>

<script setup lang="ts">
import { useComponentStore } from '@/store'
import Grid from './Grid.vue'
import Shap from '@/components/Shap.vue'
import { storeToRefs } from 'pinia'
import { getStyle } from '@/utils/style'

const store = useComponentStore()
const { componentData } = storeToRefs(store)
</script>
<style lang="less" scoped>
.editor {
    position: relative;
    margin: 0 auto;
    height: 100%;
}
</style>
