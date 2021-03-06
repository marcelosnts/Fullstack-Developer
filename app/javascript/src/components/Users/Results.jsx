import React, { useState, useCallback, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    makeStyles
} from '@material-ui/core'
import { parseISO, format } from 'date-fns'

import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'

import Api from '@/services/api'
import { MainContext } from '@/App'
import { useToast } from '@/hooks/useToast'

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}))

const Results = ({ className, customData, ...rest }) => {
    const classes = useStyles()
    const [ limit, setLimit ] = useState(10)
    const { currentUser } = useContext(MainContext)
    const history = useHistory()
    const { addToast } = useToast()

    const handleUserDelete = useCallback((id) => {
        Api.delete(`/api/users/${id}`)
        .then(() => {
            addToast({
                type: 'success',
                title: 'Success!',
                description: 'User removed successfully!',
            })

            history.push('/')
        })
    }, [])

    const joinDate = useCallback((created_at) => {
        if (!created_at) return

        const tempDate = parseISO(created_at.toString())
        return format(tempDate, "'Joined' MM-dd-y 'at' HH:mm")
    }, [])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <colgroup>
                            <col width="15%"/>
                            <col width="15%"/>
                            <col width="30%"/>
                            <col width="15%"/>
                            <col width="5%"/>
                            <col width="10%"/>
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    User
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Avatar location
                                </TableCell>
                                <TableCell>
                                    Created at
                                </TableCell>
                                <TableCell>
                                    Admin
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {customData.slice(0, limit).map((item) => (
                            <TableRow
                                hover
                                key={item.id}
                            >
                                <TableCell>
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                    >
                                    <Avatar
                                        className={classes.avatar}
                                        src={item.avatar_image}
                                    >
                                    </Avatar>
                                    <Typography
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {item.full_name}
                                    </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {item.email}
                                </TableCell>
                                <TableCell>
                                    {item.avatar_image}
                                </TableCell>
                                <TableCell>
                                    {joinDate(item.created_at)}
                                </TableCell>
                                <TableCell>
                                    {
                                        item.admin
                                        ? (<CheckIcon style={{color: 'green'}} />)
                                        : (<ClearIcon style={{color: 'red'}} />)
                                    }
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Link to={`/users/edit/${item.id}`} style={{color: 'black'}}>
                                            <EditIcon />
                                        </Link>
                                    </IconButton>
                                    {(currentUser.id != item.id) && (
                                    <IconButton onClick={() => {handleUserDelete(item.id)}} style={{color: 'red'}}>
                                        <DeleteIcon />
                                    </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

Results.propTypes = {
    className: PropTypes.string,
    customData: PropTypes.array.isRequired
}

export default Results
