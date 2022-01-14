import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

const Login = (props) => {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email: email,
        password: password,
      });
      await localStorage.setItem('userId', res.data.user.id);
      await setUser(res.data.user)
    } catch (err) {
      console.log(err)
      // setError(err.response.data.message)
    }
  };
  
  return (
    <div>
      <h2>Log into your accout!</h2>

      { error && 
      <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-email">Email:</label>
          <input id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-password">Password:</label>
          <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Log in!" ></input>
        </div>
      </form>
    </div>
  )
}

export default Login