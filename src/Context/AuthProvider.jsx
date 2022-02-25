import React,{Children, createContext, useCallback, useState} from 'react'

export const AuthContext = createContext({
    isLoggedIn:false,
})

export function AuthProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const login = useCallback(()=>{
    //     setIsLoggedIn(true)
    // },[])
    // const logout = useCallback(()=>{
    //     setIsLoggedIn(false)
    // },[])

  return (
    <AuthContext.Provider value={setIsLoggedIn}>
        {children}
    </AuthContext.Provider>
  )
}

