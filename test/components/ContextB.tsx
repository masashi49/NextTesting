import React from 'react'
import { useStateContext } from "../context/StateProvider";

const ContextB: React.FC = () => {
    const { toggle } = useStateContext()
    return (
        <div>
            <p>context B</p>
            <p className='mb-5 text-indigo-600' data-testid='toggle-b'>
                {toggle ? 'true' : 'false'}
            </p>
        </div>
    )
}

export default ContextB
