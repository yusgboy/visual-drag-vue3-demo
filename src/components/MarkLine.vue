<template>
    <div class="mark-line">
        <div
            v-for="line in lines"
            v-show="lineStatus[line]"
            :key="line"
            :ref="(el) => el && lineRefs.push(el)"
            class="line"
            :class="line.includes('x') ? 'xline' : 'yline'"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { useComponentStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { ComponentPublicInstance } from 'vue'
import { ref, onMounted } from 'vue'
import { getComponentRotatedStyle } from '@/utils/style'
import type { Style } from '@/store/types'
import emitter from '@/utils/mitt'

onMounted(() => {
    emitter.on('move', (eventData: { isDownward: boolean; isRightward: boolean }) => {
        showLine(eventData.isDownward, eventData.isRightward)
    })
    emitter.on('unmove', () => {
        hideLine()
    })
})
const lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'] as const
type Lines = (typeof lines)[number]
type LineStatus = {
    [K in Lines]: boolean
}
const lineStatus = ref<LineStatus>({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false
})
const diff = 3
const lineRefs = ref<(Element | ComponentPublicInstance | HTMLElement)[]>([])

const store = useComponentStore()
const { curComponent, componentData } = storeToRefs(store)
const { setShapeSingleStyle } = store
const isNearly = (dragValue: string, targetValue: string) => {
    return Math.abs(parseInt(dragValue) - parseInt(targetValue)) <= diff
}

const hideLine = () => {
    Object.keys(lineStatus.value).forEach((item) => {
        lineStatus.value[item as keyof LineStatus] = false
    })
}
const showLine = (isDownward: boolean, isRightward: boolean) => {
    const curComponentStyle = curComponent.value!.style
    const curWidth = curComponentStyle.width
    const curHeight = curComponentStyle.height
    const curComponentHalfWidth = curWidth! / 2
    const curComponentHalfHeight = curHeight! / 2
    hideLine()
    componentData.value.forEach((component) => {
        if (component === curComponent.value) return
        const componentStyle = getComponentRotatedStyle(component.style)
        const { top, left, bottom, right } = componentStyle
        const componentHalfWidth = componentStyle.width / 2
        const componentHalfHeight = componentStyle.height / 2
        const conditions = {
            top: [
                {
                    isNearly: isNearly(curComponentStyle.top, top),
                    lineNode: lineRefs.value[0],
                    line: 'xt',
                    dragShift: top,
                    lineShift: top
                },
                {
                    isNearly: isNearly(curComponentStyle.bottom, top),
                    lineNode: lineRefs.value[0],
                    line: 'xt',
                    dragShift: parseInt(top) - curComponentStyle.height,
                    lineShift: top
                },
                {
                    isNearly: isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
                    lineNode: lineRefs.value[1],
                    line: 'xc',
                    dragShift: parseInt(top) + componentHalfHeight - curComponentHalfHeight,
                    lineShift: top + componentHalfHeight
                },
                {
                    isNearly: isNearly(curComponentStyle.top, bottom),
                    lineNode: lineRefs.value[2],
                    line: 'xb',
                    dragShift: bottom,
                    lineShift: bottom
                },
                {
                    isNearly: isNearly(curComponentStyle.bottom, bottom),
                    lineNode: lineRefs.value[2],
                    line: 'xb',
                    dragShift: parseInt(bottom) - curComponentStyle.height,
                    lineShift: bottom
                }
            ],
            left: [
                {
                    isNearly: isNearly(curComponentStyle.left, left),
                    lineNode: lineRefs.value[3],
                    line: 'yl',
                    dragShift: left,
                    lineShift: left
                },
                {
                    isNearly: isNearly(curComponentStyle.right, left),
                    lineNode: lineRefs.value[3],
                    line: 'yl',
                    dragShift: parseInt(left) - curComponentStyle.width,
                    lineShift: left
                },
                {
                    isNearly: isNearly(curComponentStyle.left + curComponentHalfWidth, left + componentHalfWidth),
                    lineNode: lineRefs.value[4],
                    line: 'yc',
                    dragShift: parseInt(left) + componentHalfWidth - curComponentHalfWidth,
                    lineShift: left + componentHalfWidth
                },
                {
                    isNearly: isNearly(curComponentStyle.left, right),
                    lineNode: lineRefs.value[5],
                    line: 'yr',
                    dragShift: right,
                    lineShift: right
                },
                {
                    isNearly: isNearly(curComponentStyle.right, right),
                    lineNode: lineRefs.value[5],
                    line: 'yr',
                    dragShift: parseInt(right) - curComponentHalfWidth,
                    lineShift: right
                }
            ]
        }
        const needToShow: string[] = []
        Object.keys(conditions).forEach((key) => {
            conditions[key as keyof typeof conditions].forEach((item) => {
                if (!item.isNearly) return
                setShapeSingleStyle(key as keyof Style, item.dragShift)
                if (item.lineNode instanceof HTMLElement) {
                    item.lineNode.style[key as keyof typeof conditions] = `${item.lineShift}px`
                }
                needToShow.push(item.line)
            })
        })

        const chooseTheTureLine = () => {
            // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
            // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
            if (isRightward) {
                if (needToShow.includes('yr')) {
                    lineStatus.value.yr = true
                } else if (needToShow.includes('yc')) {
                    lineStatus.value.yc = true
                } else if (needToShow.includes('yl')) {
                    lineStatus.value.yl = true
                }
            } else {
                // eslint-disable-next-line no-lonely-if
                if (needToShow.includes('yl')) {
                    lineStatus.value.yl = true
                } else if (needToShow.includes('yc')) {
                    lineStatus.value.yc = true
                } else if (needToShow.includes('yr')) {
                    lineStatus.value.yr = true
                }
            }
            if (isDownward) {
                if (needToShow.includes('xb')) {
                    lineStatus.value.xb = true
                } else if (needToShow.includes('xc')) {
                    lineStatus.value.xc = true
                } else if (needToShow.includes('xt')) {
                    lineStatus.value.xt = true
                }
            } else {
                // eslint-disable-next-line no-lonely-if
                if (needToShow.includes('xt')) {
                    lineStatus.value.xt = true
                } else if (needToShow.includes('xc')) {
                    lineStatus.value.xc = true
                } else if (needToShow.includes('xb')) {
                    lineStatus.value.xb = true
                }
            }
        }
        if (needToShow.length) {
            chooseTheTureLine()
        }
    })
}
</script>

<style scoped lang="less">
.mark-line {
    height: 100%;

    .line {
        position: absolute;
        z-index: 1000;
        background-color: #59c7f9;

        &.xline {
            width: 100%;
            height: 1px;
        }

        &.yline {
            width: 1px;
            height: 100%;
        }
    }
}
</style>
