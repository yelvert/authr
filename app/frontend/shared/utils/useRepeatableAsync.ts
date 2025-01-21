import { useState, useCallback } from 'react'

export type TUseRepeatableAsync<T, A extends unknown[], E = string> = {
  value : T | null
  loading : boolean
  error : E | null
  call : (...args: A) => Promise<T>
}

export const useRepeatableAsync = <T, A extends unknown[], E = string>(
  asyncFn : TUseRepeatableAsync<T, A, E>['call'],
  dependencies : unknown[] = []
): TUseRepeatableAsync<T, A, E> => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<E | null>(null)
  const [value, setValue] = useState<T | null>(null)

  const call = useCallback((...args: A) => {
      setLoading(true)
      setError(null)
      setValue(null)
      return asyncFn(...args)
        .then(val => { setValue(val); return val })
        .catch(e => { setError(e); return e})
        .finally(() => setLoading(false))
    },
    [asyncFn, ...dependencies]
  )

  return { value, loading, error, call }
}

export default useRepeatableAsync
