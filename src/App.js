import { useState, useEffect } from 'react'
import { Route, Routes, Navigate   } from 'react-router-dom'
import axios from 'axios'
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState({})

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
  useEffect(fetchUser, [])
  
  return (
  
    <div>
    <Navbar user={user} setUser={setUser} />
    <Routes>
    
      <Route path="/" exact component={Home} />
      <Route
            path='/signup'
            element=
            { user.id ?
              <Navigate to='/signup' />
            :
              <Signup user={user} setUser={setUser}  />
            }
          />
      <Route
            path='/login'
            element=
            { user.id ?
              <Navigate to='/login' />
            :
              <Login user={user} setUser={setUser}  />
            }
          />
      
    </Routes>
    </div>

  );
}


export default App;
