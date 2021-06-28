import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button, Box, Switch } from '@material-ui/core'
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

export default function UserForm({apiLink, method}){
    const history = useHistory();
    const { currentUser, updateUser } = useContext(MainContext)
    const classes = useStyles();
    const [inputState, setInputState] = useState({
        full_name: '',
        email: '',
        avatar_image: '',
        admin: false,
    });

    useEffect(() => {
        if (!currentUser.email) return

        setInputState({
            full_name: currentUser.full_name,
            email: currentUser.email,
            avatar_image: currentUser.avatar_image,
            admin: currentUser.admin,
        })
    }, [ currentUser ])
    
    const handleBack = useCallback(() => {
        history.push('/')
    })

    const inputChange = useCallback(event => {
        setInputState({ ...inputState, [event.target.id]: event.target.value });
    }, [inputState]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        
        const {
            full_name,
            email,
            avatar_image,
            admin
        } = event.target;

        Api.put(`/api/users/${currentUser.id}`, {
            user: {
                full_name: full_name.value,
                email: email.value,
                avatar_image: avatar_image.value,
                admin: admin.value
            }
        }).then(response => {            
            updateUser(response.data)

            history.push('/')
        }).catch(error => {
            console.log(error.response)
        })
    })

    return (
        <div className="container">
            <Container maxWidth="sm">
                <h2>There's your Sign Up form:</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <div className="mui-text-fields">
                            <TextField 
                                label="Full Name" 
                                id="full_name"
                                value={inputState.full_name ? inputState.full_name : ''}
                                onChange={inputChange}
                            />
                            <TextField 
                                label="Email" 
                                id="email"
                                value={inputState.email ? inputState.email : ''}
                                onChange={inputChange}
                            />                    
                            <TextField 
                                label="Avatar url" 
                                id="avatar_image"
                                value={inputState.avatar_image ? inputState.avatar_image : ''}
                                onChange={inputChange}
                            />
                            {currentUser.admin
                                ? (
                                <Box flexGrow={1} left="57%" position="absolute">
                                    <FormControlLabel
                                    control={
                                        <Switch
                                        checked={inputState.admin ? inputState.admin : false}
                                        onChange={switchChange}
                                        id="admin"
                                        color="primary"
                                        />
                                    }
                                    label="Administrator"
                                    />
                                </Box>
                                )
                                : (<input type="hidden" id="admin" value="false" />)
                            }
                        </div>
                    </div>
                    <div className="button-group">
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>
                    </div>
                </form>
            </Container>    
        </div>
    );
}