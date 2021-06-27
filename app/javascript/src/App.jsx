import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '@/pages/home'
import Signup from '@/pages/signup'

import '@/styles/global.scss'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/sign-up" component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}