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
        <b-card class="mb-4" :title="$t('forms.single')" >
        </b-card>
         <layout-top-labels-over-line></layout-top-labels-over-line>
    </b-colxx>
   
  </b-row>
  </div>
</template>
<script>
import LayoutTopLabelsOverLine from "../../../containers/forms/LayoutTopLabelsOverLine";
export default {
  components: {
    "layout-top-labels-over-line": LayoutTopLabelsOverLine
  }
};
</script>