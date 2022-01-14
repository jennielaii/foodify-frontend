import { useEffect, useContext } from 'react'
import { UserContext } from "./context/UserContext"
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

function App() {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

  const fetchUser = () => {
    if (localStorage.getItem('userId')) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
      .then((response) => {
        setUser(response.data.user)
      })
    }
  }
  useEffect(fetchUser, [setUser])
  
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' exact element={<Home />}></Route> 
        <Route path='/signup' element={user.id ? <Profile/> : <Signup />} />
        <Route path='/login' element={user.id ? <Profile/> : <Login />} />
        <Route path='/profile' element={user.id ? <Login/> : <Profile />} />
      </Routes>
    </div>
      
  );
}


export default App;
