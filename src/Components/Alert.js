import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'

export const MyAlert = ({ state, setState }) => {

    console.log(state.message, "%%%%%%%%%%%%%%%%%%555");

    const handleShow = () => {
        setTimeout(() => {
            setState(false)
        }, 2000 * 50)
    }

    useEffect(() => {
        handleShow()
    }, [])
    return (
        <div style={{ maxWidth: "31rem" }}>
            <Alert key={state.variant} variant={state.variant} className='text-center'>
                {state.message}
            </Alert>
        </div >
    )
}
