import React, { useEffect, useState } from 'react'
import { AxiosWithBaseUrl, AxiosWithToken } from '../AxiosInstance'
import { DataTable } from './DataTable'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ListUsers = () => {

    const [allUsere, setAllUsere] = useState([])

    const navigate = useNavigate()


    const fetchUser = async () => { // ============ fetch deaprtment data from backend ============
        try {
            const { data } = await AxiosWithToken.get("accounts/")
            console.log(data);
            setAllUsere(data)
        } catch (error) {
            console.log(error);
            if (error.response.request.status == 401) navigate("/")
        }
    } // ============ fetch deaprtment data from backend ============


    useEffect(() => {

        fetchUser()

    }, [])

    const RowComponent = ({ data }) =>
        <>
            <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone_number}</td>
                <td>{data.role}</td>
            </tr>
        </>



    return (
        <div>
            <DataTable
                title={"Users"}
                state={allUsere}
                setState={setAllUsere}
                RowComponent={RowComponent}
                tableHeadLines={[
                    "name",
                    "email",
                    "phone_number",
                    "role"
                ]}
            />
        </div>
    )
}

export default ListUsers