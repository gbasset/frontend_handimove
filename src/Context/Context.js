import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {

    const [user, setUser] = useState()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (user) {
            if (user.is_admin === 0) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
    }, [user])

    return (
        <Context.Provider value={{
            user,
            setUser,
            isAdmin,
            setIsAdmin
        }}>
            {props.children}
        </Context.Provider>
    )

}
export default ContextProvider