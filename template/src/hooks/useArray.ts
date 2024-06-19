import { useState } from 'react'

type GetIdFunc<T> = (item: T) => string|number
const useArray = <T>(defaultValue: T[] = [], getId?: GetIdFunc<T>|undefined) => {
  const [array, setArray] = useState(defaultValue)

  const removeByIndex = (index: number) => {
    const copy = [...array]
    copy.splice(index, 1)
    setArray(copy)
  }

  return {
    array,
    set: setArray,
    add: (item: any, index?: number) => {
      if (index === undefined) {
        setArray([...array, item])
      } else {
        setArray(a => {
          return [
            ...a.slice(0, index),
            item,
            ...a.slice(index + 1, a.length),
          ] as T[]
        })
      }
    },
    clear: () => setArray([]),
    filter: (fn: (item: T) => boolean) => {
      setArray(defaultValue.filter(fn))
    },
    reset: () => setArray([...defaultValue]),
    remove: removeByIndex,
    removeById: (id: string|number) => {
      if (getId === undefined) {
        throw new Error('getId is undefined')
      }
      const index = array.findIndex(item => getId(item) === id)
      if (index !== -1) {
        removeByIndex(index)
      }
    },
  }
}

export default useArray
