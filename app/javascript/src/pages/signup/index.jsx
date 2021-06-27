import React, { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Api from '@/services/api'
import { MainContext } from '@/App'

import './styles.scss'

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root' : {
            marginBottom: '16px',
            width: '100%',
            '& .MuiFormLabel-root': {
                color: 'white'
            },
            '& .MuiInput-underline::before': {
                borderBottom: '1px solid white'
            },
            '& .MuiInputBase-input': {
                color: 'white'
            }
        }
    }
})

export default function Signup(){
    const classes = useStyles();
    const history = useHistory();
    const { updateUser } = useContext(MainContext)

    function handleBack() {
        history.push('/')
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        
        const {
            full_name,
            email,
            password, 
            password_confirmation,
            avatar_image,
            admin
        } = event.target;

        Api.post('/api/users', {
            user: {
                full_name: full_name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
                avatar_image: avatar_image.value,
                admin: admin.value
            }
        }).then(response => {            
            updateUser(response.data)
            
            history.push('/')
        })
    })

    return (
        <div className="container">
            <Container maxWidth="sm">
                <h2>There's your Sign Up form:</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <div className="mui-text-fields">
                            <input type="hidden" id="admin" value={false}/>
                            <TextField label="Full Name" id="full_name"/>
                            <TextField label="Email" id="email"/>
                            <TextField label="Password" type="password"id="password"/>
                            <TextField label="Password confirmation" type="password"id="password_confirmation"/>
                            <TextField label="Avatar url" id="avatar_image"/>
                        </div>
                    </div>
                    <div className="button-group">
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}