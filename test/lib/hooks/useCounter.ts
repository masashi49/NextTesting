import { useState } from "react";

export const useCounter = (initialCount: number) => {
    const [count, setCount] = useState(initialCount)

    const increment = () => {
        setCount((val) => val + 1)
    }
    const decrement = () => {
        setCount((val) => val - 1)
    }
    const double = () => {
        setCount((val) => val * 2)
    }
    const triple = () => {
        setCount((val) => val * 3)
    }
    const reset = () => {
        setCount(0)
    }

    return { count, decrement, increment, double, triple, reset }
}
