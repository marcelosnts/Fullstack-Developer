import React from 'react'
import { Container } from '@material-ui/core'

import UserForm from '@/components/UserForm'

import './styles.scss'

export default function Signup(){
    return (
        <div className="container">
            <Container maxWidth="sm">
                <h2>There's your Sign Up form:</h2>
                <UserForm apiLink="/api/users" method='post'/>
            </Container>
        </div>
    )
}