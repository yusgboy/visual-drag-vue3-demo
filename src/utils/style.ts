type Style = Record<string, any>
const needUnit = ['fontSize', 'width', 'height', 'top', 'left', 'borderWidth', 'letterSpacing', 'borderRadius']
export function getStyle(style: Style, reversal: boolean = false) {
    const styleArr = ['width', 'height', 'top', 'left', 'rotate']
    const resultStyle: Style = {}
    if (reversal) {
        const arr = ['rotate']
        Object.keys(style).forEach((key) => {
            if (!arr.includes(key)) {
                resultStyle[key] = style[key]
                if (needUnit.includes(key)) {
                    resultStyle[key] += 'px'
                }
            }
        })
    } else {
        styleArr.forEach((attr) => {
            if (attr != 'rotate') {
                resultStyle[attr] = style[attr] + 'px'
            } else {
                resultStyle.transform = 'rotate(' + style[attr] + 'deg)'
            }
        })
    }
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
