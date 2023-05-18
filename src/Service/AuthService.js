import axios from "axios";

// const baseUrl ="http://localhost:8080/test";

const baseUrl ="http://localhost:8080/app";


class AuthService{
    // getToken(details) {
    //     return axios.post(baseUrl + "/login", details);
    //   }
      getToken(details) {
        return axios.post(baseUrl + "/login",details, { 
          'Access-Control-Allow-Origin': '*' });
      }
      testApi(token){
        return axios.get(baseUrl + "/verifyUser/", {   
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }

      testApi1(token){
        return axios.get(baseUrl + "/verifySecondApi/", {   
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      getRefreshToken(value){       
        return axios.post(baseUrl + "/refreshtoken",value );
      }

}

export default new AuthService();