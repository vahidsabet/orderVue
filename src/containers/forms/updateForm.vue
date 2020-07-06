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
                <input type="text" class="form-control" v-model="cName" />
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
                <span>{{ $t('forms.destArr') }}</span>
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
            @click="updateOrder()"
            variant="primary"
            class="mt-4"
          >{{ $t('forms.submit') }}</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>

import { apiUrl } from "../../constants/config";

import { getDirection } from "../../utils";

export default {
  props: [
   /* "orderNo",
    "tel",
    "cName",
    "postSent",
    "mSent",
    "destAr",
    "pCode",
    "updateOrder"*/
  ],
  
  data() {
    return {
      direction: getDirection().direction,
      isUpdate: false,
      orderData: {
        orderNo: "",
        tel: "",
        cName: "",
        postSent: 0,
        mSent: 0,
        destArr: 0,
        pCode: "",
        mshow: false
      }
    };
  },
  methods: {
    onTopLabelsOverLineFormSubmit() {
      console.log(JSON.stringify(this.topLabelsOverLineForm));
    },
    sdm:function(oobg){
      const orderObg = {
        orderNo: oobg.orderNo,
        tel: oobg.tel,
        cName: oobg.cName,
        postSent: oobg.postSent,
        mSent: oobg.mSent,
        destAr: oobg.destArr,
        pCode: oobg.Code
      };
            this.$emit('upIn', oobg);

    },
   /* updateOrder() {
     // this.addTodoItem({
        orderNo: this.orderData.orderNo,
        tel: this.orderData.tel,
        cName: this.orderData.cName,
        postSent: this.orderData.postSent,
        mSent: this.orderData.mSent,
        destArr: this.orderData.destArr,
        pCode: this.orderData.pCode,
        mshow: this.orderData.mshow
      });//

      this.isUpdate = false;
      const orderObg = {
        orderNo: this.getorderNo,
        tel: this.gettel,
        cName: this.getcName,
        postSent: this.getpostSent,
        mSent: this.getmSent,
        destAr: this.getdestArr,
        pCode: this.getCode
      };

      axios
        .put(
          apiUrl + "/" + orderData.orderNo,
          orderData //,{
          headers: { "Content-Type": "application/json" }
        }//
        )
        .then(response => {
          this.addNotification("info", "", response.data);
          return response.data;
        });
      //this.orderData = {
        orderNo: "",
        tel: "",
        cName: "",
        postSent: 0,
        mSent: 0,
        destArr: 0,
        pCode: "",
        mshow: false
      };//
    },*/
    addNotification(
      type = "success",
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
      return this.destArr;
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
        return this.destArr;
      },
      set: function(newValue) {
        this.$emit("update:destArr", newValue);
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
    this.destArr.value = "new value";
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
        this.$emit("input:value", cName);
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
        return this.destArr;
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
