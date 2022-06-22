
import React, { useContext, useEffect, useState } from 'react'
import * as yup from "yup";
import { Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { yupResolver } from '@hookform/resolvers/yup';

import { UserContext } from "../../App";
import { AxiosWithToken } from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export const Department = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const { setOpen } = useContext(UserContext)


  const [departmentData, setDepartmentData] = useState({})

  // ========== validation schema ==========
  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  }).required();
  // ========== validation schema ==========

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async datas => {
    try {
      console.log(datas, "---------------")

      if (!id) {
        var { data } = await AxiosWithToken.post("department/", datas)
      } else {
        var { data } = await AxiosWithToken.put(`department/${id}/`, datas)
      }
      console.log(data);
      setOpen({ open: true, variant: "success", message: "new departrment is created" })

      navigate("/department")

    } catch (error) {
      console.log(error.response);
      if (error.response.request.status == 401) navigate("/")

    }
  };



  const fetchDeartment = async () => {
    try {
      const { data } = await AxiosWithToken.get(`http://localhost:8000/department/${id}/`)
      setDepartmentData(data)
    } catch (error) {
      console.log(error.response);
    }

  }


  useEffect(() => {

    fetchDeartment()

  }, [])


  return (
    <div className='d-flex justify-content-center' >
      <div className='ticket-form'>
        <h3>Submit Ticket</h3>
        <h6 className='ticket-info'>Ticket Information</h6>

        {/* ================ Department createion form ================ */}

        <form style={{ marginTop: "41px" }}>

          <label htmlFor="name">name *</label>
          <input defaultValue={departmentData.name} {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>


          <label htmlFor="Description">Description *</label><br />
          <textarea defaultValue={departmentData.description} {...register("description")} style={{ width: "100%" }} />
          <p className='text-danger'>{errors.description?.message}</p>




          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button variant="light" className='text-primary' onClick={()=>navigate("/department")}>Discard</Button>
        </form>

        {/* ================ Department createion form ================ */}

      </div>
    </div>
  )
}
