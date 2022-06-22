import "./AddTicket.css"
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { yupResolver } from '@hookform/resolvers/yup';

import { UserContext } from "../../App";
import { AxiosWithToken } from "../../AxiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const AddTicket = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    // ========== validation schema ==========
    const schema = yup.object({
        subject: yup.string().required().matches(/^(?![\s-])[\w\s-]+$/, "spcace not allowded"),
        description: yup.string().required().matches(/^(?![\s-])[\w\s-]+$/, "spcace not allowded"),
        priority: yup.string().required().matches(/^(?![\s-])[\w\s-]+$/, "spcace not allowded")
    }).required();
    // ========== validation schema ==========

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async datas => {

        console.log(datas);

        try {
            const { data } = await AxiosWithToken.post("tickets/", datas)
            console.log(data);
            navigate("/all_tickets")
        } catch (error) {
            console.log(error);
            if (error.response.request.status == 401) navigate("/")

        }
    };







    return (
        <div className='d-flex justify-content-center' s>
            <div className='ticket-form'>
                <h3>Submit Ticket</h3>
                <h6 className='ticket-info'>Ticket Information</h6>

                {/* ================ ticket form ================ */}

                <form style={{ marginTop: "41px" }}>

                    <label htmlFor="department">Subject *</label>
                    <input {...register("subject")} />
                    <p className='text-danger'>{errors.subject?.message}</p>


                    <label htmlFor="department">description *</label><br />
                    <textarea {...register("description")} style={{ width: "100%" }} />
                    <p className='text-danger'>{errors.description?.message}</p>


                    <label htmlFor="Priority">Priority *</label>    <br />
                    <select name="cars" id="cars" {...register("priority")} >
                        <option value="" disabled selected >-None-</option>
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                        <option value="high">high</option>
                        <option value="urgent">urgent</option>
                    </select>
                    <p className='text-danger'>{errors.priority?.message}</p>

                    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                    <Button variant="light" className='text-primary' onClick={() => navigate("/all_tickets")}>Discard</Button>
                </form>

                {/* ================ ticket form ================ */}

            </div>
        </div>
    )
}
