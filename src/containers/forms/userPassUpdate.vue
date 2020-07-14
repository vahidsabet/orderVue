<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" :title="$t('forms.addorder')">
        <b-form @submit.prevent="submitData">
         

    <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
         <b-form-input
                type="password"
                v-model="$v.form.password.$model"
                :state="!$v.form.password.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required">پسورد خود را وارد نمایید</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength"
              >پسورد شما باید بین 4 تا 16 کاراکتر باشد</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('user.password-again')" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.passwordAgain.$model"
                :state="!$v.form.passwordAgain.$error"
              />
              <b-form-invalid-feedback
                v-if="!$v.form.passwordAgain.required"
              >ورود دوباره پسورد</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.passwordAgain.sameAsPassword"
              >پسورد یکسان نیست</b-form-invalid-feedback>
            </b-form-group>

          <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");
import { getDirection } from "../../utils";
import firebase from "firebase";
export default {
 
  data() {
    return {
      direction: getDirection().direction,
      selectData: [
        { label: "Chocolate", value: "chocolate" },
        { label: "Vanilla", value: "vanilla" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Caramel", value: "caramel" },
        { label: "Cookies and Cream", value: "cookiescream" },
        { label: "Peppermint", value: "peppermint" }
      ],
      form: {
        password: "",
        passwordAgain: ""
      },
      userInfo: {
        email: "",
        password: "",
        tags: [],
        date: null,
        select: "",
        checked: false
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      passwordAgain: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
      
     addNotification(
      type = "info",
      title = "This is Notify Title",
      message = "This is Notify Message,<br>with html."
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false });
    },
    submitData() {
      console.log(JSON.stringify(this.userInfo));
  this.$v.form.$touch();
      if (!this.$v.form.$anyError) {

            /*    this.resetPassword({
                newPassword: this.form.password,
                resetPasswordCode: this.$route.query.oobCode || ""
                });*/
              
            if (localStorage.getItem('user') != null) {
                    var user = firebase.auth().currentUser;
                    
if(user!=null){

 /*                   var newPassword =this.form.password; // getASecureRandomPassword();
  console.log(user);
  var credential;

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
  user.updatePassword(newPassword).then(function() {
                    this.addNotification("success filled" , "تغییر پسورد","پسورد با موفقیت ثبت گردید");
                        setTimeout(() => {
                                localStorage.removeItem('user')
                            this.$router.push("/user");
                        }, 500);
                    }).catch(function(error) {
                        this.addNotification("error filled" , "تغییر پسورد","خطای عملیات"+error.code);
                    });
}).catch(function(error) {
   this.addNotification("error filled" , "تغییر پسورد","خطای اعتبار مجدد");
});
*/
                   

}else{
     this.addNotification("error filled" , "تغییر پسورد","کاربر یافت نشد ");
}
            }
    }
    }
  }
};
</script>
