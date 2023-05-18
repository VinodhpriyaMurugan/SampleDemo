import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthService from '../Service/AuthService';
import Cookies from 'js-cookie'
import axios from 'axios';


function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const[userName,setUserName] = useState('');
  const[password,setPassword] = useState('');

  function handleSwitching() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }
const handleSaveBtn =()=>{
let info = {username:userName,password:password}
// axios.post('http://localhost:8080/test/login',info)
//   .then(response => {
//     // const cookie =response.headers['Set-Cookie'];
//     console.log(response.data);
//     // document.cookie
//     storeToken(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

  // axios.get('http://localhost:9000/get-cookies')
  // .then(response => {
    
  // })
  // .catch(error => {
  //   console.log(error);
  // });
// const response = AuthService.getToken(info);
// const xcookies = response.headers?.['Set-Cookie'];
AuthService.getToken(info).then((Response)=>{
  Cookies.set("user-token",Response.data.token)
  var valuesssss = document.cookie
  console.log("Response cookie=========>",valuesssss)
  storeToken(Response.data);
  
  console.log("Response=========>",Response)
})
}
// console.log("Cokieessssssssssssss",Cookies.get('user-id')) .["Set-cookie"]

const storeToken =(value)=>{
  
  localStorage.setItem('AuthToken',value.accessToken);
  localStorage.setItem('RefreshToken',value.refreshToken);

  if(value.accessToken!==null && value.accessToken !== undefined){
navigate("/home")
  }
}
  return (
    <>
      <Form method="post" >
        <h1>{isLogin ? 'Log in' : 'Sign Up'}</h1>
        <p>
          <label htmlFor="email">Username</label>
          <input id="email" type="email" name="email" onChange={(e)=>setUserName(e.target.value)} required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />
        </p>
        <div >
          <button onClick={handleSwitching} type="button">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
          <button onClick={handleSaveBtn}>LOGIN</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
