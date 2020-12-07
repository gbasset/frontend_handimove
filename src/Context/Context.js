import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {

    const [user, setUser] = useState()


    console.log("user", user);
    return (
        <Context.Provider value={{
            user,
            setUser
        }}>
            {props.children}
        </Context.Provider>
    )

}
export default ContextProvider