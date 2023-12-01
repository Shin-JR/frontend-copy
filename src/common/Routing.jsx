import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Instructions from '../components/instructions/Instructions'
import LandingPage from '../components/landing/LandingPage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Staff from '../components/staff/Staff'
import NewStaff from '../components/staff/NewStaff'
import UpdateStaff from '../components/staff/UpdateStaff'
import DeleteStaff from '../components/staff/DeleteStaff'
import NewUser from '../components/users/NewUser'
import Login from '../components/users/Login'
import Profile from '../components/users/Profile'
import Booking from '../components/calendar/Booking'
import Reservations from '../components/users/Reservation'
import UserCheck from '../components/protected/UserCheck'
import AdminCheck from '../components/protected/AdminCheck'

import CreateModule from '../components/calendar/crud_modules/CreateModule'
import GetModules from '../components/calendar/crud_modules/GetModules'


import Reviews from '../components/reviews/Reviews'




function Routing() {
    const token = localStorage.getItem('token');
    return (
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/newstaff" element={<NewStaff />} />
            <Route path="/updatestaff" element={<UpdateStaff />} />
            <Route path="/deletestaff" element={<DeleteStaff />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path='/login' element={<Login />} />
            <Route path="/usercheck" element={<UserCheck />} />
            <Route path='/profile' element={token ? <Profile /> : <Login />} />
            <Route path='/reservations' element={token ? <Reservations /> : <Login />} />
            <Route path="/admincheck" element={<AdminCheck />} />

            <Route path='/profile' element={<Profile />} />
            <Route path='/reservations' element={<Reservations />} />
            <Route path='/modules/new' element={<CreateModule />} />
            <Route path='/modules/' element={<GetModules />} />
            

            <Route path='/reviews' element={<Reviews />} />


            {/* <Route path="/app" element={<App />} /> */}
        </Routes>
        <Footer/>
        </BrowserRouter>
    ) 
}

export default Routing;