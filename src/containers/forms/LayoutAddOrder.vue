<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4 blue" :title="$t('forms.addorderZiplin')">
        <b-form @submit.prevent="onOrderSubmit">
            <b-form-group :label="$t('forms.orderNo')" class="has-float-label mb-4">
              <b-form-input
                type="text"
                v-model="$v.order.orderNo.$model"
                :state="!$v.order.orderNo.$error"
              />
              <b-form-invalid-feedback
                v-if="!$v.order.orderNo.required"
              >شماره سفارش ضروریست</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.order.orderNo.minLength"
              >حداقل سه کاراکتر</b-form-invalid-feedback>
            </b-form-group>
             <b-form-group :label="$t('forms.cName')" class="has-float-label mb-4">
              <b-form-input
                type="text"
                v-model="$v.order.cName.$model"
                :state="!$v.order.cName.$error"
              />
              <b-form-invalid-feedback
                v-if="!$v.order.cName.required"
              >نام مشتری ضروریست</b-form-invalid-feedback>            
            </b-form-group>         
                <b-form-group :label="$t('forms.tel')" class="has-float-label mb-4">
              <b-form-input
                type="number"
                v-model="$v.order.tel.$model"
                :state="!$v.order.tel.$error"
              />
              <b-form-invalid-feedback
                v-if="!$v.order.tel.required"
              >تلفن مشتری ضروریست</b-form-invalid-feedback>            
            </b-form-group>                
          <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { getDirection } from "../../utils";
import { validationMixin } from "vuelidate";
import {
  apiUrl
} from "../../constants/config";
const {
  required,
  maxLength,
  minLength
} = require("vuelidate/lib/validators");
import axios from "axios";

export default {
 
  data() {
    return {
      direction: getDirection().direction,
      order: {
        orderNo: "",
        cName: "",
        tel: ""
      }
    };
  },
  mixins: [validationMixin],
    validations: {
    order: {
      orderNo: {
        required,
        minLength: minLength(3)
      },
      cName: {
        required
      },
      tel: {
        required,       
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
    onOrderSubmit() {
       this.$v.order.$touch();
         if (!this.$v.order.$anyError) {
          let user = (localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
          axios({
              method: 'post',
              url: apiUrl + "/store",
              data: this.order,
              headers: {
                'Authorization': `Bearer ${user.accessToken}`
              },
            })
            .then(response => {     
                      
              this.addNotification("success filled" , " پیام", "سفارش" + this.order.orderNo +" با موفقیت ثبت شد");       
             
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
};
</script>
