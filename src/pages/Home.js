import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/AuthService';
import PageContent from '../components/PageContent';
import Cookies from 'js-cookie';
import axios from 'axios';
function HomePage() {
  let user = localStorage.getItem('UserLoggedIn')
  const refreshToken =localStorage.getItem('RefreshToken')
  const navigate = useNavigate();
  const cookie = document.cookie

  const handleTestApi =()=>{
    var splitCookie = cookie.split("=")
    console.log("Splitted cookie",splitCookie[1]);
    const token = localStorage.getItem('AuthToken')
    AuthService.testApi(token).then((Response)=>{
      alert(Response.data)
    })
    .catch(function (error) {
      if (error.response.status===401) {
        console.log("data",error.response.data);
       
        console.log("headers",error.response.headers);
     alert("token expired")
          refreshTokenMethod(error.response.data);
 }
 else if(error.response.status===403){
  alert("logout")
       navigate("/")
      } else if (error.request) {
       
        console.log(error.request);
      } else {
     
        console.log('Error', error.message);
      }
     
    });
  //  let response = AuthService.testApi(token)
  //  console.log(response)
  //  .then((response)=>{
  //   console.log("Response.data.status",response.data)
  //  if(Response.data.status===401){
  //       alert("token expired")
  //  }
  //  })

  }

  const handleTestApi1 =()=>{
    var splitCookie = cookie.split("=")
    console.log("Splitted cookie",splitCookie[1]);
    const token = localStorage.getItem('AuthToken')
    AuthService.testApi1(token).then((Response)=>{
      alert(Response.data)
    })
    .catch(function (error) {
      if (error.response.status===401) {
        console.log("data",error.response.data);
       
        console.log("headers",error.response.headers);
     alert("token expired")
          refreshTokenMethod(error.response.data);
 }
 else if(error.response.status===403){
  alert("logout")
       navigate("/")
      } else if (error.request) {
       
        console.log(error.request);
      } else {
     
        console.log('Error', error.message);
      }
     
    });
  //  let response = AuthService.testApi(token)
  //  console.log(response)
  //  .then((response)=>{
  //   console.log("Response.data.status",response.data)
  //  if(Response.data.status===401){
  //       alert("token expired")
  //  }
  //  })

  }
  const refreshTokenMethod =(pathdata)=>{
    let value = {refreshToken:refreshToken}
    AuthService.getRefreshToken(value).then((Response)=>{
      console.log("RefreshToken",Response.data.status);
      localStorage.removeItem('AuthToken')
      localStorage.setItem('AuthToken',Response.data.accessToken)
   axios.get("http://localhost:8080" + pathdata.path, {   
        headers: {
          Authorization: "Bearer " + Response.data.accessToken,
        },
      }).then((Response)=>{
        alert(Response.data)
      })      
      // AuthService.testApi(Response.data.accessToken).then((Response)=>{
      //   alert(Response.data)
      // })      
    }).catch(function(error) {
      if (error.response.status===403) {
        localStorage.removeItem('AuthToken')
        localStorage.removeItem('RefreshToken')
        alert("Timed out")
        navigate("/")
       }
     
    });
  }
  const handleLogout =()=>{
  Cookies.remove('user-token')
  console.log("cookie",cookie)
  localStorage.removeItem('AuthToken')
  localStorage.removeItem('RefreshToken')
  navigate("/")


  }
  return (
    <PageContent title="Welcome!">
      <p>Hi {user} .....</p>
      <button onClick={handleTestApi}>Test Api1</button>
      <button onClick={handleTestApi1}>Test Api2</button>
      <button onClick={handleLogout}>Logout</button>
    </PageContent>
  );
}

export default HomePage;
