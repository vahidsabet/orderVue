<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.single')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('menu.single')" >
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