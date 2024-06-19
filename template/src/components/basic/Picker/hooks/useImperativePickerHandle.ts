import React, { useImperativeHandle, useRef } from 'react'

import { ExpandableOverlayMethods } from '@/components/basic/ExpandableOverlay'
const useImperativePickerHandle = (ref: React.Ref<any>,
  expandableRef: React.MutableRefObject<ExpandableOverlayMethods | null>) => {
  const pickerRef = useRef<ExpandableOverlayMethods>()
  useImperativeHandle(ref, () => {
    // const { blur, clear, focus, isFocused, validate } = pickerRef.current ?? {}
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const { closeExpandable, openExpandable, toggleExpandable } = expandableRef.current

    return {
      // isFocused,
      // focus,
      // blur,
      // clear,
      // validate,
      openExpandable,
      closeExpandable,
      toggleExpandable,
    }
  })

  return pickerRef
}

export default useImperativePickerHandle
