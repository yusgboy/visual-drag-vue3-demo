import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Component, Style } from './types'

export const useComponentStore = defineStore('component', () => {
    const componentData: Ref<Component[]> = ref([])
    const curComponent: Ref<null | Component> = ref(null)
    const curComponentIndex: Ref<null | number> = ref(null)
    const setComponentData = (data = []) => {
        componentData.value = data
    }
    interface SomeObj {
        component: Component
        index?: number
    }
    const setCurComponent = ({ component, index }: SomeObj) => {
        curComponent.value = component
        if (index) curComponentIndex.value = index
    }
    const addComponent = ({ component, index }: SomeObj) => {
        if (index !== undefined) {
            componentData.value.splice(index, 0, component)
        } else {
            componentData.value.push(component)
        }
    }
    interface ShapStyle {
        [key: string]: any
    }
    const setShapeStyle = ({ top, left, width, height }: ShapStyle) => {
        if (curComponent.value) {
            if (top !== undefined) curComponent.value.style.top = Math.round(top) + ''
            if (left !== undefined) curComponent.value.style.left = Math.round(left) + ''
            if (width) curComponent.value.style.width = Math.round(width)
            if (height) curComponent.value.style.height = Math.round(height)
            // if (rotate) curComponent.value.style.rotate = Math.round(rotate)
        }
    }

    const setShapeSingleStyle = <K extends keyof Style>(key: K, value: Style[K]) => {
        if (curComponent.value) {
            curComponent.value.style[key] = value
        }
    }
    return {
        componentData,
        curComponent,
        setComponentData,
        setCurComponent,
        addComponent,
        setShapeStyle,
        setShapeSingleStyle
    }
})
