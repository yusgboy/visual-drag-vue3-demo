<template>
    <div class="v-button">
        <el-button>{{ props.propValue }}</el-button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue/dist/vue.js'

interface Props {
    propValue: string
}
const props = withDefaults(defineProps<Props>(), {
    propValue: ''
})
</script>

<style scoped lang="less">
.v-button {
}
</style>
