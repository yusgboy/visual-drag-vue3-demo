<template>
    <div class="v-button">
        <el-button v-bind="attrs">{{ props.propValue }}</el-button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue/dist/vue.js'
import { useAttrs } from 'vue'

interface Props {
    propValue: string
}
const props = withDefaults(defineProps<Props>(), {
    propValue: ''
})
const attrs = useAttrs()
</script>

<style scoped lang="less"></style>
