<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('forms.single')"/>
      <div class="separator mb-5 mb"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">        
         <LayoutAddOrder></LayoutAddOrder>
    </b-colxx>
   
  </b-row>
  </div>
</template>
<script>
import LayoutAddOrder from "../../../containers/forms/LayoutAddOrder";
export default {
  components: {
    "LayoutAddOrder": LayoutAddOrder
  }
};
</script>