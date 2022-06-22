import React, { useEffect, useState } from 'react'
import { AxiosWithToken } from "../../AxiosInstance"
import { DataTable } from '../DataTable'
import { Button } from 'react-bootstrap'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const ListTickets = () => {

    const [tickets, setTickets] = useState([])

    const navigate = useNavigate()

    const { user, setUser, setOpen } = useContext(UserContext)

    // ============ fetch tickets data from backend ============
    const fetchTickets = async () => {
        try {
            const { data } = await AxiosWithToken.get("tickets/")
            console.log(data);
            setTickets(data.tickets)
        } catch (error) {
            if (error.response.request.status == 401) navigate("/")
        }
    }
    // ============ fetch tickets data from backend ============


    useEffect(() => {
        if (user) fetchTickets()
    }, [user])

    const RowComponent = ({ data, index }) => {
        const onHandleDelete = async (id) => {
            try {
                const { data } = await AxiosWithToken.delete(`tickets/?id=${id}`)
                setTickets(tickets.filter(data => data.id != id))
                setOpen({ open: true, variant: "error", message: "Item deleted" })

            } catch (error) {
                console.log(error);
                if (error.response.request.status == 401) navigate("/")

            }

        }

        return (
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.description}</td>
                <td>{data.priority}</td>
                <td>{data.created_at}</td>
                <td><Button
                    className='btn  btn-outline-danger bg-danger text-light'
                    onClick={() => onHandleDelete(data.id, index)}
                >
                    Delete
                </Button>
                </td>
            </tr>
        )
    }



    return (
        <div>
            <DataTable
                title={"Tickets"}
                state={tickets}
                setState={setTickets}
                RowComponent={RowComponent}
                tableHeadLines={[
                    "Ticket ID",
                    "Subject",
                    "Priority",
                    "Created at",
                    "Delete"
                ]}
            />
        </div>
    )
}

export default ListTickets