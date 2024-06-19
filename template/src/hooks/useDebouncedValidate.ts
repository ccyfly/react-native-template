import { FormikValues } from 'formik'
import { FormikConfig } from 'formik/dist/types'
import { debounce } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'

const useDebouncedValidate = <T extends FormikValues>({ debounceTime = 200, validate, values }: {
  values: T
  validate: FormikConfig<T>['validate']
  debounceTime?: number
}) => {
  const debouncedFunction = useRef(
    debounce((validateFunc: FormikConfig<T>['validate'], data: T) => {
      return validateFunc ? validateFunc(data) : () => {}
    }, debounceTime),
  )

  const debounceValidate = useCallback((data: T) => {
    return debouncedFunction.current(validate, data)
  }, [])

  useEffect(() => {
    debounceValidate(values)
  }, [values])

  useEffect(() => {
    return () => {
      debouncedFunction.current.cancel()
    }
  }, [])
}

export default useDebouncedValidate
