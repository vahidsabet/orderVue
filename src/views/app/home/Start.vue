<template>
  <div>
    <b-row>
      
      <b-modal id="modallg" ref="modallg" size="lg" title="Large Modal" hide-footer>
        <updateForm
         :order="orderObg"
         :tUp="tableUpdate"
        ></updateForm>
      </b-modal>
      <b-colxx xxs="12">
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('forms.orders')">
          <datatable-heading
            :title="$t('menu.divided-table')"
            :selectAll="selectAll"
            :isSelectedAll="isSelectedAll"
            :isAnyItemSelected="isAnyItemSelected"
            :keymap="keymap"
            :changePageSize="changePageSize"
            :searchChange="searchChange"
            :from="from"
            :to="to"
            :total="total"
            :perPage="perPage"
          ></datatable-heading>
          <b-row>
            <b-colxx xxs="12">
              <vuetable
                ref="vuetable"
                class="table-divided order-with-arrow"
                :api-url="apiBase"
                :query-params="makeQueryParams"
                :per-page="perPage"
                :reactive-api-url="true"
                :fields="fields"
                pagination-path
                :row-class="onRowClass"
                @vuetable:pagination-data="onPaginationData"
                @vuetable:row-clicked="rowClicked"
                @vuetable:cell-rightclicked="rightClicked"
              >
                <template slot="actions" slot-scope="props">
                  <b-form-checkbox
                    :checked="selectedItems.includes(props.rowData.id)"
                    class="itemCheck mb-0"
                  ></b-form-checkbox>
                </template>
              </vuetable>
              <vuetable-pagination-bootstrap
                class="mt-4"
                ref="pagination"
                @vuetable-pagination:change-page="onChangePage"
              />
            </b-colxx>
          </b-row>

          <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="onContextMenuAction('copy')">
              <i class="simple-icon-docs" />
              <span>Copy</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
              <i class="simple-icon-drawer" />
              <span>Move to archive</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="onContextMenuAction('delete')">
              <i class="simple-icon-trash" />
              <span>Delete</span>
            </v-contextmenu-item>
          </v-contextmenu>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>


<script>

import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
import { apiUrl } from "../../../constants/config";

import DatatableHeading from "../../../containers/datatable/DatatableHeading";
import LayoutTopLabelsOverLine from "../../../containers/forms/updateForm";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    updateForm: LayoutTopLabelsOverLine
  },
  data() {
    return {
      isLoad: false,
      apiBase: apiUrl,
      sort: "",
      page: 1,
      perPage: 8,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: [],    
 orderObg : {
       orderNo: "",
      tel: "",
      cName: "",
      postSent: 0,
      mSent: 0,
      destAr: 0,
      pCode: "",
      mshow: false,
      },
      fields: [
        {
          name: "orderNo",
          sortField: "orderNo",
          title: "شماره سفارش",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "10%"
        },
        {
          name: "cName",
          sortField: "cName",
          title: "نام مشتری",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "10%"
        },
        {
          name: "tel",
          sortField: "tel",
          title: "تلفن",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },

        {
          name: "postSent",
          sortField: "postSent",
          title: "ارسال به پست",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "mSent",
          sortField: "mSent",
          title: "ارسال از مشهد",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "destAr",
          sortField: "destAr",
          title: "رسیده به مقصد",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "pCode",
          sortField: "postCode",
          title: "کد پیگیری",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        }
      ]
    };
  },
  methods: {
    makeQueryParams(sortOrder, currentPage, perPage) {
      this.selectedItems = [];
      return sortOrder[0]
        ? {
            sort: sortOrder[0]
              ? sortOrder[0].field + "|" + sortOrder[0].direction
              : "",
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          }
        : {
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          };
    },   
    onRowClass(dataItem, index) {
      if (this.selectedItems.includes(dataItem.id)) {
        return "selected";
      }
      return "";
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      console.log("hide modal:: " + refname);

      if (refname === "modallg") {
        this.$refs["modallg"].show();
      }
    },
    somethingModal(refname) {
      if (refname === "modallg") {
        this.$refs["modallg"].show();
      }
    },
   
    rowClicked(dataItem, event) {
      this.somethingModal("modallg");
     /* this.orderNo = dataItem.orderNo;
      this.tel = dataItem.tel;
      this.cName = dataItem.cName;
      this.postSent = dataItem.postSent;
      this.mSent = dataItem.mSent;
      this.destAr = dataItem.destAr;
      this.pCode = dataItem.pCode;*/

      this.orderObg.orderNo = dataItem.orderNo;
      this.orderObg.tel = dataItem.tel;
      this.orderObg.cName = dataItem.cName;
      this.orderObg.postSent = dataItem.postSent;
      this.orderObg.mSent = dataItem.mSent;
      this.orderObg.destAr = dataItem.destAr;
      this.orderObg.pCode = dataItem.pCode;

      
      const itemId = dataItem.id;
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
        this.selectedItems = [...new Set(this.selectedItems)];
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    rightClicked(dataItem, field, event) {
      event.preventDefault();
      if (!this.selectedItems.includes(dataItem.id)) {
        this.selectedItems = [dataItem.id];
      }
      this.$refs.contextmenu.show({ top: event.pageY, left: event.pageX });
    },
    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      this.lastPage = paginationData.last_page;
      this.items = paginationData.data;
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
  tableUpdate(){
this.$refs.vuetable.refresh();
  },
    changePageSize(perPage) {
      this.perPage = perPage;
      this.$refs.vuetable.refresh();
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    addNotification(
      type = "success",
      title = "This is Notify Title",
      message = "This is Notify Message,<br>with html."
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false });
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    }
  }
};
</script>
