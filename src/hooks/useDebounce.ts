import { useState, useEffect } from 'react'

const DEFAULT_DELAY = 300

const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || DEFAULT_DELAY)
        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

export default useDebounce
