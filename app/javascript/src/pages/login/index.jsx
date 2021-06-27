import React, { useCallback, useContext, useEffect } from 'react'
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

export default function Login(){
    const classes = useStyles();
    const history = useHistory();
    const { currentUser, updateUser } = useContext(MainContext)

    function handleBack() {
        history.push('/')
    }

    useEffect(() => { console.log(currentUser) }, [currentUser])

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        
        const {
            email,
            password
        } = event.target;

        Api.post('/api/users/sign_in', {
            user: {
                email: email.value,
                password: password.value
            }
        }).then(response => {            
            updateUser(response.data)

            if (response.data.admin) {
                history.push('/dashboard')
                return
            }

            history.push('/profile')
        })
    })

    return (
        <div className="container">
            <Container maxWidth="sm">
                <h2>Insert your awesome credentials:</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <div className="mui-text-fields">
                            <TextField label="Email" id="email"/>
                            <TextField label="Password" type="password"id="password"/>
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