import { useCallback, useEffect, useState } from "react"

export const useAsync = <T, E = any>(callback : () => Promise<T>, dependencies = []) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<E>()
    const [value, setValue] = useState<T>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}

export default useAsync
