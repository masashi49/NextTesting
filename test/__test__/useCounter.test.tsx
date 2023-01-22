import { useCounter } from "../lib/hooks/useCounter";
import { renderHook, act } from '@testing-library/react-hooks';
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup())

describe('useCounter custom Hook', () => {
    it("should increment by 1", () => {
        const { result } = renderHook(() => useCounter(3))
        console.log(result.current.count)
        //expect(result.current.count).toBe(3)
    })
})
