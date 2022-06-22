import React, { useEffect, useState, useContext } from 'react'
import { AxiosWithToken } from '../AxiosInstance'
import { DataTable } from './DataTable'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


const ListDepartment = () => {

    const navigate = useNavigate()

    const [departments, setDepartments] = useState([])

    const { setOpen } = useContext(UserContext)

    // ============ fetch deaprtment data from backend ============
    const fetchDepartment = async () => {
        try {
            const { data } = await AxiosWithToken.get("department/")
            console.log(data);
            setDepartments(data)
        } catch (error) {
            console.log(error);
            if (error.response.request.status == 401) navigate("/")

        }
    }
    // ============ fetch deaprtment data from backend ============


    // delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await AxiosWithToken.delete(`department/${id}/`)
            console.log(data);
            setOpen({ open: true, variant: "success", message: "deleted" })
            setDepartments(departments.filter(data => data.id != id))

        } catch (error) {

            console.log(error.response);
            if (error.response.data.exist) setOpen({ open: true, variant: "error", message: "Can't delete item alredy exist with user" })

            if (error.response.request.status == 401) navigate("/")

        }
    }


    useEffect(() => {
        fetchDepartment()
    }, [])

    const RowComponent = ({ data }) =>
        <>
            <tr>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td><Button onClick={() => navigate("/edit_department/" + data.id)}>Edit</Button></td>
                <td><Button className='bg-danger btn-outline-danger bg-danger text-light' onClick={() => handleDelete(data.id)}>Delete</Button></td>
            </tr>
        </>



    return (
        <div>
            <DataTable
                title={"Department"}
                state={departments}
                setState={setDepartments}
                RowComponent={RowComponent}
                tableHeadLines={[
                    "name",
                    "discription",
                    "edit",
                    "delete"
                ]}
            />
        </div>
    )
}

export default ListDepartment