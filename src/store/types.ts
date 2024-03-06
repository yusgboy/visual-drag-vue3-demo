import type list from '@/customComponent/customComponentList'

export interface Style {
    width: number
    height: number
    borderWidth: number
    borderColor: string
    borderRadius: string
    fontSize: string
    fontWeight: number
    lineHeight: string
    letterSpacing: number
    textAlign: string
    color: string
    backgroundColor: string
    left: string
    top: string
    right: string
    bottom: string
    rotate: string
}
export type Component = (typeof list)[number]
