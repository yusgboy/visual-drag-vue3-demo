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
