import mitt from 'mitt'

const emitter = mitt<{
    move: { isDownward: boolean; isRightward: boolean }
    unmove: void
}>()

export default emitter
