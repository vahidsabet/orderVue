<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <p class="text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
          <p class="white mb-0">
            اطلاعات ورود را وارد نمایید
            <br />اگر ثبت نام نکردید
            <router-link tag="a" to="/user/register" class="white">ثبت نام</router-link>
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <span class="logo-single" />
          </router-link>
          <h6 class="mb-4">{{ $t('user.login-title')}}</h6>

          <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group :label="$t('user.oldPassword')" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.oldPassword.$model"
                :state="!$v.form.oldPassword.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.oldPassword.required">پسورد قبلی را وارد نمایید</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.oldPassword.minLength || !$v.form.oldPassword.maxLength"
              >پسورد شما باید بین 4 تا 16 کاراکتر باشد</b-form-invalid-feedback>
            </b-form-group>

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

            <div class="d-flex justify-content-between align-items-center">
             
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing,
                    'show-success': !processing && loginError===false,
                    'show-fail': !processing && loginError }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">{{ $t('user.reset-password-button') }}</span>
              </b-button> <router-link
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
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");
import axios from "axios";
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        password: "",
        passwordAgain: ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      oldPassword: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
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
  computed: {
    ...mapGetters([
      "currentUser",
      "processing",
      "loginError",
      "resetPasswordSuccess"
    ])
  },
  methods: {
    ...mapActions(["resetPassword"]),
    formSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.resetPassword({
          oldPassword: this.form.oldPassword,
          newPassword: this.form.password,
          confirmPassword: this.form.passwordAgain       
        });
      }
    }, getToken(){
      let user=(localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
      if(user){     
           return user.accessToken;
      }     
    }
  },
  watch: {
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Reset Password Error", val, {
          duration: 3000,
          permanent: false
        });
      }
    },
    resetPasswordSuccess(val) {
      if (val) {
        this.$notify(
          "success",
          "ریست پسورد",
          "پسورد با موفقیت تغییر یافت",
          {
            duration: 3000,
            permanent: false
          }
        );
          setTimeout(() => {
                    this.$router.push("/user");
                }, 200);
      }
    }
  }
};
</script>
