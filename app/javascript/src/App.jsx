import React, { createContext, useCallback, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from '@/pages/home'
import Signup from '@/pages/signup'

import '@/styles/global.scss'

export const MainContext = createContext({})

export default function App() {
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        full_name: '',
        email: '',
        avatar_image: '',
        admin: false,
        created_at: ''
    })

    const updateUser = useCallback((user) => {
        const {id, full_name, email, avatar_image, admin, created_at} = user
        
        setCurrentUser({
            id: id,
            full_name: full_name,
            email: email,
            avatar_image: avatar_image,
            admin: admin,
            created_at: created_at
        })
    })

    return (
        <BrowserRouter>
            <MainContext.Provider value={{currentUser, updateUser}}>
                <Route path="/" exact component={Home} />
                <Route path="/sign-up" component={Signup} />
            </MainContext.Provider>
        </BrowserRouter>
    )
}