import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Component } from './types'

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
        console.log(component)
        curComponent.value = component
        if (index !== undefined) {
            componentData.value.splice(index, 0, component)
        } else {
            componentData.value.push(component)
        }
    }
    return {
        componentData,
        setComponentData,
        setCurComponent,
        addComponent
    }
})
