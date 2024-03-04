type Style = Record<string, any>
export function getStyle(style: Style) {
    const styleArr = ['width', 'height', 'top', 'left']
    const resultStyle: Style = {}
    styleArr.forEach((attr) => {
        if (attr != 'rotate') {
            resultStyle[attr] = style[attr] + 'px'
        } else {
        }
    })
    return resultStyle
}

export function getComponentRotatedStyle(style: Style) {
    const resultStyle = { ...style }
    if (style.rotate !== 0) {
    } else {
        resultStyle.bottom = parseInt(style.top) + parseInt(style.height)
        resultStyle.right = parseInt(style.left) + parseInt(style.width)
    }
    return resultStyle
}
