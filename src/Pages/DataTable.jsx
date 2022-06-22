import React from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const tableInnerStyle = {
    paddingTop: "121px",
    maxWidth: "1600px",
    width: "1600px",
}


export const DataTable = ({ state, setState, tableHeadLines, RowComponent, title }) => {

    const navigate = useNavigate()

    return (
        <div className='d-flex justify-content-center'>
            <div style={tableInnerStyle}>

                <div
                    className='d-flex justify-content-between pb-4 align-items-center'
                    style={{ padding: "30px 60px 0px 60px" }}
                >
                    <h1 className='text-center'>{title}</h1>
                    {title == "Department" &&
                        <Button
                            onClick={() => navigate("/create_department")}
                        >
                            Create Department
                        </Button>}

                    {title == "Users" &&
                        <Button
                            onClick={() => navigate("/create_user")}
                        >
                            Create User
                        </Button>}


                    {title == "Tickets" &&
                        <Button
                            onClick={() => navigate("/ticket")}
                        >
                            Create Tickets
                        </Button>}

                </div>

                <Table
                    responsive

                >
                    <thead>
                        <tr>
                            {tableHeadLines.map(data => <th>{data}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {state.map((data, index) => <RowComponent data={data} index={index} />)}
                    </tbody>

                </Table>


            </div>
        </div>
    )
}
