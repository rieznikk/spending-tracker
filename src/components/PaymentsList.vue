<template>
  <div>
    <table :class="[$style.tableWrapper]" v-show="getPaymentsList.length !== 0">
      <thead>
        <tr>
          <th :class="[$style.tableCell]">#</th>
          <th :class="[$style.tableCell]">Date</th>
          <th :class="[$style.tableCell]">Category</th>
          <th :class="[$style.tableCell]">Value</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in currentPage" :key="index" :class="[$style.tableRow]">
          <td :class="[$style.tableCell]">{{ item.index }}</td>
          <td :class="[$style.tableCell]">{{ item.date }}</td>
          <td :class="[$style.tableCell]">{{ item.category }}</td>
          <td :class="[$style.tableCell]">{{ item.price }}</td>
        </tr>
      </tbody>
    </table>

    <ListPagination :itemsPerPage="itemsOnPage" :currentPage="page" @changePage="rerenderList"></ListPagination>
  </div>
</template>

<script>
import ListPagination from './ListPagination'
import { mapGetters } from "vuex";

export default {
  components: { 
    ListPagination
  },
  data() {
    return {
      page: 1,
      itemsOnPage: 10
    }
  },
  methods: {
    rerenderList(page) {
      this.page = page;
    }
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    currentPage() {
      const { itemsOnPage, page } = this;
      return this.getPaymentsList.slice(itemsOnPage * (page - 1), itemsOnPage * (page - 1) + itemsOnPage);
    }
  },
};
</script>

<style lang="scss" module>
.tableWrapper {
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tableRow {
  border-top: 1px solid lightgray;
}

.tableCell {
  text-align: left;
  padding: 10px 15px;
}
</style>
