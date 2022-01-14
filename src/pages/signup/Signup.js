import { useState } from 'react'
import axios from 'axios'

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        first:first, 
        last:last, 
        email:email,
        password:password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  
  return (
    <div>
      <h2>Sign up for an accout!</h2>

      { error && 
      <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="signup-first">First Name:</label>
          <input id="signup-first" value={first} onChange={(e) => setFirst(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-last">Last Name:</label>
          <input id="signup-last" value={last} onChange={(e) => setLast(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-email">Email:</label>
          <input id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-password">Password:</label>
          <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Sign up!" ></input>
        </div>
      </form>
    </div>
  )
}

export default Signup