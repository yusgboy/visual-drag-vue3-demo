const svgs = import.meta.glob('@/assets/svg/*.svg', { eager: true, as: 'raw' })
export const fileNameArr = Object.keys(svgs).map((filePath) => {
    const fileName = filePath.match(/\/([^/]+)\.svg$/)?.[1]
    return fileName || ''
})
