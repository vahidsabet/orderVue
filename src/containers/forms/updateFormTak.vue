<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" :title="$t('forms.top-labels-over-line')">
        <b-form @submit.prevent="onTopLabelsOverLineFormSubmit">
          <b-row>
            <b-colxx sm="6">
              <label class="form-group has-float-label">
                <input type="text" class="form-control" v-model="orderNo" disabled />
                <span>{{ $t('forms.orderNo') }}</span>
              </label>
            </b-colxx>
            <b-colxx sm="6">
              <label class="form-group has-float-label">
                <input type="text" class="form-control"   v-model="cName"/>
                <span>{{ $t('forms.cName') }}</span>
              </label>
            </b-colxx>
          </b-row>
          <label class="form-group has-float-label">
            <input type="text" class="form-control" v-model="tel" disabled />
            <span>{{ $t('forms.tel') }}</span>
          </label>
          <b-row>
            <b-colxx sm="4">
              <label class="form-group has-float-label">
                <input type="checkbox" class="form-control" v-model="postSent" />
                <span>{{ $t('forms.postSent') }}</span>
              </label>
            </b-colxx>
            <b-colxx sm="4">
              <label class="form-group has-float-label">
                <input type="checkbox" class="form-control" v-model="mSent" />
                <span>{{ $t('forms.mSent') }}</span>
              </label>
            </b-colxx>

            <b-colxx sm="4">
              <label class="form-group has-float-label">
                <input type="checkbox" class="form-control" v-model="destAr" />
                <span>{{ $t('forms.destAr') }}</span>
              </label>
            </b-colxx>
            <b-colxx sm="6">
              <label class="form-group has-float-label">
                <input type="text" class="form-control" v-model="pCode" />
                <span>{{ $t('forms.pCode') }}</span>
              </label>
            </b-colxx>
          </b-row>
          <b-button
            type="submit"
            @click="updateOrder"
            variant="primary"
            class="mt-4"
          >{{ $t('forms.submit') }}</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>

import { apiUrltak } from "../../constants/config";
import axios from "axios";
import { getDirection } from "../../utils";
//:value="cName" @input="$emit('input', $event.target.value)"
export default {
  props: [
        "order",
        "tUp"
  /*  "orderNo",
    "tel",
    "cName",
    "postSent",
    "mSent",
    "destAr",
    "pCode",*/
    //"updateOrder"//: { type: , required: true }
],
    mounted() {
    this.orderNo = this.order.orderNo;
    this.tel = this.order.tel;
    this.cName = this.order.cName;
    this.postSent = this.order.postSent;
    this.mSent = this.order.mSent;
    this.destAr = this.order.destAr;
    this.pCode = this.order.pCode;
    this.mshow = this.order.mshow;

  },
  data() {
    return {
      direction: getDirection().direction,
      isUpdate: false,
      //orderData: {
        orderNo: "",
        tel: "",
        cName: "",
        postSent: 0,
        mSent: 0,
        destAr: 0,
        pCode: "",
        mshow: false
     // }
    };
  },
  methods: {
    onTopLabelsOverLineFormSubmit() {
      console.log(JSON.stringify(this.topLabelsOverLineForm));
    },
      getToken(){
      let user=(localStorage.getItem("user") != null) ? JSON.parse(localStorage.getItem("user")) : null;
      if(user){     
           return user.accessToken;
      }
     
    },
    updateOrder() {
      const orderObg = {
        orderNo: this.orderNo,
        tel: this.tel,
        cName: this.cName,
        postSent: this.postSent,
        mSent: this.mSent,
        destAr: this.destAr,
        pCode: this.pCode
      };
      axios
        .put(
          apiUrltak + "/" + orderObg.orderNo,
          orderObg,
          {   headers: {                        
                        Authorization :  `Bearer ${ this.getToken()}`
                    }
                    }
        )
        .then(response => {
          this.addNotification("success filled" , "پیام", "سفارش" + orderObg.orderNo +" " +response.data.msg);
          this.tUp();       
          return response.data;
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
    addNotification(
      type = "info",
      title = "This is Notify Title",
      message = "This is Notify Message,<br>with html."
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false });
    } /*,
    getorderNo() {
      return this.orderNo;
    },
    gettel() {
      return this.tel;
    },
    getcName() {
      return this.cName;
    },
    getpostSent() {
      return this.postSent;
    },
    getmSent() {
      return this.mSent;
    },
    getdestArr() {
      return this.destAr;
    },
    getpCode() {
      return this.pCode;
    }*/
    /*getorderNo: {
      get: function() {
        return this.orderNo;
      },
      set: function(newValue) {
        this.$emit("update:orderNo", newValue);
      }
    },
    gettel: {
      get: function() {
        return this.tel;
      },
      set: function(newValue) {
        this.$emit("update:tel", newValue);
      }
    },
    getcName: {
      get: function() {
        return this.cName;
      },
      set: function(newValue) {
        this.$emit("update:cName", newValue);
      }
    },
    getpostSent: {
      get: function() {
        return this.postSent;
      },
      set: function(newValue) {
        this.$emit("update:postSent", newValue);
      }
    },
    getmSent: {
      get: function() {
        return this.mSent;
      },
      set: function(newValue) {
        this.$emit("update:mSent", newValue);
      }
    },
    getdestArr: {
      get: function() {
        return this.destAr;
      },
      set: function(newValue) {
        this.$emit("update:destAr", newValue);
      }
    },
    getpCode: {
      get: function() {
        return this.pCode;
      },
      set: function(newValue) {
        this.$emit("update:pCode", newValue);
      }
    }*/
    /*,
   
  changeValue: function() {
    this.orderNo.value = "new value";
    this.tel.value = "new value";
    this.cName.value = "new value";
    this.postSent.value = "new value";
    this.mSent.value = "new value";
    this.destAr.value = "new value";
    this.pCode.value = "new value";
  }*/
  },
  computed: {
    getorderNo: {
      get: function() {
        return this.orderNo;
      },
      set: function(orderNo) {
        this.$emit("input:value", orderNo);
      }
    },
    gettel: {
      get: function() {
        return this.tel;
      },
      set: function(tel) {
        this.$emit("input:value", tel);
      }
    },
    getcName: {
      get: function() {
        return this.cName;
      },
      set: function(cName) {
        this.$emit("input", cName);
      }
    },
    getpostSent: {
      get: function() {
        return this.postSent;
      },
      set: function(postSent) {
        this.$emit("input:value", postSent);
      }
    },
    getmSent: {
      get: function() {
        return this.mSent;
      },
      set: function(newValue) {
        this.$emit("input:value", newValue);
      }
    },
    getdestArr: {
      get: function() {
        return this.destAr;
      },
      set: function(newValue) {
        this.$emit("input:value", newValue);
      }
    },
    getpCode: {
      get: function() {
        return this.pCode;
      },
      set: function(mSent) {
        this.$emit("input:value", mSent);
      }
    }
  }
};
</script>
