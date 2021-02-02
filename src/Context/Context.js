import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {

    const [user, setUser] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    console.log("user", user);
    console.log("isAdmin", isAdmin);

    useEffect(() => {
        if (user) {
            console.log("userici", user);
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