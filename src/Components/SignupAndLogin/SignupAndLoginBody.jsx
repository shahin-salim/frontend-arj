import React, { useRef, useState } from 'react'
import "./SignupAndLoginBody.css"
import { Row, Col, Container, Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AxiosWithBaseUrl } from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { isUserIsAuthorized } from '../../utils';


export const SignupAndLoginBody = () => {

   const [loginError, setLoginError] = useState("")

   const { setUser, setOpen } = useContext(UserContext)

   const navigate = useNavigate()

   const schema = yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
   }).required();

   const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

   const onSubmit = async (datas) => {

      try {
         const { data } = await AxiosWithBaseUrl.post("login/", datas)
         setOpen({ open: true, variant: "success", message: "Logged in" })
         console.log(data.access);
         localStorage.setItem("token", data.token)

         console.log(data);
         isUserIsAuthorized(setUser)
         navigate("/all_tickets")
      } catch (error) {
         console.log(error.response);
         setLoginError(error.response.data.error)
      }

   }
   console.log(errors);


   return (
      <div style={{ backgroundColor: "#f3f5f7" }} className='main-body-outer '>
         {/* <div className=''> */}
         <div className='main-body'>
            <Container>
               <Row style={{ paddingTop: "100px" }}>
                  <Col className='col-md-12 col-12'>


                     <div className='d-flex justify-content-center'>

                        {/* ======================= Login form ======================= */}

                        <div className='signup-form-wrapper'>
                           <h3>Already a member</h3>
                           <span>Sign in</span>
                           <br />


                           {/* ========================== login error ========================== */}
                           <p className='mt-2 mb-2 text-danger'>{loginError}</p>
                           {/* ========================== login error ========================== */}



                           {/* ============== login form ============== */}
                           <form>
                              <input
                                 placeholder='Email / Phone number' {...register("email")}
                                 className='w-100 inputBox login-form-input-height'
                              />
                              <p className='error'>{errors.email?.message}</p>

                              <input
                                 placeholder='Password' {...register("password")}
                                 className='w-100 inputBox  login-form-input-height'
                              />
                              <p p className='error'>{errors.password?.message}</p>

                              <div
                                 className='d-flex justify-content-end'
                              >
                                 <Button
                                    variant="dark"
                                    onClick={handleSubmit(onSubmit)}
                                 >
                                    Sign in
                                 </Button>
                              </div>
                           </form>
                           {/* ============== login form ============== */}




                        </div>

                        {/* ======================= Login form ======================= */}
                     </div>
                  </Col>


                  {/* <Col className='col-md-6 col-12'>
                     <div className='span-as-a-tag-outer' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                           <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        <div >
                           Admin Login? <span className='span-as-a-tag'>login here</span>
                        </div>

                     </div>
                  </Col> */}
               </Row>
            </Container>
         </div>
         {/* </div> */}
      </div>
   )
}
