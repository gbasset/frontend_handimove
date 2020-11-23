import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {

    const [locationUrl, setLocationUrl] = useState('ici')



    return (
        <Context.Provider value={{
            locationUrl,
            setLocationUrl
        }}>
            {props.children}
        </Context.Provider>
    )

}
export default ContextProvider