import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const components = ['VButton']

export const registerCompoent = (app: App) => {
    components.forEach((key) => {
        app.component(
            key,
            defineAsyncComponent(() => import(`@/customComponent/${key}/Component.vue`))
        )
        app.component(
            `${key}Attr`,
            defineAsyncComponent(() => import(`@/customComponent/${key}/Attr.vue`))
        )
        console.log(app)
    })
}
