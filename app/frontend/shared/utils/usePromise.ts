import { useState } from "react"

export const usePromise = <T, E = any>(promise : Promise<T>) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<E>()
    const [value, setValue] = useState<T>()

    promise.then(setValue)
        .catch(setError)
        .finally(() => setLoading(false))

    return { loading, error, value }
}

export default usePromise
