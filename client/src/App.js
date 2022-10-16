import './App.css';
import {useState} from "react";
import Axios from 'axios'

function App() {

  const [usernameReg, setusernameReg] = useState("")
  const [passwordReg, setpasswordReg] = useState("")


  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")


  const [loginStatus, setloginStatus] = useState("")


  const register_or_login_text = useState("Register")
  


  const register=()=>{
    Axios.post('http://localhost:5000/register',
     {username:usernameReg, password:passwordReg})
     .then((response)=>{
        console.log(response)
        // const x = document.getElementById("success-msg").innerHTML = "Registration successful! Now Login!"
        // const app = document.querySelector('.App')
        // const loginText = document.querySelectorAll('.regText')
        // loginText[0].value=" "
        // loginText[1].value=" "
        // app.appendChild(loginText[0])
        // app.appendChild(loginText[1])
        // app.appendChild(x)
        // app.innerHTML = "vvv"
     })
  }

  const login =()=>{
    Axios.post('http://localhost:5000/login',
     {username:username, password:password}).then((response)=>{
        if (response.data.message){
          setloginStatus(response.data.message)
        }else{
          setloginStatus(response.data[0].username)
        }
     })

  }



  return (
    <div className="App">
      <h1>Registration</h1>
      <p>Enter username</p>
      <p id="success-msg"></p>
      <input type="text" className='regText'  onChange={(e)=>{setusernameReg(e.target.value)}}></input>
      <p>Enter password</p>
      <input type="text" className='regText' onChange={(e)=>{setpasswordReg(e.target.value)}}></input>
      <button onClick={register}>Register</button>


      <h1>Login</h1>
      <input type="text" placeholder="username" onChange={(e)=>{setusername(e.target.value)}}></input>
      <br></br>
      <input type="text" placeholder="password" onChange={(e)=>{setpassword(e.target.value)}}></input>
      <button onClick={login}>Login</button>

      <span>{loginStatus}</span>
    </div>
  );
}

export default App;
