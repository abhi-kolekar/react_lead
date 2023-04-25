import axios from 'axios';
import authHeader from './auth-header';
export const API_URL = process.env.REACT_APP_API_URL;

class AuthService {

    login({username, password}) {
      console.log(API_URL)
        return axios
          .post(API_URL + "auth/signin", {
            username,
            password
          })
          .then(response => {
            if (response.data) {
              localStorage.setItem("leaduser", JSON.stringify(response.data));
            }
    
            return response;
          });
    }

    logout() {
        localStorage.removeItem("user");
    }


    validToken() {
      const leaduser=localStorage.getItem('leaduser')
      if(leaduser){
        return axios.get(API_URL+"auth/verify-token",{headers: authHeader()})
                .then((response) => {
                  return this.getLoggeduser(response.data.userid)
                  return response;
                }).catch((error)=>{
                  if(error.response &&
                    error.response.status == 401){
                      this.removeToken();
                      //localStorage.removeItem('leaduser')
                  }
                  return error;
                })
      

      }
    }

    register(username, email, password) {

    }

    removeToken(){
      localStorage.removeItem('leaduser')
    }

    getLoggeduser(id){
      return axios.get(API_URL+"auth/loggedinuser/",{headers: authHeader()})
          .then((response) => {
            return response.data;
          })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}
export default new AuthService();