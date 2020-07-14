//import firebase from "firebase/app";
//import "firebase/auth";
import {
  currentUser,
  isAuthActive
} from "../../constants/config";
import axios from "axios";
import {
  apiUser,
  apiLogin
} from "../../constants/config";

export default {
  state: {
    /*isAuthActive
         ?*/
    currentUser: localStorage.getItem("user") != null ?
      JSON.parse(localStorage.getItem("user")) : null,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null,
    token:null,
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
    token:state => state.token
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
      state.processing = false;
      state.loginError = null;
    },
    setLogout(state) {
      state.currentUser = null;
      state.processing = false;
      state.loginError = null;
      localStorage.removeItem("user");
    },
    setProcessing(state, payload) {
      state.processing = payload;
      state.loginError = null;
    },
    setError(state, payload) {
      state.loginError = payload;
      state.currentUser = null;
      state.processing = false;
    },
    setForgotMailSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.forgotMailSuccess = true;
    },
    setResetPasswordSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.resetPasswordSuccess = true;
    },
    setToken(state) {
      let user = (localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
      if (user) {
        state.token= user.accessToken;
      }
    },
    clearError(state) {
      state.loginError = null;
    }
  },
  actions: {
    login({
      commit
    }, payload) {
      commit("clearError");
      commit("setProcessing", true);

      const user = {
        email: payload.email,
        password: payload.password
      };

      axios({
          method: 'post',
          url: apiLogin, //apiUser+"login",//  "http://127.0.0.1:8000/api/v1/user/login",          
          data: user,
          validateStatus: function (status) {
            return status >= 200 && status < 300 || (status === 401);
          }
        })
        .then(response => {

          if (!response.data.success) {
            let mess = response.data.errors;
            commit("setError", mess);
          } else {
            const item = {
              uid: response.data.user.id,
              id: response.data.user.id,
              title: response.data.user.name,
              accessToken: response.data.access_token
            };
            localStorage.setItem("user", JSON.stringify(item));
            commit("setUser", {
              uid: response.data.user.id,
              id: response.data.user.id,
              title: response.data.user.name
            });
          }
        }).catch(err => {

          if (401 === err.response.status) {
            commit("setError", "خطا دسترسی");
          }

          if (!err.response.data.success && err.response.data.message) {
            commit("setError", err.response.data.message);
            return;
          }
          let mess = "";
          Object.entries(err.response.data.errors).forEach(([key, value]) => {
            mess += `${value}` + "<br>";
          });
          commit("setError", mess);
          setTimeout(() => {
            commit("clearError");
          }, 3000);

        });
    },
    forgotPassword({
      commit
    }, payload) {
      commit("clearError");
      commit("setProcessing", true);
    },
    resetPassword({
      commit
    }, payload) {
      commit("clearError");
      commit("setProcessing", true);
      const userDet = {
        old_password: payload.oldPassword,
        new_password: payload.newPassword,
        confirm_password: payload.confirmPassword,
      };
      let user = (localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
      axios({
          method: 'post',
          url: apiUser + "change_password",
          data: userDet,
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          },
        })
        .then(response => {
          commit("clearError");
          commit("setResetPasswordSuccess");        
          return response.data;
        }).catch((err) => {

          /*if (err.code == 422) {
            console.log(err);
          }*/

          if (401 === err.response.status) {
            commit("setError", "خطا دسترسی");
          }

          if (!err.response.data.success && err.response.data.message) {
            commit("setError", err.response.data.message);
            return;
          }
          let mess = "";
          let whichf = "";
          console.log(err.response);
          console.log("hi here");

          Object.entries(err.response.data.errors).forEach(([key, value]) => {
            if (key == "new_password") whichf = "برای پسورد جدید ";
            else if (key == "old_password") whichf = "برای پسورد قدیم ";
            else if (key == "confirm_password") whichf = "برای پسورد مجدد ";
            mess += whichf + `${value}` + "<br>";
          });
          commit("setError", mess);
          setTimeout(() => {
            commit("clearError");
          }, 3000);
        });

    },
    signOut({
      commit
    }) {
    
      let user = (localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
      
      axios({
          method: 'post',
          url: apiUser + "logout",
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          },
        })
        .then(response => {

          if (!response.data.success) {
            commit("setError", "عملیات ناموفق");
          } else {
            commit("setLogout");                      
          }
        }).catch(err => {
         
          if (401 === err.response.status) {
            commit("setError", "خطا دسترسی");
          }

          if (!err.response.data.success && err.response.data.message) {
            commit("setError", err.response.data.message);
             setTimeout(() => {
                commit("clearError");
              }, 3000);
            return;
          }
       
        });
    }
  }
};
