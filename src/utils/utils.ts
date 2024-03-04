import { nanoid } from 'nanoid'

export function deepClone<T>(obj: T, weakMap = new WeakMap()): T {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    if (weakMap.has(obj)) {
        return weakMap.get(obj)
    }
    let newObj = obj.constructor()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key], weakMap)
        }
    }
    return newObj
}

export function generateID() {
    return nanoid()
}
