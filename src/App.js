import SignupOrLogin from "./Pages/SignupOrLogin/SignupOrLogin";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddTicket } from "./Pages/Ticket/AddTicket";
import { Header } from "./Components/Header/Header";
import { CreateUser } from "./Pages/CreateUser/CreateUser";
import { Department } from "./Pages/Department/Department";
import ListDepartment from "./Pages/ListDepartment";
import { createContext, useEffect, useState } from "react";
import ListTickets from "./Pages/ListTickets/ListTickets";
import { AxiosWithToken } from "./AxiosInstance";
import { isUserIsAuthorized } from "./utils";
import { MyAlert } from "./Components/Alert";
import ListUsers from "./Pages/ListUsers";
import CustomizedSnackbars from "./Components/SnackBar";
export const UserContext = createContext()


function App() {
  const [user, setUser] = useState({})
  const [open, setOpen] = useState({open: false, variant: "success" , message: ""})
  const [showAlert, setShowAlert] = useState({ variant: "primary", message: "my message" })

  useEffect(() => {

    isUserIsAuthorized(setUser) // call back will excecute if the user is authorized


    return () => {
      console.log("hello");
    }

  }, [])



  console.log(user, "============ user ==============");

  return (
    <div>
      <UserContext.Provider value={{ user, setUser, setOpen }}>

        <BrowserRouter>


          <Header />
          <CustomizedSnackbars open={open} setOpen={setOpen}  />

          <Routes>
            <Route path="/" element={!user ? <SignupOrLogin /> : <ListTickets />} />
            <Route path="/ticket" element={<AddTicket />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/create_user" element={<CreateUser />} />
            <Route path="/department" element={<ListDepartment />} />
            <Route path="/create_department" element={<Department />} />
            <Route path="/edit_department/:id" element={<Department />} />
            <Route path="/all_tickets" element={<ListTickets />} />
          </Routes>
        </BrowserRouter>

      </UserContext.Provider>
    </div>
  );
}

export default App;
