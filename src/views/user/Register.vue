<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  اطلاعات خود را وارد نمایید <br />
                <router-link tag="a" to="/user/login" class="white">ورود کاربر</router-link>
              </p>
              
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="submit">

               

              <b-form-group :label="$t('user.fullname')" class="has-float-label mb-4">
              <b-form-input
                type="text"
                v-model="$v.form.fullname.$model"
                :state="!$v.form.fullname.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.fullname.required">نام را وارد نمایید</b-form-invalid-feedback>              
            </b-form-group>

              <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
              <b-form-input
                type="email"
                v-model="$v.form.email.$model"
                :state="!$v.form.email.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.email.required">ایمیل را وارد نمایید</b-form-invalid-feedback>   
               <b-form-invalid-feedback
                v-else-if="!$v.form.password.email"
              >ایمیل معتبر وارد نمایید</b-form-invalid-feedback>           
            </b-form-group>

          

              <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.password.$model"
                :state="!$v.form.password.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required">پسورد را وارد نمایید</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.password.minLength"
              >پسورد شما باید حداقل 8 کاراکتر باشد</b-form-invalid-feedback>
            </b-form-group>

            
              <div class="d-flex justify-content-between align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
                      <router-link
                tag="a"
                to="/app"
              >{{ $t('pages.go-back-home')}}</router-link>
                
              </div> 
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
//import firebase from "firebase";
import { apiUser } from "../../constants/config";
import axios from "axios";
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");

export default {
  data () {
    return {
      form: {
        fullname: '',
        email: '',
        password: ''
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      fullname: {
        required
      },
      email: {
        required,
        email
      },
      password: {
         required,
         minLength: minLength(8)
      }
    }
  },
  methods: {
     goBack() {
      this.$router.push("/");
    },
    addNotification(
      type = "info",
      title = "This is Notify Title",
      message = "This is Notify Message,<br>with html."
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false });
    },
     submit() {
        this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
    const user = {
            email: this.form.email,
            password: this.form.password,
            name: this.form.fullname       
          };

          let userData = (localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
    /*  axios.post(
          apiUser + "register" ,
           {headers: {
            "Authorization" :  `Bearer ${userData.accessToken}`
              }
            },
            user 
        )*/
    
         axios({
              method: 'post',
              url:  apiUser + "register",
              data: user,
              headers: {
                'Authorization': `Bearer ${userData.accessToken}`
              },
            })
        .then(response => {
       
          if(!response.data.success)
          {
            this.addNotification("error filled" , " پیام", "کاربر" + user.email +" ثبت نشد");
          }else
          {
            this.addNotification("success filled" , " پیام", "کاربر" + user.email +" با موفقیت ثبت شد");
                   setTimeout(() => {
                    this.$router.push("/");
                }, 200); 
          }            
        }).catch((err) => {
              
              if (401 === err.response.status) {
                this.addNotification("error filled" , "پیام", "خطا دسترسی");
              }

              if (!err.response.data.success && err.response.data.message) {
                this.addNotification("error filled" , "پیام", err.response.data.message);
                return;
              }
              let mess = "";                       
              Object.entries(err.response.data.errors).forEach(([key, value]) => {
                mess +=  `${value}` + "<br>";
              });
               this.addNotification("error filled" , "پیام", mess);

            });
      }
    }
  }
}
</script>
