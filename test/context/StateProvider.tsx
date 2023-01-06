import {
    useContext, useState, createContext,
} from "react";

const StateContext = createContext(
    {} as {
        toggle: boolean
        setToggle: React.Dispatch<React.SetStateAction<boolean>>
    }) // useContextのvalueで共有する値を入れておく

export const StateProvider: React.FC = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    return (
        <StateContext.Provider value={{ toggle, setToggle }}>
            {children}
        </StateContext.Provider>
    )
}

// 各componentでuseContextを毎回するのは面倒なので、値取得用の関数を1つ作っておく。
export const useStateContext = () => useContext(StateContext)
