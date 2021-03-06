import React, { useState, useEffect } from 'react'
import {
    Box,
    Container
} from '@material-ui/core'
import Results from './Results'

import Api from '@/services/api'

const CustomerListView = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let isMounted = true

        Api.get('/api/users')
        .then(response => {
            const {data} = response
            let array = Object.keys(data).map(index => data[Number(index)])
            if (isMounted) setUsers(array)
        })  

        return () => isMounted = false
    }, [])

    return (
        <Box>
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Results customData={users} />
                </Box>
            </Container>
        </Box>
    )
}

export default CustomerListView
