
import React, { useContext, useEffect, useState } from 'react'
import * as yup from "yup";
import { Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosWithBaseUrl, AxiosWithToken } from "../../AxiosInstance"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App';


export const CreateUser = () => {

  const [departments, setDepartments] = useState([])

  const { setOpen } = useContext(UserContext)


  const navigate = useNavigate()

  // ========== validation schema ==========
  const schema = yup.object({
    name: yup.string().required().matches(/^(?![\s-])[\w\s-]+$/, "spcace not allowded"),
    email: yup.string().email(),
    password: yup.string().min(4).max(15).required(),
    phone_number: yup.string(),
    department_fk: yup.string().required(),
    role: yup.string().required(),
  }).required();
  // ========== validation schema ==========

  const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (datas) => {
    if (!datas.email) delete datas["email"]
    if (!datas.phone_number) delete datas["phone_number"]

    try {

      console.log(datas);
      const { data } = await AxiosWithToken.post('accounts/', datas)
      setOpen({ open: true, variant: "success", message: "New user is Created" })

      console.log(data);
      navigate("/users")

    } catch (error) {

      console.log(error.response);
      const err = error.response.data

      err.role && setError('role', { type: 'custom', message: err.role[0] });
      err.name && setError('name', { type: 'custom', message: err.name[0] });
      err.email && setError('email', { type: 'custom', message: err.email[0] });
      err.password && setError('password', { type: 'custom', message: err.password[0] });
      err.phone_number && setError('phone_number', { type: 'custom', message: err.phone_number[0] });
      err.department_fk && setError('department_fk', { type: 'custom', message: err.department_fk[0] });


      if (error.response.request.status == 401) navigate("/")

    }
  };


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


  useEffect(() => {

    fetchDepartment()

  }, [])

  return (
    <div className='d-flex justify-content-center' >
      <div className='ticket-form'>
        <h3>Submit Ticket</h3>
        <h6 className='ticket-info'>Ticket Information</h6>

        {/* ================ ticket form ================ */}

        <form style={{ marginTop: "41px" }}>

          <label htmlFor="department">name *</label>
          <input {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>


          <label htmlFor="department">email *</label><br />
          <textarea {...register("email")} style={{ width: "100%" }} />
          <p className='text-danger'>{errors.email?.message}</p>


          <label htmlFor="phone number">phone number *</label><br />
          <textarea {...register("phone_number")} style={{ width: "100%" }} />
          <p className='text-danger'>{errors.phone_number?.message}</p>

          <label htmlFor="department">password *</label><br />
          <input {...register("password")} style={{ width: "100%" }} />
          <p className='text-danger'>{errors.password?.message}</p>

          <label htmlFor="Department">Department *</label>    <br />
          <select name="cars" id="cars" {...register("department_fk")} >
            <option value="" disabled selected >-None-</option>

            {/* ========================== map department data ========================== */}
            {departments.map(data => <option value={data.id}>{data.name}</option>)}
            {/* ========================== map department data ========================== */}

          </select>
          <p className='text-danger'>{errors.department?.message}</p>

          <label htmlFor="Role">Role *</label>    <br />
          <select name="cars" id="cars" {...register("role")} >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <p className='text-danger'>{errors.role?.message}</p>

          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button variant="light" className='text-primary' onClick={()=>navigate("/users")}>Discard</Button>
        </form>

        {/* ================ ticket form ================ */}

      </div>
    </div>
  )
}
